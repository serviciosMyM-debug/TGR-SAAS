import { PrismaClient, BudgetType, CatalogUnitType, UserRole, InvoiceStatus, MovementType, PaymentMethod } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@tgr.local";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Administrador TGR",
      email,
      passwordHash,
      role: UserRole.SUPERADMIN
    }
  });

  const client = await prisma.client.upsert({
    where: { id: "seed-client-tgr" },
    update: {},
    create: {
      id: "seed-client-tgr",
      businessName: "Federico - Obra Funes",
      contactName: "Federico",
      phone: "03476-15693368",
      city: "Funes",
      address: "Vivienda unifamiliar en construcción",
      notes: "Cliente de ejemplo para demostración."
    }
  });

  const items = [
  {
    "code": "M1",
    "title": "Tablero Pilar Mono  -  4 Modulos (Id + Tm )",
    "description": "TABLERO PILAR MONO  -  4 MODULOS (ID + TM )",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 140000.0,
    "sortOrder": 1
  },
  {
    "code": "M2",
    "title": "Tablero Pilar Mono  Amurado + Conexión",
    "description": "TABLERO PILAR MONO  AMURADO + CONEXIÓN",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 80000.0,
    "sortOrder": 2
  },
  {
    "code": "M3",
    "title": "Tablero Mono - Hasta 8 Polos",
    "description": "TABLERO MONO - HASTA 8 POLOS",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 125000.0,
    "sortOrder": 3
  },
  {
    "code": "M4",
    "title": "Tablero Mono  - Hasta 12 Polos",
    "description": "TABLERO MONO  - HASTA 12 POLOS",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 175000.0,
    "sortOrder": 4
  },
  {
    "code": "M5",
    "title": "Tablero Mono - Hasta 16 Polos",
    "description": "TABLERO MONO - HASTA 16 POLOS",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 190000.0,
    "sortOrder": 5
  },
  {
    "code": "M6",
    "title": "Tablero Mono - Hasta 20 Polos",
    "description": "TABLERO MONO - HASTA 20 POLOS",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 260000.0,
    "sortOrder": 6
  },
  {
    "code": "M7",
    "title": "Tablero Mono - Hasta 24 Polos",
    "description": "TABLERO MONO - HASTA 24 POLOS",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 300000.0,
    "sortOrder": 7
  },
  {
    "code": "M8",
    "title": "Tablero Mono  - Hasta 36 Polos",
    "description": "TABLERO MONO  - HASTA 36 POLOS",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 360000.0,
    "sortOrder": 8
  },
  {
    "code": "M16",
    "title": "Tablero Para Tanque Cisterna",
    "description": "TABLERO PARA TANQUE CISTERNA",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 180000.0,
    "sortOrder": 9
  },
  {
    "code": "M17",
    "title": "Tablero Para Iluminacion Perimetral",
    "description": "TABLERO PARA ILUMINACION PERIMETRAL",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 260000.0,
    "sortOrder": 10
  },
  {
    "code": "M18",
    "title": "Tablero P- Automat. De Pileta",
    "description": "TABLERO P- AUTOMAT. DE PILETA",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 45000.0,
    "sortOrder": 11
  },
  {
    "code": "M64",
    "title": "Agregado/Cambio De Disyuntor",
    "description": "AGREGADO/CAMBIO DE DISYUNTOR",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 55000.0,
    "sortOrder": 12
  },
  {
    "code": "M65",
    "title": "Agregado/Cambio De Tm ",
    "description": "AGREGADO/CAMBIO DE TM ",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 49000.0,
    "sortOrder": 13
  },
  {
    "code": "M66",
    "title": "Agregado De Cofimetro ",
    "description": "AGREGADO DE COFIMETRO ",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 69000.0,
    "sortOrder": 14
  },
  {
    "code": "M67",
    "title": "Agregado De Reloj Anal.",
    "description": "AGREGADO DE RELOJ ANAL.",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 32000.0,
    "sortOrder": 15
  },
  {
    "code": "M68",
    "title": "Agregado De Protección Contra Sobretension",
    "description": "AGREGADO DE PROTECCIÓN CONTRA SOBRETENSION",
    "budgetType": "DOMICILIARIO",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 110000.0,
    "sortOrder": 16
  },
  {
    "code": "T1",
    "title": "Tablero Pilar Tri- Id + Tm ",
    "description": "TABLERO PILAR TRI- ID + TM ",
    "budgetType": "INDUSTRIAL",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 260000.0,
    "sortOrder": 17
  },
  {
    "code": "T2",
    "title": "Tablero Para Pilar - Mccb Tipo Nsx ",
    "description": "TABLERO PARA PILAR - MCCB TIPO NSX ",
    "budgetType": "INDUSTRIAL",
    "category": "Tableros y protecciones",
    "unitType": "UNIT",
    "unitLabel": "u",
    "basePrice": 490000.0,
    "sortOrder": 18
  }
];

  for (const item of items) {
    await prisma.catalogItem.upsert({
      where: { code: item.code },
      update: item,
      create: item
    });
  }

  await prisma.project.createMany({
    data: [
      {
        title: "Vivienda en San Lorenzo",
        city: "San Lorenzo",
        summary: "Instalación desde su inicio con cocina, living-comedor integrado, dormitorios y lavadero.",
        image: "/images/project-1.png",
        highlighted: true
      },
      {
        title: "Vivienda en Tierra de Sueño PSM",
        city: "Puerto General San Martín",
        summary: "Instalación integral en vivienda de 120 m² con 3 dormitorios, 2 baños y lavadero.",
        image: "/images/project-2.png",
        highlighted: true
      },
      {
        title: "Proyecto de obra en San Lorenzo",
        city: "San Lorenzo",
        summary: "Inicio de obra con tablero provisorio y distribución trifásica / derivación monofásica.",
        image: "/images/project-3.png",
        highlighted: false
      }
    ],
    skipDuplicates: true
  });

  const quote = await prisma.quote.upsert({
    where: { number: 140426 },
    update: {},
    create: {
      number: 140426,
      budgetType: BudgetType.DOMICILIARIO,
      title: "Presupuesto de instalación domiciliaria desde 0",
      projectDescription: "Vivienda unifamiliar en construcción. Superficie aproximada de 250m2 en planta baja y 180m2 en planta alta.",
      contactName: "Federico",
      address: "Funes",
      observations: "Plantilla basada en el formato de presupuesto PDF del cliente.",
      laborDescription: "La instalación contempla circuitos de iluminación interna y externa, tomas generales, tomas especiales y automatización para tanque cisterna o bomba.",
      executionStages: "Etapa 1: marcado, canaleado y montaje de tableros. Etapa 2: montaje de cajas distribuidoras y colocación de cañerías. Etapa 3: cableado, conexionado de tableros y apliques. Etapa 4: instalación de iluminación en cielo raso.",
      discountPercent: 0,
      subtotal: 520000,
      total: 520000,
      status: "APPROVED",
      clientId: client.id,
      createdById: admin.id,
      items: {
        create: [
          {
            itemCode: "M1",
            title: "Tablero pilar mono - 4 módulos",
            quantity: 1,
            unitPrice: 140000,
            lineTotal: 140000,
            unitType: CatalogUnitType.UNIT
          },
          {
            itemCode: "M16",
            title: "Tablero para tanque cisterna",
            quantity: 1,
            unitPrice: 180000,
            lineTotal: 180000,
            unitType: CatalogUnitType.UNIT
          },
          {
            itemCode: "M64",
            title: "Agregado/cambio de disyuntor",
            quantity: 4,
            unitPrice: 50000,
            lineTotal: 200000,
            unitType: CatalogUnitType.UNIT
          }
        ]
      }
    }
  });

  const invoice = await prisma.invoice.create({
    data: {
      title: "Factura / comprobante interno de obra",
      issueDate: new Date(),
      dueDate: new Date(),
      status: InvoiceStatus.PAID,
      subtotal: 520000,
      total: 520000,
      amountPaid: 520000,
      paymentMethod: PaymentMethod.TRANSFER,
      clientId: client.id,
      quoteId: quote.id,
      issuedById: admin.id,
      items: {
        create: [
          { description: "Instalación domiciliaria desde 0 - mano de obra", quantity: 1, unitPrice: 520000, lineTotal: 520000 }
        ]
      },
      payments: {
        create: [
          { amount: 520000, paymentMethod: PaymentMethod.TRANSFER, reference: "PAGO-INICIAL-TGR" }
        ]
      }
    }
  });

  await prisma.financialMovement.createMany({
    data: [
      {
        type: MovementType.INCOME,
        title: "Cobro de obra Funes",
        description: "Movimiento generado por factura emitida",
        amount: 520000,
        paymentMethod: PaymentMethod.TRANSFER,
        clientId: client.id,
        invoiceId: invoice.id
      },
      {
        type: MovementType.EXPENSE,
        title: "Compra de materiales",
        description: "Gasto de ejemplo para tablero y protección",
        amount: 160000,
        paymentMethod: PaymentMethod.TRANSFER,
        categoryLabel: "Materiales"
      }
    ]
  });

  await prisma.setting.createMany({
    data: [
      { key: "company_name", value: "TGR Servicios Eléctricos" },
      { key: "company_phone", value: "03476-15693368" },
      { key: "company_email", value: "tgrelectricidad@gmail.com" },
      { key: "company_site", value: "www.tgr-electricidad.com" }
    ],
    skipDuplicates: true
  });

  console.log("Seed completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
