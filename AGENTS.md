# Game Hub maintenance

## Deployment

- Release from GitHub `main` on `https://github.com/yigitefeoktar/game-hub.git`.
  Vercel's Git integration builds the Vite frontend into `dist` on Node.js 24.x.
  The Vercel project is `game-hub` (`prj_lxiTKsV6Tjhi5UDnVGGj7Y45wVa4`) on team
  `team_xVwirII3Qvw8wj4rshxpfiL4`.
- The production domain is <https://www.vibestudios.com.tr/>. The secondary
  production alias is <https://game-hub-nu-three.vercel.app/>. Use the custom
  domain to verify the public site. Individual deployment URLs identify one build.
- Game Hub is frontend only. There is no `deployment.json` enabling a backend.
  Skip backend installs, builds, processes, PC tasks, ports, and tunnels. Keep
  backend environment variables and secrets out of the frontend build.
- Google Cloud billing and automatic deployment triggers remain disabled.
  Preserve historical Cloud resources and keep Cloud Run out of the release path.
- For an authorized release, run `git fetch origin main` and reconcile any
  upstream commits while preserving unrelated working-tree and index changes.
  Run `npm run lint`, `npm run build`, and `git diff --check`. Review the staged
  diff and commit only the intended changes. Push with `git push origin main`
  after confirming the commit is a fast-forward of `origin/main`.
- Confirm that Vercel reports the exact pushed SHA as `Ready` for production and
  that the custom domain points to that deployment. Smoke-test the updated cards
  and game links on the public domain. If Instant Rollback leaves the new build
  staged, promote that verified production deployment in Vercel and retest.
- If a build fails, keep the current production deployment and inspect the failed
  build logs before retrying. If a live regression needs immediate recovery, use
  Vercel's Instant Rollback to restore the last verified deployment. Revert the
  faulty commit on `main` with `git revert <sha>`, validate the recovery commit,
  then release and verify it through the same workflow.
- On Windows, `C:/Users/yigit/Documents/New project 7` is a junction to
  `C:/Users/yigit/Documents/game hub`. Run Vite builds from the resolved path to
  avoid Rollup emitting an invalid relative `index.html` path.
- Do not start a local development server unless asked. Bounded headless checks
  can fulfill production-build requests from disk without starting a server.
- Keep verification screenshots, logs, and other temporary artifacts outside Git.

## Catalogue

- `ALL_GAMES` in `src/App.tsx` is the catalogue source. The site filters the existing
  sort into **My Best Games** and **My First Games**, without duplicates. Games with
  `recommendationOrder` show a bright orange **Best** badge with the same transparent
  background and border opacity as the other tags, in place of their
  visible release status (in the grid and hero), and sort first by that
  number (Ricochet Arena: 1, War of Planets: 2), followed by status and title.
  The latter contains Neon Drift, Toy Box, Gemini Clash, and React Chess.
- Original React Chess is a fixed static archive at `/games/react-chess-original/`,
  deployed with this repository's `main`, with no backend or API credentials.
  See `docs/react-chess-original.md` for its original GitHub SHA, reproducible build,
  known mode-switching limitation, and verification steps. Do not silently replace
  it with the newer React Chess site or redesign the historical game.
