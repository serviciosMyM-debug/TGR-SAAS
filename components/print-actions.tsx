
"use client";

export function PrintActions() {
  return (
    <div className="printActions">
      <button className="primaryBtn" onClick={() => window.print()}>
        Imprimir / guardar PDF
      </button>
      <a className="secondaryBtn" href="/admin/presupuestos">
        Volver al panel
      </a>
    </div>
  );
}

export default PrintActions;
