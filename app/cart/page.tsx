"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-store";
import { getProduct, formatPrice } from "@/lib/products";

export default function CartPage() {
  const { lines, remove, clear } = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = lines.reduce((sum, l) => sum + (getProduct(l.productId)?.priceCents ?? 0) * l.quantity, 0);

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const created = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ customerName: name, customerEmail: email, items: lines }),
      });
      if (!created.ok) throw new Error((await created.json()).error ?? "could not create the order");
      const { order } = (await created.json()) as { order: { id: string } };
      // Payment is simulated: a created order is confirmed straight away.
      const confirmed = await fetch(`/api/orders/${order.id}/confirm`, { method: "POST" });
      if (!confirmed.ok) throw new Error("could not confirm the order");
      clear();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, letterSpacing: "-0.03em", margin: "0 0 20px" }}>Your cart</h1>
      {lines.length === 0 ? (
        <p style={{ color: "#6d645b" }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 10 }}>
            {lines.map((l) => {
              const p = getProduct(l.productId);
              if (!p) return null;
              return (
                <li key={l.productId} style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #e6dfd4", borderRadius: 12, background: "#fffdf9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" style={{ width: 56, height: 56, borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <strong>{p.name}</strong>
                    <div style={{ color: "#8a8178", fontSize: 13 }}>Qty {l.quantity}</div>
                  </div>
                  <span>{formatPrice(p.priceCents * l.quantity)}</span>
                  <button onClick={() => remove(l.productId)} style={{ border: 0, background: "none", color: "#b5473b", cursor: "pointer" }}>Remove</button>
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, marginBottom: 24 }}>
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <form onSubmit={checkout} style={{ display: "grid", gap: 12 }}>
            <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
            <input required type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
            {error ? <div style={{ color: "#b5473b", fontSize: 14 }}>{error}</div> : null}
            <button disabled={busy} type="submit" style={{ padding: "12px 18px", borderRadius: 10, border: 0, background: "#b5473b", color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
              {busy ? "Placing order…" : "Place order"}
            </button>
          </form>
        </>
      )}
    </main>
  );
}

const input: React.CSSProperties = {
  padding: "11px 12px",
  borderRadius: 10,
  border: "1px solid #e6dfd4",
  background: "#fffdf9",
  fontSize: 15,
};
