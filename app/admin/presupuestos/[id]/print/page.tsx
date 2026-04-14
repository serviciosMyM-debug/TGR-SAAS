import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PrintBudget } from "@/components/print-budget";
import { PrintActions } from "@/components/print-actions";

export default async function QuotePrintPage({ params }: { params: { id: string } }) {
  const quote = await prisma.quote.findUnique({
    where: { id: params.id },
    include: { client: true, items: true },
  });

  if (!quote) notFound();

  return (
    <div className="printPageWrap">
      <PrintActions />
      <PrintBudget
        budget={{
          number: quote.number,
          issueDate: quote.issuedAt,
          title: quote.title,
          budgetType: quote.budgetType,
          client: quote.client?.businessName,
          contactName: quote.contactName,
          address: quote.address,
          projectDescription: quote.projectDescription,
          laborDescription: quote.laborDescription,
          executionStages: quote.executionStages,
          subtotal: Number(quote.subtotal),
          total: Number(quote.total),
          items: quote.items.map((item) => ({
            itemCode: item.itemCode,
            title: item.title,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            lineTotal: Number(item.lineTotal),
          })),
        }}
      />
    </div>
  );
}
