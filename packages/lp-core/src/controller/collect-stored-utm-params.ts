import {
  STORED_UTM_COOKIE_ALIASES,
  STORED_UTM_PARAM_KEYS,
  sanitizeUtmParamValue,
} from '../model/utm-params';

export type TrackingParamReader = {
  getSearchParam: (key: string) => string | null | undefined;
  getCookie: (name: string) => string | null | undefined;
};

export function collectStoredUtmParams(
  reader: TrackingParamReader
): Map<string, string> {
  const collected = new Map<string, string>();

  for (const key of STORED_UTM_PARAM_KEYS) {
    const raw = reader.getSearchParam(key)?.trim();
    if (!raw) continue;
    const value = sanitizeUtmParamValue(key, raw);
    if (value) collected.set(key, value);
  }

  for (const key of STORED_UTM_PARAM_KEYS) {
    if (collected.has(key)) continue;
    const alias = STORED_UTM_COOKIE_ALIASES[key];
    const raw = reader.getCookie(alias)?.trim() || reader.getCookie(key)?.trim();
    if (!raw) continue;
    const value = sanitizeUtmParamValue(key, raw);
    if (value) collected.set(key, value);
  }

  return collected;
}
