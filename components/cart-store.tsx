"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "maple-market.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      // ignore a corrupt cart
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      add: (productId) =>
        setLines((current) => {
          const existing = current.find((l) => l.productId === productId);
          if (existing) return current.map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + 1 } : l));
          return [...current, { productId, quantity: 1 }];
        }),
      remove: (productId) => setLines((current) => current.filter((l) => l.productId !== productId)),
      clear: () => setLines([]),
      count: lines.reduce((n, l) => n + l.quantity, 0),
    }),
    [lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
