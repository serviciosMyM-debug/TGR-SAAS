import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui";
import { saveSettingAction } from "@/app/admin/actions";

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="adminPageStack">
      <Card>
        <div className="pageActions">
          <div>
            <span className="eyebrow">Configuración</span>
            <h2>Datos base de la empresa</h2>
          </div>
        </div>

        <div className="entityGrid singleColumn">
          {settings.map((setting) => (
            <form key={setting.id} action={saveSettingAction} className="settingRowCard">
              <input type="hidden" name="key" value={setting.key} />
              <div>
                <strong>{setting.key}</strong>
                <p>Modificar el valor operativo mostrado en la web o el panel.</p>
              </div>
              <input name="value" defaultValue={setting.value} />
              <button className="primaryBtn" type="submit">Guardar</button>
            </form>
          ))}
        </div>
      </Card>
    </div>
  );
}
