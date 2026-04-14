
import Image from "next/image";
import { auth } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";

export async function AdminHeader() {
  const session = await auth();

  return (
    <header className="adminHeader">
      <div className="brand">
        <span className="brandMarkImage">
          <Image
            src="/images/tgr-logo-white.png"
            alt="Logo de TGR Servicios Eléctricos"
            width={24}
            height={24}
            priority
          />
        </span>
        <div className="brandTextBlock">
          <h1 style={{ margin: 0 }}>Panel administrativo</h1>
          <p>Facturación, presupuestos, balance y trazabilidad.</p>
        </div>
      </div>

      <div>
        <div className="userChip">
          <strong>{session?.user?.name ?? "Usuario"}</strong>
          <small>{session?.user?.role ?? "SIN ROL"}</small>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}

export default AdminHeader;
