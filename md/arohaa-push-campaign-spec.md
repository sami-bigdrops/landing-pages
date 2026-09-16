# Arohaa Web Push Campaign Spec

Handoff document for the Arohaa team and landing-pages implementers.

**Goal:** Arohaa owns all campaign configuration, VAPID private keys, and delivery timing for web push on landing pages. Each LP already has web-push plumbing (subscribe + service worker; optional local send). Arohaa is the control plane **and** the send plane (Model B): creatives, when to fire, who to target, where clicks go, and direct browser delivery.

---

## 1. Current LP capabilities (already built)

Each landing page exposes:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/push/vapid-public-key` | GET | Public VAPID key |
| `/api/push/subscribe` | POST | Save subscription (forwards to webhook if configured) |
| `/api/push/unsubscribe` | POST | Remove subscription |
| `/api/push/send` | POST | Optional local/fallback send (not used by Model B campaigns) |
| `/lp-push-sw` | GET | Service worker |

**Send auth (fallback Model A only):** header `x-web-push-secret: <WEB_PUSH_SEND_SECRET>`

**Payload fields already supported by SW** (and by LP send API if used):

```ts
{
  title: string;          // required
  body?: string;          // description
  icon?: string;          // absolute URL
  badge?: string;         // absolute URL
  image?: string;         // banner / large image absolute URL
  tag?: string;           // replaces older notif with same tag
  url?: string;           // click redirect (default "/")
  requireInteraction?: boolean;
  data?: Record<string, unknown>;
}
```

**Important:** LPs do **not** store subscriptions in a DB by default. They POST subscribe/unsubscribe to Arohaa via webhook. Campaign scheduling **and** `web-push` delivery live in Arohaa (Model B), not on the LP servers.

Canonical source in this monorepo: `packages/lp-core` (`push-routes.ts`, `push-sw.ts`, `web-push.ts`, `BrowserPushProvider`).

---

## 2. Recommended ownership split

| Concern | Owner |
|---------|--------|
| Permission prompt UX on LP | Landing pages |
| Browser PushManager subscribe | Landing pages |
| Subscription storage | **Arohaa** |
| Campaign UI (title, body, assets, schedule, URL) | **Arohaa** |
| Media upload / CDN URLs | **Arohaa** |
| Audience targeting / suppression | **Arohaa** |
| When to fire (delay, event, cron) | **Arohaa** |
| VAPID key storage (public + private) | **Arohaa** (per site / LP) |
| Actual browser delivery (`web-push`) | **Arohaa** (sends directly) |
| Click open / navigate | LP service worker |

### Delivery model (chosen): Model B

**Model B (this spec):** Arohaa stores subscriptions **and** VAPID private keys and sends directly via `web-push`. LPs only handle permission UX, subscribe/unsubscribe webhooks, and the service worker for display + click. Arohaa must manage secure per-site VAPID keys.

**Model A (not used):** Arohaa stores subscriptions + schedules jobs, then calls each LP’s `POST /api/push/send` with secret + payload. Kept only as a fallback reference if direct send is blocked.

This document assumes **Model B** end-to-end.

---

## 3. Arohaa product requirements (UI / config)

### 3.1 Campaign creative

| Field | Type | Notes |
|-------|------|-------|
| `title` | text, required | Max ~64 chars recommended |
| `body` | text | Description / subtitle |
| `icon` | upload **or** absolute URL | 192x192 PNG/WebP preferred |
| `badge` | upload **or** absolute URL | Monochrome, ~96x96 |
| `image` / banner | upload **or** absolute URL | Wide image; Android Chrome supports best |
| `tag` | optional string | e.g. `abandon-1`, `promo-summer` |
| `requireInteraction` | boolean | Keep notification until user acts (desktop) |

Uploads should become **HTTPS absolute CDN URLs**. The browser/SW cannot use relative paths reliably across origins.

### 3.2 Click / redirect URL

Support all of:

1. **Fixed URL** – `https://example.com/offer`
2. **LP relative path** – `/type/long/v1` (Arohaa or sender resolves to absolute using known LP origin)
3. **Template URL with dynamic params** – e.g.  
   `https://{lp_host}/?utm_source=push&utm_campaign={{campaign_id}}&zip={{zip}}&sid={{session_id}}`
4. **Auto-resume last URL (recommended)** – store `last_seen_url` (or full query string) on subscribe / heartbeat, and on send use that as click `url` with optional UTM append

**Suggested template variables:**

