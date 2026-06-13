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
- Admin order management with status updates and search
- Admin product catalog management (create, edit, delete)
- Server-side route guard middleware for protected pages
- Password reset flow (forgot / reset)
- Collections landing page with category navigation
- Server-side cart with guest-to-user merge on login
- Transactional emails (welcome, order confirmation, status updates)
- Inventory tracking per size/color variant with oversell prevention
- MongoDB-backed rate limiting on auth and checkout routes
- Origin validation on all mutating API routes
- Razorpay webhook verification endpoint
- REST APIs for products, auth, orders, checkout, admin, and seed

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB_NAME` | Database name |
| `NEXT_PUBLIC_STORE_CURRENCY` | Currency code (e.g. `INR`) |
| `APP_URL` | Full origin URL (e.g. `https://yourdomain.com`) |
| `NEXT_PUBLIC_APP_URL` | Public app URL fallback for origin validation (set on Vercel or similar hosts) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_ID` | Razorpay key ID (server) |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook signing secret |
| `ADMIN_EMAILS` | Comma-separated admin emails |
| `ENABLE_SEED_ROUTE` | Set to `true` only when seeding (`false` otherwise) |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `RESEND_FROM` | From address (e.g. `YungDrip <noreply@yourdomain.com>`) |

3. Seed the database:

```bash
npm run seed
```

4. Start the app:

```bash
npm run dev
```

## API Routes

**Products**
- `GET /api/products` — list with optional `category`, `search`, `sort`, `featured`
- `GET /api/products/:id`
- `POST /api/products` — admin only
- `PUT /api/products/:id` — admin only
- `DELETE /api/products/:id` — admin only
- `POST /api/seed` — admin only, requires `ENABLE_SEED_ROUTE=true`

**Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

**Cart**
- `GET /api/cart` — authenticated user's server cart
- `PUT /api/cart` — replace server cart
- `POST /api/cart` — merge guest cart into server cart on login

**Orders (user)**
- `GET /api/orders`
- `GET /api/orders/:id`

**Checkout**
- `POST /api/checkout/create-order`
- `POST /api/checkout/verify`

**Webhooks**
- `POST /api/webhooks/razorpay`

**Admin**
- `GET /api/admin/orders` — supports `status` and `search` filters
- `GET /api/admin/orders/:id`
- `PUT /api/admin/orders/:id` — update order status

## Security

- Passwords hashed with `scrypt`
- Sessions stored in MongoDB, cookie is `httpOnly`, `sameSite=lax`, `secure` in production
- Rate limiting persisted in MongoDB on login, register, and checkout endpoints
- Origin header validated on all state-changing routes
- Admin routes enforce `role: "admin"` or `ADMIN_EMAILS` match
- Razorpay webhook signature verified with HMAC-SHA256

## Notes

- Sample products live in `data/seed-products.json`
- The Razorpay flow: create order on server → open checkout in browser → verify signature on server → mark paid
- Admin access is granted to users whose email appears in `ADMIN_EMAILS` or whose stored `role` is `admin`
- For production-grade abuse resistance, place a CDN/WAF (Cloudflare, Vercel Edge) in front as an outer layer

## Remaining Work (Production Hardening)

The core storefront features below are implemented. What remains is production-grade polish and ops:

| # | Item | Notes |
|---|------|-------|
| 1 | **Image upload pipeline** | Product images are URL-only. Production needs S3/Cloudinary upload UI instead of pasting URLs. |
| 2 | **Email deliverability** | Resend is wired; add a verified domain in Resend and set SPF/DKIM before production. |
| 3 | **Observability** | Add structured logging, error tracking (Sentry), and uptime monitoring. |
| 4 | **Automated tests** | No E2E or integration test suite yet. Add Playwright/Cypress for checkout and auth flows. |
| 5 | **CI/CD pipeline** | GitHub Actions for lint, build, and deploy previews. |
| 6 | **CDN / WAF** | Cloudflare or Vercel Edge in front for DDoS and bot protection beyond app-level rate limits. |
| 7 | **Legal pages** | Privacy policy, terms of service, refund/return policy pages. |
| 8 | **SEO & analytics** | Open Graph tags, sitemap, robots.txt, and analytics (Plausible/GA4). |
| 9 | **PWA / performance audit** | Lighthouse optimization, image CDN, and optional offline support. |
| 10 | **Multi-currency / i18n** | Currently INR-only with hardcoded tax/shipping rules. |
