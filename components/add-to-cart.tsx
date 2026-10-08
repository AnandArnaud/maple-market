"use client";

import { useState } from "react";
import { useCart } from "./cart-store";

export function AddToCart({ productId }: { productId: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        add(productId);
        setAdded(true);
        // The handler logs the action.
        console.log("add_to_cart", { productId });
        setTimeout(() => setAdded(false), 1200);
      }}
      style={{ padding: "12px 18px", borderRadius: 10, border: 0, background: "#b5473b", color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
