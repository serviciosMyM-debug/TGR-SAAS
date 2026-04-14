# Notas de implementación

## Factura / presupuesto estilo PDF
La vista `app/admin/presupuestos/[id]/print/page.tsx` está pensada para emular un presupuesto técnico/formal:
- cabecera con datos de TGR
- información del proyecto
- bloque de mano de obra
- tabla de ítems
- subtotal / total
- etapas de ejecución

## Roles
Definidos en Prisma:
- SUPERADMIN
- ADMIN
- FACTURACION
- OPERACIONES
- VISOR

## Lógica base importada del Excel
Del archivo de TGR se observó:
- presupuestos por tipo (domiciliario, grande, al paso)
- lookup por código de ítem
- costo unitario centralizado
- cálculo por cantidad
- fórmulas de subtotal y descuento
- algunos ítems calculados por cada 5 metros

Eso se llevó a:
- `CatalogItem`
- `Quote`
- `QuoteItem`
- `Invoice`
- `FinancialMovement`

## Flujo pensado
1. Se crea presupuesto
2. Se agregan ítems desde catálogo
3. Se calcula subtotal / descuento / total
4. Se aprueba presupuesto
5. Se emite factura
6. La factura y los pagos alimentan el balance
