
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";

type BudgetData = {
  number: number;
  issueDate: string | Date;
  title: string;
  budgetType: string;
  client?: string | null;
  contactName?: string | null;
  address?: string | null;
  projectDescription?: string | null;
  laborDescription?: string | null;
  executionStages?: string | null;
  subtotal: number;
  total: number;
  items: Array<{
    itemCode?: string | null;
    title: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
};

export function PrintBudget({ budget }: { budget: BudgetData }) {
  return (
    <div className="printBudget">
      <div className="printHead">
        <div className="printHeadBrand">
          <span className="printHeadBrandMark">
            <Image
              src="/images/tgr-logo-white.png"
              alt="Logo de TGR Servicios Eléctricos"
              width={54}
              height={54}
              priority
            />
          </span>
          <div>
            <h1>TGR Servicios eléctricos</h1>
            <p>tgrelectricidad@gmail.com</p>
            <p>03476-15693368</p>
            <p>www.tgr-electricidad.com</p>
          </div>
        </div>
        <div className="printMeta">
          <strong>PRESUPUESTO</strong>
          <span>{formatDate(budget.issueDate)}</span>
          <span>N° {budget.number}</span>
        </div>
      </div>

      <div className="printBlock">
        <h2>INFORMACIÓN DEL PROYECTO</h2>
        <p><strong>Tipo de presupuesto:</strong> {budget.budgetType}</p>
        <p><strong>Descripción del proyecto:</strong> {budget.projectDescription || budget.title}</p>
        <p><strong>Nombre de contacto:</strong> {budget.contactName || budget.client || "-"}</p>
        <p><strong>Dirección:</strong> {budget.address || "-"}</p>
      </div>

      <div className="printBlock">
        <h2>MANO DE OBRA</h2>
        <p>{budget.laborDescription || "Instalación, conexión, montaje y puesta en servicio según alcance acordado."}</p>
      </div>

      <table className="printTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Costo por unidad</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {budget.items.map((item, index) => (
            <tr key={index}>
              <td>{item.itemCode || "-"}</td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.unitPrice)}</td>
              <td>{formatCurrency(item.lineTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totalsCard">
        <div><span>Subtotal</span><strong>{formatCurrency(budget.subtotal)}</strong></div>
        <div><span>Total</span><strong>{formatCurrency(budget.total)}</strong></div>
      </div>

      <div className="printBlock">
        <h2>ETAPAS DE EJECUCIÓN</h2>
        <p>{budget.executionStages || "Etapa 1: relevamiento. Etapa 2: ejecución. Etapa 3: cierre y entrega."}</p>
      </div>
    </div>
  );
}

export default PrintBudget;
