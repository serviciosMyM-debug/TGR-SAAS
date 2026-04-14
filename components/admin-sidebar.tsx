import Image from "next/image";
import Link from "next/link";

function AdminSidebarComponent() {
  const items = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/clientes", label: "Clientes" },
    { href: "/admin/presupuestos", label: "Presupuestos" },
    { href: "/admin/facturas", label: "Facturas" },
    { href: "/admin/balance", label: "Balance" },
    { href: "/admin/proyectos", label: "Obras" },
    { href: "/admin/configuracion", label: "Configuración" },
  ];

  return (
    <aside
      style={{
        width: 280,
        minHeight: "100%",
        padding: 20,
        background: "#06163f",
        borderRight: "1px solid rgba(92, 138, 255, 0.14)",
      }}
    >
      <Link
        href="/admin"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
          color: "#e8f1ff",
          marginBottom: 24,
          padding: 12,
          borderRadius: 16,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(180deg, rgba(22,70,181,.96), rgba(10,41,128,.96))",
          }}
        >
          <Image
            src="/images/tgr-logo-white.png"
            alt="Logo de TGR"
            width={28}
            height={28}
            priority
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, lineHeight: 1.05 }}>
          <strong style={{ fontSize: "1.1rem" }}>TGR</strong>
          <span style={{ color: "#a9c1eb", fontSize: ".95rem" }}>Servicios Eléctricos</span>
        </div>
      </Link>

      <nav style={{ display: "grid", gap: 8 }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: "#cbdcff",
              textDecoration: "none",
              padding: "12px 14px",
              borderRadius: 12,
              background: "transparent",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export { AdminSidebarComponent as AdminSidebar };
export default AdminSidebarComponent;