| Variable | Source |
|----------|--------|
| `{{lp_host}}` | Landing page domain |
| `{{landing_page_id}}` / `{{wid}}` | Arohaa LP id |
| `{{campaign_id}}` | Campaign |
| `{{subscription_id}}` | Stored sub id |
| `{{endpoint_hash}}` | Hash of push endpoint |
| `{{utm_*}}` | From last visit or campaign defaults |
| `{{zip}}`, `{{step}}`, etc. | From client context events |
| `{{last_url}}` | Last page user was on |

**Auto handling dynamic params (recommended approach):**

1. On subscribe (and optionally pageview), LP sends context: `page_url`, `query`, `utm`, `lp_id`, `session_id`, optional form fields.
2. Arohaa stores that against the subscription.
3. On send, Arohaa builds final `url` from template + stored context.
4. SW opens that URL as-is (already implemented on LPs).

No SW changes needed if Arohaa always sends a fully resolved absolute `url`.

### 3.3 When the notification fires (scheduling / triggers)

Arohaa should support these trigger types:

| Trigger | Example |
|---------|---------|
| **Delay after event** | 15m / 4h / 24h after `page_hidden` or `form_start` |
| **Event-based** | On `form_abandon`, `zip_submit`, `call_not_clicked` |
| **Absolute schedule** | Send at `2026-09-20T10:00:00Z` |
| **Recurring / drip** | Sequence of N pushes with delays + cancel rules |
| **Immediate / manual** | Admin “Send now” to segment or one sub |
| **TTL / expiry** | Don’t send if older than X hours |
| **Quiet hours** | Don’t send 22:00–08:00 user-local (needs timezone) |
| **Frequency cap** | Max N pushes / user / day |
| **Cancel conditions** | Cancel on `form_success`, `subscribe_revoked`, `page_visible_again` |

**Cancel / suppression events Arohaa should accept from LP:**

- `push_permission_granted` / `denied`
- `push_subscribed` / `unsubscribed`
- `form_start`, `form_step_view`, `form_submit`, `form_success`
- `page_visible`, `page_hidden`, `page_unload`
- `lead_submitted` (hard cancel abandon sequences)

### 3.4 Targeting

Per campaign:

- By `landing_page_id` / domain
- By subscription status (`active`)
- By last activity window
- By UTM / geo / device (if collected)
- Exclude converted (`form_success`)

### 3.5 Delivery status / analytics

Store and show:

- `queued` → `sent` → `delivered` (best-effort) → `clicked` / `dismissed` / `failed`
- Failure reasons: `410 gone` (expired sub), `401/403`, network, invalid payload
- Auto-prune expired subscriptions on `410` / `404` from web-push

For click tracking: either append tracking params in `url`, or use Arohaa redirect short-link as click URL that 302s to final destination.

---

## 4. API contract

### 4.1 Inbound from LP — subscription webhook

Configure each LP:

```
WEB_PUSH_SUBSCRIBE_URL=https://api.arohaa.net/v1/web-push/subscriptions
WEB_PUSH_UNSUBSCRIBE_URL=https://api.arohaa.net/v1/web-push/subscriptions
```

**Current LP webhook body:**

```json
{
  "action": "subscribe",
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/...",
    "expirationTime": null,
    "keys": { "p256dh": "...", "auth": "..." }
  }
}
```

`action` is `"subscribe"` or `"unsubscribe"`.

**Ask Arohaa to also accept an enriched body** (LP can be extended):

```json
{
  "action": "subscribe",
  "subscription": {
    "endpoint": "...",
    "expirationTime": null,
    "keys": { "p256dh": "...", "auth": "..." }
  },
  "context": {
    "landing_page_id": "lp_xxx",
    "wid": "uuid",
    "origin": "https://homequotes.example.com",
    "page_url": "https://homequotes.example.com/?utm_source=fb&zip=90210",
    "page_path": "/",
    "query": { "utm_source": "fb", "zip": "90210" },
    "user_agent": "...",
    "timezone": "America/Los_Angeles",
    "session_id": "..."
  }
}
```

### 4.2 Inbound from LP — context / lifecycle events (new)

```
POST https://api.arohaa.net/v1/web-push/events
```

```json
{
  "event": "page_hidden",
  "subscription_endpoint": "https://...",
  "landing_page_id": "lp_xxx",
  "occurred_at": "2026-09-15T18:20:00.000Z",
  "context": {
    "page_url": "...",
    "step": 2,
    "zip": "90210"
  }
}
```

Example `event` values: `page_hidden`, `page_visible`, `form_success`, `form_start`, etc.

Use these to schedule/cancel abandon sequences without putting timers on LP servers.

### 4.3 Outbound from Arohaa — direct web-push send (Model B)

