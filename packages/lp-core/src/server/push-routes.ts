import {
  forwardSubscriptionWebhook,
  forwardWebPushEvent,
  getVapidPublicKey,
  isAuthorizedPushSend,
  isModelBWebPush,
  isValidPushSubscription,
  sendWebPush,
} from './web-push';
import { isValidWebPushPayload } from './push-sw';
import type {
  WebPushClientContext,
  WebPushLifecycleEventName,
} from '../model/notification';

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function readContext(body: unknown): WebPushClientContext | null {
  if (!body || typeof body !== 'object') return null;
  const context = (body as { context?: unknown }).context;
  if (!context || typeof context !== 'object') return null;
  return context as WebPushClientContext;
}

function readSubscription(body: unknown) {
  if (!body || typeof body !== 'object') return null;
  return (body as { subscription?: unknown }).subscription ?? body;
}

export async function GET_VAPID_PUBLIC_KEY(): Promise<Response> {
  // Model B: public key comes from Arohaa (NEXT_PUBLIC_VAPID_PUBLIC_KEY only).
  const publicKey = getVapidPublicKey();
  if (!publicKey) {
    return Response.json(
      { ok: false, reason: 'missing_vapid' },
      { status: 503 }
    );
  }
  return Response.json({ ok: true, publicKey });
}

export async function POST_SUBSCRIBE(request: Request): Promise<Response> {
  const body = await readJson(request);
  const subscription = readSubscription(body);
  const context = readContext(body);

  if (!isValidPushSubscription(subscription)) {
    return Response.json(
      { ok: false, reason: 'invalid_subscription' },
      { status: 400 }
    );
  }

  try {
    const storage = await forwardSubscriptionWebhook(
      'subscribe',
      subscription,
      context
    );
    return Response.json({ ok: true, ...storage });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to store subscription';
    return Response.json(
      { ok: false, reason: 'error', message },
      { status: 502 }
    );
  }
}

export async function POST_UNSUBSCRIBE(request: Request): Promise<Response> {
  const body = await readJson(request);
  const subscription = readSubscription(body);
  const context = readContext(body);

  if (!isValidPushSubscription(subscription)) {
    return Response.json(
      { ok: false, reason: 'invalid_subscription' },
      { status: 400 }
    );
  }

  try {
    const storage = await forwardSubscriptionWebhook(
      'unsubscribe',
      subscription,
      context
    );
    return Response.json({ ok: true, ...storage });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to remove subscription';
    return Response.json(
      { ok: false, reason: 'error', message },
      { status: 502 }
    );
  }
}

export async function POST_EVENTS(request: Request): Promise<Response> {
  const body = await readJson(request);
  if (!body || typeof body !== 'object') {
    return Response.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const payload = body as {
    event?: unknown;
    subscription_endpoint?: unknown;
    wid?: unknown;
    occurred_at?: unknown;
    context?: unknown;
  };

  if (typeof payload.event !== 'string' || !payload.event.trim()) {
    return Response.json({ ok: false, reason: 'invalid_event' }, { status: 400 });
  }

  const context =
    payload.context && typeof payload.context === 'object'
      ? (payload.context as WebPushClientContext)
      : null;

  try {
    const result = await forwardWebPushEvent({
      event: payload.event.trim() as WebPushLifecycleEventName,
      subscription_endpoint:
        typeof payload.subscription_endpoint === 'string'
          ? payload.subscription_endpoint
          : null,
      wid: typeof payload.wid === 'string' ? payload.wid : null,
      occurred_at:
        typeof payload.occurred_at === 'string' ? payload.occurred_at : undefined,
      context,
    });

    if (!result.forwarded) {
      return Response.json({ ok: true, forwarded: false, storage: 'none' });
    }

    return Response.json({ ok: true, forwarded: true, status: result.status });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to forward event';
    return Response.json(
      { ok: false, reason: 'error', message },
      { status: 502 }
    );
  }
}

/**
 * Model A / emergency local send only.
 * Disabled when WEB_PUSH_MODEL=B or subscribe URL points at Arohaa.
 */
export async function POST_SEND(request: Request): Promise<Response> {
  if (isModelBWebPush()) {
    return Response.json(
      {
        ok: false,
        reason: 'model_b',
        message:
          'Local /api/push/send is disabled for Model B. Arohaa owns campaign delivery.',
      },
      { status: 410 }
    );
  }

  if (!isAuthorizedPushSend(request)) {
    return Response.json({ ok: false, reason: 'unauthorized' }, { status: 401 });
  }

  const body = await readJson(request);
  if (!body || typeof body !== 'object') {
    return Response.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const { subscription, payload } = body as {
    subscription?: unknown;
    payload?: unknown;
  };

  if (!isValidPushSubscription(subscription)) {
    return Response.json(
      { ok: false, reason: 'invalid_subscription' },
      { status: 400 }
    );
  }
  if (!isValidWebPushPayload(payload)) {
    return Response.json(
      { ok: false, reason: 'invalid_payload' },
      { status: 400 }
    );
  }

  const result = await sendWebPush({ subscription, payload });
  if (!result.ok) {
    const status = result.reason === 'missing_vapid' ? 503 : 400;
    return Response.json(result, { status });
  }
  return Response.json(result);
}

/** Thin App Router-compatible handlers for per-app re-exports */
export const vapidPublicKeyHandlers = {
  GET: GET_VAPID_PUBLIC_KEY,
};

export const subscribeHandlers = {
  POST: POST_SUBSCRIBE,
};

export const unsubscribeHandlers = {
  POST: POST_UNSUBSCRIBE,
};

export const eventsHandlers = {
  POST: POST_EVENTS,
};

export const sendHandlers = {
  POST: POST_SEND,
};
