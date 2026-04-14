import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const [projects, invoices, movements, clients, quotes] = await Promise.all([
    prisma.project.findMany({
      where: { highlighted: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.invoice.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { client: true },
    }),
    prisma.financialMovement.findMany({
      take: 50,
      orderBy: { movementDate: "desc" },
    }),
    prisma.client.count(),
    prisma.quote.count(),
  ]);

  const income = movements
    .filter((item) => item.type === "INCOME")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const expenses = movements
    .filter((item) => item.type === "EXPENSE")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const monthlyMap = new Map<string, { month: string; ingresos: number; egresos: number }>();
  for (const movement of movements) {
    const key = new Intl.DateTimeFormat("es-AR", { month: "short" }).format(movement.movementDate);
    const current = monthlyMap.get(key) ?? { month: key, ingresos: 0, egresos: 0 };
    if (movement.type === "INCOME") current.ingresos += Number(movement.amount);
    if (movement.type === "EXPENSE") current.egresos += Number(movement.amount);
    monthlyMap.set(key, current);
  }

  return {
    stats: {
      clients,
      quotes,
      income,
      expenses,
      net: income - expenses,
      paidInvoices: invoices.filter((item) => item.status === "PAID").length,
      pendingInvoices: invoices.filter((item) => item.status !== "PAID").length,
    },
    monthly: Array.from(monthlyMap.values()).reverse(),
    recentInvoices: invoices,
    highlightedProjects: projects,
  };
}

export async function getSiteData() {
  const [projects, settings] = await Promise.all([
    prisma.project.findMany({
      take: 6,
      orderBy: [{ highlighted: "desc" }, { createdAt: "desc" }],
    }),
    prisma.setting.findMany(),
  ]);

  const settingsMap = Object.fromEntries(settings.map((item) => [item.key, item.value]));
  return { projects, settings: settingsMap };
}
