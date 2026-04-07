# The Sovereign Ledger

Premium deal flow platform for the GCC market. Handles equity fundraising, debt, mergers, acquisitions, and joint ventures across UAE, KSA, Qatar, Bahrain, Oman, and Kuwait.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI:** React 19, Tailwind CSS 4, Framer Motion, Lucide React
- **State:** Zustand (client state), TanStack React Query (server state)
- **Backend:** Supabase (Auth, Postgres, Row Level Security)
- **Language:** TypeScript 5 (strict mode)
- **Utilities:** class-variance-authority, clsx, tailwind-merge

## Features

- **3 role-based dashboards** -- Advisor (Kanban pipeline, commission tracker), Company (AI valuation, NDA management, fundraise lifecycle), Investor (deal digest, deal explorer, portfolio tracker)
- **6-step company onboarding** -- Company type selection, business details, document upload, deal configuration, AI valuation engine, review and go-live
- **AI valuation engine** -- Bear/base/bull scenario modelling with sensitivity analysis, powered by sector multiples and country premiums
- **Bilingual support** -- English and Arabic with full RTL layout switching
- **Sharia compliance tagging** -- Deals and investors can be filtered by Sharia compliance
- **Landing page** -- Hero, stats bar, flywheel diagram, deal types, how-it-works tabs, CTA

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project

### Installation

```bash
npm install
```

### Environment Variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

### Supabase Setup

1. Create a new Supabase project
2. Run the migrations in `supabase/` to set up the database schema
3. Optionally run seed data scripts if provided

### Development

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                    # Next.js App Router pages and layouts
    (auth)/               # Login and register pages
    (dashboard)/          # Advisor, company, and investor dashboards
    (onboarding)/         # 6-step onboarding flow
    (public)/             # Landing page
  components/
    features/             # Domain-specific components (deal cards, kanban, etc.)
    landing/              # Landing page sections
    layout/               # Layout utilities (locale provider)
    onboarding/           # Onboarding step footer
    ui/                   # Reusable UI primitives (button, card, input, etc.)
  data/
    translations/         # EN and AR translation dictionaries
  hooks/                  # Custom React hooks (auth, locale, valuation)
  lib/
    ai.ts                 # AI service interface and mock implementation
    constants.ts          # Shared constants (countries, sectors, deal types)
    format.ts             # Currency and date formatting
    supabase/             # Supabase client, server client, and query modules
    utils.ts              # Tailwind class merge utility
  stores/                 # Zustand stores (onboarding, locale)
  types/                  # TypeScript type definitions
  middleware.ts           # Auth middleware for route protection
```

## Database

The database layer uses Supabase with Postgres. Schema migrations and optional seed data are located in the `supabase/` directory. Row Level Security policies handle authorization at the database level.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
