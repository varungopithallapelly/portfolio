# Varun Thallapelly — Portfolio

**Data Analyst & AI Solutions Developer · Guildford, UK**

🌐 **Live site:** [www.varunthallapelly.com](https://www.varunthallapelly.com)

[![Portfolio preview](https://www.varunthallapelly.com/opengraph-image)](https://www.varunthallapelly.com)

I build data systems, automations and AI agents that teams use every day. This repo is the source for my personal portfolio.

---

## Highlights of the work shown

| Project | Outcome |
| --- | --- |
| [Agentic AI Customer Support](https://www.varunthallapelly.com/projects/ai-agent) | One voice agent serving 3 franchise clients, 24/7, in 72 languages |
| [In-House Payroll Software](https://www.varunthallapelly.com/projects/payroll) | 1-week payroll process cut to 1 day; timesheets in under 5 seconds |
| [Accounts Receivable & Invoicing](https://www.varunthallapelly.com/projects/invoicing) | 2-week invoicing cycle cut to 1 day |
| [HR Automation Suite](https://www.varunthallapelly.com/projects/hr-suite) | Training, leave, appraisals and recruitment automated end to end |
| [Motor Insurance Pricing Analytics](https://www.varunthallapelly.com/projects/insurance-analytics) | +27% pricing accuracy, −15% cost of risk (MSc project) |
| [Local LoRA Training on Intel Arc](https://www.varunthallapelly.com/work/intel-arc-lora) | Personal image model trained on a laptop GPU in ~25 minutes |

More on the [live site](https://www.varunthallapelly.com/#projects).

**Hiring?** Click **"Hiring?"** on the site for a 30-second summary and CV preview, or [download my CV](https://www.varunthallapelly.com/varun-thallapelly-cv.pdf).

---

## What's on the site

- **Interactive hero:** rotating headline, a portrait that tilts with the cursor, draggable stickers and count-up stats
- **Impact section:** before/after comparison of the process times I've cut
- **Experience timeline** with headline metrics for each role
- **Filterable projects** with a case-study page for each
- **Skill explorer:** click a skill to see which projects use it
- **Command palette:** press `Ctrl K` / `⌘ K` to jump anywhere
- **Recruiter panel:** quick summary with an inline CV preview
- **Live AI voice demo** of the agent I built (via VAPI)
- Light theme by default, with a dark mode toggle
- Works on phones, respects reduced-motion settings, and ships social preview images, structured data and a sitemap

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion for animation, Lucide for icons
- Resend for the contact form, VAPI for the voice demo
- Hosted on Vercel; each push to `main` deploys automatically

## Project structure

```
app/
  page.tsx                 Home page (sections in order)
  projects/[slug]/         Case-study pages (statically generated)
  work/intel-arc-lora/     LoRA build-log page
  api/contact/route.ts     Contact form → email (Resend)
  opengraph-image.tsx      Social share image
  sitemap.ts, robots.ts    SEO
components/                One file per section + shared UI (ui.tsx)
lib/data.ts                All content: profile, jobs, projects, skills
```

To update content, edit **`lib/data.ts`**. The home page, case studies and search all read from it.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The contact form needs a `RESEND_API_KEY` environment variable. Put it in `.env.local` locally (git ignores it) and in the Vercel project settings for production. Never commit it.

## Contact

- Email: [thallapellyvarun@gmail.com](mailto:thallapellyvarun@gmail.com)
- LinkedIn: [varun-gopi-thallapelly](https://www.linkedin.com/in/varun-gopi-thallapelly/)
- GitHub: [@varungopithallapelly](https://github.com/varungopithallapelly)

---

© Varun Thallapelly. The code is shared for reference. Please don't reuse the personal content or images.
