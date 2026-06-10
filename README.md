# Bergline

Save time getting rejected at Berghain.

Bergline is an open-source experiment from Advantage Labs.

## Repository layout

```
bergline/
└── apps/
    └── web/        Next.js (App Router) web app — the public Bergline site
```

This is a monorepo-style layout. `apps/web` is currently the only deployable surface; more apps (mobile, admin, etc.) can live alongside it as `apps/*` later.

## Prerequisites

- **Node.js 20.x or newer** (the repo is developed against Node 22). Check with `node --version`.
- **npm 10.x or newer** — ships with recent Node releases.

If you don't have a matching Node version, we recommend [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 22
nvm use 22
```

## Quickstart

From a fresh clone, run:

```bash
git clone https://github.com/AdvantageLabs/bergline.git
cd bergline/apps/web
npm install
npm run dev
```

Then open <http://localhost:3000> — you should see a minimal page with the Bergline name on a black background.

## Available scripts

All scripts run from inside `apps/web`.

| Command                | What it does                                                       |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Starts the Next.js dev server on http://localhost:3000 (Turbopack) |
| `npm run build`        | Produces a production build in `apps/web/.next`                    |
| `npm run start`        | Serves the production build locally on http://localhost:3000       |
| `npm run lint`         | Runs ESLint with the Next.js core-web-vitals + TypeScript rules    |
| `npm run format`       | Rewrites files in place with Prettier (auto-fix)                   |
| `npm run format:check` | Checks formatting without writing — used by CI                     |

## Lint & format

The repo uses **ESLint** for correctness and **Prettier** for formatting. They have separate jobs and don't overlap (`eslint-config-prettier` disables every ESLint rule that would touch style).

Day-to-day:

```bash
# Inside apps/web
npm run lint           # is the code correct?
npm run format:check   # is the code formatted?
npm run format         # fix formatting in place
```

CI runs `lint`, `format:check`, and `build` on every PR via the `blocking-checks` workflow — a red check there means one of the three failed.

## PR screenshots

Every pull request also runs the `PR screenshots` workflow. It builds a static export of
`apps/web` and captures desktop and mobile screenshots with Playwright.

The screenshot scenarios live in `.github/pr-screenshots.json`. Same-repository pull requests
publish the image files to the `ci-screenshots` branch and update one PR comment with embedded
images. Pull requests from forks still upload the PNGs as a workflow artifact, but skip the
write-scoped publish/comment step.

Prettier config lives at the repo root (`.prettierrc`, `.prettierignore`) so it can cover future `apps/*` consistently. ESLint config stays in `apps/web/eslint.config.mjs` because the rules are Next.js-specific.

## Project structure (`apps/web`)

```
apps/web/
├── app/
│   ├── layout.tsx      Root layout — sets <html>/<body>, fonts, metadata
│   ├── page.tsx        Homepage (the Bergline placeholder)
│   ├── globals.css     Global styles (black background, centered layout)
│   └── favicon.ico
├── public/             Static assets served at the site root
├── eslint.config.mjs   ESLint config (Next.js core-web-vitals + TypeScript)
├── next.config.ts      Next.js config
├── tsconfig.json       TypeScript config
└── package.json
```

The app uses the Next.js **App Router** (the `app/` directory). To add a new route, create a folder under `app/` containing a `page.tsx` file — see the [Next.js layouts and pages guide](https://nextjs.org/docs/app/getting-started/layouts-and-pages).

## Troubleshooting

- **`npm install` fails with EACCES or permission errors** — make sure you're not running as root; delete `node_modules` and `package-lock.json` inside `apps/web` and try again.
- **Port 3000 already in use** — either stop the other process or run `PORT=3001 npm run dev`.
- **TypeScript / ESLint errors after pulling new changes** — re-run `npm install` to pick up dependency updates, then `npm run lint`.
- **Stale build output** — delete `apps/web/.next` and re-run `npm run build`.

## License

[MIT](./LICENSE)
