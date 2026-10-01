import { NextResponse } from "next/server";
import { createOrder, listOrders, type OrderItem } from "@/lib/orders";

export function GET() {
  return NextResponse.json({ orders: listOrders() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { customerName?: string; customerEmail?: string; items?: OrderItem[] }
    | null;
  if (!body || typeof body.customerName !== "string" || typeof body.customerEmail !== "string" || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "customerName, customerEmail and a non-empty items array are required" }, { status: 400 });
  }
  try {
    const order = createOrder({ customerName: body.customerName, customerEmail: body.customerEmail, items: body.items });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
  }
}
