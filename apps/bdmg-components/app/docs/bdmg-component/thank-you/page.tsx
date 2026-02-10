"use client"

import { Suspense } from "react"
import { ThankYouContent } from "@workspace/bdmg-component"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const thankYouProps = [
  { name: "title", type: "string", default: '"Thank you!"', required: false, description: "Main heading." },
  { name: "subtitle", type: "string", default: "(receipt message)", required: false, description: "Body text below the title." },
  { name: "showBuyerLogo", type: "boolean", default: "true", required: false, description: "Show buyer logo when buyer param is in URL." },
  { name: "buyerLogoPath", type: "(buyer: string) => string", default: "(slugified path)", required: false, description: "Function to build buyer logo image path." },
  { name: "confirmationTitle", type: "string", default: "(email sent title)", required: false, description: "Confirmation box title." },
  { name: "confirmationDescription", type: "string", default: "(inbox/spam text)", required: false, description: "Confirmation box description." },
  { name: "contactTitle", type: "string", default: '"For immediate assistance"', required: false, description: "Contact section heading." },
  { name: "contactPhoneLabel", type: "string", default: "1-(866)-495-1543", required: false, description: "Display text for phone number." },
  { name: "contactPhoneHref", type: "string", default: "tel:+18664951543", required: false, description: "tel: link for the phone number." },
  { name: "redirectPath", type: "string", default: '"/"', required: false, description: "Path to redirect when access is not authorized." },
  { name: "sendWelcomeEmail", type: "boolean", default: "false", required: false, description: "Call send email API when page is authorized." },
  { name: "sendEmailApiPath", type: "string", default: '"/api/send-email"', required: false, description: "API path for welcome email (POST with { email })." },
  { name: "validateAccessApiPath", type: "string | null", default: "null", required: false, description: "Optional API to validate access (cookie or token). POST with credentials or body." },
  { name: "useLocalStorageToken", type: "boolean", default: "false", required: false, description: "Check thankyou_token / thankyou_expires in localStorage for access." },
  { name: "ads", type: "ThankYouAd[]", default: "[]", required: false, description: "List of { image, link }. Use {{utm_source}}, {{utm_id}}, {{utm_s1}} in link." },
  { name: "adSectionTitle", type: "string", default: "-", required: false, description: "Optional title for the ads section." },
  { name: "utmCookieNames", type: "ThankYouUtmCookieNames", default: "subid1/subid2/subid3", required: false, description: "Cookie names for UTM source, id, s1." },
  { name: "formDataStorageKey", type: "string", default: '"form_data"', required: false, description: "localStorage key for email fallback when sending welcome email." },
  { name: "loadingFallback", type: "ReactNode", default: "-", required: false, description: "Custom loading UI instead of default spinner." },
]

export default function ThankYouDocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Thank You</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Reusable thank-you page content from <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@workspace/bdmg-component</code>. Handles access (URL email/buyer, optional token or cookie validation), UTM cookies, optional welcome email, and an optional ads section with UTM substitution in links. Must be used inside <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code> because it uses <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useSearchParams</code>.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { ThankYouContent } from "@workspace/bdmg-component"
import type { ThankYouContentProps, ThankYouAd } from "@workspace/bdmg-component"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <p className="text-muted-foreground mb-4">
          Render <code className="text-sm bg-muted px-1.5 py-0.5 rounded">ThankYouContent</code> inside <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code>. Access is granted when <code className="text-sm bg-muted px-1.5 py-0.5 rounded">email</code> (or <code className="text-sm bg-muted px-1.5 py-0.5 rounded">buyer</code>) is in the URL; otherwise the user is redirected to <code className="text-sm bg-muted px-1.5 py-0.5 rounded">redirectPath</code>.
        </p>
        <CodeBlock
          code={`import { Suspense } from "react"
import { ThankYouContent } from "@workspace/bdmg-component"

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent
        title="Thank you!"
        subtitle="Your request has been received."
        redirectPath="/"
      />
    </Suspense>
  )
}`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="With custom copy and no ads" id="custom-copy">
        <p className="text-muted-foreground mb-4">
          Pass copy via props. Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">showBuyerLogo=false</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">ads=[]</code> for a minimal thank-you page.
        </p>
        <CodeBlock
          code={`<ThankYouContent
  title={THANKYOU_CONTENT.title}
  subtitle={THANKYOU_CONTENT.subtitle}
  showBuyerLogo={false}
  confirmationTitle={THANKYOU_CONTENT.confirmationTitle}
  confirmationDescription={THANKYOU_CONTENT.confirmationDescription}
  contactTitle={THANKYOU_CONTENT.contactTitle}
  contactPhoneLabel={THANKYOU_CONTENT.contactPhoneLabel}
  contactPhoneHref={THANKYOU_CONTENT.contactPhoneHref}
  redirectPath="/"
  sendWelcomeEmail={false}
  ads={[]}
/>`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Ads with UTM substitution" id="ads">
        <p className="text-muted-foreground mb-4">
          Pass an <code className="text-sm bg-muted px-1.5 py-0.5 rounded">ads</code> array. Each <code className="text-sm bg-muted px-1.5 py-0.5 rounded">link</code> can use placeholders <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&#123;&#123;utm_source&#125;&#125;</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&#123;&#123;utm_id&#125;&#125;</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&#123;&#123;utm_s1&#125;&#125;</code>; they are replaced with values from the URL or cookies.
        </p>
        <CodeBlock
          code={`const ads = [
  {
    image: "/nerdwallet.png",
    link: "https://example.com/offer?sub1={{utm_source}}&sub2={{utm_id}}&sub3={{utm_s1}}",
  },
]
<ThankYouContent ads={ads} adSectionTitle="More offers for you" />`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="ThankYouContent props" id="props">
        <PropsTable rows={thankYouProps} />
      </DocSection>

      <DocSection title="Preview" id="preview">
        <p className="text-muted-foreground mb-4">
          Live preview (access is granted with <code className="text-sm bg-muted px-1.5 py-0.5 rounded">?email=test@example.com</code> in the URL; add it to see content).
        </p>
        <DocPreview className="max-w-2xl">
          <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Loading...</div>}>
            <ThankYouContent
              title="Thank you!"
              subtitle="Your request has been received. A specialist will contact you shortly."
              showBuyerLogo={false}
              redirectPath="/docs/bdmg-component/thank-you"
              sendWelcomeEmail={false}
              ads={[]}
            />
          </Suspense>
        </DocPreview>
      </DocSection>
    </article>
  )
}
