# maple-market

Maple Market is a small storefront: browse six products, add them to a cart, check out, and get an
order confirmation. A marketing page lists the catalog for the team that runs the shop's channels.

**Stack:** Next.js 15 (App Router, TypeScript). No database: orders live in process memory.

It is realistic but intentionally small. The marketing page's actions just log to the console today.

## Layout

- `app/` pages: shop (`/`), product (`/products/[id]`), cart and checkout (`/cart`), order
  confirmation (`/orders/[id]`), marketing (`/marketing`)
- `app/api/` routes: `GET /api/products`, `GET|POST /api/orders`, `GET /api/orders/[id]`,
  `POST /api/orders/[id]/confirm`
- `lib/products.ts` the catalog, `lib/orders.ts` the in-memory order store
- `public/images/` product photos (square, 1200 px)
- `brand/` brand guidelines, colours and the logo

## Running it

```bash
npm install
npm run dev   # http://localhost:3000
```
