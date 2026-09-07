# AGENTS.md — familie-ba-sak-frontend

Frontend and backend-for-frontend (BFF) for barnetrygd (child benefit) case handling.
React 19 + TypeScript + Vite frontend, Express BFF (`src/backend`), pnpm, deployed on Nais (GCP).
Owned by team-baks (`teamfamilie` namespace). Only outbound API dependency: `familie-ba-sak`.

## Commands

```bash
# Setup
nvm use                                                                              # Node 24
corepack enable                                                                      # activates pnpm version from packageManager
pnpm install

# Run locally (needs naisdevice + `nais login -y` for secrets)
pnpm start:dev                                                                       # = start:lokalt-mot-preprod, http://localhost:8000
pnpm start:lokal                                                                     # local frontend + local backend
pnpm start:hybrid                                                                    # local frontend + local backend against preprod

# Validate before finishing a task
pnpm validate                                                                        # typecheck + biome check
pnpm typecheck                                                                       # tsc --noEmit on both src/backend and src/frontend
pnpm test                                                                            # test:backend + test:frontend (vitest)
pnpm test:frontend                                                                   # vitest -c src/frontend/vitest.config.ts --run
pnpm exec vitest --config src/frontend/vitest.config.ts --run path/to/file.test.tsx  # single file
pnpm check:fix                                                                       # biome lint + format fix

# Build
pnpm build                                                                           # = build:prod
```

Note: the backend has zero test files (`passWithNoTests: true` in `src/backend/vitest.config.ts`).

## Project Structure

```text
src/backend/                       # Express BFF, 7 source files
  server.ts                        # Entrypoint (port 8000), mounts proxy/router/error middleware
  router.ts                        # /version, /error, /logg-feil, SPA catch-all with ensureAuthenticated
  proxy.ts                         # doProxy() -> PROXY_URL, attachToken() (OBO token), doRedirectProxy()
  config.ts                        # appConfig, sessionConfig (Redis/Valkey), oboConfig, redirectRecords
  env.ts                           # envVar(), erLokal()/erPreprod()/erProd()
  konfigurerApp.ts                 # Loads .env / .secrets.env / .env.${ENV} via @dotenvx/dotenvx — import first
  metrikker.ts                     # Prometheus counters
  tsconfig.json, vitest.config.ts  # Build/test config, not application code

src/frontend/
  api/                             # One exported async function per file, all calls go through apiClient
  context/                         # App-level React Context providers (Auth, Http, Modal, Toggles, ...)
  hooks/                           # ~1 react-query hook per api/ file, plus small UI hooks (useToggle, useModal)
  komponenter/                     # Shared/reusable components, grouped by concern
  sider/                           # Feature pages by domain (Fagsak/Behandling/..., Oppgavebenk, ...)
  typer/                           # Domain types/enums, one file per domain (hand-written, no codegen/OpenAPI client)
  utils/                           # Pure helper functions (formatter, validators, dato/)
  testutils/                       # testrender.tsx (custom render + providers), mocks/ (msw), testdata/ (lagX() factories)
  ikoner/                          # SVG icon components
  public/                          # Static assets (favicon)
  App.tsx                          # QueryClient + context providers + RouterProvider
```

Path aliases (use these in new code): `@api/*`, `@context/*`, `@hooks/*`, `@ikoner/*`, `@komponenter/*`,
`@public/*`, `@sider/*`, `@testutils/*`, `@typer/*`, `@utils/*`.

## Code Style

- **Language**: Norwegian for identifiers, filenames, comments, commit messages, and PR text (æøå is fine).
  Technical keywords and framework APIs stay in English (`fun`, `class`, `useQuery`, etc.).
- **Formatting**: Biome — 4-space indent, 120 char width, single quotes, `es5` trailing commas,
  `arrowParentheses: asNeeded`. Enforced via `pnpm check` / `pnpm validate`, and auto-fixed on save
  (`.vscode/settings.json` sets Biome as the default formatter with `source.fixAll.biome`).
- **React imports**: never `import React from 'react'` or `React.*` member access — use named imports only.
  Never use `React.FC` / `React.FunctionComponent` / `React.VFC` — annotate props on the function parameter.
  This is a convention, not an enforced lint rule — 0 occurrences today, keep it that way.
- **Types**: `import type { ... }` is required for type-only imports (`verbatimModuleSyntax`).
- **Import order**: organized automatically by Biome's `organizeImports` assist action — no manual
  import-order rules to follow, just don't fight the auto-fix.
- **Path aliases**: prefer the aliases listed above over long relative (`../../..`) imports.
- **Exports**: named exports (`export function Komponent(...)`), not default exports.
- **Dependencies**: `save-exact=true` in `.npmrc` — pin exact versions, no `^` ranges.
- **Minimal diffs**: change only what the task requires. Do not reformat or refactor unrelated code.

## Preferred vs Legacy

This codebase is mid-migration away from several older patterns. Use the "Preferred" column for new code;
the "Legacy" column exists in older files and is being phased out — do not extend it further.

| Area          | Preferred                                   | Legacy — do not use in new code                         |
|----------------|----------------------------------------------|-----------------------------------------------------------|
| Styling        | Aksel primitives (`Box`, `HStack`, `VStack`) + `*.module.css` | `styled-components`                          |
| Forms          | `react-hook-form`                             | `@navikt/familie-skjema`, `@navikt/familie-form-elements` |
| Server state   | `@tanstack/react-query`                       | `@navikt/familie-http` (`useHttp`), `Ressurs` from `@navikt/familie-typer` |
| API errors     | `apiClient` (`@api/client/apiClient`), throws `ApiFeil` | `api/error/apiError.ts`                       |

