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

export const DEFAULT_UTM_COOKIE_DAYS = 30;

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
