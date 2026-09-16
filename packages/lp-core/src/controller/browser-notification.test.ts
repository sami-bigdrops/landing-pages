import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
  showBrowserNotification,
} from './browser-notification';

type MockNotificationInstance = {
  onclick: ((event: Event) => void) | null;
};

type MockNotificationConstructor = {
  new (
    title: string,
    options?: NotificationOptions
  ): MockNotificationInstance;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
};

describe('browser-notification', () => {
  const originalNotification = globalThis.Notification;

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalNotification === undefined) {
      // @ts-expect-error restore missing Notification
      delete globalThis.Notification;
    } else {
      globalThis.Notification = originalNotification;
    }
  });

  describe('when Notification is unsupported', () => {
    beforeEach(() => {
      // @ts-expect-error simulate unsupported environment
      delete globalThis.Notification;
    });

    it('reports unsupported', () => {
      expect(isNotificationSupported()).toBe(false);
      expect(getNotificationPermission()).toBe('unsupported');
    });

    it('requestPermission returns unsupported', async () => {
      await expect(requestNotificationPermission()).resolves.toBe(
        'unsupported'
      );
    });

    it('showBrowserNotification returns unsupported', () => {
      expect(showBrowserNotification('Hello')).toEqual({
        ok: false,
        reason: 'unsupported',
      });
    });
  });

  describe('when Notification is supported', () => {
    let MockNotification: MockNotificationConstructor;
    let constructed: Array<{
      title: string;
      options?: NotificationOptions;
      instance: MockNotificationInstance;
    }>;

    beforeEach(() => {
      constructed = [];
      MockNotification = class {
        static permission: NotificationPermission = 'default';
        static requestPermission = vi.fn(async () => {
          MockNotification.permission = 'granted';
          return 'granted' as NotificationPermission;
        });

        onclick: ((event: Event) => void) | null = null;

        constructor(title: string, options?: NotificationOptions) {
          constructed.push({ title, options, instance: this });
        }
      } as unknown as MockNotificationConstructor;

      globalThis.Notification =
        MockNotification as unknown as typeof Notification;
    });

    it('maps permission states', () => {
      MockNotification.permission = 'default';
      expect(getNotificationPermission()).toBe('default');

      MockNotification.permission = 'granted';
      expect(getNotificationPermission()).toBe('granted');

      MockNotification.permission = 'denied';
      expect(getNotificationPermission()).toBe('denied');
    });

    it('requestPermission forwards and returns mapped state', async () => {
      MockNotification.permission = 'default';
      await expect(requestNotificationPermission()).resolves.toBe('granted');
      expect(MockNotification.requestPermission).toHaveBeenCalledOnce();
      expect(getNotificationPermission()).toBe('granted');
    });

    it('requestPermission returns current permission when request throws', async () => {
      MockNotification.permission = 'default';
      MockNotification.requestPermission = vi.fn(async () => {
        throw new Error('blocked');
      });

      await expect(requestNotificationPermission()).resolves.toBe('default');
    });

    it('does not construct Notification when permission is default', () => {
      MockNotification.permission = 'default';
      expect(showBrowserNotification('Hello')).toEqual({
        ok: false,
        reason: 'default',
      });
      expect(constructed).toHaveLength(0);
    });

    it('does not construct Notification when permission is denied', () => {
      MockNotification.permission = 'denied';
      expect(showBrowserNotification('Hello')).toEqual({
        ok: false,
        reason: 'denied',
      });
      expect(constructed).toHaveLength(0);
    });

    it('constructs Notification when permission is granted', () => {
      MockNotification.permission = 'granted';
      const onClick = vi.fn();
      const result = showBrowserNotification('Hello', {
        body: 'World',
        icon: '/icon.png',
        tag: 'test',
        requireInteraction: true,
        data: { id: 1 },
        onClick,
      });

      expect(result.ok).toBe(true);
      expect(constructed).toHaveLength(1);
      expect(constructed[0]?.title).toBe('Hello');
      expect(constructed[0]?.options).toEqual({
        body: 'World',
        icon: '/icon.png',
        tag: 'test',
        requireInteraction: true,
        data: { id: 1 },
      });
      expect(constructed[0]?.instance.onclick).toBe(onClick);
    });

    it('returns error when Notification constructor throws', () => {
      MockNotification.permission = 'granted';
      globalThis.Notification = class {
        static permission: NotificationPermission = 'granted';
        static requestPermission = vi.fn(async () => 'granted' as const);
        constructor() {
          throw new Error('fail');
        }
      } as unknown as typeof Notification;

      expect(showBrowserNotification('Hello')).toEqual({
        ok: false,
        reason: 'error',
      });
    });
  });
});
