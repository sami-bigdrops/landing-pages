export function fireBlutrckZipSubmitPixel(utmId: string) {
  if (typeof window === "undefined") return

  const url = new URL("https://www.blutrck.com/")
  url.searchParams.set("nid", "1687")
  url.searchParams.set("event_id", "2221")
  url.searchParams.set("transaction_id", utmId)

  const img = new Image()
  img.src = url.toString()
}
