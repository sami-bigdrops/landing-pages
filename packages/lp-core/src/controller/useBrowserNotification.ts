'use client';

import { useEffect, useState } from 'react';
import type {
  BrowserNotificationOptions,
  NotificationPermissionState,
  ShowNotificationResult,
  UseBrowserNotificationOptions,
  UseBrowserNotificationResult,
} from '../model/notification';
import {
  getNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
  showBrowserNotification,
} from './browser-notification';

export function useBrowserNotification(
  options?: UseBrowserNotificationOptions
): UseBrowserNotificationResult {
  const autoRequest = options?.autoRequest ?? false;
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermissionState>('unsupported');

  useEffect(() => {
    setIsSupported(isNotificationSupported());
    setPermission(getNotificationPermission());
  }, []);

  async function requestPermission(): Promise<NotificationPermissionState> {
    const next = await requestNotificationPermission();
    setPermission(next);
    return next;
  }

  async function notify(
    title: string,
    notificationOptions?: BrowserNotificationOptions
  ): Promise<ShowNotificationResult> {
    let current = getNotificationPermission();

    if (autoRequest && current === 'default') {
      current = await requestNotificationPermission();
      setPermission(current);
    } else {
      setPermission(current);
    }

    return showBrowserNotification(title, notificationOptions);
  }

  return {
    isSupported,
    permission,
    requestPermission,
    notify,
  };
}
