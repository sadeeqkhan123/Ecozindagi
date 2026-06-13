# Eco Zindagi Website

Official marketing site for **Eco Zindagi** — Pakistan's clean-tech startup building smart waste systems, composting products, and circular living solutions.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Getting started

```bash
npm install
npm run assets   # copy images from Cursor assets folder (optional)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run assets` | Sync product/team/logo assets into `public/` |

## Project structure

- `app/` — pages and API routes
- `components/` — UI sections (hero, navbar, shop cards, etc.)
- `lib/` — product data, blog posts, currency, cart, API helpers
- `public/` — static images and favicon
- `data/` — JSON file storage for form submissions (gitignored)

## Deploy

Build with `npm run build` and deploy to Vercel or any Node host. API routes persist form data to `data/*.json` on the server filesystem.

## Contact

- **HQ:** Alpha Techno Square - NASTP, Rawalpindi, Pakistan
- **Email:** hello@ecozindagi.pk
- **WhatsApp:** +92 335 9463244
