
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link href="/" className="brand">
          <span className="brandMarkImage">
            <Image
              src="/images/tgr-logo-white.png"
              alt="Logo de TGR Servicios Eléctricos"
              width={24}
              height={24}
              priority
            />
          </span>
          <span className="brandTextBlock">
            <strong>TGR</strong>
            <small>Servicios Eléctricos</small>
          </span>
        </Link>

        <nav className="mainNav">
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#obras">Obras</a>
          <a href="#contacto">Contacto</a>
          <Link href="/login" className="navCta">
            Acceso panel
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
