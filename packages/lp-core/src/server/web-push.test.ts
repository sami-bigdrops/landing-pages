import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { isValidWebPushPayload, PUSH_SERVICE_WORKER_SOURCE } from '../server/push-sw';
import {
  isValidPushSubscription,
  getVapidConfig,
  sendWebPush,
  isAuthorizedPushSend,
  signWebPushBody,
  isModelBWebPush,
} from '../server/web-push';

vi.mock('web-push', () => ({
  default: {
    setVapidDetails: vi.fn(),
    sendNotification: vi.fn(async () => ({ statusCode: 201 })),
  },
}));

describe('push-sw', () => {
  it('includes push and notificationclick handlers', () => {
    expect(PUSH_SERVICE_WORKER_SOURCE).toContain("addEventListener('push'");
    expect(PUSH_SERVICE_WORKER_SOURCE).toContain(
      "addEventListener('notificationclick'"
    );
    expect(PUSH_SERVICE_WORKER_SOURCE).toContain('image: payload.image');
    expect(PUSH_SERVICE_WORKER_SOURCE).toContain(
      'Never rewrite absolute URLs to the LP origin'
    );
  });

  it('validates web push payload', () => {
    expect(isValidWebPushPayload({ title: 'Hello' })).toBe(true);
    expect(isValidWebPushPayload({ title: '' })).toBe(false);
    expect(isValidWebPushPayload(null)).toBe(false);
  });
});

describe('web-push server helpers', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    delete process.env.VAPID_PRIVATE_KEY;
    delete process.env.VAPID_SUBJECT;
    delete process.env.WEB_PUSH_SEND_SECRET;
    delete process.env.WEB_PUSH_MODEL;
    delete process.env.WEB_PUSH_SUBSCRIBE_URL;
    delete process.env.WEB_PUSH_WEBHOOK_SECRET;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  it('validates subscription shape', () => {
    expect(
      isValidPushSubscription({
        endpoint: 'https://example.com',
        keys: { p256dh: 'a', auth: 'b' },
      })
    ).toBe(true);
    expect(isValidPushSubscription({ endpoint: 'https://example.com' })).toBe(
      false
    );
  });

  it('returns null vapid config when keys missing', () => {
    expect(getVapidConfig()).toBeNull();
  });

  it('reads vapid config from env', () => {
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY = 'public';
    process.env.VAPID_PRIVATE_KEY = 'private';
    process.env.VAPID_SUBJECT = 'mailto:test@example.com';
    expect(getVapidConfig()).toEqual({
      publicKey: 'public',
      privateKey: 'private',
      subject: 'mailto:test@example.com',
    });
  });

  it('sendWebPush fails without vapid', async () => {
    const result = await sendWebPush({
      subscription: {
        endpoint: 'https://example.com',
        keys: { p256dh: 'a', auth: 'b' },
      },
      payload: { title: 'Hi' },
    });
    expect(result).toEqual({ ok: false, reason: 'missing_vapid' });
  });

  it('sendWebPush succeeds with mocked web-push', async () => {
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY = 'public';
    process.env.VAPID_PRIVATE_KEY = 'private';
    const result = await sendWebPush({
      subscription: {
        endpoint: 'https://example.com',
        keys: { p256dh: 'a', auth: 'b' },
      },
      payload: { title: 'Hi', body: 'There' },
    });
    expect(result).toEqual({ ok: true, statusCode: 201 });
  });

  it('authorizes send requests with secret header', () => {
    process.env.WEB_PUSH_SEND_SECRET = 'secret';
    const ok = new Request('https://example.com', {
      headers: { 'x-web-push-secret': 'secret' },
    });
    const bad = new Request('https://example.com', {
      headers: { 'x-web-push-secret': 'nope' },
    });
    expect(isAuthorizedPushSend(ok)).toBe(true);
    expect(isAuthorizedPushSend(bad)).toBe(false);
  });

  it('signs webhook bodies with HMAC-SHA256', () => {
    const signature = signWebPushBody('secret', '{"a":1}');
    expect(signature.startsWith('sha256=')).toBe(true);
    expect(signature).toBe(signWebPushBody('secret', '{"a":1}'));
    expect(signature).not.toBe(signWebPushBody('secret', '{"a":2}'));
  });

  it('detects Model B from WEB_PUSH_MODEL or Arohaa subscribe URL', () => {
    expect(isModelBWebPush()).toBe(false);
    process.env.WEB_PUSH_MODEL = 'B';
    expect(isModelBWebPush()).toBe(true);
    process.env.WEB_PUSH_MODEL = 'A';
    process.env.WEB_PUSH_SUBSCRIBE_URL =
      'https://api.arohaa.net/v1/web-push/subscriptions';
    expect(isModelBWebPush()).toBe(false);
    delete process.env.WEB_PUSH_MODEL;
    expect(isModelBWebPush()).toBe(true);
  });
});
