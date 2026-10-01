import { notFound } from "next/navigation";
import { getProduct, formatPrice } from "@/lib/products";
import { AddToCart } from "@/components/add-to-cart";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: 16, border: "1px solid #e6dfd4" }} />
      <section>
        <div style={{ color: "#8a8178", fontSize: 13, textTransform: "capitalize" }}>{product.category}</div>
        <h1 style={{ fontSize: 30, letterSpacing: "-0.03em", margin: "6px 0 10px" }}>{product.name}</h1>
        <div style={{ fontSize: 22, marginBottom: 18 }}>{formatPrice(product.priceCents)}</div>
        <p style={{ color: "#4d453e", lineHeight: 1.6, marginBottom: 28 }}>{product.description}</p>
        <AddToCart productId={product.id} />
      </section>
    </main>
  );
}
