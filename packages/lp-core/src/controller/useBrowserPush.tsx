'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type {
  NotificationPermissionState,
  PushDisableResult,
  PushEnableResult,
  PushSubscriptionJSON,
  UseBrowserPushResult,
  WebPushClientContext,
  WebPushLifecycleEventName,
} from '../model/notification';
import {
  disableBrowserPush,
  enableBrowserPush,
  getCurrentPushSubscription,
  isPushSupported,
  registerPushServiceWorker,
  resyncPushSubscriptionIfGranted,
} from './push-subscription';
import { getNotificationPermission } from './browser-notification';
import { setPushContextExtras } from './push-context';
import {
  reportPushLifecycleEvent,
  usePushLifecycleReporter,
} from './push-lifecycle';

export const BrowserPushContext = createContext<UseBrowserPushResult | null>(
  null
);

function useBrowserPushState(enabled: boolean): UseBrowserPushResult {
  const [isSupported, setIsSupported] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermissionState>('unsupported');
  const [subscription, setSubscription] = useState<PushSubscriptionJSON | null>(
    null
  );

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    async function bootstrap() {
      const supported = isPushSupported();
      if (!cancelled) {
        setIsSupported(supported);
        setPermission(getNotificationPermission());
      }
      if (!supported) {
        if (!cancelled) setIsReady(true);
        return;
      }

      await registerPushServiceWorker();
      const current = await resyncPushSubscriptionIfGranted();
      const existing = current ?? (await getCurrentPushSubscription());

      if (!cancelled) {
        setPermission(getNotificationPermission());
        setSubscription(existing);
        setIsReady(true);
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  usePushLifecycleReporter(enabled);

  const enablePush = useCallback(async (): Promise<PushEnableResult> => {
    const result = await enableBrowserPush();
    setPermission(getNotificationPermission());
    if (result.ok) {
      setSubscription(result.subscription);
    }
    return result;
  }, []);

  const disablePush = useCallback(async (): Promise<PushDisableResult> => {
    const result = await disableBrowserPush();
    setPermission(getNotificationPermission());
    if (result.ok) {
      setSubscription(null);
    }
    return result;
  }, []);

  const reportPushEvent = useCallback(
    (
      event: WebPushLifecycleEventName,
      context?: Partial<WebPushClientContext>
    ): Promise<boolean> => reportPushLifecycleEvent(event, context),
    []
  );

  const setPushContext = useCallback(
    (extras: Partial<WebPushClientContext>): void => {
      setPushContextExtras(extras);
    },
    []
  );

  return {
    isSupported,
    permission,
    subscription,
    isReady,
    enablePush,
    disablePush,
    reportPushEvent,
    setPushContext,
  };
}

export function BrowserPushProviderInner({
  children,
}: {
  children?: ReactNode;
}) {
  const value = useBrowserPushState(true);
  return (
    <BrowserPushContext.Provider value={value}>
      {children}
    </BrowserPushContext.Provider>
  );
}

export function useBrowserPush(): UseBrowserPushResult {
  const context = useContext(BrowserPushContext);
  const standalone = useBrowserPushState(context == null);
  return context ?? standalone;
}
