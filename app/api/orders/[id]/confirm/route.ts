import { NextResponse } from "next/server";
import { confirmOrder } from "@/lib/orders";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const order = confirmOrder(id);
  if (!order) return NextResponse.json({ error: "order not found" }, { status: 404 });
  return NextResponse.json({ order });
}
