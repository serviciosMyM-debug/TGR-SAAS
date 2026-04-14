import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { saveClientAction, deleteClientAction } from "@/app/admin/actions";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { invoices: true, quotes: true, projects: true },
  });

  return (
    <div className="adminPageStack">
      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Clientes</span>
            <h2>Alta rápida de clientes</h2>
          </div>
        </div>

        <form action={saveClientAction} className="adminFormGrid">
          <input name="businessName" placeholder="Empresa o cliente *" required />
          <input name="contactName" placeholder="Contacto" />
          <input name="taxId" placeholder="CUIT / DNI" />
          <input name="email" type="email" placeholder="Email" />
          <input name="phone" placeholder="Teléfono" />
          <input name="city" placeholder="Ciudad" />
          <input name="address" placeholder="Dirección" className="fullCol" />
          <textarea name="notes" placeholder="Observaciones" rows={4} className="fullCol" />
          <div className="fullCol formActionsRow">
            <button className="primaryBtn" type="submit">Guardar cliente</button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Base cargada</span>
            <h2>Clientes y seguimiento</h2>
          </div>
        </div>

        <div className="entityGrid">
          {clients.map((client) => (
            <article key={client.id} className="entityCard">
              <div className="entityHeader">
                <div>
                  <h3>{client.businessName}</h3>
                  <p>{client.contactName || "Sin contacto principal"}</p>
                </div>
                <span className="metricPill">{client.city || "Sin ciudad"}</span>
              </div>

              <div className="miniStatsGrid">
                <div><strong>{client.invoices.length}</strong><span>Facturas</span></div>
                <div><strong>{client.quotes.length}</strong><span>Presupuestos</span></div>
                <div><strong>{client.projects.length}</strong><span>Obras</span></div>
                <div><strong>{formatDate(client.createdAt)}</strong><span>Alta</span></div>
              </div>

              <form action={saveClientAction} className="adminFormGrid compact">
                <input type="hidden" name="id" value={client.id} />
                <input name="businessName" defaultValue={client.businessName} placeholder="Empresa o cliente" required />
                <input name="contactName" defaultValue={client.contactName || ""} placeholder="Contacto" />
                <input name="taxId" defaultValue={client.taxId || ""} placeholder="CUIT / DNI" />
                <input name="email" type="email" defaultValue={client.email || ""} placeholder="Email" />
                <input name="phone" defaultValue={client.phone || ""} placeholder="Teléfono" />
                <input name="city" defaultValue={client.city || ""} placeholder="Ciudad" />
                <input name="address" defaultValue={client.address || ""} placeholder="Dirección" className="fullCol" />
                <textarea name="notes" defaultValue={client.notes || ""} placeholder="Observaciones" rows={3} className="fullCol" />
                <div className="fullCol formActionsRow between">
                  <button className="primaryBtn" type="submit">Actualizar</button>
                </div>
              </form>

              <form action={deleteClientAction}>
                <input type="hidden" name="id" value={client.id} />
                <button className="dangerBtn" type="submit">Eliminar cliente</button>
              </form>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
