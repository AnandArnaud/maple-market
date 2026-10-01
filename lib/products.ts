export interface Product {
  id: string;
  name: string;
  priceCents: number;
  category: "home" | "kitchen" | "stationery" | "apparel";
  description: string;
  /** Served from /public; a square photo on a soft studio background. */
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "cedar-lamp",
    name: "Cedar Desk Lamp",
    priceCents: 8900,
    category: "home",
    description: "A warm-toned desk lamp with a solid cedar base and a linen shade. Dimmable, two-metre braided cord.",
    image: "/images/cedar-lamp.png",
  },
  {
    id: "linen-throw",
    name: "Linen Throw Blanket",
    priceCents: 7400,
    category: "home",
    description: "Stonewashed European linen, 130 by 180 cm. Softens with every wash and keeps its colour.",
    image: "/images/linen-throw.png",
  },
  {
    id: "stoneware-mugs",
    name: "Stoneware Mug Set",
    priceCents: 4800,
    category: "kitchen",
    description: "Four hand-glazed stoneware mugs, 350 ml each. Dishwasher and microwave safe.",
    image: "/images/stoneware-mugs.png",
  },
  {
    id: "field-notebook",
    name: "Field Notebook",
    priceCents: 1800,
    category: "stationery",
    description: "A5 dotted notebook with 192 pages of 100 gsm paper, lay-flat binding and an elastic closure.",
    image: "/images/field-notebook.png",
  },
  {
    id: "wool-beanie",
    name: "Wool Beanie",
    priceCents: 3200,
    category: "apparel",
    description: "Ribbed merino beanie in a deep plum. One size, knitted in a family mill.",
    image: "/images/wool-beanie.png",
  },
  {
    id: "slate-coasters",
    name: "Slate Coaster Set",
    priceCents: 2600,
    category: "kitchen",
    description: "Four natural slate coasters with cork backing. Each piece is cut by hand so no two match.",
    image: "/images/slate-coasters.png",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
