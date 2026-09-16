'use client';

import type {
  PushEnableResult,
  PushSubscriptionJSON,
  PushDisableResult,
  WebPushClientContext,
} from '../model/notification';
import {
  PUSH_SUBSCRIBE_PATH,
  PUSH_SW_PATH,
  PUSH_UNSUBSCRIBE_PATH,
  PUSH_VAPID_PUBLIC_KEY_PATH,
  VAPID_PUBLIC_KEY_ENV,
} from '../model/notification';
import {
  getNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
} from './browser-notification';
import {
  clearStoredPushEndpoint,
  getPushClientContext,
  persistPushEndpoint,
} from './push-context';
import { reportPushLifecycleEvent } from './push-lifecycle';

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    isNotificationSupported() &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

/** Safari-safe VAPID public key decoder (url-safe base64 → Uint8Array). */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

export function subscriptionToJSON(
  subscription: PushSubscription
): PushSubscriptionJSON | null {
  const json = subscription.toJSON();
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    return null;
  }
  return {
    endpoint: json.endpoint,
    expirationTime: json.expirationTime ?? null,
    keys: {
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
  };
}

export async function registerPushServiceWorker(
  scriptUrl: string = PUSH_SW_PATH
): Promise<ServiceWorkerRegistration | null> {
  if (!isPushSupported()) return null;
  try {
    return await navigator.serviceWorker.register(scriptUrl, { scope: '/' });
  } catch {
    return null;
  }
}

async function resolveVapidPublicKey(): Promise<string> {
  // Prefer live API on the client so keys work even if the dev server
  // started before NEXT_PUBLIC_* was added to .env.
  try {
    const response = await fetch(PUSH_VAPID_PUBLIC_KEY_PATH, {
      method: 'GET',
      cache: 'no-store',
    });
    if (response.ok) {
      const data = (await response.json()) as { publicKey?: string };
      const fromApi = data.publicKey?.trim() ?? '';
      if (fromApi) return fromApi;
    }
  } catch {
    /* fall through to env */
  }

  return typeof process !== 'undefined'
    ? process.env[VAPID_PUBLIC_KEY_ENV]?.trim() ?? ''
    : '';
}

async function syncSubscription(
  path: string,
  subscription: PushSubscriptionJSON,
  context?: WebPushClientContext
): Promise<boolean> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription,
        context: context ?? getPushClientContext(),
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function getCurrentPushSubscription(): Promise<PushSubscriptionJSON | null> {
  if (!isPushSupported()) return null;
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return null;
    return subscriptionToJSON(subscription);
  } catch {
    return null;
  }
}

export async function enableBrowserPush(): Promise<PushEnableResult> {
  if (!isPushSupported()) {
    return { ok: false, reason: 'unsupported' };
  }

  try {
    const registration = await registerPushServiceWorker();
    if (!registration) {
      return { ok: false, reason: 'unsupported', message: 'Service worker registration failed' };
    }

    await navigator.serviceWorker.ready;

    let permission = getNotificationPermission();
    if (permission === 'default') {
      permission = await requestNotificationPermission();
    }
    if (permission === 'denied') {
      return { ok: false, reason: 'denied' };
    }
    if (permission !== 'granted') {
      return { ok: false, reason: 'unsupported' };
    }

    const vapidPublicKey = await resolveVapidPublicKey();
    if (!vapidPublicKey) {
      return { ok: false, reason: 'missing_vapid' };
    }

    const existing = await registration.pushManager.getSubscription();
    const pushSubscription =
      existing ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          vapidPublicKey
        ) as BufferSource,
      }));

    const json = subscriptionToJSON(pushSubscription);
    if (!json) {
      return { ok: false, reason: 'subscribe_failed' };
    }

    persistPushEndpoint(json.endpoint);
    const synced = await syncSubscription(PUSH_SUBSCRIBE_PATH, json);
    if (synced) {
      void reportPushLifecycleEvent('push_subscribed', {
        subscription_endpoint: json.endpoint,
      });
    }
    return { ok: true, subscription: json };
  } catch (error) {
    return {
      ok: false,
      reason: 'error',
      message: error instanceof Error ? error.message : 'Failed to enable push',
    };
  }
}

export async function disableBrowserPush(): Promise<PushDisableResult> {
  if (!isPushSupported()) {
    return { ok: false, reason: 'unsupported' };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      clearStoredPushEndpoint();
      return { ok: true };
    }

    const json = subscriptionToJSON(subscription);
    await subscription.unsubscribe();
    if (json) {
      await syncSubscription(PUSH_UNSUBSCRIBE_PATH, json);
      void reportPushLifecycleEvent('unsubscribe', {
        subscription_endpoint: json.endpoint,
      });
    }
    clearStoredPushEndpoint();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: 'error',
      message: error instanceof Error ? error.message : 'Failed to disable push',
    };
  }
}

export async function resyncPushSubscriptionIfGranted(): Promise<PushSubscriptionJSON | null> {
  if (!isPushSupported()) return null;
  if (getNotificationPermission() !== 'granted') return null;

  try {
    await registerPushServiceWorker();
    const existing = await getCurrentPushSubscription();
    if (existing) {
      persistPushEndpoint(existing.endpoint);
      await syncSubscription(PUSH_SUBSCRIBE_PATH, existing);
      return existing;
    }

    // Permission can be granted without an active PushSubscription.
    const enabled = await enableBrowserPush();
    return enabled.ok ? enabled.subscription : null;
  } catch {
    return null;
  }
}
