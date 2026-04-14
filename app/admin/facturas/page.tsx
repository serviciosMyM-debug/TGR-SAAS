import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import { deleteInvoiceAction, saveInvoiceAction } from "@/app/admin/actions";

export default async function AdminInvoicesPage() {
  const [invoices, clients] = await Promise.all([
    prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, payments: true, items: true },
    }),
    prisma.client.findMany({ orderBy: { businessName: "asc" } }),
  ]);

  return (
    <div className="adminPageStack">
      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Facturas</span>
            <h2>Alta operativa de comprobantes</h2>
          </div>
        </div>

        <form action={saveInvoiceAction} className="adminFormGrid">
          <select name="clientId" defaultValue="">
            <option value="">Seleccionar cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.businessName}</option>
            ))}
          </select>
          <input name="title" placeholder="Concepto / título de factura *" required />
          <input name="total" type="number" step="0.01" placeholder="Importe total *" required />
          <select name="status" defaultValue="EMITTED">
            <option value="DRAFT">Borrador</option>
            <option value="EMITTED">Emitida</option>
            <option value="PARTIAL">Parcial</option>
            <option value="PAID">Pagada</option>
            <option value="OVERDUE">Vencida</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
          <select name="paymentMethod" defaultValue="TRANSFER">
            <option value="TRANSFER">Transferencia</option>
            <option value="CASH">Efectivo</option>
            <option value="CARD">Tarjeta</option>
            <option value="CHECK">Cheque</option>
            <option value="ACCOUNT">Cuenta corriente</option>
            <option value="OTHER">Otro</option>
          </select>
          <input name="issueDate" type="date" />
          <input name="dueDate" type="date" />
          <textarea name="notes" placeholder="Observaciones" rows={4} className="fullCol" />
          <div className="fullCol formActionsRow">
            <button className="primaryBtn" type="submit">Guardar factura</button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Facturación interna</span>
            <h2>Comprobantes cargados</h2>
          </div>
        </div>

        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Cliente</th>
                <th>Emisión</th>
                <th>Estado</th>
                <th>Pago</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>#{invoice.number}</td>
                  <td>{invoice.client?.businessName || "-"}</td>
                  <td>{formatDate(invoice.issueDate)}</td>
                  <td>
                    <Badge tone={invoice.status === "PAID" ? "success" : "warning"}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td>{invoice.paymentMethod || "-"}</td>
                  <td>{formatCurrency(Number(invoice.total))}</td>
                  <td>
                    <form action={deleteInvoiceAction}>
                      <input type="hidden" name="id" value={invoice.id} />
                      <button className="dangerGhostBtn" type="submit">Eliminar</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
