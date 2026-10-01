"use client";

import Link from "next/link";
import { useCart } from "./cart-store";

export function CartBadge() {
  const { count } = useCart();
  return (
    <Link href="/cart" style={{ color: "inherit" }}>
      Cart{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
