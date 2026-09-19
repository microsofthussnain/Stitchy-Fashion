import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  fatherName: z.string().optional(),
  phone: z.string().min(5),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  age: z.string().optional(),
  education: z.string().optional(),
  experience: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const student = await prisma.student.create({
      data: {
        fullName: data.fullName,
        fatherName: data.fatherName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email || null,
        address: data.address,
        age: data.age ? Number(data.age) : null,
        education: data.education,
        experience: data.experience,
        preferredTime: data.preferredTime,
        message: data.message,
      },
    });

    const admission = await prisma.admission.create({
      data: {
        studentId: student.id,
      },
    });

    return NextResponse.json({
      success: true,
      admissionId: admission.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit admission.",
      },
      { status: 400 }
    );
  }
}