# Games Hub deployment

- Release branch: `main`.
- Git remote: `https://github.com/yigitefeoktar/game-hub.git`.
- Vercel project: `game-hub` (`prj_lxiTKsV6Tjhi5UDnVGGj7Y45wVa4`).
- Stable production URL: `https://game-hub-nu-three.vercel.app/`.
- Frontend: Vite/React; build with `npm run build`, output directory `dist`.
- Deployment manifest: `deployment.json` is absent. The hub is frontend only;
  no backend, Windows service, port, tunnel, or backend environment variable is enabled.

## Release and recovery

Inspect Git status and preserve unrelated work. Fetch `origin`, reconcile with
`origin/main`, run `npm run lint`, `npm run build`, and `git diff --check`.
Commit only authorized changes and push `main` without force-pushing. The existing
Vercel GitHub integration builds production from `main`; no repository CI workflow
or custom `vercel.json` is currently required.

Verify the successful production deployment references the exact pushed SHA and
has the stable domain assigned. If Instant Rollback leaves it staged, promote the
verified deployment before checking the public hub. Verify HTTP load, catalogue
sections, card artwork/status, and the intended game URL in the game overlay.

For recovery, revert the release commit on `main`, rerun checks, push, and verify
the resulting deployment. An existing Vercel deployment can be rolled back when
authorized; check domain assignment again afterward.

## Catalogue and limitations

Ordinary listings live in `START_HERE_GAMES`, `FIRST_GAMES`, and
`COMING_SOON_GAMES` in `src/App.tsx`. Preserve stable listing IDs and unrelated
metadata. Featured placement is separate in `FEATURED_GAMES`. Icons belong in
`public/icons/`. Games launch in an iframe; their availability and multiplayer
backends are owned by their individual projects, not this hub.

Use free services only; do not purchase domains. Historical game Google Cloud
billing was disabled on 2026-10-04 and automatic game triggers on 2026-10-03.
Preserve historical resources and credentials; do not re-enable billing/triggers
or use Cloud Run as a release fallback without an explicit user request.
