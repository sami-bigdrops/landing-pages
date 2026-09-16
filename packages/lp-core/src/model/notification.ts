export type NotificationPermissionState =
  | 'unsupported'
  | 'default'
  | 'granted'
  | 'denied';

export type ShowNotificationFailureReason =
  | 'unsupported'
  | 'denied'
  | 'default'
  | 'error';

export interface BrowserNotificationOptions {
  body?: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
  data?: unknown;
  onClick?: (event: Event) => void;
}

export type ShowNotificationResult =
  | { ok: true; notification: Notification }
  | { ok: false; reason: ShowNotificationFailureReason };

export interface UseBrowserNotificationOptions {
  /**
   * When true, `notify` will request permission if the current state is `default`.
   * Defaults to false so LPs do not prompt unexpectedly.
   */
  autoRequest?: boolean;
}

export interface UseBrowserNotificationResult {
  isSupported: boolean;
  permission: NotificationPermissionState;
  requestPermission: () => Promise<NotificationPermissionState>;
  notify: (
    title: string,
    options?: BrowserNotificationOptions
  ) => Promise<ShowNotificationResult>;
}

export const PUSH_SW_PATH = '/lp-push-sw';
export const PUSH_SUBSCRIBE_PATH = '/api/push/subscribe';
export const PUSH_UNSUBSCRIBE_PATH = '/api/push/unsubscribe';
export const PUSH_SEND_PATH = '/api/push/send';
export const PUSH_EVENTS_PATH = '/api/push/events';
export const PUSH_VAPID_PUBLIC_KEY_PATH = '/api/push/vapid-public-key';

export const VAPID_PUBLIC_KEY_ENV = 'NEXT_PUBLIC_VAPID_PUBLIC_KEY';
export const VAPID_PRIVATE_KEY_ENV = 'VAPID_PRIVATE_KEY';
export const VAPID_SUBJECT_ENV = 'VAPID_SUBJECT';
export const AROHAA_WID_ENV = 'NEXT_PUBLIC_AROHAA_WID';
export const WEB_PUSH_SUBSCRIBE_URL_ENV = 'WEB_PUSH_SUBSCRIBE_URL';
export const WEB_PUSH_UNSUBSCRIBE_URL_ENV = 'WEB_PUSH_UNSUBSCRIBE_URL';
export const WEB_PUSH_EVENTS_URL_ENV = 'WEB_PUSH_EVENTS_URL';
export const WEB_PUSH_WEBHOOK_SECRET_ENV = 'WEB_PUSH_WEBHOOK_SECRET';
export const WEB_PUSH_SEND_SECRET_ENV = 'WEB_PUSH_SEND_SECRET';
export const WEB_PUSH_MODEL_ENV = 'WEB_PUSH_MODEL';

export const PUSH_ENDPOINT_STORAGE_KEY = 'arohaa_web_push_endpoint';
export const PUSH_SESSION_STORAGE_KEY = 'arohaa_web_push_session_id';
export const PUSH_CONTEXT_EXTRAS_STORAGE_KEY = 'arohaa_web_push_context_extras';

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface PushSubscriptionJSON {
  endpoint: string;
  expirationTime?: number | null;
  keys: PushSubscriptionKeys;
}

export interface WebPushClientContext {
  wid?: string;
  origin?: string;
  page_url?: string;
  page_path?: string;
  timezone?: string;
  session_id?: string;
  zip?: string;
  step?: number;
  [key: string]: unknown;
}

export type WebPushLifecycleEventName =
  | 'page_hidden'
  | 'page_visible'
  | 'page_unload'
  | 'form_success'
  | 'push_subscribed'
  | 'unsubscribe'
  | (string & {});

export interface WebPushPayload {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  url?: string;
  requireInteraction?: boolean;
  data?: Record<string, unknown>;
}

export type PushEnableResult =
  | { ok: true; subscription: PushSubscriptionJSON }
  | {
      ok: false;
      reason:
        | 'unsupported'
        | 'denied'
        | 'missing_vapid'
        | 'subscribe_failed'
        | 'error';
      message?: string;
    };

export type PushDisableResult =
  | { ok: true }
  | {
      ok: false;
      reason: 'unsupported' | 'error';
      message?: string;
    };

export interface UseBrowserPushResult {
  isSupported: boolean;
  permission: NotificationPermissionState;
  subscription: PushSubscriptionJSON | null;
  isReady: boolean;
  enablePush: () => Promise<PushEnableResult>;
  disablePush: () => Promise<PushDisableResult>;
  reportPushEvent: (
    event: WebPushLifecycleEventName,
    context?: Partial<WebPushClientContext>
  ) => Promise<boolean>;
  setPushContext: (extras: Partial<WebPushClientContext>) => void;
}
