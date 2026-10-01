import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders";
import { getProduct, formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ color: "#8a8178", fontSize: 13 }}>Order {order.id}</div>
      <h1 style={{ fontSize: 28, letterSpacing: "-0.03em", margin: "6px 0 6px" }}>
        {order.status === "confirmed" ? "Thanks, your order is confirmed." : "Order received."}
      </h1>
      <p style={{ color: "#6d645b", margin: "0 0 24px" }}>
        We will email {order.customerEmail} when it ships.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {order.items.map((item) => {
          const p = getProduct(item.productId);
          return (
            <li key={item.productId} style={{ display: "flex", justifyContent: "space-between", padding: 12, border: "1px solid #e6dfd4", borderRadius: 12, background: "#fffdf9" }}>
              <span>{p?.name ?? item.productId} × {item.quantity}</span>
              <span>{formatPrice((p?.priceCents ?? 0) * item.quantity)}</span>
            </li>
          );
        })}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, marginTop: 20 }}>
        <span>Total</span>
        <strong>{formatPrice(order.totalCents)}</strong>
      </div>
    </main>
  );
}
