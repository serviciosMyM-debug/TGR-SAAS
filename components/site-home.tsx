
import Image from "next/image";
import Link from "next/link";
import { Bolt, Building2, ClipboardList, ShieldCheck, BarChart3, HardHat, ArrowRight } from "lucide-react";
import { Section, Card } from "@/components/ui";

const services = [
  {
    title: "Instalaciones eléctricas completas",
    description: "Obras nuevas, ampliaciones y reformas con planificación por etapas y documentación clara.",
    icon: Bolt,
  },
  {
    title: "Tableros y protecciones",
    description: "Montaje, reacondicionamiento y adaptación de tableros monofásicos y trifásicos.",
    icon: ShieldCheck,
  },
  {
    title: "Presupuestos profesionales",
    description: "Cotizaciones detalladas con descripción técnica, etapas de ejecución e importes trazables.",
    icon: ClipboardList,
  },
  {
    title: "Obras residenciales y comerciales",
    description: "Soluciones para viviendas, locales, desarrollos y proyectos con dirección técnica.",
    icon: Building2,
  },
  {
    title: "Seguimiento y balance interno",
    description: "Control administrativo para facturación, cobros, egresos y rentabilidad por período.",
    icon: BarChart3,
  },
  {
    title: "Metodología de obra",
    description: "Visita técnica, relevamiento, presupuesto, propuesta y cierre con enfoque prolijo y profesional.",
    icon: HardHat,
  },
];

const metrics = [
  "Presupuestos claros y ordenados",
  "Imagen corporativa profesional",
  "Trazabilidad de ingresos y egresos",
  "Obras y trabajos realizados visibles",
];

export function SiteHome({
  projects,
}: {
  projects: Array<{ id: string; title: string; city: string | null; summary: string; image: string | null }>;
}) {
  return (
    <>
      <Section className="hero">
        <div className="heroGrid">
          <div>
            <span className="eyebrow">TGR Servicios Eléctricos</span>
            <h1>Instalaciones eléctricas profesionales con presencia técnica y gestión seria.</h1>

            <div className="ctaRow">
              <a className="primaryBtn" href="#contacto">Solicitar contacto</a>
              <a className="secondaryBtn" href="#obras">Ver obras</a>
            </div>

            <div className="pillGrid">
              {metrics.map((item) => (
                <span key={item} className="metricPill">{item}</span>
              ))}
            </div>
          </div>

          <Card className="heroCard">
            <Image
              src="/images/logo-cover.png"
              alt="Identidad TGR"
              width={700}
              height={900}
              className="heroImage"
            />
          </Card>
        </div>
      </Section>

      <Section id="nosotros">
        <div className="sectionHeading">
          <span className="eyebrow">¿Quiénes somos?</span>
          <h2>Una marca técnica con impronta visual fuerte y foco real en obra.</h2>
          <p>
            La estética, el tono y la forma de presentar servicios fueron tomados del portfolio entregado:
            fondo azul institucional, imagen profesional, lenguaje de obra y foco en instalaciones, tableros y ejecución por etapas.
          </p>
        </div>
      </Section>

      <Section id="servicios">
        <div className="sectionHeading">
          <span className="eyebrow">Servicios</span>
          <h2>Lo que TGR comunica y ejecuta en su portfolio, llevado a una web premium.</h2>
        </div>

        <div className="grid-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title}>
                <div className="serviceIcon">
                  <Icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section id="obras">
        <div className="sectionHeading">
          <span className="eyebrow">Obras de las que fuimos parte</span>
          <h2>Galería institucional inspirada en el portfolio entregado.</h2>
        </div>

        <div className="grid-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/proyectos/${project.id}`} className="projectCardLink">
              <Card className="projectCard">
                <Image
                  src={project.image || "/images/portfolio-sheet.png"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="projectImage"
                />
                <div className="projectBody">
                  <h3>{project.title}</h3>
                  <small>{project.city || "Santa Fe"}</small>
                  <p>{project.summary}</p>
                  <span className="projectCardCta">
                    Ver detalle
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="contactSection" id="contacto">
        <div className="contactCard">
          <div>
            <span className="eyebrow">Contacto</span>
            <h2>Hablemos de tu próxima obra.</h2>
            <p>
              Espacio preparado para formulario profesional, botón de WhatsApp y llamada a la acción clara.
            </p>
          </div>
          <form className="contactForm">
            <input placeholder="Nombre y apellido" />
            <input placeholder="Teléfono" />
            <input placeholder="Email" />
            <textarea placeholder="Contanos brevemente el proyecto" rows={5} />
            <button type="button" className="primaryBtn">Enviar consulta</button>
          </form>
        </div>
      </Section>

      <a
        href="https://wa.me/54347615693368"
        target="_blank"
        className="whatsappFloat"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </>
  );
}
