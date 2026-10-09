# Curious — a Vsauce fan project

Made by Rohin.

[Live website](https://curious-vsauce-rohin.rightchair2.chatgpt.site)

Curious is a small fan website about Vsauce, made for the Open Source Programming Club web development recruitment task.

The idea is simple: explore a couple of interesting Vsauce videos, then leave a science question in the Question Jar. The form sends the question to a backend and stores it in a database. The total and topic counts come from those saved questions.

## Pages

- **Home (`/`)** — an introduction to Vsauce and why the channel interests me.
- **Explore (`/explore`)** — a small video list with topic filters and links to the original videos.
- **Question Jar (`/question-jar`)** — a working submission form and live counts.

## Built with

- React and TypeScript for the pages and form interactions.
- Plain CSS for the shared layout and responsive design.
- Vinext, a Vite-based framework with Next.js-style routing, to build the application.
- A Cloudflare Worker for the backend API.
- Cloudflare D1 (SQLite) for saved submissions.
- Drizzle Kit to generate the database migration.

The hosting starter includes other UI packages, but the site uses simple native form controls to keep the main code easier to follow.

## How the form works

1. The visitor enters a nickname, selects a topic, writes a question, and agrees to save it.
2. The browser sends JSON to `POST /api/questions` using `fetch()`.
3. The backend checks the submitted values again. Browser checks alone can be bypassed.
4. A prepared SQL statement writes the record to D1.
5. The backend responds with HTTP `201` and a record ID only after the database write succeeds.
6. The page shows confirmation and reloads counts using `GET /api/questions`.

There is no newsletter service, email delivery, YouTube Data API, or AI API. Videos are a manually curated list of verified official YouTube links. The only application API is our own `/api/questions` endpoint. The public GET endpoint exposes aggregate counts, not names or question text.

## Main files

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Home page |
| `app/explore/page.tsx` | Video list and filters |
| `app/question-jar/page.tsx` | Form, save request, and counts |
| `app/layout.tsx` | Shared navigation, footer, and metadata |
| `app/globals.css` | Shared styles and mobile layout |
| `app/api/questions/route.ts` | Backend GET and POST handlers |
| `lib/videos.ts` | Curated video data |
| `db/index.ts` | Access to the D1 binding |
| `db/schema.ts` | Database table definition |
| `drizzle/` | Generated database migration and schema history |
| `tests/backend.mjs` | Backend integration check using temporary D1 |
| `docs/LEARNING_GUIDE.md` | Code tour and recruitment questions |
| `docs/SUBMISSION.md` | GitHub and demo instructions |
| `docs/HOSTING.md` | Hosting, local database, and data access instructions |

`build/`, `scripts/`, `vendor/`, and the configuration files support the hosting framework. They are not additional product features.

## Run locally

Install Node.js **22.13 or newer**. From this project folder:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_common_jazinda.sql
pnpm dev
```

Open the address printed in the terminal. Apply the migration only once per new local database. Local submissions are separate from the hosted website's data. If Corepack is unavailable, install the pnpm version recorded in `package.json` before running these commands.

To check the backend after building:

```bash
node tests/backend.mjs
```

To check TypeScript:

```bash
pnpm exec tsc --noEmit
```

## Validation and limitations

The backend limits nickname length to 2–60 characters and question length to 10–800 characters, checks the topic and consent, uses SQL placeholders, and rejects a filled hidden spam field. Errors preserve form input. Submit is disabled while a request is pending.

This is a small recruitment project. It does not yet include strong rate limiting, CAPTCHA, an owner dashboard, or idempotency protection against rare retry duplicates. The hidden field is only a basic spam deterrent. No claim is made that every stored question is unique or from a unique person.

There is no automatic feed of new videos or live subscriber/view statistics. Counts describe this website's question submissions only.

## Credits

- [Vsauce on YouTube](https://www.youtube.com/@Vsauce)
- [What If Everyone JUMPED At Once?](https://www.youtube.com/watch?v=jHbyQ_AQP8c)
- [Why Are Things Creepy?](https://www.youtube.com/watch?v=PEikGKDVsCc)

The project is unofficial and is not affiliated with Vsauce. Video content belongs to its respective owners and is watched on YouTube.

The project was prepared with AI assistance and a hosting starter. I am using it to learn the page structure, form flow, and database operations; I should be able to explain and modify the code I submit.
