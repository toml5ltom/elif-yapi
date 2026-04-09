# ELIF YAPI GAYRİMENKUL — Website

Luxury real estate website for Istanbul, Turkey. Trilingual (Arabic/Turkish/English) with RTL support.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark luxury design)
- **Supabase** (database + auth + RLS)
- **next-intl** (i18n: ar/tr/en)
- **Vercel** (deployment)

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your Supabase and other API keys
```

### 3. Set up Supabase
1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. Copy your project URL and anon key to `.env.local`

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/ar` (Arabic default)

## Project Structure
```
elif-yapi/
├── app/
│   ├── [locale]/          # All pages (ar/tr/en)
│   │   ├── page.tsx       # Homepage
│   │   ├── properties/    # Listings + detail
│   │   ├── citizenship/   # Citizenship program
│   │   ├── services/      # Services page
│   │   ├── about/         # About page
│   │   └── contact/       # Contact + Tally form
│   ├── api/               # API routes
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── global/            # Navbar, Footer, WhatsApp
│   ├── home/              # Hero, Stats, Districts, etc.
│   ├── properties/        # PropertyCard, Filter, Gallery
│   ├── services/          # CostCalculator
│   └── contact/           # WorkingHours
├── i18n/
│   └── messages/          # ar.json, tr.json, en.json
├── lib/
│   ├── api.ts             # All data fetching
│   ├── supabase/          # Supabase client
│   └── utils.ts
├── types/                 # TypeScript types
├── styles/
│   └── globals.css        # Design system
└── supabase/
    └── migrations/        # SQL schema
```

## Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## Adding Properties
Use Supabase Table Editor or SQL to insert properties. Required fields:
- `title_ar`, `title_tr`, `title_en`
- `slug` (unique, URL-friendly)
- `type` (sale/rent)
- `category` (apartment/villa/shop/office/land/citizenship)
- `price`, `currency`, `area_sqm`
- `published_at` (set to NOW() to make visible)

## Contact
- WhatsApp: +90 538 499 5690
- Email: elifyapigayrimenkul23@gmail.com
- Address: Başakşehir, İstanbul
