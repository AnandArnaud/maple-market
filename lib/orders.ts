import { getProduct } from "./products";

// A tiny in-memory order store. No database: everything lives in process memory and resets
// when the dev server restarts, which is all this sample shop needs.

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalCents: number;
  status: "created" | "confirmed" | "cancelled";
  createdAt: string;
  confirmedAt: string | null;
}

const orders = new Map<string, Order>();
let seq = 1000;

export function createOrder(input: { customerName: string; customerEmail: string; items: OrderItem[] }): Order {
  let totalCents = 0;
  for (const item of input.items) {
    const product = getProduct(item.productId);
    if (!product) throw new Error(`unknown product: ${item.productId}`);
    const qty = Number(item.quantity) || 0;
    if (qty <= 0) throw new Error(`quantity must be positive for ${item.productId}`);
    totalCents += product.priceCents * qty;
  }
  seq += 1;
  const order: Order = {
    id: `ord_${seq}`,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    items: input.items,
    totalCents,
    status: "created",
    createdAt: new Date().toISOString(),
    confirmedAt: null,
  };
  orders.set(order.id, order);
  // The shop's most important business event. Right now it only logs.
  console.log(`[orders] Order Created id=${order.id} total=${totalCents}`);
  return order;
}

export function confirmOrder(id: string): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;
  order.status = "confirmed";
  order.confirmedAt = new Date().toISOString();
  orders.set(id, order);
  // Payment captured, order confirmed. Right now it only logs.
  console.log(`[orders] Order Confirmed id=${order.id}`);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function listOrders(): Order[] {
  return [...orders.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
