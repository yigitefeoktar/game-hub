# Original React Chess archive

`public/games/react-chess-original/` is a playable static build of the first game
code uploaded to [yigitefeoktar/react-chess](https://github.com/yigitefeoktar/react-chess):
commit `25875e69fd2292b87946703a9a6d1131034d1753`, April 26, 2026.
The preceding root commit `9f02991fc253e050e23f5b332bf357e97e1f6a84`
contains only a README, so it cannot be played.

The hub's React Chess card opens `/games/react-chess-original/` inside the existing
game overlay. The archive is versioned and deployed with `yigitefeoktar/game-hub`
`main` on the existing Vercel `game-hub` project. Its public address is
<https://www.vibestudios.com.tr/games/react-chess-original/>.
The newer independent React Chess deployment and its repository are unchanged.
No backend, API key, or additional hosting service is required.
The original chess.com sound URLs remain unchanged; sound playback needs network access.

## Rebuilding the archive

1. Export the exact source commit above into an ignored build directory outside
   `public/`, for example `.codex-game-lookup/react-chess-original/`.
2. Install its dependencies. The checked-in build uses React / React DOM 19.3.0,
   chess.js 1.4.0, and Vite 6.4.3, within the original package version ranges.
3. Build from the exported source directory:

   ```text
   npm run build -- --base=/games/react-chess-original/ --outDir=../../public/games/react-chess-original
   ```

4. Preserve the hosting adaptations in `index.html`: serve the original Tailwind
   3 browser runtime locally from `assets/tailwind-runtime.js` (pinned download:
   <https://cdn.tailwindcss.com/3.4.17>), and hide native scrollbars with
   `* { scrollbar-width: none; } *::-webkit-scrollbar { display: none; }` while
   retaining normal scrolling. Keep `source.json` and its runtime hash current.
   The game source itself has no changes from the selected commit.
5. Remove superseded generated bundles when rebuilding, review the intended
   diff, and run `npm run lint`, `npm run build`, and `git diff --check` in the
   hub. Publish through the existing safe push to `origin/main`.
6. Verify both catalogue sections, the React Chess card launch, a legal human
   move and undo, an easy bot reply, and mobile layout on the deployed hub.

This archive intentionally stays at the selected historical game version.
`source.json` records its provenance, build versions, and hosting adaptations.
The original version can retain its bot-thinking state when switching from a
human game to bot mode during Black's turn. Close and reopen React Chess before
starting a bot game in that situation; the historical game code is preserved.
