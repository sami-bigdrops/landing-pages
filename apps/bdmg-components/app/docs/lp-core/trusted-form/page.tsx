"use client"

import { useEffect, useState } from "react"
import { TrustedForm, useTrustedForm } from "@workspace/lp-core"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const trustedFormProps = [
  { name: "onCertificateReady", type: "(certUrl: string, token: string) => void", default: "-", required: false, description: "Called when both cert URL and token are available." },
  { name: "onCertUrlReady", type: "(certUrl: string) => void", default: "-", required: false, description: "Called when the certificate URL is available (cert only)." },
  { name: "enableSandbox", type: "boolean", default: "false", required: false, description: "Enable TrustedForm sandbox mode." },
  { name: "provideReferrer", type: "boolean", default: "false", required: false, description: "Pass referrer to TrustedForm." },
  { name: "timeout", type: "number", default: "2000", required: false, description: "Timeout (ms) for callback polling." },
]

export default function TrustedFormDocsPage() {
  const [certUrl, setCertUrl] = useState("")
  const [certData, setCertData] = useState<{ certUrl: string; token: string } | null>(null)
  const { getCertificateData } = useTrustedForm(2000)

  const handleFetchCert = async () => {
    const data = await getCertificateData()
    setCertData(data)
  }

  useEffect(() => {
    if (certData) setCertUrl(certData.certUrl)
  }, [certData])

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">TrustedForm (Cert URL)</h1>
      <p className="text-muted-foreground text-lg mb-8">
        TrustedForm integration for landing pages: load the TrustedForm script, render hidden inputs for the certificate URL and token, and optionally get the cert URL or full certificate data in code via callbacks or <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useTrustedForm</code>.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { TrustedForm, useTrustedForm } from "@workspace/lp-core"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="TrustedForm component" id="component">
        <p className="text-muted-foreground mb-4">
          Render <code className="text-sm bg-muted px-1.5 py-0.5 rounded">TrustedForm</code> inside your form. It injects the TrustedForm script (if not already present) and two hidden inputs: <code className="text-sm bg-muted px-1.5 py-0.5 rounded">xxTrustedFormCertUrl</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">xxTrustedFormToken</code>. Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onCertUrlReady</code> or <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onCertificateReady</code> to get the cert URL (and token) when ready.
        </p>
        <CodeBlock
          code={`<form onSubmit={handleSubmit}>
  <TrustedForm onCertUrlReady={(url) => setCertUrl(url)} />
  <input name="email" />
  <button type="submit">Submit</button>
</form>`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Get cert URL via callback" id="callback">
        <CodeBlock
          code={`const [certUrl, setCertUrl] = useState("")

<TrustedForm onCertUrlReady={setCertUrl} />
// certUrl is set when the TrustedForm script populates the hidden field`}
          language="tsx"
        />
        <DocPreview className="max-w-lg">
          <TrustedForm onCertUrlReady={setCertUrl} />
          <p className="text-sm text-muted-foreground mb-2">Cert URL (when ready):</p>
          <p className="text-sm font-mono break-all text-primary">
            {certUrl || "Waiting for TrustedForm script..."}
          </p>
        </DocPreview>
      </DocSection>

      <DocSection title="useTrustedForm hook" id="hook">
        <p className="text-muted-foreground mb-4">
          <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useTrustedForm(timeout?)</code> returns <code className="text-sm bg-muted px-1.5 py-0.5 rounded">getCertificateData</code>, which resolves with <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&#123; certUrl, token &#125;</code>. The hook polls the hidden fields until they have values or the timeout (default 2000ms) is reached. You must still render <code className="text-sm bg-muted px-1.5 py-0.5 rounded">TrustedForm</code> so the script and inputs exist.
        </p>
        <CodeBlock
          code={`const { getCertificateData } = useTrustedForm(2000)

const handleClick = async () => {
  const { certUrl, token } = await getCertificateData()
  console.log(certUrl, token)
}`}
          language="tsx"
        />
        <DocPreview className="max-w-lg">
          <TrustedForm onCertUrlReady={setCertUrl} />
          <button
            type="button"
            onClick={handleFetchCert}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Get cert via useTrustedForm
          </button>
          {certData && (
            <div className="mt-4 space-y-1 text-sm">
              <p className="font-mono break-all">
                <span className="text-muted-foreground">certUrl:</span> {certData.certUrl || "(empty)"}
              </p>
              <p className="font-mono">
                <span className="text-muted-foreground">token:</span> {certData.token ? "***" : "(empty)"}
              </p>
            </div>
          )}
        </DocPreview>
      </DocSection>

      <DocSection title="TrustedForm component props" id="props">
        <PropsTable rows={trustedFormProps} />
      </DocSection>

      <DocSection title="Hidden field names" id="fields">
        <p className="text-muted-foreground mb-4">
          The component renders hidden inputs with <code className="text-sm bg-muted px-1.5 py-0.5 rounded">name=&quot;xxTrustedFormCertUrl&quot;</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">name=&quot;xxTrustedFormToken&quot;</code> so they are included in form submissions. IDs are <code className="text-sm bg-muted px-1.5 py-0.5 rounded">xxTrustedFormCertUrl_0</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">xxTrustedFormToken_0</code>.
        </p>
      </DocSection>
    </article>
  )
}
