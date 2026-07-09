import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  isAccessDeniedPath,
  isUtmBlocked,
  normalizeDeniedPath,
  toBlockedUtmSets,
  type BlockedUtmResponse,
  type BlockedUtmSets,
} from '../model/utm-block';
import {
  STORED_UTM_COOKIE_ALIASES,
  sanitizeUtmParamValue,
} from '../model/utm-params';
import { parseCookieHeader } from './parse-cookies';

export type UtmAttribution = {
  utm_source: string;
  utm_s1: string;
};

export type UtmBlockMiddlewareConfig = {
  wid: string;
  apiBase: string;
  deniedPath?: string;
  matcher?: string[];
};

const EMPTY_BLOCKED_SETS: BlockedUtmSets = {
  utm_source: new Set(),
  utm_s1: new Set(),
};

let blockedSetsCache:
  | {
      wid: string;
      apiBase: string;
      expiresAt: number;
      sets: BlockedUtmSets;
    }
  | undefined;

export function readUtmAttributionFromRequest(request: Request): UtmAttribution {
  const url = new URL(request.url);
  const cookies = parseCookieHeader(request.headers.get('cookie') ?? '');

  let utm_source = sanitizeUtmParamValue(
    'utm_source',
    url.searchParams.get('utm_source') ?? ''
  );
  let utm_s1 = sanitizeUtmParamValue(
    'utm_s1',
    url.searchParams.get('utm_s1') ?? ''
  );

  if (!utm_source) {
    const raw =
      cookies[STORED_UTM_COOKIE_ALIASES.utm_source] ??
      cookies.utm_source ??
      '';
    utm_source = sanitizeUtmParamValue('utm_source', raw);
  }

  if (!utm_s1) {
    const raw =
      cookies[STORED_UTM_COOKIE_ALIASES.utm_s1] ?? cookies.utm_s1 ?? '';
    utm_s1 = sanitizeUtmParamValue('utm_s1', raw);
  }

  return { utm_source, utm_s1 };
}

export async function fetchBlockedUtmSets(
  apiBase: string,
  wid: string
): Promise<BlockedUtmSets> {
  const normalizedApiBase = apiBase.replace(/\/+$/, '');
  const normalizedWid = wid.trim();
  if (!normalizedApiBase || !normalizedWid) {
    return EMPTY_BLOCKED_SETS;
  }

  const now = Date.now();
  if (
    blockedSetsCache &&
    blockedSetsCache.wid === normalizedWid &&
    blockedSetsCache.apiBase === normalizedApiBase &&
    blockedSetsCache.expiresAt > now
  ) {
    return blockedSetsCache.sets;
  }

  try {
    const response = await fetch(
      `${normalizedApiBase}/v1/utm-blocked?wid=${encodeURIComponent(normalizedWid)}`,
      { next: { revalidate: 60 } } as RequestInit
    );

    if (!response.ok) {
      return EMPTY_BLOCKED_SETS;
    }

    const data = (await response.json()) as BlockedUtmResponse;
    const sets = toBlockedUtmSets(data);

    blockedSetsCache = {
      wid: normalizedWid,
      apiBase: normalizedApiBase,
      expiresAt: now + 60_000,
      sets,
    };

    return sets;
  } catch {
    return EMPTY_BLOCKED_SETS;
  }
}

export function resetBlockedUtmSetsCache(): void {
  blockedSetsCache = undefined;
}

export async function getUtmBlockRedirect(
  request: NextRequest,
  config: UtmBlockMiddlewareConfig
): Promise<NextResponse | null> {
  const deniedPath = normalizeDeniedPath(config.deniedPath);
  const { pathname } = request.nextUrl;

  if (isAccessDeniedPath(pathname, deniedPath)) {
    return null;
  }

  const wid = config.wid.trim();
  const apiBase = config.apiBase.trim();
  if (!wid || !apiBase) {
    return null;
  }

  const attribution = readUtmAttributionFromRequest(request);
  const blockedSets = await fetchBlockedUtmSets(apiBase, wid);

  if (!isUtmBlocked(blockedSets, attribution.utm_source, attribution.utm_s1)) {
    return null;
  }

  return NextResponse.redirect(new URL(deniedPath, request.url));
}

export function createUtmBlockMiddleware(config: UtmBlockMiddlewareConfig) {
  return async function utmBlockMiddleware(
    request: NextRequest
  ): Promise<NextResponse> {
    const redirect = await getUtmBlockRedirect(request, config);
    if (redirect) return redirect;
    return NextResponse.next();
  };
}

function readUtmBlockEnvConfig(): UtmBlockMiddlewareConfig | null {
  const wid =
    process.env.AROHAA_LANDING_PAGE_ID?.trim() ||
    process.env.NEXT_PUBLIC_AROHAA_WID?.trim() ||
    '';
  const apiBase =
    process.env.AROHAA_INGEST_API_BASE?.trim() ||
    process.env.NEXT_PUBLIC_AROHAA_INGEST_API_BASE?.trim() ||
    '';

  if (!wid || !apiBase) {
    return null;
  }

  return {
    wid,
    apiBase,
    deniedPath: process.env.AROHAA_UTM_DENIED_PATH,
  };
}

export async function utmBlockMiddleware(
  request: NextRequest
): Promise<NextResponse> {
  const config = readUtmBlockEnvConfig();
  if (!config) {
    return NextResponse.next();
  }

  return createUtmBlockMiddleware(config)(request);
}
