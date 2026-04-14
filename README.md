# TGR Servicios Eléctricos - Base SaaS final

Proyecto inicial avanzado para levantar en Vercel + Neon con:

- Next.js 14 App Router
- Prisma ORM
- PostgreSQL (Neon)
- Login multiusuario con roles
- Sitio institucional corporativo
- Panel admin
- Presupuestos
- Facturas
- Balance
- Vista imprimible estilo presupuesto/PDF

## Qué se tomó de los archivos adjuntos

### Portfolio
Se respetó la identidad visual general:
- azul institucional oscuro
- azul eléctrico/acento
- estética técnica y corporativa
- enfoque en obras, tableros, instalaciones y metodología de trabajo

Además se cargaron imágenes reales del portfolio en `public/images/`.

### Excel
Se replicó la lógica central de presupuesto:
- selección por código de ítem
- cantidad x costo unitario = importe
- subtotal
- descuento porcentual
- total
- posibilidad de contemplar ítems por unidad o por tramo (`EVERY_5_METERS`)

También se dejó una muestra del catálogo en:
- `prisma/catalog-sample.json`
- `prisma/seed.ts`

## Credenciales iniciales de seed

Definidas por `.env`:

- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

Si no las cargás, usa:
- admin@tgr.local
- Admin123!

## Levantar el proyecto

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

## Deploy en Vercel

1. Subir el repo a GitHub
2. Importar en Vercel
3. Configurar variables:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_URL`
   - `SEED_ADMIN_EMAIL`
   - `SEED_ADMIN_PASSWORD`
4. Ejecutar `prisma db push` sobre Neon
5. Correr seed localmente o vía script

## Estructura

```text
app/
  page.tsx
  login/page.tsx
  admin/
    page.tsx
    clientes/page.tsx
    presupuestos/page.tsx
    presupuestos/[id]/print/page.tsx
    facturas/page.tsx
    balance/page.tsx
    configuracion/page.tsx
components/
lib/
prisma/
public/images/
```

## Próxima etapa sugerida

- CRUD real con formularios y server actions
- ABM de usuarios y permisos
- emisión real de PDF servidor
- filtros por rango de fechas
- importador Excel automático al catálogo
- reportes exportables
- dashboard por cliente / obra / período
