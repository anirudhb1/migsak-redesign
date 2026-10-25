# Migsak Homepage Redesign

An evaluation-only redesign of the [Migsak](https://migsak.com) homepage, with a working enquiry form that stores submissions in a database and a password-protected page to view them. Built for the Software Developer Intern assignment.

- **Live site:** [ADD VERCEL URL]
- **Admin page:** [ADD VERCEL URL]/admin/login (login details were sent in the submission email)

All copy is taken from the current Migsak website. No client numbers, testimonials, ratings or results have been added.

---

## Tech stack

| Area | Choice |
| :--- | :--- |
| Framework | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | CSS transforms and opacity, plus a small `IntersectionObserver` wrapper (`Reveal.tsx`). No animation libraries. Respects `prefers-reduced-motion`. |
| Validation | One shared module (`src/lib/validation.ts`) used by both the form and the API route |
| Database | Supabase Postgres, accessed only from server code with the service role key |
| Admin auth | Password check with `crypto.timingSafeEqual`, session stored in an `httpOnly`, `sameSite=strict` cookie created with `jose` |
| Hosting | Vercel |

---

## What changed on the homepage

- Plain-English explanations of services, with technical terms (CRM, ERP) explained in brackets.
- Three service cards, each with its own anchor, instead of cards pointing to the same page.
- A hero section with one primary action ("Start a project") and one secondary action ("See our work").
- Honest labelling of QuietPass as "In progress".
- A FAQ answering budget, timeline, ownership and support questions using only facts from the current site.
- A visible enquiry form on the homepage, linked from the header and hero.
- A dark theme with subtle micro-animations, a custom favicon and touch icon, and SEO metadata.

The full list of issues found and the reasoning is in the accompanying report.

---

## Enquiry form

Validation rules live in `src/lib/validation.ts` and run in the browser for quick feedback and again on the server, so the rules cannot drift apart.

| Field | Rules |
| :--- | :--- |
| Name | Required, 2 to 80 characters. Letters from any language (`\p{L}`, `\p{M}`), spaces, hyphens, apostrophes and full stops. Digits and other symbols are rejected. |
| Email | Required, trimmed and lowercased, up to 254 characters, format-checked. Suggests a correction for common typos such as `gmial.com`. The format is validated; the inbox is not verified. |
| Country and phone | All countries via a dropdown with flag and dial code, default India. Phone is optional; if given, it is validated for the chosen country and stored in E.164 format (for example `+919876543210`). |
| Service | Required, must be one of four allowed values. |
| Budget | Optional, must be one of the allowed options. |
| Message | Required, at least 10 characters, at most 1000 words and 8000 characters. A live word counter is shown. Text is never silently truncated. |

Other behaviour: hidden honeypot field for bots, IP-based rate limiting, request size cap of 20 KB, inline errors with `aria-invalid` and `role="alert"`, focus moved to the first invalid field, 16px inputs to prevent iOS zoom, and a single-column layout on small screens.

---

## Admin page

- `/admin/login` takes a password from the `ADMIN_PASSWORD` environment variable.
- `/admin/enquiries` lists submissions newest first, with country, phone and time in IST.
- Access is checked in `src/proxy.ts` and again on the server in the page itself.

---

## Security notes

1. The Supabase service role key stays on the server and is never exposed to the browser (no `NEXT_PUBLIC_` prefix).
2. Row Level Security is enabled on `enquiries` with no public policies, so the database cannot be read or written from the browser.
3. All input is validated on the server, not just in the browser.
4. Admin password comparison is timing-safe. The session cookie is `httpOnly` and `sameSite=strict`.
5. `.env.local` is git-ignored.

---

## Known limitations

- **Rate limiting is in memory.** On Vercel, serverless instances do not share memory, so the limit is only partly effective. A shared store such as Upstash Redis would fix this.
- **Single admin password**, not per-user accounts, with no lockout after repeated failures.
- **Email is not verified.** Only the format is checked. Confirming the address would need a verification email.
- **Free Supabase projects pause after a period of inactivity** and can be restored from the dashboard.
- Lighthouse scores are in the report. Accessibility was checked with Lighthouse and manual testing, not a full audit.

---

## Project structure

```text
migsak-redesign/
├── schema.sql                  # Table, CHECK constraints and RLS setup
├── .env.example                # Required environment variable names
├── scripts/test-validation.ts  # Tests for the validation rules
└── src/
    ├── app/
    │   ├── page.tsx            # Homepage
    │   ├── layout.tsx          # Metadata, fonts, viewport
    │   ├── globals.css         # Tailwind import, theme, animations
    │   ├── icon.svg, apple-icon.png, favicon.ico
    │   ├── admin/login, admin/enquiries
    │   └── api/enquiries, api/admin/login, api/admin/logout
    ├── components/             # Header, Hero, WhatWeBuild, SelectedWork, Process,
    │                           # Commitments, Faq, EnquiryForm, Reveal, Footer,
    │                           # AdminLogoutButton
    ├── lib/                    # auth, rate-limit, supabase, types, validation
    └── proxy.ts                # Protects /admin/* routes
```

---

## Run it locally

Requires Node.js 20 or later and a free Supabase project.

```bash
npm install
```

Create `.env.local` in the project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-secret-or-service-role-key
ADMIN_PASSWORD=choose-a-strong-password
SESSION_SECRET=a-random-string-of-at-least-32-characters
```

Create the table: open the Supabase **SQL Editor**, paste the contents of `schema.sql` and run it. If you already created the table before the `country` column was added, run the `ALTER TABLE` statements from `schema.sql`.

```bash
npm run dev
```

Open http://localhost:3000.

## Deploy

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the four environment variables above in **Settings → Environment Variables**.
4. Deploy, then submit a test enquiry and check it in `/admin/enquiries`.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run start` runs the production build.
- `npm run lint` runs ESLint.
- `node --experimental-strip-types scripts/test-validation.ts` runs the validation tests.

## Admin page

**How to open it:** scroll to the footer of the homepage and click **Admin portal**. This goes to `/admin/login`. Enter the admin password to see submitted enquiries.

The password is not stored in this repository. It was sent to the Migsak team in the submission email, and it is set through the `ADMIN_PASSWORD` environment variable.

- `/admin/login` checks the password against `ADMIN_PASSWORD`.
- `/admin/enquiries` lists submissions newest first, with country, phone and time in IST. It has a logout button.
- Access is checked in `src/proxy.ts` and again on the server in the page itself.

---
