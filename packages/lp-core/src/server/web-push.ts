import { createHmac } from 'node:crypto';
import webpush from 'web-push';
import type {
  PushSubscriptionJSON,
  WebPushClientContext,
  WebPushLifecycleEventName,
  WebPushPayload,
} from '../model/notification';
import {
  VAPID_PRIVATE_KEY_ENV,
  VAPID_PUBLIC_KEY_ENV,
  VAPID_SUBJECT_ENV,
  WEB_PUSH_EVENTS_URL_ENV,
  WEB_PUSH_MODEL_ENV,
  WEB_PUSH_SEND_SECRET_ENV,
  WEB_PUSH_SUBSCRIBE_URL_ENV,
  WEB_PUSH_UNSUBSCRIBE_URL_ENV,
  WEB_PUSH_WEBHOOK_SECRET_ENV,
} from '../model/notification';
import { isValidWebPushPayload } from './push-sw';

export interface VapidConfig {
  publicKey: string;
  privateKey: string;
  subject: string;
}

export type SendWebPushResult =
  | { ok: true; statusCode?: number }
  | {
      ok: false;
      reason:
        | 'missing_vapid'
        | 'invalid_subscription'
        | 'invalid_payload'
        | 'error';
      message?: string;
    };

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? '';
}

export function getVapidPublicKey(): string {
  return readEnv(VAPID_PUBLIC_KEY_ENV);
}

export function getVapidConfig(): VapidConfig | null {
  const publicKey = getVapidPublicKey();
  const privateKey = readEnv(VAPID_PRIVATE_KEY_ENV);
  const subject = readEnv(VAPID_SUBJECT_ENV) || 'mailto:support@example.com';

  if (!publicKey || !privateKey) return null;
  return { publicKey, privateKey, subject };
}

export function isValidPushSubscription(
  value: unknown
): value is PushSubscriptionJSON {
  if (!value || typeof value !== 'object') return false;
  const sub = value as Record<string, unknown>;
  if (typeof sub.endpoint !== 'string' || !sub.endpoint) return false;
  if (!sub.keys || typeof sub.keys !== 'object') return false;
  const keys = sub.keys as Record<string, unknown>;
  return typeof keys.p256dh === 'string' && typeof keys.auth === 'string';
}

export function signWebPushBody(secret: string, rawBody: string): string {
  const digest = createHmac('sha256', secret).update(rawBody).digest('hex');
  return `sha256=${digest}`;
}

/** Model B: Arohaa owns campaign delivery. Local /send is debug/fallback only. */
export function isModelBWebPush(): boolean {
  const model = readEnv(WEB_PUSH_MODEL_ENV).toUpperCase();
  if (model === 'B') return true;
  if (model === 'A') return false;
  const url = readEnv(WEB_PUSH_SUBSCRIBE_URL_ENV);
  return /(?:^|[/.])arohaa\.net(?:[/:]|$)/i.test(url);
}

function configureWebPush(config: VapidConfig): void {
  webpush.setVapidDetails(config.subject, config.publicKey, config.privateKey);
}

export async function sendWebPush(input: {
  subscription: PushSubscriptionJSON;
  payload: WebPushPayload;
}): Promise<SendWebPushResult> {
  const config = getVapidConfig();
  if (!config) {
    return { ok: false, reason: 'missing_vapid' };
  }
  if (!isValidPushSubscription(input.subscription)) {
    return { ok: false, reason: 'invalid_subscription' };
  }
  if (!isValidWebPushPayload(input.payload)) {
    return { ok: false, reason: 'invalid_payload' };
  }

  try {
    configureWebPush(config);
    const result = await webpush.sendNotification(
      {
        endpoint: input.subscription.endpoint,
        keys: {
          p256dh: input.subscription.keys.p256dh,
          auth: input.subscription.keys.auth,
        },
      },
      JSON.stringify(input.payload)
    );
    return { ok: true, statusCode: result.statusCode };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send push';
    return { ok: false, reason: 'error', message };
  }
}

async function postSignedWebhook(
  url: string,
  payload: unknown
): Promise<{ status: number; ok: boolean }> {
  const rawBody = JSON.stringify(payload);
  const secret = readEnv(WEB_PUSH_WEBHOOK_SECRET_ENV);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (secret) {
    headers['x-arohaa-web-push-signature'] = signWebPushBody(secret, rawBody);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: rawBody,
  });

  return { status: response.status, ok: response.ok };
}

export async function forwardSubscriptionWebhook(
  action: 'subscribe' | 'unsubscribe',
  subscription: PushSubscriptionJSON,
  context?: WebPushClientContext | null
): Promise<{ storage: 'webhook' | 'none'; status?: number; ok?: boolean }> {
  const subscribeUrl = readEnv(WEB_PUSH_SUBSCRIBE_URL_ENV);
  const unsubscribeUrl = readEnv(WEB_PUSH_UNSUBSCRIBE_URL_ENV);
  const url =
    action === 'unsubscribe'
      ? unsubscribeUrl || subscribeUrl
      : subscribeUrl;

  if (!url) {
    return { storage: 'none' };
  }

  const result = await postSignedWebhook(url, {
    action,
    subscription,
    context: context && typeof context === 'object' ? context : {},
  });

  if (!result.ok) {
    throw new Error(`Webhook ${action} failed with status ${result.status}`);
  }

  return { storage: 'webhook', status: result.status, ok: true };
}

export async function forwardWebPushEvent(input: {
  event: WebPushLifecycleEventName;
  subscription_endpoint?: string | null;
  wid?: string | null;
  occurred_at?: string;
  context?: WebPushClientContext | null;
}): Promise<{ forwarded: boolean; status?: number }> {
  const url = readEnv(WEB_PUSH_EVENTS_URL_ENV);
  if (!url) {
    return { forwarded: false };
  }

  const payload = {
    event: input.event,
    subscription_endpoint: input.subscription_endpoint ?? undefined,
    wid: input.wid ?? input.context?.wid ?? undefined,
    occurred_at: input.occurred_at ?? new Date().toISOString(),
    context: input.context && typeof input.context === 'object' ? input.context : {},
  };

  const result = await postSignedWebhook(url, payload);
  if (!result.ok) {
    throw new Error(`Webhook event failed with status ${result.status}`);
  }

  return { forwarded: true, status: result.status };
}

export function isAuthorizedPushSend(request: Request): boolean {
  const secret = readEnv(WEB_PUSH_SEND_SECRET_ENV);
  if (!secret) return false;
  return request.headers.get('x-web-push-secret') === secret;
}
