export type BlockedUtmSets = {
  utm_source: Set<string>;
  utm_s1: Set<string>;
};

export type BlockedUtmResponse = {
  utm_source?: string[];
  utm_s1?: string[];
};

export const DEFAULT_UTM_DENIED_PATH = '/access-denied';

export function normalizeDeniedPath(path?: string): string {
  const normalized = (path?.trim() || DEFAULT_UTM_DENIED_PATH).replace(/\/+$/, '');
  if (!normalized) return DEFAULT_UTM_DENIED_PATH;
  return normalized.startsWith('/') ? normalized : `/${normalized}`;
}

export function isAccessDeniedPath(pathname: string, deniedPath?: string): boolean {
  const denied = normalizeDeniedPath(deniedPath);
  return pathname === denied || pathname.startsWith(`${denied}/`);
}

export function toBlockedUtmSets(data: BlockedUtmResponse): BlockedUtmSets {
  return {
    utm_source: new Set(
      (data.utm_source ?? [])
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean)
    ),
    utm_s1: new Set(
      (data.utm_s1 ?? [])
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean)
    ),
  };
}

export function isUtmBlocked(
  sets: BlockedUtmSets,
  utm_source: string,
  utm_s1: string
): boolean {
  const source = utm_source.trim().toLowerCase();
  const s1 = utm_s1.trim().toLowerCase();

  if (source && sets.utm_source.has(source)) return true;
  if (s1 && sets.utm_s1.has(s1)) return true;

  return false;
}
