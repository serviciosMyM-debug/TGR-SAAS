import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { Card } from "@/components/ui";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="authPage">
      <Card className="authCard">
        <span className="eyebrow">Acceso interno</span>
        <h1>Ingresar al panel TGR</h1>
        <p className="heroText">Multiusuario con roles, pensado para administración y facturación.</p>

        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", {
              email: String(formData.get("email") || ""),
              password: String(formData.get("password") || ""),
              redirectTo: "/admin",
            });
          }}
        >
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Contraseña" />
          <button type="submit" className="primaryBtn">Ingresar</button>
        </form>
      </Card>
    </main>
  );
}
