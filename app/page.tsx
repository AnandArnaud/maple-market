import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/lib/products";

export default function Home() {
  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 34, letterSpacing: "-0.03em", margin: "0 0 8px" }}>Everyday objects, made to last.</h1>
      <p style={{ color: "#6d645b", margin: "0 0 32px", fontSize: 16 }}>Small-batch goods for the home, the kitchen and the desk.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {PRODUCTS.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <article style={{ background: "#fffdf9", border: "1px solid #e6dfd4", borderRadius: 14, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} style={{ width: "100%", aspectRatio: "1 / 1", display: "block" }} />
              <div style={{ padding: "14px 16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <strong>{p.name}</strong>
                  <span style={{ color: "#6d645b" }}>{formatPrice(p.priceCents)}</span>
                </div>
                <div style={{ color: "#8a8178", fontSize: 13, marginTop: 4, textTransform: "capitalize" }}>{p.category}</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
