# Game Hub maintenance

- Repository: `https://github.com/yigitefeoktar/game-hub.git`; release branch: `main`.
- Production: <https://www.vibestudios.com.tr/>; secondary alias:
  <https://game-hub-nu-three.vercel.app/>.
- Vercel project: `game-hub` (`prj_lxiTKsV6Tjhi5UDnVGGj7Y45wVa4`), team
  `team_xVwirII3Qvw8wj4rshxpfiL4`. Existing Git integration deploys `main` pushes.
- Frontend only. No backend manifest is present; do not deploy a backend or use
  historical Google Cloud resources. Google Cloud billing/triggers remain disabled.
- Before an authorized release: preserve unrelated work, reconcile `origin/main`,
  run `npm run lint`, `npm run build`, and `git diff --check`, then review and commit
  only the intended files. Push without force and verify the exact SHA's successful
  Vercel status and the actual production domain. Promote a staged production
  deployment if Instant Rollback prevents automatic domain assignment.
- On Windows, `C:/Users/yigit/Documents/New project 7` is a junction to
  `C:/Users/yigit/Documents/game hub`. Run Vite builds from the resolved path to
  avoid Rollup emitting an invalid relative `index.html` path.
- Do not start a local development server unless asked. Bounded headless checks
  can fulfill production-build requests from disk without starting a server.
- `ALL_GAMES` in `src/App.tsx` is the catalogue source. The site filters the existing
  sort into **My Best Games** and **My First Games**, without duplicates. Games with
  `recommendationOrder` show a bright orange **bext** badge with the same transparent
  background and border opacity as the other tags, in place of their
  visible release status (in the grid and hero), and sort first by that
  number (Ricochet Arena: 1, War of Planets: 2), followed by status and title.
  The latter contains Neon Drift, Toy Box, Gemini Clash, and React Chess.
- Original React Chess is a fixed static archive at `/games/react-chess-original/`,
  deployed with this repository's `main`, with no backend or API credentials.
  See `docs/react-chess-original.md` for its original GitHub SHA, reproducible build,
  known mode-switching limitation, and verification steps. Do not silently replace
  it with the newer React Chess site or redesign the historical game.
- Keep verification screenshots, logs, and other temporary artifacts outside Git.
