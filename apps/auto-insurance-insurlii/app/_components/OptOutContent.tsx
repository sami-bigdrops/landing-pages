import CcpaRequestForm from "@/app/_components/CcpaRequestForm"

export default function OptOutContent() {
  return (
    <section id="opt-out" className="p-5 md:p-8 lg:p-10 xl:px-16 2xl:px-20 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-6 font-inter">
          California Privacy Rights
        </h1>

        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#1e1e1e] font-inter">
          <p>
            Under the California Consumer Privacy Act (&quot;CCPA&quot;), California residents
            have the right to access, delete, and opt-out from the sale of their Personal
            Information.
          </p>

          <p>
            To file your CCPA request, please complete the form at the bottom of this page or
            call us at{" "}
            <a href="tel:0000000000" className="text-blue-600 hover:text-blue-800 underline">
              [PHONE_NUMBER]
            </a>
            . On receipt of your request, we may request additional information if we are unable
            to verify your identity based on comparing the information you submit with
            information we retain in our files, or if we believe additional information is
            needed to verify your identity. If you request to receive the specific pieces of
            Personal Information in our files about you, we will send you and require you to
            return a signed declaration, under penalty of perjury, verifying your identity and
            request.
          </p>

          <p>
            If you file a request to access or delete your Personal Information, we have 45 days
            to respond to your request. We may also inform you that we need up to 45 additional
            days to respond and the reason we need additional time. If you opt-out of the sale
            of your Personal Information, we have 15 days to process your opt-out request.
          </p>

          <p>
            If you are an authorized agent of a requesting consumer, you must provide a written
            authorization from the consumer or a copy of a lawful power of attorney that
            permits you to submit the request on the consumer&apos;s behalf. You may provide
            that written authorization to us via email at{" "}
            <a
              href="mailto:opt-out@insurlii.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              opt-out@insurlii.com
            </a>{" "}
            after submitting the request. We may contact you or the consumer on whose behalf you
            claim to act to verify your authorization.
          </p>

          <p>
            Additional information about how we collect, use, and disclose Personal Information,
            and methods by which you may contact us with questions, can be found in our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
              Privacy Policy
            </a>
            . You may find the answer you are looking for faster by reviewing the Privacy Policy
            than by submitting a request and waiting for our response.
          </p>

          <CcpaRequestForm primaryColor="#1E3A8A" />
        </div>
      </div>
    </section>
  )
}
