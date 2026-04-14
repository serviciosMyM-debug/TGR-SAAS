import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

async function createProject(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const details = String(formData.get("details") || "").trim();
  const clientIdRaw = String(formData.get("clientId") || "").trim();
  const highlighted = formData.get("highlighted") === "on";

  if (!title || !summary) return;

  await prisma.project.create({
    data: {
      title,
      city: city || null,
      summary,
      image: image || null,
      details: details || null,
      highlighted,
      clientId: clientIdRaw || null,
    },
  });

  revalidatePath("/admin/proyectos");
  revalidatePath("/");
}

async function updateProject(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const details = String(formData.get("details") || "").trim();
  const clientIdRaw = String(formData.get("clientId") || "").trim();
  const highlighted = formData.get("highlighted") === "on";

  if (!id || !title || !summary) return;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      city: city || null,
      summary,
      image: image || null,
      details: details || null,
      highlighted,
      clientId: clientIdRaw || null,
    },
  });

  revalidatePath("/admin/proyectos");
  revalidatePath("/");
  revalidatePath(`/proyectos/${id}`);
}

async function deleteProject(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();
  if (!id) return;

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/admin/proyectos");
  revalidatePath("/");
}

export default async function AdminProjectsPage() {
  const [clients, projects] = await Promise.all([
    prisma.client.findMany({
      select: { id: true, businessName: true },
      orderBy: { businessName: "asc" },
    }),
    prisma.project.findMany({
      include: { client: true },
      orderBy: [{ highlighted: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    color: "var(--text)",
    borderRadius: 14,
    padding: "13px 14px",
    outline: "none",
  } as const;

  const buttonPrimary = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 18px",
    borderRadius: 999,
    border: "1px solid rgba(91,144,255,.24)",
    background: "linear-gradient(180deg, rgba(31,88,220,.95), rgba(18,62,171,.95))",
    color: "#eef4ff",
    fontWeight: 700,
    cursor: "pointer",
  } as const;

  const buttonDanger = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "11px 16px",
    borderRadius: 999,
    border: "1px solid rgba(214,64,64,.22)",
    background: "rgba(214,64,64,.14)",
    color: "#ffd6d6",
    fontWeight: 700,
    cursor: "pointer",
  } as const;

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <section className="card">
        <span className="eyebrow">Obras</span>
        <h2 style={{ marginTop: 10 }}>Alta rápida de obras</h2>

        <form action={createProject} style={{ display: "grid", gap: 14, marginTop: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <input name="title" placeholder="Título de la obra *" required style={inputStyle} />
            <input name="city" placeholder="Ciudad" style={inputStyle} />
            <input
              name="image"
              placeholder="Ruta de imagen. Ej: /images/obra-1.png"
              style={inputStyle}
            />
            <select name="clientId" defaultValue="" style={inputStyle}>
              <option value="">Sin cliente asociado</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.businessName}
                </option>
              ))}
            </select>
            <textarea
              name="summary"
              placeholder="Resumen visible en la tarjeta *"
              required
              rows={4}
              style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
            />
            <textarea
              name="details"
              placeholder="Detalle técnico o ampliación"
              rows={6}
              style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
            />
          </div>

          <label style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
            <input type="checkbox" name="highlighted" style={{ width: 18, height: 18, accentColor: "#4b83ff" }} />
            Mostrar como destacada en la web
          </label>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="submit" style={buttonPrimary}>Guardar obra</button>
          </div>
        </form>
      </section>

      <section className="card">
        <span className="eyebrow">Base cargada</span>
        <h2 style={{ marginTop: 10 }}>Obras y proyectos existentes</h2>

        <div style={{ display: "grid", gap: 18, marginTop: 18 }}>
          {projects.length === 0 ? (
            <p style={{ color: "var(--muted)", margin: 0 }}>Todavía no hay obras cargadas.</p>
          ) : (
            projects.map((project) => (
              <article
                key={project.id}
                style={{
                  border: "1px solid rgba(255,255,255,.06)",
                  background: "rgba(255,255,255,.02)",
                  borderRadius: 24,
                  padding: 20,
                  display: "grid",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontSize: "1.35rem" }}>{project.title}</h3>
                    <p style={{ margin: 0, color: "var(--muted)" }}>
                      {project.city || "Sin ciudad"} · {project.client?.businessName || "Sin cliente asociado"}
                    </p>
                  </div>

                  <a
                    href={`/proyectos/${project.id}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#dce7ff",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    Ver en la web
                  </a>
                </div>

                <form action={updateProject} style={{ display: "grid", gap: 14 }}>
                  <input type="hidden" name="id" value={project.id} />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 14,
                    }}
                  >
                    <input
                      name="title"
                      defaultValue={project.title}
                      placeholder="Título de la obra *"
                      required
                      style={inputStyle}
                    />
                    <input
                      name="city"
                      defaultValue={project.city || ""}
                      placeholder="Ciudad"
                      style={inputStyle}
                    />
                    <input
                      name="image"
                      defaultValue={project.image || ""}
                      placeholder="Ruta de imagen"
                      style={inputStyle}
                    />
                    <select name="clientId" defaultValue={project.clientId || ""} style={inputStyle}>
                      <option value="">Sin cliente asociado</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.businessName}
                        </option>
                      ))}
                    </select>

                    <textarea
                      name="summary"
                      defaultValue={project.summary}
                      placeholder="Resumen visible en la tarjeta *"
                      required
                      rows={4}
                      style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
                    />
                    <textarea
                      name="details"
                      defaultValue={project.details || ""}
                      placeholder="Detalle técnico"
                      rows={6}
                      style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
                    />
                  </div>

                  <label style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
                    <input
                      type="checkbox"
                      name="highlighted"
                      defaultChecked={project.highlighted}
                      style={{ width: 18, height: 18, accentColor: "#4b83ff" }}
                    />
                    Mostrar como destacada en la web
                  </label>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "space-between" }}>
                    <button type="submit" style={buttonPrimary}>Actualizar obra</button>

                    <button
                      type="submit"
                      formAction={deleteProject}
                      style={buttonDanger}
                    >
                      Eliminar obra
                    </button>
                  </div>
                </form>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
