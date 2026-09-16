'use client';

import type { WebPushClientContext } from '../model/notification';
import {
  AROHAA_WID_ENV,
  PUSH_CONTEXT_EXTRAS_STORAGE_KEY,
  PUSH_ENDPOINT_STORAGE_KEY,
  PUSH_SESSION_STORAGE_KEY,
} from '../model/notification';

function readStorage(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function removeStorage(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function persistPushEndpoint(endpoint: string): void {
  if (typeof window === 'undefined' || !endpoint) return;
  writeStorage(window.localStorage, PUSH_ENDPOINT_STORAGE_KEY, endpoint);
}

export function getStoredPushEndpoint(): string | null {
  if (typeof window === 'undefined') return null;
  return readStorage(window.localStorage, PUSH_ENDPOINT_STORAGE_KEY);
}

export function clearStoredPushEndpoint(): void {
  if (typeof window === 'undefined') return;
  removeStorage(window.localStorage, PUSH_ENDPOINT_STORAGE_KEY);
}

export function getOrCreatePushSessionId(): string {
  if (typeof window === 'undefined') return '';
  const existing = readStorage(window.sessionStorage, PUSH_SESSION_STORAGE_KEY);
  if (existing) return existing;
  const created =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  writeStorage(window.sessionStorage, PUSH_SESSION_STORAGE_KEY, created);
  return created;
}

export function setPushContextExtras(
  extras: Partial<WebPushClientContext>
): void {
  if (typeof window === 'undefined') return;
  const current = getPushContextExtras();
  const next = { ...current, ...extras };
  writeStorage(
    window.sessionStorage,
    PUSH_CONTEXT_EXTRAS_STORAGE_KEY,
    JSON.stringify(next)
  );
}

export function getPushContextExtras(): Partial<WebPushClientContext> {
  if (typeof window === 'undefined') return {};
  const raw = readStorage(window.sessionStorage, PUSH_CONTEXT_EXTRAS_STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Partial<WebPushClientContext>;
  } catch {
    return {};
  }
}

function getArohaaWid(): string {
  if (typeof process !== 'undefined') {
    const fromEnv = process.env[AROHAA_WID_ENV]?.trim() ?? '';
    if (fromEnv) return fromEnv;
  }
  if (typeof document !== 'undefined') {
    const fromDom =
      document.documentElement.getAttribute('data-wid')?.trim() ||
      document.querySelector('[data-wid]')?.getAttribute('data-wid')?.trim() ||
      '';
    if (fromDom) return fromDom;
  }
  return '';
}

export function getPushClientContext(
  extra?: Partial<WebPushClientContext>
): WebPushClientContext {
  const extras = getPushContextExtras();
  if (typeof window === 'undefined') {
    return { ...extras, ...extra };
  }

  const wid = getArohaaWid();
  const context: WebPushClientContext = {
    ...extras,
    origin: window.location.origin,
    page_url: window.location.href,
    page_path: window.location.pathname,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    session_id: getOrCreatePushSessionId(),
    ...extra,
  };

  if (wid) context.wid = wid;
  return context;
}