## Patterns

- **API layer** (`src/frontend/api/`): one exported async function per file, filename = function name.
  All requests go through the singleton `apiClient`, e.g.:
  ```ts
  return apiClient.put<OppdaterBehandlingstemaPayload, IBehandling>({
      data: payload,
      url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
  });
  ```
- **Hooks** (`src/frontend/hooks/`): one hook per api file — `useHentX` wraps `useQuery`, `useOpprettX` /
  `useOppdaterX` / `useSlettX` wrap `useMutation`. Query keys are exposed via `XQueryKeyFactory` objects.
  Mark queries/mutations that should trigger the global spinner with `meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true }`.
- **Ressurs envelope**: backend responses are wrapped in a `Ressurs` envelope
  (`SUKSESS | FEILET | IKKE_TILGANG | FUNKSJONELL_FEIL`), locally typed in `api/client/apiClient.ts` — error
  statuses can arrive with HTTP 200. `apiClient` unwraps this via `pakkUtRessursResponse()` and throws
  `ApiFeil` (with `fraAxiosError` / `fraRessurs` / `fraFeilmelding` factories) — don't bypass it.
- **Forms with react-hook-form**: a dedicated `useXSkjema` hook owns `useForm`, alongside `enum XFeltnavn`
  for field names, an `XFormValues` interface, an `xSkjemaStandardverdier()` function for defaults, and a
  separate `transformerSkjemaData.ts` to map form values to the API payload. Not every existing form follows
  this fully (some use `useXForm` naming, or inline defaults) — treat it as the target shape for new or
  touched forms rather than an established universal rule.
- **Obfuscated data**: some data toggled via feature flag can be masked for demo/opplæring purposes — see
  `useSkalObfuskereData` and the `select` option in hooks like `useHentFagsak` / `useHentPerson`.

## Testing

- Files: `*.test.ts` / `*.test.tsx`, co-located next to the source file (a few older `test/` subfolders exist
  but are not the pattern to follow for new tests).
- Render with the custom `render` from `@testutils/testrender` — wraps all context providers, a fresh
  `QueryClient`, and `MemoryRouter`; returns `{ user, screen, ...rtlRender }`.
- API mocking uses **msw** with `onUnhandledRequest: 'error'` — any unmocked HTTP call fails the test.
  Add/override handlers in `testutils/mocks/handlers/`.
- Test data comes from `lagX()` factory functions in `testutils/testdata/` (e.g. `lagBehandling({ ... })`).
- Style: Norwegian `describe('<navn>')` / `test('skal ...')`, role-based queries
  (`getByRole('button', { name: '...' })`), interactions via `await user.click(...)`.

## CI & Deploy

- Pull requests run a reusable pnpm workflow from `navikt/familie-baks-gha-workflows@main`
  (`pull-request-pnpm.yaml`, Node 24) — the actual build/test steps live in that external repo, not here.
- Pushing to `main` runs two independent chains **in parallel**, with no manual gate or approval step:
  build+deploy to dev-gcp (`.nais/app-dev.yaml`) and build+deploy to prod-gcp (`.nais/app-prod.yaml`).
  A `varsle-slack` job notifies on failure of either chain.
- Manual workflows: `manual-deploy-dev`, `manual-deploy-prod` (audited via Slack), and
  `manual-deploy-with-image` (deploy a specific pre-built image tag to dev or prod).
- `scan-vulnerabilities` runs weekly (Monday) and on push to `main`, writing SARIF results to GitHub Security.

## Environment & Secrets

- `.env` files are layered per environment (`.env`, `.env.lokal`, `.env.hybrid`, `.env.lokalt-mot-preprod`,
  `.env.preprod`, `.env.prod`), loaded by `@dotenvx/dotenvx` in `konfigurerApp.ts`:
  `dotenvx.config({ path: ['.env', '.secrets.env', \`.env.${ENV}\`] })`.
- Backend reads `process.env.X`; frontend would read `import.meta.env.VITE_X` (the `VITE_` prefix is required
  to expose a value to the frontend) — in practice no `VITE_*` variables exist today; the only
  `import.meta.env` usage is `MODE` in `utils/miljø.ts`.
- Local secrets are fetched into `.secrets.env` via `pnpm miljøvariabler` (runs
  `hent-og-lagre-miljøvariabler.sh`, requires `nais login -y`, cached for 1 hour). `.secrets.env` must never
  be committed.

## Boundaries

### ✅ Always

- Run `pnpm validate` (and relevant tests) after making changes
- Follow the "Preferred" patterns above for new or touched code
- Follow existing conventions in the specific file/folder you're editing
- Keep this file in sync when a change affects the information described here

### ⚠️ Ask First

- Adding new dependencies
- Changing authentication/proxy/session logic in `src/backend`
- Changing Nais manifests (`.nais/*.yaml`) or environment/secret configuration

### 🚫 Never

- Commit secrets, tokens, or `.secrets.env`
- Log fødselsnummer or other personal data
- Commit or push changes, or push to `main`, unless explicitly asked

## Keeping This File Current

Update this file in the same change whenever something it describes changes: new top-level folders under
`src/frontend`, a CI/deploy workflow change, a newly completed migration (e.g. `styled-components` fully
removed), or a new established pattern for API/hooks/forms.

Exact dependency versions are intentionally omitted — they change frequently via Dependabot and are easy to
look up directly in `package.json`.
</content>