Arohaa does **not** call LP `/api/push/send`. The send worker runs inside Arohaa:

1. Load stored subscription (`endpoint` + `keys`).
2. Load the VAPID key pair for that subscription’s `landing_page_id` / origin.
3. Call the browser push service with `web-push` (or equivalent) using the same payload shape LPs already support in the SW.

**Payload sent to the browser (encrypted):**

```json
{
  "title": "You're almost done",
  "body": "Finish your free home quote in 2 minutes",
  "icon": "https://cdn.arohaa.net/assets/.../icon.png",
  "badge": "https://cdn.arohaa.net/assets/.../badge.png",
  "image": "https://cdn.arohaa.net/assets/.../banner.png",
  "tag": "abandon-1",
  "url": "https://homequotes.example.com/?utm_source=push&utm_campaign=abandon1&zip=90210",
  "requireInteraction": false,
  "data": {
    "campaign_id": "cmp_123",
    "arohaa_click_id": "clk_456"
  }
}
```

**VAPID requirements in Arohaa:**

| Field | Notes |
|-------|--------|
| `vapid_public_key` | Must match `NEXT_PUBLIC_VAPID_PUBLIC_KEY` used when the browser subscribed |
| `vapid_private_key` | Stored only in Arohaa secrets; never on LP at runtime for Model B send |
| `vapid_subject` | e.g. `mailto:ops@arohaa.net` |
| Scope | Per `landing_page_id` / origin (or intentional shared key across LPs) |

**Send outcomes Arohaa must handle:**

- Success → mark `sent`
- `410` / `404` → mark subscription inactive and prune
- `401` / `403` → likely VAPID mismatch or revoked; alert + investigate key mapping
- Network / timeout → retry with backoff; respect campaign TTL

**Fallback (Model A, optional):** LP `POST /api/push/send` with `x-web-push-secret` remains available in `lp-core` if needed for debugging or emergency send, but production campaigns use Arohaa direct send.

### 4.4 Optional: Arohaa Campaign CRUD (internal)

```
POST   /v1/web-push/campaigns
GET    /v1/web-push/campaigns/:id
PATCH  /v1/web-push/campaigns/:id
POST   /v1/web-push/campaigns/:id/activate
POST   /v1/web-push/campaigns/:id/pause
```

Campaign object sketch:

```json
{
  "id": "cmp_123",
  "name": "Home quote abandon N1",
  "landing_page_ids": ["lp_xxx"],
  "creative": {
    "title": "...",
    "body": "...",
    "icon_url": "...",
    "badge_url": "...",
    "image_url": "...",
    "tag": "abandon-1",
    "require_interaction": false
  },
  "click": {
    "mode": "template",
    "url_template": "https://{{lp_host}}/?utm_source=push&utm_campaign={{campaign_id}}",
    "append_utms": { "utm_medium": "push", "utm_campaign": "abandon1" }
  },
  "trigger": {
    "type": "delay_after_event",
    "event": "page_hidden",
    "delay_ms": 1800000,
    "cancel_on": ["page_visible", "form_success", "unsubscribe"]
  },
  "limits": {
    "max_per_user_per_day": 2,
    "quiet_hours": { "start": "22:00", "end": "08:00", "tz": "user" },
    "ttl_ms": 86400000
  },
  "status": "draft"
}
```

`click.mode` values: `template` | `fixed` | `last_url`  
`status` values: `draft` | `active` | `paused`

---

## 5. Media guidelines

| Asset | Suggested size | Format | Notes |
|-------|----------------|--------|-------|
| Icon | 192×192 | PNG/WebP | Shown beside title |
| Badge | 96×96 | PNG (alpha) | Status bar; often monochrome |
| Banner (`image`) | ~720×480 or 2:1 | JPG/PNG/WebP | Not supported on all browsers/OS |
| All URLs | HTTPS absolute | CDN | Must be publicly reachable |

Provide upload UI **and** paste-URL option. Validate URL is HTTPS and reachable.

---

## 6. Security / multi-tenant

- Store `VAPID_PRIVATE_KEY` only in Arohaa (KMS / secrets manager); rotate with a re-subscribe plan when keys change
- Map each subscription to the exact VAPID pair used at subscribe time (mismatch → silent delivery failure)
- Webhook auth (HMAC signature or bearer token) — **recommend adding**; current LP webhook forward is plain POST
- Never expose `VAPID_PRIVATE_KEY` to browser or to LP client bundles
- Isolate subscriptions by `landing_page_id` / origin
- Rate-limit Arohaa send workers and webhook ingest
- Optional: keep LP `WEB_PUSH_SEND_SECRET` for emergency Model A fallback only; not required for Model B production path
- Do not send PII in notification body unless policy allows

