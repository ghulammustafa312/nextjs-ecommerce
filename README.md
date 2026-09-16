# Northline

A Next.js shop that lists products from [DummyJSON](https://dummyjson.com/docs/products). Browse the catalog, search and filter, and keep a cart in the browser. No auth, database, or API keys.

## Stack

- Next.js 16 App Router
- React 19 and React Compiler
- TypeScript
- Tailwind CSS
- TanStack Query (`@tanstack/react-query`)
- Turbopack (`next dev` / `next build`)
- DummyJSON products API (no API keys)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run lint
npm run build
npm start
```

## How the app is structured

Work through these files in order. Each step is a real Next.js concept, not a toy example.

### 1. App Router file conventions

Start in [`src/app/layout.tsx`](src/app/layout.tsx). This file wraps every page: fonts (`next/font`), site metadata, the header, the footer, and `QueryProvider`.

Then open:

- [`src/app/page.tsx`](src/app/page.tsx) → `/`
- [`src/app/products/page.tsx`](src/app/products/page.tsx) → `/products`
- [`src/app/products/[id]/page.tsx`](src/app/products/[id]/page.tsx) → `/products/1`
- [`src/app/cart/page.tsx`](src/app/cart/page.tsx) → `/cart`

Folders under `src/app` **are** the routes. You do not register them in a router config.

### 2. TanStack Query fetches and caches data

[`src/queries/provider.tsx`](src/queries/provider.tsx) creates one `QueryClient` for the whole app.

Hooks live in [`src/queries/`](src/queries/):

- `useProducts` / `useProduct` / `useCategories` call DummyJSON through [`src/lib/products.ts`](src/lib/products.ts)
- `useCart` holds the cart in the same cache

Types stay in [`src/types/`](src/types/) (`product.ts`, `cart.ts`, `query.ts`) so fetch helpers and hooks do not define their own shapes.

The query key includes the filters (`q`, `category`, `page`). Change the URL, get a new request. Go back to an earlier URL within a minute, and React Query reuses the cached JSON instead of fetching again.

Do not copy this into a `useEffect` + `useState` pair. `useQuery` already handles loading, errors, and caching.

### 3. URL state with `searchParams`

[`src/app/products/page.tsx`](src/app/products/page.tsx) reads `q`, `category`, and `page` from the URL, then passes them into the client `ProductList`.

[`src/components/SearchForm.tsx`](src/components/SearchForm.tsx) is a normal HTML GET form. Submit it and the address bar becomes `/products?q=phone`. Those values become the React Query key.

Category chips and pagination are `<Link>`s that keep those query params in sync.

In Next.js 15+, `searchParams` is a Promise. The page `await`s it.

### 4. Dynamic routes

[`src/app/products/[id]/page.tsx`](src/app/products/[id]/page.tsx) shows `[id]` as a dynamic segment. `params` is also a Promise. It passes `id` into [`src/components/ProductDetail.tsx`](src/components/ProductDetail.tsx), which loads the product with `useProduct`.

If DummyJSON has no product, the client calls `notFound()`. That renders [`src/app/products/[id]/not-found.tsx`](src/app/products/[id]/not-found.tsx).

### 5. Proxy (formerly middleware)

[`src/proxy.ts`](src/proxy.ts) runs on every matched request **before** the page. In Next.js 16 the file is `proxy.ts`, not `middleware.ts`.

It does two store-related things:

- Redirects `/shop` to `/products` (and `/shop/1` to `/products/1`)
- Adds an `x-northline-path` response header with the requested path

The `matcher` skips static assets so images and `/_next` files are not intercepted.

### 6. Images and fonts

Product photos use `next/image`, not `<img>`. Remote hosts must be allowed in [`next.config.ts`](next.config.ts) (`cdn.dummyjson.com`).

Fonts load through `next/font` in the root layout so the files are self-hosted and layout shift stays low.

### 7. Loading, error, and not-found UI

| File | When it appears |
| --- | --- |
| [`src/components/ProductList.tsx`](src/components/ProductList.tsx) (`!data`) | While React Query loads the list |
| [`src/components/ProductDetail.tsx`](src/components/ProductDetail.tsx) (`!isFetched`) | While React Query loads one product |
| [`src/app/error.tsx`](src/app/error.tsx) | If rendering throws |
| [`src/app/not-found.tsx`](src/app/not-found.tsx) | Unknown routes such as `/does-not-exist` |

`error.tsx` must be a Client Component because it uses an event handler (`reset`).

### 8. Global cart state

`useCart` in [`src/queries/use-cart.ts`](src/queries/use-cart.ts) is the cart. [`src/lib/cart.ts`](src/lib/cart.ts) only writes `localStorage` so a refresh does not empty it.

These UI files all call the same hook:

- [`src/components/AddToCartButton.tsx`](src/components/AddToCartButton.tsx)
- [`src/components/CartCount.tsx`](src/components/CartCount.tsx)
- [`src/components/CartView.tsx`](src/components/CartView.tsx)

Add a product and the header count updates immediately, because both read `queryKeys.cart`.

## File map

```text
src/
  proxy.ts                     # request proxy (Next.js 16 name for middleware)
  app/                         # routes, layouts, error pages
  components/                  # UI only
  queries/                     # React Query provider, keys, hooks
  types/                       # Product, cart, and query types
  lib/
    products.ts                # DummyJSON fetch functions
    cart.ts                    # localStorage persist helpers
    format.ts                  # prices, category labels, query URLs
```

## Common mistakes

- Putting `useQuery` in a Server Component. It needs `"use client"` (see `ProductList` and `src/queries`).
- Fetching DummyJSON in a `useEffect` instead of `useQuery`.
- Using a new query key object every render. Build keys from the URL filters, as in `queryKeys.products(filters)`.
- Using `<img>` instead of `next/image`.
- Forgetting `await params` or `await searchParams`.
- Creating `app/api/.../route.ts` for this shop. Search is a GET form; the cart is React Query + localStorage.

## Run with Docker

```bash
docker build -t northline .
docker run --rm -p 3000:3000 northline
```

Open [http://localhost:3000](http://localhost:3000). The Dockerfile installs dependencies, runs `npm run build`, then starts the app with `npm start`.

## Deploy on Vercel

This app has no environment variables.

### GitHub

1. Create a GitHub repository and push this project.
2. Open [vercel.com/new](https://vercel.com/new) and import the repo.
3. Leave the Framework Preset as **Next.js**.
4. Click **Deploy**.
5. Check `/`, `/products`, a product URL such as `/products/1`, `/products/99999` (not found), and `/cart`.

### CLI (optional)

```bash
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production
```

The first `vercel` command asks you to link a Vercel project. After that, each production deploy is `vercel --prod`.
