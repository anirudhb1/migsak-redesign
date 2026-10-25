# Migsak Redesign - Software Developer Intern Assignment

A modern, accessible, mobile-first redesign of the [Migsak](https://migsak.com) company homepage and customer enquiry pipeline.

Built strictly according to real business facts and specifications, with zero fabricated data, clean semantic HTML, WCAG AA compliance, and a secure server-only backend.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Database:** Supabase Postgres (accessed server-side only via Service Role Key)
- **Authentication:** `jose` (JWT encrypted session cookies with timing-safe password verification)
- **Deployment Target:** Vercel

---

## 📁 Project Structure

```text
migsak-redesign/
├── .env.example              # Sample environment variable definitions
├── schema.sql                # Supabase database schema & RLS setup
├── package.json              # Project dependencies and scripts
├── src/
│   ├── app/
│   │   ├── admin/            # Password-protected admin area
│   │   │   ├── enquiries/    # View customer enquiries table (IST timestamps)
│   │   │   └── login/        # Admin login page
│   │   ├── api/
│   │   │   ├── admin/        # Admin auth endpoints (login/logout)
│   │   │   └── enquiries/    # Server-side validation, rate limiting & Supabase insert
│   │   ├── globals.css       # Global styles and Tailwind configuration
│   │   ├── layout.tsx        # Root HTML layout with SEO metadata & fonts
│   │   └── page.tsx          # Homepage with all redesign sections
│   ├── components/           # Reusable, semantic UI components
│   │   ├── Header.tsx        # Sticky header with text wordmark and CTA
│   │   ├── Hero.tsx          # Hero section with primary & secondary CTAs
│   │   ├── WhatWeBuild.tsx   # 3 service cards with individual anchors
│   │   ├── SelectedWork.tsx  # Case studies (Recurva, Prathik Softnet, QuietPass)
│   │   ├── Process.tsx       # 4-step process (Scope, Build, Launch, Support)
│   │   ├── Commitments.tsx   # Client commitments
│   │   ├── Faq.tsx           # Plain-English FAQ (budget, timeline, ownership, support)
│   │   ├── EnquiryForm.tsx   # Accessible contact form with validation states
│   │   └── Footer.tsx        # Semantic footer with official links & contact details
│   ├── lib/                  # Server-side helpers & types
│   │   ├── auth.ts           # Timing-safe password comparison & JWT session management
│   │   ├── rate-limit.ts     # In-memory IP rate limiter
│   │   ├── supabase.ts       # Server-only Supabase client instance
│   │   └── types.ts          # Shared TypeScript interfaces & types
│   └── middleware.ts         # Edge middleware protecting `/admin/*` routes
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18.0 or later (Node 20+ recommended)
- An active [Supabase](https://supabase.com) account (free tier)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`:
```env
# Supabase project URL and Service Role Key (SERVER-SIDE ONLY)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Dashboard
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=a_long_random_string_at_least_32_characters_long
```

> **Security Note:** `SUPABASE_SERVICE_ROLE_KEY` is kept strictly on the server and is never prefixed with `NEXT_PUBLIC_`. The browser never has direct access to the database.

### 4. Database Setup
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Paste and run the contents of [`schema.sql`](./schema.sql):
   - Creates the `enquiries` table with appropriate fields and data types.
   - Enables **Row Level Security (RLS)**.
   - Intentionally creates **NO public policies**, ensuring public anonymous clients cannot query or modify any records.

### 5. Running Locally
Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security Architecture

1. **Zero Client-Side DB Access:** The Supabase client is instantiated strictly on the server in route handlers. No database credentials are leaked to the browser.
2. **Strict RLS:** The Supabase `enquiries` table has RLS enabled with zero public access policies. Only requests bearing the `SERVICE_ROLE_KEY` (sent from the server) can read or insert records.
3. **Double Validation:** All enquiry submissions are validated on the client for instant UI feedback and on the server using length limits and regex pattern verification.
4. **Spam Protection:** An invisible honeypot field catches automated bots without bothering real users.
5. **Rate Limiting:** IP-based request throttling limits spam and abuse.
6. **Timing-Safe Admin Auth:** The admin password check uses Node's `crypto.timingSafeEqual` to eliminate timing attacks. Authenticated sessions are stored in an encrypted, `httpOnly`, `sameSite=strict` cookie.
7. **Two-Tier Route Protection:** Admin pages are guarded both by Next.js Edge `middleware.ts` and server-side session checks in the page component.

---

## 📜 Available Scripts

- `npm run dev` – Starts the local development server.
- `npm run build` – Builds the production bundle.
- `npm run start` – Runs the built production server.
- `npm run lint` – Runs ESLint code quality checks.
