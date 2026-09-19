import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MessageType, UserRole } from "@prisma/client";

const MAX_MEDIA_BYTES = 8 * 1024 * 1024;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

async function getCustomerId(request: NextRequest, formData?: FormData) {
  const customerId = formData?.get("customerId")?.toString() || request.nextUrl.searchParams.get("customerId");
  if (customerId) return customerId;

  const fullName = formData?.get("fullName")?.toString().trim();
  const phone = formData?.get("phone")?.toString().trim();
  if (!fullName || !phone) return null;

  const customer = await prisma.customer.create({ data: { fullName, phone } });
  return customer.id;
}

export async function GET(request: NextRequest) {
  try {
    const isStaff = request.nextUrl.searchParams.get("staff") === "true";
    const customerId = request.nextUrl.searchParams.get("customerId");

    if (isStaff) {
      const messages = await prisma.message.findMany({
        include: { customer: true, sender: true },
        orderBy: { createdAt: "asc" },
        take: 500,
      });
      return NextResponse.json({ success: true, messages });
    }

    if (!customerId) return jsonError("A customer conversation is required.");

    const messages = await prisma.message.findMany({
      where: { customerId },
      include: { sender: true },
      orderBy: { createdAt: "asc" },
      take: 200,
    });
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    return jsonError("Unable to load messages.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const formData = contentType.includes("multipart/form-data") ? await request.formData() : undefined;
    const body = formData ? null : await request.json();
    const isStaff = (formData?.get("staff")?.toString() || body?.staff) === "true";
    const customerId = await getCustomerId(request, formData);
    const text = formData?.get("text")?.toString().trim() || body?.text?.trim() || null;
    const requestedType = formData?.get("type")?.toString() || body?.type || "TEXT";
    const file = formData?.get("file");

    if (!customerId) return jsonError("Customer details are required.");
    if (!Object.values(MessageType).includes(requestedType as MessageType)) {
      return jsonError("Unsupported message type.");
    }
    if (!text && !(file instanceof File)) return jsonError("Write a message or attach a file.");

    let mediaUrl: string | null = body?.mediaUrl || null;
    let type = requestedType as MessageType;
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_MEDIA_BYTES) return jsonError("Files must be smaller than 8 MB.");
      if (type === "TEXT") type = file.type.startsWith("audio/") ? MessageType.VOICE : MessageType.IMAGE;
      const bytes = Buffer.from(await file.arrayBuffer());
      mediaUrl = `data:${file.type};base64,${bytes.toString("base64")}`;
    }

    let senderId: string | null = null;
    if (isStaff) {
      const role = formData?.get("role")?.toString() || body?.role || "ADMIN";
      const staff = await prisma.user.findFirst({ where: { role: role as UserRole } });
      senderId = staff?.id || null;
    }

    const message = await prisma.message.create({
      data: { customerId, senderId, type, text, mediaUrl },
      include: { customer: true, sender: true },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error(error);
    return jsonError("Unable to send message.", 500);
  }
}
