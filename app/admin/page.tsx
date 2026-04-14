import { Card, Badge } from "@/components/ui";
import { FinanceAreaChart, InvoiceBarChart } from "@/components/charts";
import { getDashboardData } from "@/lib/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <>
      <div className="statsGrid">
        <Card className="statCard">
          <span className="eyebrow">Ingresos</span>
          <strong>{formatCurrency(data.stats.income)}</strong>
        </Card>
        <Card className="statCard">
          <span className="eyebrow">Egresos</span>
          <strong>{formatCurrency(data.stats.expenses)}</strong>
        </Card>
        <Card className="statCard">
          <span className="eyebrow">Balance neto</span>
          <strong>{formatCurrency(data.stats.net)}</strong>
        </Card>
        <Card className="statCard">
          <span className="eyebrow">Clientes</span>
          <strong>{data.stats.clients}</strong>
        </Card>
      </div>

      <div className="panelGrid">
        <Card>
          <div className="pageActions">
            <div>
              <span className="eyebrow">Evolución financiera</span>
              <h2>Ingresos y egresos por período</h2>
            </div>
          </div>
          <FinanceAreaChart data={data.monthly} />
        </Card>

        <Card>
          <span className="eyebrow">Estado operativo</span>
          <h2>Resumen del panel</h2>
          <div className="kpiList">
            <div className="kpiRow"><span>Presupuestos registrados</span><strong>{data.stats.quotes}</strong></div>
            <div className="kpiRow"><span>Facturas cobradas</span><strong>{data.stats.paidInvoices}</strong></div>
            <div className="kpiRow"><span>Facturas pendientes</span><strong>{data.stats.pendingInvoices}</strong></div>
            <div className="kpiRow"><span>Rentabilidad estimada</span><strong>{formatCurrency(data.stats.net)}</strong></div>
          </div>
        </Card>
      </div>

      <div className="panelGrid">
        <Card>
          <div className="pageActions">
            <div>
              <span className="eyebrow">Facturación reciente</span>
              <h2>Últimos comprobantes</h2>
            </div>
          </div>
          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.recentInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>#{invoice.number}</td>
                    <td>{invoice.client?.businessName || "Sin cliente"}</td>
                    <td>{formatDate(invoice.issueDate)}</td>
                    <td>
                      <Badge tone={invoice.status === "PAID" ? "success" : "warning"}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td>{formatCurrency(Number(invoice.total))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <span className="eyebrow">Lectura rápida</span>
          <h2>Composición</h2>
          <InvoiceBarChart
            data={[
              { name: "Pagadas", value: data.stats.paidInvoices },
              { name: "Pendientes", value: data.stats.pendingInvoices },
              { name: "Clientes", value: data.stats.clients },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
