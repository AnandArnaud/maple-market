"use client";

import { PRODUCTS, formatPrice } from "@/lib/products";

// The marketing team's workbench: one row per product. Today the actions only log; nothing is
// generated or published from here yet.
export default function MarketingPage() {
  function createSocialPost(productId: string) {
    console.log("create_social_post", { productId });
    alert("Not wired up yet.");
  }

  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Marketing</h1>
      <p style={{ color: "#6d645b", margin: "0 0 24px" }}>Product assets for the shop's channels. Brand guidelines live in <code>brand/</code>.</p>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fffdf9", border: "1px solid #e6dfd4", borderRadius: 12, overflow: "hidden" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#8a8178", fontSize: 13 }}>
            <th style={th}>Product</th>
            <th style={th}>Price</th>
            <th style={th}>Category</th>
            <th style={th}></th>
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p) => (
            <tr key={p.id} style={{ borderTop: "1px solid #efe9df" }}>
              <td style={td}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" style={{ width: 44, height: 44, borderRadius: 8 }} />
                  <strong>{p.name}</strong>
                </div>
              </td>
              <td style={td}>{formatPrice(p.priceCents)}</td>
              <td style={{ ...td, textTransform: "capitalize" }}>{p.category}</td>
              <td style={{ ...td, textAlign: "right" }}>
                <button onClick={() => createSocialPost(p.id)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e6dfd4", background: "transparent", cursor: "pointer", fontSize: 13 }}>
                  Create social post
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const th: React.CSSProperties = { padding: "12px 14px", fontWeight: 500 };
const td: React.CSSProperties = { padding: "12px 14px", fontSize: 14 };
