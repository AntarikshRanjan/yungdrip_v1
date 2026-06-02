# YungDrip

Modern full-stack e-commerce storefront for a clothing brand built with Next.js App Router, Tailwind CSS, Framer Motion, and MongoDB with Mongoose.

## Features

- Premium homepage with animated hero, featured products, and category sections
- Responsive product listing with category filter, sorting, and search
- Product detail pages with thumbnail gallery, size/color selection, and add-to-cart feedback
- Persistent cart powered by React Context and `localStorage`
- User authentication with account pages and order history
- Checkout flow with Razorpay order creation and payment verification
- Order tracking view with payment and delivery status
- MongoDB integration with reusable Mongoose connection handling
- REST APIs for listing, fetching, creating, updating, deleting, and seeding products
- Frontend data loading wired through the API layer instead of direct mock/static product imports

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure MongoDB and Razorpay:

```bash
cp .env.example .env.local
```

Required variables:

- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `NEXT_PUBLIC_STORE_CURRENCY`
- `APP_URL`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `ADMIN_EMAILS`
- `ENABLE_SEED_ROUTE`

3. Seed the database:

```bash
npm run seed
```

4. Start the app:

```bash
npm run dev
```

## API Routes

- `GET /api/products`
- `GET /api/products?category=Hoodies&search=tee`
- `GET /api/products/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/checkout/create-order`
- `POST /api/checkout/verify`
- `POST /api/webhooks/razorpay`
- `GET /api/admin/orders`
- `GET /api/admin/orders/:id`
- `PUT /api/admin/orders/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/seed`

## Notes

- The app now expects a real `MONGODB_URI`; it no longer falls back to in-memory mock data.
- Sample products live in [data/seed-products.json](/Users/antariksh/Desktop/YungDrip/data/seed-products.json).
- The standalone seed script uses the same environment variables as the Next.js app.
- The Razorpay flow uses the official order-first pattern: create an order on the server, open checkout in the browser, then verify the payment signature on the server before marking the order as paid.
- Product write APIs and the seed route are now intended for admin use only.
- Admin access is granted to users whose email appears in `ADMIN_EMAILS`, or whose stored `role` is `admin`.
