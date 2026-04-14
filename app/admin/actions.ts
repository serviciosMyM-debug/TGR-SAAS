"use server";

import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PaymentMethod, InvoiceStatus, MovementType } from "@prisma/client";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Sesión inválida");
  return session.user;
}

function asString(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function asNullable(value: FormDataEntryValue | null) {
  const text = asString(value);
  return text.length ? text : null;
}

function asNumber(value: FormDataEntryValue | null) {
  const num = Number(String(value ?? "0").replace(",", "."));
  return Number.isFinite(num) ? num : 0;
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function saveClientAction(formData: FormData) {
  await requireUser();
  const id = asNullable(formData.get("id"));
  const businessName = asString(formData.get("businessName"));
  if (!businessName) throw new Error("El nombre del cliente es obligatorio");

  const data = {
    businessName,
    contactName: asNullable(formData.get("contactName")),
    taxId: asNullable(formData.get("taxId")),
    email: asNullable(formData.get("email")),
    phone: asNullable(formData.get("phone")),
    address: asNullable(formData.get("address")),
    city: asNullable(formData.get("city")),
    notes: asNullable(formData.get("notes")),
  };

  if (id) {
    await prisma.client.update({ where: { id }, data });
  } else {
    await prisma.client.create({ data });
  }

  revalidatePath("/admin/clientes");
  revalidatePath("/admin");
}

export async function deleteClientAction(formData: FormData) {
  await requireUser();
  const id = asString(formData.get("id"));
  if (!id) return;

  await prisma.project.updateMany({ where: { clientId: id }, data: { clientId: null } });
  await prisma.quote.updateMany({ where: { clientId: id }, data: { clientId: null } });
  await prisma.invoice.updateMany({ where: { clientId: id }, data: { clientId: null } });
  await prisma.financialMovement.updateMany({ where: { clientId: id }, data: { clientId: null } });
  await prisma.client.delete({ where: { id } });

  revalidatePath("/admin/clientes");
  revalidatePath("/admin");
}

export async function saveProjectAction(formData: FormData) {
  await requireUser();
  const id = asNullable(formData.get("id"));
  const title = asString(formData.get("title"));
  const summary = asString(formData.get("summary"));
  if (!title || !summary) throw new Error("Título y resumen son obligatorios");

  const data = {
    title,
    city: asNullable(formData.get("city")),
    summary,
    details: asNullable(formData.get("details")),
    image: asNullable(formData.get("image")),
    highlighted: asString(formData.get("highlighted")) === "on",
    clientId: asNullable(formData.get("clientId")),
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/proyectos");
}

export async function deleteProjectAction(formData: FormData) {
  await requireUser();
  const id = asString(formData.get("id"));
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
}

export async function saveInvoiceAction(formData: FormData) {
  const user = await requireUser();
  const clientId = asNullable(formData.get("clientId"));
  const title = asString(formData.get("title"));
  const total = asNumber(formData.get("total"));
  const status = asString(formData.get("status")) as InvoiceStatus;
  const paymentMethod = asNullable(formData.get("paymentMethod")) as PaymentMethod | null;
  const notes = asNullable(formData.get("notes"));
  const issueDateText = asNullable(formData.get("issueDate"));
  const dueDateText = asNullable(formData.get("dueDate"));

  if (!title || total <= 0) throw new Error("Título e importe válidos son obligatorios");

  const issueDate = issueDateText ? new Date(issueDateText) : new Date();
  const dueDate = dueDateText ? new Date(dueDateText) : null;
  const amountPaid = status === "PAID" ? total : 0;

  const invoice = await prisma.invoice.create({
    data: {
      clientId,
      title,
      notes,
      subtotal: total,
      total,
      amountPaid,
      status,
      paymentMethod,
      issueDate,
      dueDate,
      issuedById: user.id,
      items: {
        create: [{ description: title, quantity: 1, unitPrice: total, lineTotal: total }],
      },
    },
    include: { client: true },
  });

  if (status === "PAID") {
    await prisma.financialMovement.create({
      data: {
        type: MovementType.INCOME,
        title: `Cobro factura #${invoice.number}`,
        description: notes,
        amount: total,
        movementDate: issueDate,
        paymentMethod,
        clientId: clientId ?? undefined,
        invoiceId: invoice.id,
        categoryLabel: "Facturación",
      },
    });
  }

  revalidatePath("/admin/facturas");
  revalidatePath("/admin/balance");
  revalidatePath("/admin");
}

export async function deleteInvoiceAction(formData: FormData) {
  await requireUser();
  const id = asString(formData.get("id"));
  if (!id) return;
  await prisma.financialMovement.deleteMany({ where: { invoiceId: id } });
  await prisma.invoice.delete({ where: { id } });
  revalidatePath("/admin/facturas");
  revalidatePath("/admin/balance");
  revalidatePath("/admin");
}

export async function saveMovementAction(formData: FormData) {
  await requireUser();
  const type = asString(formData.get("type")) as MovementType;
  const title = asString(formData.get("title"));
  const amount = asNumber(formData.get("amount"));
  if (!title || amount <= 0) throw new Error("Título e importe válidos son obligatorios");

  await prisma.financialMovement.create({
    data: {
      type,
      title,
      description: asNullable(formData.get("description")),
      amount,
      movementDate: asNullable(formData.get("movementDate")) ? new Date(asString(formData.get("movementDate"))) : new Date(),
      paymentMethod: asNullable(formData.get("paymentMethod")) as PaymentMethod | null,
      clientId: asNullable(formData.get("clientId")) || undefined,
      categoryLabel: asNullable(formData.get("categoryLabel")),
    },
  });

  revalidatePath("/admin/balance");
  revalidatePath("/admin");
}

export async function deleteMovementAction(formData: FormData) {
  await requireUser();
  const id = asString(formData.get("id"));
  if (!id) return;
  await prisma.financialMovement.delete({ where: { id } });
  revalidatePath("/admin/balance");
  revalidatePath("/admin");
}

export async function saveSettingAction(formData: FormData) {
  await requireUser();
  const key = asString(formData.get("key"));
  const value = asString(formData.get("value"));
  if (!key) return;

  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath("/");
  revalidatePath("/admin/configuracion");
}
