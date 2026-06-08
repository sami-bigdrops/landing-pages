export function isThankYouEmailCheckEnabled(): boolean {
  return process.env.SET_THANKYOU_EMAIL_CHECK?.trim().toLowerCase() !== "false"
}
