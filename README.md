# Migsak Redesign

A modern, accessible, high-performance, mobile-first redesign of the [Migsak](https://migsak.com) company homepage and customer enquiry pipeline.

Built strictly according to verified business facts with zero fabricated data, clean semantic HTML, WCAG AA compliance, a modern dark SaaS visual layer with subtle micro-animations, a universal shared validation engine, custom branded metadata icons, and a secure server-only backend.

---

## Tech Stack

- **Framework:** Next.js 16.4 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4 with `@tailwindcss/turbopack`)
- **Animation:** Vanilla CSS transforms, SVG stroke animations, and GPU-accelerated micro-animations via lightweight `IntersectionObserver`
- **Validation Engine:** Universal shared validation module (`src/lib/validation.ts`) with Unicode property escapes (`\p{L}`, `\p{M}`), dynamic `Intl.DisplayNames`, and ITU-T E.164 phone normalization
- **Database:** Supabase Postgres (accessed server-side only via Service Role Key with strict `CHECK` constraints and Row Level Security)
- **Authentication:** `jose` (JWT encrypted session cookies with timing-safe password verification)
- **Edge Guard:** Next.js 16 Route Proxy (`src/proxy.ts`)
- **Deployment Target:** Vercel

---

## Project Structure

```text
migsak-redesign/
├── .env.example              # Sample environment variable definitions
├── schema.sql                # Supabase database schema, CHECK constraints and RLS setup
├── package.json              # Project dependencies and scripts
├── next.config.ts            # Next.js configuration (allowedDevOrigins, Turbopack)
├── scripts/
│   └── test-validation.ts    # Automated test suite covering all validation rules
├── src/
│   ├── app/
│   │   ├── admin/            # Password-protected admin area
│   │   │   ├── enquiries/    # Customer enquiries table (with Country, E.164 phone, IST timestamps)
│   │   │   └── login/        # Admin login page (with Suspense boundary)
│   │   ├── api/
│   │   │   ├── admin/        # Admin auth endpoints
│   │   │   │   ├── login/    # Timing-safe password comparison & JWT session cookie issue
│   │   │   │   └── logout/   # Cookie removal endpoint
│   │   │   └── enquiries/    # 20KB cap, server validation, rate limiting & Supabase insert
│   │   ├── apple-icon.png    # 180x180 Apple touch icon (Next.js App Router convention)
│   │   ├── favicon.ico       # 32x32 brand favicon for legacy browsers
│   │   ├── globals.css       # Global styles, Tailwind imports, and micro-animation keyframes
│   │   ├── icon.svg          # 64x64 SVG vector icon with dark navy tile & indigo-violet accent
│   │   ├── layout.tsx        # Root layout with SEO metadata, viewport themeColor & Geist fonts
│   │   └── page.tsx          # Homepage rendering all redesign sections in order
│   ├── components/           # Reusable, semantic UI components
│   │   ├── AdminLogoutButton.tsx # Client component for admin sign-out
│   │   ├── Commitments.tsx   # Accountability standards (What You Can Hold Us To)
│   │   ├── EnquiryForm.tsx   # Accessible contact form with live word counter & country picker
│   │   ├── ExecutionPathway.tsx # Interactive route card with 4-stop pathway & integrations marquee
│   │   ├── Faq.tsx           # Plain-English FAQ (budget, timeline, ownership, support)
│   │   ├── Footer.tsx        # Semantic footer with official links & contact details
│   │   ├── Header.tsx        # Sticky header with text wordmark and mobile nav
│   │   ├── Hero.tsx          # Hero section with single H1, CTA buttons, and Execution Pathway
│   │   ├── MagneticButton.tsx # Smooth cursor-following CTA wrapper
│   │   ├── Marquee.tsx       # Infinite scrolling integration ticker
│   │   ├── Process.tsx       # 4-step process (Scope, Build in phases, Launch, Support)
│   │   ├── Reveal.tsx        # Accessible scroll-reveal animation wrapper (prefers-reduced-motion)
│   │   ├── SelectedWork.tsx  # Case studies (Recurva, Prathik Softnet, QuietPass)
│   │   ├── TiltCard.tsx      # 3D interactive tilt card component
│   │   └── WhatWeBuild.tsx   # 3 service cards with individual anchor IDs & architecture previews
│   ├── lib/                  # Shared helpers and types
│   │   ├── auth.ts           # Timing-safe password comparison & JWT session management
│   │   ├── hooks.ts          # Custom React hooks (inView, reducedMotion, canHover)
│   │   ├── rate-limit.ts     # In-memory IP rate limiter (sliding window)
│   │   ├── supabase.ts       # Server-only Supabase client instance
│   │   ├── types.ts          # Shared TypeScript interfaces & types
│   │   └── validation.ts     # Single source of truth validator (client form & server API)
│   └── proxy.ts              # Next.js 16 route proxy protecting `/admin/*` routes
```

---

## Visual Design and Micro-Animations

- **Dark SaaS Aesthetics:** Deep navy background (`#070b1a` to `#0b1020`) layered with subtle indigo and violet radial ambient glows built using pure CSS gradients without heavy images.
- **Typography and Hierarchy:** Tight tracking with white-to-slate gradient text (`bg-clip-text`), paired with pill badges and accent dividers.
- **Micro-Animations (`Reveal.tsx`):**
  - Smooth animations running strictly on `transform` and `opacity` (200-600ms duration with `cubic-bezier(0.22, 1, 0.36, 1)` easing).
  - Built using standard `IntersectionObserver` without external animation libraries.
  - **Full Accessibility:** Automatically detects and respects `prefers-reduced-motion: reduce`, displaying content in its final state immediately.
  - **Zero Layout Shift:** Content renders visible by default if JavaScript is disabled or delayed.
- **Interactive Components:**
  - **Execution Pathway:** 4-stage interactive roadmap card with glowing route lines, moving light comet, active stage inspection, and dual-row drifting integrations marquee (pauses on hover or focus).
  - **TiltCard:** Subtle 3D perspective tilt and spotlight sheen on fine-pointer devices, with gentle static fallbacks for touchscreens.
  - **MagneticButton:** Spring-damped cursor attraction on interactive CTA triggers.

---

## Form Validation and UX Architecture

Both the client-side `<EnquiryForm>` and the server-side `/api/enquiries` route share the identical validation module ([`src/lib/validation.ts`](./src/lib/validation.ts)), guaranteeing rules never drift apart:

1. **Name Field:**
   - Requires 2 to 80 characters after trimming.
   - Unicode letter support using `\p{L}` and `\p{M}` (handles names across languages, e.g. "Zoë O'Neil-Smith").
   - Allows only letters, spaces, hyphens, apostrophes, and full stops. Rejects digits and arbitrary symbols. Automatically collapses repeated whitespace.
2. **Email Field and Typo Detection:**
   - Trims and lowercases input, capped at 254 characters with strict RFC structure validation (single `@`, valid domain label with dot, no spaces, no consecutive dots).
   - Detects common domain typos (`gmial.com`, `gmai.com`, `yahooo.com`, `hotmial.com`, etc.) and displays a friendly one-click correction suggestion. Does not make unverified claims.
3. **Country and International Phone:**
   - Built dynamically using `Intl.DisplayNames` and international calling codes covering 240+ countries and territories with country names and dial codes (e.g. `India (+91)`), defaulting to India.
   - Strips formatting characters (spaces, dashes, parentheses) while typing. Validates national numbering plans and converts numbers into international **ITU-T E.164** format (e.g. `+919876543210`, `+12025550123`).
   - Standard input attributes: `type="tel"`, `inputMode="tel"`, `autoComplete="tel-national"`.
4. **Service and Budget:**
   - `service`: Strictly 1 of 4 allowed values (`Website or web app`, `Mobile app`, `Automation or integration`, `Not sure yet`). Server rejects anything else with HTTP 400.
   - `budget`: Optional; validated against permitted tier options if supplied.
5. **Message and Live Word Counter:**
   - Enforces a minimum of 10 characters, maximum of 1,000 words (whitespace tokenization), and a hard cap of 8,000 characters.
   - Live visual counter (`X / 1000 words`) turns amber at 90% (>= 900 words / 7,200 chars) and red when over limit. Never silently truncates user input.
6. **Mobile UX and Accessibility:**
   - Mobile-first layout: 1-column on mobile viewports, 2-column grid on screens >= 640px.
   - Form inputs use a minimum 16px font size (`text-[16px] sm:text-sm`) to prevent iOS Safari auto-zoom on focus.
   - All interactive touch targets are at least 44px in height. Textarea resizes vertically only.
   - Tested for zero horizontal overflow across 320px, 360px, 390px, and 768px viewports.
   - Accessible error handling with `aria-invalid`, `aria-describedby`, and `role="alert"`. Automatically moves focus to the first invalid field upon failed submission.
7. **Server Security:**
   - Re-validates all fields server-side with `validateEnquiry()` and returns structured `400 Bad Request` with field-by-field error objects.
   - Rejects request payloads larger than 20KB with `413 Payload Too Large`.
   - Strips HTML tags from inputs and protects against timing side channels.

---

## Content and Business Alignment

All homepage copy strictly adheres to verified business facts with zero fabricated metrics, testimonials, or ratings:

- **Company:** Migsak, based in Bengaluru, Karnataka, India.
- **Contact:** `contact@migsak.com` (reply to every message within one working day).
- **Core Headline:** *"Web and mobile apps, connected to the way your business runs."*
- **Positioning:** Design and build websites, mobile apps, and the backend behind them; connect them to payments, WhatsApp, customer tracking (CRM), and enterprise systems (ERP). One team from first screen to production.
- **Budget Policy:** *"Any budget. We can start with a single feature and grow from there."*
- **Pricing:** Fixed quote provided after the first scoping call. Any subsequent scope change is quoted in writing before starting work.
- **Services (3 Anchored Cards):**
  1. `service-web`: Websites and web apps ("Company websites, dashboards and portals, built to load fast and be found on search.")
  2. `service-mobile`: Mobile apps ("iOS and Android apps for customers, field teams and members, built cross-platform and shipped to both stores.")
  3. `service-automation`: Automation and integrations ("WhatsApp flows, AI assistants and links to Razorpay, Stripe, Zoho, Tally and ERPNext, so work stops moving by copy and paste.")
- **Selected Work (3 Real Case Studies):**
  1. **Recurva:** Retention platform for service businesses like gyms and fitness studios. Features include owner, staff and member portals in one app; at-risk member tracking with one-tap WhatsApp follow-ups; and in-app renewals through Razorpay and biometric attendance. Stack: Flutter, Node.js, PostgreSQL. Links to `https://recurva.in`.
  2. **Prathik Softnet:** Enterprise IT hardware solutions partner in Bengaluru and Delhi. Over 20 pages covering solutions, industries, products, and case studies; search setup with page titles, descriptions, local business data, and a sitemap; and a clear path to request a quote or call the sales team from every page. Stack: React, Tailwind CSS, Vercel. Links to `https://www.prathiksoftnet.com`.
  3. **QuietPass:** Privacy-first household coordination application. Features include live status for everyone at home with duration tracking; room reservations preventing double booking; and anonymous nudges delivered as push notifications. Stack: Flutter, FastAPI, PostgreSQL, Redis, Firebase, Google Cloud Run. Labeled "In progress".
- **How a Project Runs (4 Steps):**
  1. Scope ("We map the users, screens and integrations, and you get a written scope and a fixed quote sized to your budget.")
  2. Build in phases ("Short cycles, each ending in something you can click through.")
  3. Launch ("Store submission, hosting, monitoring and a handover your team can follow.")
  4. Support ("An optional monthly plan for fixes, updates and new features.")
  - Subtitle: "From first call to live product."
- **Commitments (What You Can Hold Us To):**
  - "Reply to every message within one working day" (One-day response time)
  - "A working demo every two weeks" (Fortnightly working demos)
  - "Code, designs and accounts owned by you from day one" (100% intellectual property ownership)
  - "Any scope change quoted in writing before starting" (Zero unexpected costs)
  - Subtitle: "Clear standards we promise in writing for every single client engagement."

---

## Getting Started

### 1. Prerequisites

- Node.js 18.18.0 or later (Node 20+ or Node 24 recommended)
- An active [Supabase](https://supabase.com) account (free tier)

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Variables

Create `.env.local` in the project root:

```env
# Supabase project URL and Service Role Key (SERVER-SIDE ONLY)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Dashboard
ADMIN_PASSWORD=your_secure_password
# Cryptographic secret for signing JWT session cookies (at least 32 characters)
SESSION_SECRET=a_long_random_string_at_least_32_characters_long
```

> **Security Note:** `SUPABASE_SERVICE_ROLE_KEY` is kept strictly on the server and is never prefixed with `NEXT_PUBLIC_`. The browser never has direct access to database credentials. `.env.local` is excluded in `.gitignore`.

### 4. Database Setup and Migrations

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Paste and run the contents of [`schema.sql`](./schema.sql):
   - Creates the `enquiries` table with `country VARCHAR(10) NOT NULL DEFAULT 'IN'` and `phone VARCHAR(50)`.
   - Applies `CHECK` constraints on length limits (`name <= 80`, `email <= 254`, `message <= 8000`) and allowed service values.
   - Enables **Row Level Security (RLS)** with zero public policies (service-role only).

#### SQL Migration Script for Existing Tables:

```sql
ALTER TABLE enquiries 
ADD COLUMN IF NOT EXISTS country VARCHAR(10) NOT NULL DEFAULT 'IN';

ALTER TABLE enquiries 
DROP CONSTRAINT IF EXISTS enquiries_name_len,
ADD CONSTRAINT enquiries_name_len CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 80);

ALTER TABLE enquiries 
DROP CONSTRAINT IF EXISTS enquiries_email_len,
ADD CONSTRAINT enquiries_email_len CHECK (char_length(email) <= 254);

ALTER TABLE enquiries 
DROP CONSTRAINT IF EXISTS enquiries_message_len,
ADD CONSTRAINT enquiries_message_len CHECK (char_length(trim(message)) >= 10 AND char_length(message) <= 8000);

ALTER TABLE enquiries 
DROP CONSTRAINT IF EXISTS enquiries_service_check,
ADD CONSTRAINT enquiries_service_check CHECK (
  service IN (
    'Website or web app',
    'Mobile app',
    'Automation or integration',
    'Not sure yet'
  )
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
```

### 5. Running Locally

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Verification and Key URLs to Test

| URL | Purpose | What to Verify |
| :--- | :--- | :--- |
| **`http://localhost:3000/`** | Public Homepage | Sticky header with wordmark, Hero with single H1 and Execution Pathway card, 3 anchored service cards with example architecture previews, 3 case studies (QuietPass labeled "In progress"), 4-step process, 4 commitments, FAQ accordion, accessible enquiry form, and semantic footer. |
| **`http://localhost:3000/icon.svg`** | App Router SVG Icon | 64x64 vector icon with dark navy tile, white geometric "M", and indigo-violet accent dot. |
| **`http://localhost:3000/apple-icon.png`**| Apple Touch Icon | 180x180 PNG generated for iOS home screen bookmarks. |
| **`http://localhost:3000/favicon.ico`** | Browser Favicon | 32x32 legacy ICO icon. |
| **`http://localhost:3000/admin/login`** | Admin Login | Dark-mode login form wrapped in Suspense. Validates password via timing-safe endpoint and issues secure session cookie. |
| **`http://localhost:3000/admin/enquiries`** | Admin Dashboard | Protected by Edge proxy and Server Component verification. Displays enquiries table with Country code, E.164 phone, formatted message wrapping, and timestamps rendered in IST. |
| **`http://localhost:3000/api/enquiries`** | Submission API | Validates payload <= 20KB, executes shared validator, throttles via IP rate limit, drops honeypot spam silently, and inserts into Supabase Postgres. |

---

## Automated Testing

Run the automated validation test suite:

```bash
node --experimental-strip-types scripts/test-validation.ts
```

The test runner validates 18 distinct scenarios covering:
- Digit rejection and Unicode letter acceptance in Name ("Zoë O'Neil-Smith").
- Strict email parsing, double-dot rejection, and typo suggestions (`gmial.com` -> `gmail.com`).
- Country phone number validation for India (+91) and North America (+1) with E.164 formatting.
- 1,000 words acceptance vs. 1,001 words rejection.
- Whitelist enforcement for services and budget tiers.
- Full payload validation returning field-by-field error objects.

---

## Available Scripts

- `npm run dev` - Starts the local development server (Turbopack).
- `npm run build` - Builds the production bundle (TypeScript type check and static/dynamic route optimization).
- `npm run start` - Runs the built production server.
- `npm run lint` - Runs ESLint code quality checks.
