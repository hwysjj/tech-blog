# Repository Guidelines

Use this guide to align contributions across the tech-blog codebase.

## Project Structure & Module Organization
- `src/main.tsx` boots the React 19 app; `src/App.tsx` wires page routing and shared providers.
- `src/pages` holds route-level views (e.g., resume); `src/components` stores reusable UI; `src/utils` centralizes helpers; `src/data` and `src/i18n` manage content and translations; `src/theme` customizes Material UI tokens.
- Static assets live in `public/`; production bundles are emitted to `dist/` by Vite and should remain untracked.

## Build, Test, and Development Commands
- `npm run dev` launches Vite on port 5173 with hot reloading.
- `npm run build` runs the TypeScript project references then compiles a production bundle.
- `npm run preview` serves the `dist/` output for smoke-testing before deploying.
- `npm run lint` applies the ESLint configuration in `eslint.config.js`; run it before every PR.

## Coding Style & Naming Conventions
- Stick to TypeScript with ECMAScript modules; prefer functional React components and hooks.
- Use two-space indentation, `camelCase` for variables/utilities, and `PascalCase` for React components and file names under `src/components` and `src/pages`.
- Theme overrides should flow through the MUI `ThemeProvider` in `src/theme`; write Emotion-styled components when tailoring layout-heavy regions.
- Let ESLint surface correctness issues; if formatting drifts, align with the existing style produced by the repo’s settings.

## Testing Guidelines
- No automated tests are configured yet; rely on the manual checklist in `TESTING_CHECKLIST.md` for resume flows, including bilingual toggles and PDF export.
- Before opening a PR, confirm `npm run build` and `npm run preview` succeed and manually walk the resume page on desktop and mobile widths.
- Capture any bugs in the checklist as unchecked items so reviewers can follow up.

## Commit & Pull Request Guidelines
- Follow the Conventional Commit pattern observed in history (e.g., `feat:`, `fix:`). Scope your message to one logical change.
- PRs should explain the motivation, list manual test evidence, and include screenshots or GIFs for UI changes (desktop + mobile).
- Reference tracked issues when relevant and call out localization or PDF implications so reviewers can re-run the affected flows.

## Localization & PDF Tips
- Update both `src/data` and `src/i18n` when changing copy; keep translation keys consistent to avoid language toggle regressions.
- PDF adaptations should be validated in both languages and on macOS Preview/Chrome; ensure filenames follow the existing `Name_Resume_YYYY-MM-DD.pdf` pattern.
