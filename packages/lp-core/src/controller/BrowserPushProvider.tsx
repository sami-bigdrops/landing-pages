'use client';

import type { ReactNode } from 'react';
import { BrowserPushProviderInner } from './useBrowserPush';

/**
 * Auto-wired push bootstrap for landing pages.
 * Registers the service worker, resyncs granted subscriptions, and reports
 * visibility lifecycle events once an endpoint exists.
 * Does not prompt for permission until `enablePush()` is called from a user gesture.
 */
export function BrowserPushProvider({ children }: { children?: ReactNode }) {
  return <BrowserPushProviderInner>{children}</BrowserPushProviderInner>;
}
