export interface UtmParams {
  subid1: string;
  subid2: string;
  subid3: string;
}

export interface UtmParamMapping {
  urlParam: string;
  cookieName: string;
}

export interface UseUtmParamsOptions {
  cookieDays?: number;
  extra?: UtmParamMapping[];
}

export type UtmParamsResult = UtmParams & { extra?: Record<string, string> };

export const UTM_COOKIE_NAMES = {
  subid1: 'subid1',
  subid2: 'subid2',
  subid3: 'subid3',
} as const;

export const UTM_URL_PARAM_KEYS = {
  subid1: 'utm_source',
  subid2: 'utm_id',
  subid3: 'utm_s1',
} as const;

/** Partner / form hop aliases for the same values as UTM_URL_PARAM_KEYS */
export const UTM_URL_PARAM_ALIASES = {
  subid1: ['sid'] as const,
  subid2: ['tid', 'uid'] as const,
  subid3: ['sub1'] as const,
} as const;

export const DEFAULT_UTM_COOKIE_DAYS = 30;

/** Keys persisted in utm_params and shown in the UTM dashboard */
export const STORED_UTM_PARAM_KEYS = ['utm_source', 'utm_s1'] as const;

export type StoredUtmParamKey = (typeof STORED_UTM_PARAM_KEYS)[number];

export const STORED_UTM_COOKIE_ALIASES: Record<StoredUtmParamKey, string> = {
  utm_source: 'subid1',
  utm_s1: 'subid3',
};

/** Query keys persisted for Quotifii auto landing / email traffic */
export const QUOTIFII_TRACKING_QUERY_KEYS = [
  'utm_source',
  'utm_id',
  'utm_s1',
  'utm_medium',
  'utm_term',
  'utm_campaign',
] as const;

export type QuotifiiTrackingQueryKey = (typeof QUOTIFII_TRACKING_QUERY_KEYS)[number];

/** lp-core subid cookies mapped to DB / proxy query keys */
export const TRACKING_QUERY_COOKIE_ALIASES: Record<string, QuotifiiTrackingQueryKey> = {
  subid1: 'utm_source',
  subid2: 'utm_id',
  subid3: 'utm_s1',
};

export const QUOTIFII_EXTENDED_UTM_OPTIONS: UseUtmParamsOptions = {
  cookieDays: DEFAULT_UTM_COOKIE_DAYS,
  extra: [
    { urlParam: 'utm_medium', cookieName: 'utm_medium' },
    { urlParam: 'utm_term', cookieName: 'utm_term' },
    { urlParam: 'utm_campaign', cookieName: 'utm_campaign' },
  ],
};

export function sanitizeUtmParamValue(key: StoredUtmParamKey, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const delimiterIndex = trimmed.search(/[&?#]/);
  const candidate = (
    delimiterIndex === -1 ? trimmed : trimmed.slice(0, delimiterIndex)
  ).trim();
  if (!candidate) return '';

  if (/\butm_[a-z0-9_]+=/i.test(candidate)) return '';

  if (key === 'utm_source' && candidate.includes('=')) return '';

  return candidate;
}

export function isMalformedStoredUtmValue(key: string, value: string): boolean {
  if (key !== 'utm_source' && key !== 'utm_s1') return true;
  const sanitized = sanitizeUtmParamValue(key, value);
  return !sanitized || sanitized !== value.trim();
}
