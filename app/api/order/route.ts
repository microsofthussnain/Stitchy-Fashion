import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const orderSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(5),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),

  numberOfPieces: z.number().min(1),

  coatTypes: z.array(z.string()).min(1),

  specialStyle: z.string().optional(),
  specialRequirements: z.string().optional(),
  deliveryRequirements: z.string().optional(),

  measurements: z.object({
    coatChest: z.string().optional(),
    coatWaist: z.string().optional(),
    coatShoulder: z.string().optional(),
    coatSleeveLength: z.string().optional(),
    coatLength: z.string().optional(),
    coatNeck: z.string().optional(),
    coatBicep: z.string().optional(),
    coatWrist: z.string().optional(),
    coatFrontLength: z.string().optional(),
    coatBackLength: z.string().optional(),
    coatSpecial: z.string().optional(),

    pantWaist: z.string().optional(),
    pantHip: z.string().optional(),
    pantThigh: z.string().optional(),
    pantKnee: z.string().optional(),
    pantBottom: z.string().optional(),
    pantLength: z.string().optional(),
    pantCrotch: z.string().optional(),
    pantSpecial: z.string().optional(),
  }),
});

function createOrderNumber() {
  const time = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `SF-${time}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = orderSchema.parse(body);

    const orderNumber = createOrderNumber();

    const existingCustomer = await prisma.customer.findFirst({
      where: {
        phone: data.phone,
      },
    });

    const customer = existingCustomer
      ? await prisma.customer.update({
          where: {
            id: existingCustomer.id,
          },
          data: {
            fullName: data.fullName,
            whatsapp: data.whatsapp,
            email: data.email || null,
            address: data.address,
          },
        })
      : await prisma.customer.create({
          data: {
            fullName: data.fullName,
            phone: data.phone,
            whatsapp: data.whatsapp,
            email: data.email || null,
            address: data.address,
          },
        });

    const existingCoats = await prisma.coatType.findMany({
      where: {
        name: {
          in: data.coatTypes,
        },
      },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        numberOfPieces: data.numberOfPieces,
        specialStyle: data.specialStyle,
        specialRequirements: data.specialRequirements,
        deliveryRequirements: data.deliveryRequirements,

        measurements: {
          create: data.measurements,
        },

        coatTypes: {
          create: existingCoats.map((coat) => ({
            coatTypeId: coat.id,
          })),
        },
      },
      include: {
        customer: true,
        measurements: true,
        coatTypes: {
          include: {
            coatType: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderNumber,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create order.",
      },
      {
        status: 400,
      }
    );
  }
}