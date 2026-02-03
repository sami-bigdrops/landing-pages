"use client"

import { useUtmParams } from "@workspace/lp-core"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const optionsProps = [
  { name: "cookieDays", type: "number", default: "30", required: false, description: "Days to persist UTM values in cookies." },
  { name: "extra", type: "UtmParamMapping[]", default: "-", required: false, description: "Additional URL param to cookie mappings. Each has urlParam and cookieName." },
]

const resultProps = [
  { name: "subid1", type: "string", default: "-", required: false, description: "Value from utm_source (URL or cookie)." },
  { name: "subid2", type: "string", default: "-", required: false, description: "Value from utm_id (URL or cookie)." },
  { name: "subid3", type: "string", default: "-", required: false, description: "Value from utm_s1 (URL or cookie)." },
  { name: "extra", type: "Record<string, string>", default: "-", required: false, description: "Present when options.extra is provided; keys are cookie names." },
]

export default function UtmParamsDocsPage() {
  const { subid1, subid2, subid3, extra } = useUtmParams({
    cookieDays: 30,
    extra: [
      { urlParam: "utm_campaign", cookieName: "subid4" },
      { urlParam: "utm_medium", cookieName: "subid5" },
    ],
  })

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">UTM Params</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Read and persist UTM parameters from the URL (utm_source, utm_id, utm_s1) into cookies, and optionally map extra URL params to custom cookie names. Values are available as <code className="text-sm bg-muted px-1.5 py-0.5 rounded">subid1</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">subid2</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">subid3</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">extra</code>.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { useUtmParams } from "@workspace/lp-core"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <p className="text-muted-foreground mb-4">
          Call the hook (client-only). With no options, it uses default cookie names and 30-day persistence. URL is stripped of UTM params after reading so they are not visible in the address bar.
        </p>
        <CodeBlock
          code={`const { subid1, subid2, subid3 } = useUtmParams()

// subid1 = utm_source, subid2 = utm_id, subid3 = utm_s1
// Values come from URL first, then from cookies`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="With cookie days" id="cookie-days">
        <CodeBlock
          code={`const { subid1, subid2, subid3 } = useUtmParams(14)`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Extra UTM mappings" id="extra">
        <p className="text-muted-foreground mb-4">
          Pass <code className="text-sm bg-muted px-1.5 py-0.5 rounded">extra</code> to read additional URL params and store them in named cookies. Result includes an <code className="text-sm bg-muted px-1.5 py-0.5 rounded">extra</code> object keyed by cookie name.
        </p>
        <CodeBlock
          code={`const { subid1, subid2, subid3, extra } = useUtmParams({
  cookieDays: 30,
  extra: [
    { urlParam: "utm_campaign", cookieName: "subid4" },
    { urlParam: "utm_medium", cookieName: "subid5" },
  ],
})

// extra.subid4, extra.subid5`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <p className="text-sm text-muted-foreground mb-2">Current values (this page):</p>
          <p className="text-sm font-mono">subid1: {subid1 || "(empty)"}</p>
          <p className="text-sm font-mono">subid2: {subid2 || "(empty)"}</p>
          <p className="text-sm font-mono">subid3: {subid3 || "(empty)"}</p>
          {extra && (
            <>
              <p className="text-sm font-mono mt-2">subid4: {extra.subid4 ?? "(empty)"}</p>
              <p className="text-sm font-mono">subid5: {extra.subid5 ?? "(empty)"}</p>
            </>
          )}
        </DocPreview>
      </DocSection>

      <DocSection title="URL param keys" id="param-keys">
        <p className="text-muted-foreground mb-4">
          Default mapping: <code className="text-sm bg-muted px-1.5 py-0.5 rounded">utm_source</code> → subid1, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">utm_id</code> → subid2, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">utm_s1</code> → subid3. Cookie names are <code className="text-sm bg-muted px-1.5 py-0.5 rounded">subid1</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">subid2</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">subid3</code>.
        </p>
      </DocSection>

      <DocSection title="Options (useUtmParams argument)" id="options-props">
        <PropsTable rows={optionsProps} />
      </DocSection>

      <DocSection title="Return value" id="return">
        <PropsTable rows={resultProps} />
      </DocSection>
    </article>
  )
}
