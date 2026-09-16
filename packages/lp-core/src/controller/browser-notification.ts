import type {
  BrowserNotificationOptions,
  NotificationPermissionState,
  ShowNotificationResult,
} from '../model/notification';

function mapPermission(
  permission: NotificationPermission
): NotificationPermissionState {
  if (permission === 'granted') return 'granted';
  if (permission === 'denied') return 'denied';
  return 'default';
}

export function isNotificationSupported(): boolean {
  return typeof globalThis.Notification !== 'undefined';
}

export function getNotificationPermission(): NotificationPermissionState {
  if (!isNotificationSupported()) return 'unsupported';
  return mapPermission(Notification.permission);
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (!isNotificationSupported()) return 'unsupported';

  try {
    const result = await Notification.requestPermission();
    return mapPermission(result);
  } catch {
    return getNotificationPermission();
  }
}

export function showBrowserNotification(
  title: string,
  options?: BrowserNotificationOptions
): ShowNotificationResult {
  if (!isNotificationSupported()) {
    return { ok: false, reason: 'unsupported' };
  }

  const permission = getNotificationPermission();
  if (permission === 'denied') {
    return { ok: false, reason: 'denied' };
  }
  if (permission === 'default') {
    return { ok: false, reason: 'default' };
  }
  if (permission !== 'granted') {
    return { ok: false, reason: 'unsupported' };
  }

  try {
    const { onClick, ...notificationOptions } = options ?? {};
    const notification = new Notification(title, notificationOptions);
    if (onClick) {
      notification.onclick = onClick;
    }
    return { ok: true, notification };
  } catch {
    return { ok: false, reason: 'error' };
  }
}
