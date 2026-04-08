import { Suspense } from "react"
import type { Metadata } from "next"
import { ThankYouContent } from "@workspace/bdmg-component"
import { THANKYOU_CONTENT } from "@/lib/constant"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"

const PLACEHOLDER_PHONE = "(1800) XXX - XXXX"

export const metadata: Metadata = {
  title: "Thank You (Test) | Home Warranty Assuritii",
  description: "Test thank-you page with placeholder phone and ads.",
}

function ThankYouLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-gray-600" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </main>
  )
}

export default function TestThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar contactLabel={PLACEHOLDER_PHONE} contactHref="#" />
      <Suspense fallback={<ThankYouLoading />}>
        <>
        <ThankYouContent
          variant="2"
          title={THANKYOU_CONTENT.title}
          subtitle={THANKYOU_CONTENT.subtitle}
          showBuyerLogo={false}
          confirmationTitle={THANKYOU_CONTENT.confirmationTitle}
          confirmationDescription={THANKYOU_CONTENT.confirmationDescription}
          contactTitle={THANKYOU_CONTENT.contactTitle}
          contactPhoneLabel={PLACEHOLDER_PHONE}
          contactPhoneHref="#"
          redirectPath="/test"
          sendWelcomeEmail={false}
          validateAccessApiPath="/api/test-thankyou-validate"
          ads={[]}
        />
        <section
          aria-label="Ads placeholder"
          className="border-t border-[#e2e8f0] bg-white px-4 py-10 sm:px-6 sm:py-14"
        >
          <div className="mx-auto w-full max-w-4xl">
            <div className="flex items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-12 px-6">
              <p className="text-center text-[1rem] font-medium text-[#475569] font-sans">
                &lt;PARTNER / ADS LOGOS&gt;
              </p>
            </div>
          </div>
        </section>
        </>
      </Suspense>
      <Footer />
    </div>
  )
}
