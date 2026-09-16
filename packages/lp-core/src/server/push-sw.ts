import type { WebPushPayload } from '../model/notification';

export const PUSH_SERVICE_WORKER_SOURCE = `/* lp-core web push service worker */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

function parsePayload(event) {
  if (!event.data) {
    return { title: 'Notification', body: '', url: '/' };
  }
  try {
    const data = event.data.json();
    return {
      title: typeof data.title === 'string' && data.title ? data.title : 'Notification',
      body: typeof data.body === 'string' ? data.body : '',
      icon: typeof data.icon === 'string' ? data.icon : undefined,
      badge: typeof data.badge === 'string' ? data.badge : undefined,
      image: typeof data.image === 'string' ? data.image : undefined,
      tag: typeof data.tag === 'string' ? data.tag : undefined,
      url: typeof data.url === 'string' && data.url ? data.url : '/',
      requireInteraction: Boolean(data.requireInteraction),
      data: data.data && typeof data.data === 'object' ? data.data : {},
    };
  } catch (_error) {
    const text = event.data.text();
    return { title: 'Notification', body: text || '', url: '/' };
  }
}

self.addEventListener('push', (event) => {
  const payload = parsePayload(event);
  const options = {
    body: payload.body,
    icon: payload.icon,
    badge: payload.badge,
    image: payload.image,
    tag: payload.tag,
    requireInteraction: payload.requireInteraction,
    data: Object.assign({ url: payload.url }, payload.data || {}),
  };
  event.waitUntil(self.registration.showNotification(payload.title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Prefer data.url as sent by Arohaa (may be masked https://api.arohaa.net/r/...).
  // Never rewrite absolute URLs to the LP origin.
  const rawUrl =
    (event.notification.data && event.notification.data.url) || '/';
  const targetUrl = typeof rawUrl === 'string' && rawUrl ? rawUrl : '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          if ('navigate' in client && targetUrl) {
            return client.navigate(targetUrl).then((navigated) => navigated || client.focus());
          }
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
      return undefined;
    })
  );
});
`;

export function createPushServiceWorkerResponse(): Response {
  return new Response(PUSH_SERVICE_WORKER_SOURCE, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Service-Worker-Allowed': '/',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

export async function GET(): Promise<Response> {
  return createPushServiceWorkerResponse();
}

export function isValidWebPushPayload(
  value: unknown
): value is WebPushPayload {
  if (!value || typeof value !== 'object') return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.title === 'string' && payload.title.trim().length > 0;
}
