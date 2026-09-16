'use client';

import { useEffect } from 'react';
import type {
  WebPushClientContext,
  WebPushLifecycleEventName,
} from '../model/notification';
import { PUSH_EVENTS_PATH } from '../model/notification';
import {
  getPushClientContext,
  getStoredPushEndpoint,
} from './push-context';

export async function reportPushLifecycleEvent(
  event: WebPushLifecycleEventName,
  extraContext?: Partial<WebPushClientContext>
): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const context = getPushClientContext(extraContext);
  const subscription_endpoint =
    getStoredPushEndpoint() ||
    (typeof extraContext?.subscription_endpoint === 'string'
      ? extraContext.subscription_endpoint
      : undefined);

  const body = {
    event,
    subscription_endpoint,
    wid: typeof context.wid === 'string' ? context.wid : undefined,
    occurred_at: new Date().toISOString(),
    context,
  };

  try {
    const response = await fetch(PUSH_EVENTS_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Reports page visibility / unload lifecycle events once a push endpoint exists.
 * Campaign triggers (page_hidden) and cancel-on (page_visible / form_success) depend on this.
 */
export function usePushLifecycleReporter(enabled: boolean): void {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    function hasEndpoint(): boolean {
      return Boolean(getStoredPushEndpoint());
    }

    function onVisibilityChange() {
      if (!hasEndpoint()) return;
      if (document.visibilityState === 'hidden') {
        void reportPushLifecycleEvent('page_hidden');
        return;
      }
      void reportPushLifecycleEvent('page_visible');
    }

    function onPageHide() {
      if (!hasEndpoint()) return;
      void reportPushLifecycleEvent('page_unload');
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [enabled]);
}
