
import "./globals.css";
import "./tgr-patch.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TGR Servicios Eléctricos",
  description: "Sitio institucional + panel administrativo para TGR Servicios Eléctricos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
