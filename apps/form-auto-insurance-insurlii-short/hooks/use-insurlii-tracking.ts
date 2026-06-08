"use client"

import { useEffect, useState } from "react"
import { getCookie, setCookie } from "@workspace/lp-core"
import {
  INSURLII_TRACKING_PARAMS,
  normalizeTrackingZip,
  TRACKING_COOKIE_DAYS,
  type InsurliiTrackingParams,
} from "@/lib/tracking-params"

const EMPTY_TRACKING: InsurliiTrackingParams = {
  tid: "",
  uid: "",
  sid: "",
  sub1: "",
  zip: "",
}

function readFromCookies(): InsurliiTrackingParams {
  return {
    tid: getCookie("tid"),
    uid: getCookie("uid"),
    sid: getCookie("sid"),
    sub1: getCookie("sub1"),
    zip: normalizeTrackingZip(getCookie("zipCode")),
  }
}

export function useInsurliiTracking(): InsurliiTrackingParams {
  const [tracking, setTracking] = useState<InsurliiTrackingParams>(EMPTY_TRACKING)

  useEffect(() => {
    if (typeof window === "undefined") return

    const urlParams = new URLSearchParams(window.location.search)
    const next: InsurliiTrackingParams = { ...EMPTY_TRACKING }
    let hasUrlParams = false

    for (const { urlParam, cookieName } of INSURLII_TRACKING_PARAMS) {
      const fromUrl = urlParams.get(urlParam)?.trim() ?? ""
      if (!fromUrl) continue

      hasUrlParams = true
      const value =
        urlParam === "zip" ? normalizeTrackingZip(fromUrl) : fromUrl

      setCookie(cookieName, value, TRACKING_COOKIE_DAYS)

      if (urlParam === "tid") next.tid = value
      if (urlParam === "uid") next.uid = value
      if (urlParam === "sid") next.sid = value
      if (urlParam === "sub1") next.sub1 = value
      if (urlParam === "zip") next.zip = value
    }

    if (hasUrlParams) {
      const cleanUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname
      window.history.replaceState(window.history.state, document.title, cleanUrl)
    } else {
      Object.assign(next, readFromCookies())
    }

    if (!next.tid && next.uid) next.tid = next.uid
    if (!next.uid && next.tid) next.uid = next.tid

    setTracking(next)
  }, [])

  return tracking
}
