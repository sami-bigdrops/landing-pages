'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  isAccessDeniedPath,
  isUtmBlocked,
  normalizeDeniedPath,
  toBlockedUtmSets,
  type BlockedUtmResponse,
} from '../model/utm-block';
import {
  STORED_UTM_COOKIE_ALIASES,
  sanitizeUtmParamValue,
} from '../model/utm-params';
import { getCookie } from './cookie-utils';

export type UseUtmBlockGuardOptions = {
  pathname: string;
  wid?: string;
  apiBase?: string;
  deniedPath?: string;
};

function readUtmAttributionFromBrowser(): {
  utm_source: string;
  utm_s1: string;
} {
  if (typeof window === 'undefined') {
    return { utm_source: '', utm_s1: '' };
  }

  const urlParams = new URLSearchParams(window.location.search);
  let utm_source = sanitizeUtmParamValue(
    'utm_source',
    urlParams.get('utm_source') ?? ''
  );
  let utm_s1 = sanitizeUtmParamValue(
    'utm_s1',
    urlParams.get('utm_s1') ?? ''
  );

  if (!utm_source) {
    const raw =
      getCookie(STORED_UTM_COOKIE_ALIASES.utm_source) ??
      getCookie('utm_source') ??
      '';
    utm_source = sanitizeUtmParamValue('utm_source', raw);
  }

  if (!utm_s1) {
    const raw =
      getCookie(STORED_UTM_COOKIE_ALIASES.utm_s1) ?? getCookie('utm_s1') ?? '';
    utm_s1 = sanitizeUtmParamValue('utm_s1', raw);
  }

  return { utm_source, utm_s1 };
}

function readGuardConfig(options: UseUtmBlockGuardOptions): {
  wid: string;
  apiBase: string;
  deniedPath: string;
} | null {
  const wid =
    options.wid?.trim() ||
    process.env.NEXT_PUBLIC_AROHAA_WID?.trim() ||
    process.env.NEXT_PUBLIC_AROHAA_LANDING_PAGE_ID?.trim() ||
    '';
  const apiBase =
    options.apiBase?.trim() ||
    process.env.NEXT_PUBLIC_AROHAA_INGEST_API_BASE?.trim() ||
    '';

  if (!wid || !apiBase) {
    return null;
  }

  return {
    wid,
    apiBase,
    deniedPath: normalizeDeniedPath(options.deniedPath),
  };
}

export function useUtmBlockGuard(options: UseUtmBlockGuardOptions): void {
  const router = useRouter();
  const { pathname } = options;
  const deniedPath = normalizeDeniedPath(options.deniedPath);

  useEffect(() => {
    if (isAccessDeniedPath(pathname, deniedPath)) {
      return;
    }

    const config = readGuardConfig(options);
    if (!config) {
      return;
    }

    let cancelled = false;

    async function runGuard() {
      if (!config) return;

      const attribution = readUtmAttributionFromBrowser();
      const { wid, apiBase, deniedPath: guardDeniedPath } = config;

      try {
        const response = await fetch(
          `${apiBase.replace(/\/+$/, '')}/v1/utm-blocked?wid=${encodeURIComponent(wid)}`,
          { cache: 'default' }
        );

        if (!response.ok || cancelled) {
          return;
        }

        const data = (await response.json()) as BlockedUtmResponse;
        const blockedSets = toBlockedUtmSets(data);

        if (
          !cancelled &&
          isUtmBlocked(blockedSets, attribution.utm_source, attribution.utm_s1)
        ) {
          router.replace(guardDeniedPath);
        }
      } catch {
        // Fail open on client guard errors.
      }
    }

    void runGuard();

    return () => {
      cancelled = true;
    };
  }, [pathname, deniedPath, options, router]);
}
