import { getCookie } from "@workspace/lp-core"

export const TRACKING_COOKIE_DAYS = 30

export const ZIP_COOKIE_NAME = "zipCode"

export const INSURLII_TRACKING_PARAMS = [
  { urlParam: "tid", cookieName: "tid", label: "transaction_id" },
  { urlParam: "uid", cookieName: "uid", label: "transaction_id" },
  { urlParam: "sid", cookieName: "sid", label: "affiliate_id" },
  { urlParam: "sub1", cookieName: "sub1", label: "sub1" },
  { urlParam: "zip", cookieName: ZIP_COOKIE_NAME, label: "zip" },
] as const

export type InsurliiTrackingParams = {
  tid: string
  uid: string
  sid: string
  sub1: string
  zip: string
}

const EMPTY_TRACKING: InsurliiTrackingParams = {
  tid: "",
  uid: "",
  sid: "",
  sub1: "",
  zip: "",
}

export function normalizeTrackingZip(zip: string | null | undefined): string {
  return (zip ?? "").replace(/\D/g, "").slice(0, 5)
}

export function toLeadSubids(tracking: InsurliiTrackingParams) {
  return {
    subid1: tracking.sid,
    subid2: tracking.tid || tracking.uid,
    subid3: tracking.sub1,
  }
}

export function getInsurliiTrackingFromCookies(): InsurliiTrackingParams {
  if (typeof document === "undefined") return { ...EMPTY_TRACKING }

  const tid = getCookie("tid")
  const uid = getCookie("uid")

  return {
    tid: tid || uid,
    uid: uid || tid,
    sid: getCookie("sid"),
    sub1: getCookie("sub1"),
    zip: normalizeTrackingZip(getCookie(ZIP_COOKIE_NAME)),
  }
}
