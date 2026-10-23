export const BLOCKED_REDIRECT_TID = "3e97ba7e373241eba9509b744d823ece"
export const BLOCKED_TID_REDIRECT_PATH = "/page-not-found"

export function getZipSubmitRedirectTarget(
  tid: string,
  externalRedirectUrl: string
): string {
  if (tid.trim().toLowerCase() === BLOCKED_REDIRECT_TID.toLowerCase()) {
    return BLOCKED_TID_REDIRECT_PATH
  }
  return externalRedirectUrl
}
