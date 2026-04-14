import { redirect } from "next/navigation"

export default async function ThankYouLegacyRedirect({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const email = sp.email
  const qs =
    typeof email === "string" ? `?email=${encodeURIComponent(email)}` : ""
  redirect(`/thankyou/adt${qs}`)
}
