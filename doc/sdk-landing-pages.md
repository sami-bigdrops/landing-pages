# SDK landing pages

## Next.js UTM blocking

Server-side UTM blocking is required for complete protection. The Arohaa SDK `useUtmBlockGuard` hook is a client-side backup only and does not run when JavaScript is disabled.

### Required setup

1. Add `proxy.ts` at the app root (Next.js 16) with `createUtmBlockMiddleware` from `@workspace/lp-core/middleware`.
2. Add `/access-denied` route (`app/access-denied/page.tsx`).
3. Keep `UtmBlockGuard` in providers as a client-side backup.

### Environment variables

| Variable | Description |
| --- | --- |
| `AROHAA_LANDING_PAGE_ID` or `NEXT_PUBLIC_AROHAA_WID` | SDK workspace ID (`data-wid` on the SDK script) |
| `NEXT_PUBLIC_AROHAA_INGEST_API_BASE` | API base URL (e.g. `https://api.arohaa.net`) |
| `AROHAA_UTM_DENIED_PATH` | Optional denied path (default `/access-denied`) |
