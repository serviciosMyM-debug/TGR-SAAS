import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminQuotesPage() {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true, items: true },
  });

  return (
    <Card>
      <div className="pageActions">
        <div>
          <span className="eyebrow">Presupuestos</span>
          <h2>Formato inspirado en la planilla y el PDF de muestra</h2>
        </div>
        <input className="searchInput" placeholder="Buscar por obra, cliente o número..." />
      </div>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Tipo</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td>#{quote.number}</td>
                <td>{quote.budgetType}</td>
                <td>{quote.client?.businessName || quote.contactName || "-"}</td>
                <td>{formatDate(quote.issuedAt)}</td>
                <td>
                  <Badge tone={quote.status === "APPROVED" ? "success" : "default"}>
                    {quote.status}
                  </Badge>
                </td>
                <td>{formatCurrency(Number(quote.total))}</td>
                <td>
                  <Link href={`/admin/presupuestos/${quote.id}/print`} className="navCta">
                    Ver / imprimir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