---

## 7. Acceptance criteria (Arohaa)

1. Create campaign with title, body, icon/badge/banner (upload or URL).
2. Configure click URL (fixed / template / last URL + UTMs).
3. Configure trigger (delay after event + cancel rules).
4. LP user grants permission → subscription appears in Arohaa (with correct site / VAPID mapping).
5. User abandons → after delay, Arohaa sends directly via web-push; push arrives with correct creative.
6. Click opens correct URL with dynamic query params.
7. On `form_success`, pending sequence is cancelled.
8. Expired subscriptions are cleaned up after failed send.
9. Dashboard shows sent / failed / clicked counts.

---

## 8. Landing-pages project work (end-to-end)

### 8.1 Keep (already good)

1. Shared push stack in `packages/lp-core` (SW, routes, `BrowserPushProvider`).
2. Payload fields: `title`, `body`, `icon`, `badge`, `image`, `url`, `tag`, etc.
3. Auto-wired `/api/push/*` + `/lp-push-sw` on apps.

### 8.2 Configure per app (ops)

For every LP that should get Arohaa push (Model B):

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
WEB_PUSH_SUBSCRIBE_URL=https://api.arohaa.net/v1/web-push/subscriptions
WEB_PUSH_UNSUBSCRIBE_URL=https://api.arohaa.net/v1/web-push/subscriptions
```

**Arohaa** holds the matching private key + subject for that public key:

```
# Arohaa secrets (not on LP for Model B send)
VAPID_PUBLIC_KEY=...   # same as NEXT_PUBLIC_VAPID_PUBLIC_KEY on LP
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:...
```

LP may still keep `VAPID_PRIVATE_KEY` / `WEB_PUSH_SEND_SECRET` if `/api/push/send` stays deployed for fallback/debug; they are **not** on the Model B campaign path.

Use the **same VAPID key pair** across LPs only if intentional; otherwise per-LP keys with Arohaa storing which VAPID maps to which site. The public key on the LP at subscribe time **must** match the private key Arohaa uses to send.

Reference: `packages/lp-core/env.web-push.example`

### 8.3 Code changes to plan (after Arohaa agrees)

1. **Enrich subscribe webhook** – send `context` (lp id, page URL, UTMs, session) with subscription (today only `{ action, subscription }`).
2. **Lifecycle events to Arohaa** – `page_hidden` / `page_visible` / `form_success` so Arohaa schedules/cancels (replace in-memory abandon scheduler on LPs).
3. **Permission UX** – decide when to call `enablePush()` (on land, after zip, after first interaction); wire consistently, not only on one app.
4. **Optional webhook auth** – HMAC/bearer when posting to Arohaa.
5. **Optional click tracking** – if Arohaa uses redirect short links, no SW change; if SW-side ping is needed, that is an extra change.
6. **Remove / stop relying on** LP-local `schedule-abandon` for production once Arohaa owns timing (avoids double sends and lost jobs on serverless).

### 8.4 Do not reinvent in this monorepo

- Campaign UI
- Asset uploads
- Job queues / cron
- Audience DB

Those belong in Arohaa. This repo should stay: **collect permission → register subscription → report events → SW display/click**. Delivery is Arohaa’s job (Model B).

### 8.5 Suggested rollout

1. Hand Arohaa this spec; agree Model B + webhook/event shapes + VAPID key handoff.
2. Arohaa ships subscription store + per-site VAPID vault + campaign UI + direct `web-push` send worker.
3. Import/generate VAPID for pilot LP (`uncle-sam-buys-home-v2`); set matching `NEXT_PUBLIC_VAPID_PUBLIC_KEY` on LP; point webhooks at Arohaa; test subscribe → Arohaa manual send → click URL.
4. Add abandon event triggers; disable local abandon scheduler on that app.
5. Roll public VAPID + webhook env + permission UX to other LPs; register each site’s private key in Arohaa.

---

## 9. Summary

**Chosen delivery model: Model B** — Arohaa owns subscriptions, VAPID private keys, scheduling, and direct `web-push` delivery. LPs own permission UX, subscribe/unsubscribe webhooks, and the service worker.

LP stack already supports the notification **payload** Arohaa needs (`title`, `body`, `icon`, `badge`, `image`, `url`, etc.).

What is missing:

- Arohaa as subscription store + VAPID vault + campaign/scheduler + send worker
- Small LP changes to send richer subscribe context and lifecycle events
- Stop scheduling pushes locally once Arohaa owns timing
- Align each LP’s public VAPID with the private key stored in Arohaa
