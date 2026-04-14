import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import { deleteMovementAction, saveMovementAction } from "@/app/admin/actions";

export default async function AdminBalancePage() {
  const [movements, clients] = await Promise.all([
    prisma.financialMovement.findMany({
      orderBy: { movementDate: "desc" },
      include: { client: true },
    }),
    prisma.client.findMany({ orderBy: { businessName: "asc" } }),
  ]);

  const income = movements.filter((m) => m.type === "INCOME").reduce((acc, m) => acc + Number(m.amount), 0);
  const expenses = movements.filter((m) => m.type === "EXPENSE").reduce((acc, m) => acc + Number(m.amount), 0);

  return (
    <div className="adminPageStack">
      <div className="statsGrid">
        <Card className="statCard">
          <span className="eyebrow">Ingresos acumulados</span>
          <strong>{formatCurrency(income)}</strong>
        </Card>
        <Card className="statCard">
          <span className="eyebrow">Egresos acumulados</span>
          <strong>{formatCurrency(expenses)}</strong>
        </Card>
        <Card className="statCard">
          <span className="eyebrow">Balance neto</span>
          <strong>{formatCurrency(income - expenses)}</strong>
        </Card>
        <Card className="statCard">
          <span className="eyebrow">Movimientos</span>
          <strong>{movements.length}</strong>
        </Card>
      </div>

      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Nuevo movimiento</span>
            <h2>Ingresos y egresos manuales</h2>
          </div>
        </div>

        <form action={saveMovementAction} className="adminFormGrid">
          <select name="type" defaultValue="EXPENSE">
            <option value="INCOME">Ingreso</option>
            <option value="EXPENSE">Egreso</option>
          </select>
          <input name="title" placeholder="Título *" required />
          <input name="amount" type="number" step="0.01" placeholder="Importe *" required />
          <select name="clientId" defaultValue="">
            <option value="">Sin cliente asociado</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.businessName}</option>
            ))}
          </select>
          <input name="categoryLabel" placeholder="Categoría" />
          <select name="paymentMethod" defaultValue="TRANSFER">
            <option value="TRANSFER">Transferencia</option>
            <option value="CASH">Efectivo</option>
            <option value="CARD">Tarjeta</option>
            <option value="CHECK">Cheque</option>
            <option value="ACCOUNT">Cuenta corriente</option>
            <option value="OTHER">Otro</option>
          </select>
          <input name="movementDate" type="date" />
          <textarea name="description" placeholder="Descripción" rows={4} className="fullCol" />
          <div className="fullCol formActionsRow">
            <button className="primaryBtn" type="submit">Guardar movimiento</button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Trazabilidad</span>
            <h2>Ingresos y egresos</h2>
          </div>
        </div>

        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Título</th>
                <th>Cliente</th>
                <th>Método</th>
                <th>Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id}>
                  <td>{formatDate(movement.movementDate)}</td>
                  <td>
                    <Badge tone={movement.type === "INCOME" ? "success" : "warning"}>
                      {movement.type}
                    </Badge>
                  </td>
                  <td>{movement.title}</td>
                  <td>{movement.client?.businessName || "-"}</td>
                  <td>{movement.paymentMethod || "-"}</td>
                  <td>{formatCurrency(Number(movement.amount))}</td>
                  <td>
                    <form action={deleteMovementAction}>
                      <input type="hidden" name="id" value={movement.id} />
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
