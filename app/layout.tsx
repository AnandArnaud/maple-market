import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/components/cart-store";
import { CartBadge } from "@/components/cart-badge";

export const metadata: Metadata = {
  title: "Maple Market",
  description: "Everyday objects, made to last.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif", background: "#faf7f2", color: "#2b2520" }}>
        <CartProvider>
          <header style={{ borderBottom: "1px solid #e6dfd4", background: "#fffdf9" }}>
            <nav style={{ maxWidth: 1040, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, background: "#b5473b", display: "inline-block" }} />
                <strong style={{ letterSpacing: "-0.02em", fontSize: 18 }}>Maple Market</strong>
              </Link>
              <div style={{ marginLeft: "auto", display: "flex", gap: 18, fontSize: 14 }}>
                <Link href="/" style={{ color: "inherit" }}>Shop</Link>
                <Link href="/marketing" style={{ color: "inherit" }}>Marketing</Link>
                <CartBadge />
              </div>
            </nav>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
