This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First,

```bash
npm install --legacy-peer-deps

then, run the development server:

```bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Key Points for New Contributors

Development Workflow
 1. Install dependencies, then run npm run dev to start the Next.js dev server.
 2. Pages live under app/ and are automatically routed.
 3. Shared components and helper modules reside in src/.

LLM Integration
 1. Use askGemini or askLLM from src/lib when you need AI-generated insights.
 2. API keys should be stored in environment variables (.env.local).
 
Extending the Dashboard
 1. Many components (e.g., vitals panel, achievements panel) are built with Tailwind and Radix UI primitives. They can be reused or extended.
 2. Several API endpoints (app/api/auth/link-device.ts, app/api/data/sync.ts) are empty placeholders—future contributions could implement these.

Future Learning
 1. Explore Next.js “App Router” concepts such as server vs. client components.
 2. Review how Tailwind’s configuration works in tailwind.config.ts.
 3. Get familiar with the Google Gemini API (or other LLM services) to expand AI features.
 4. Investigate testing frameworks (e.g., React Testing Library or Cypress) to add automated tests, as hinted in roadmap.txt.