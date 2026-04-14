import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section, Card } from "@/components/ui";
import { prisma } from "@/lib/prisma";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { client: true },
  });

  if (!project) notFound();

  const imageSrc = project.image || "/images/portfolio-sheet.png";

  return (
    <>
      <SiteHeader />

      <Section className="projectDetailSection">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 18,
            marginBottom: 22,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="eyebrow">Proyecto realizado</span>
            <h1>{project.title}</h1>
            <p className="heroText">{project.summary}</p>

            <div className="pillGrid" style={{ marginTop: 14 }}>
              <span className="metricPill">{project.city || "Santa Fe"}</span>
              <span className="metricPill">{project.client?.businessName || "Cliente no especificado"}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/#obras" className="secondaryBtn">
              Volver a obras
            </Link>
            <a href={imageSrc} target="_blank" rel="noreferrer" className="primaryBtn">
              Ver imagen completa
            </a>
          </div>
        </div>

        <div style={{ maxWidth: 980, margin: "0 auto 22px" }}>
          <Card
            style={{
              padding: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 18,
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <Image
                src={imageSrc}
                alt={project.title}
                width={1400}
                height={1100}
                priority
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxWidth: 940,
                  objectFit: "contain",
                  objectPosition: "center center",
                }}
              />
            </div>
          </Card>
        </div>

        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          <Card>
            <span className="eyebrow">Descripción general</span>
            <h2>Resumen de la obra</h2>
            <p>{project.summary}</p>
          </Card>

          <Card>
            <span className="eyebrow">Detalle técnico</span>
            <h2>Información ampliada</h2>
            <p>
              {project.details || "Todavía no se cargó el detalle técnico completo de esta obra en el panel administrador."}
            </p>
          </Card>
        </div>
      </Section>

      <SiteFooter />
    </>
  );
}
