"use client"

import { useState } from "react"
import { ZipCodeInput as ZipCodeInputUI } from "@workspace/ui/components/zip-code-input"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const zipCodeProps = [
  { name: "label", type: "string", default: "-", required: false, description: "Label above the input." },
  { name: "error", type: "string", default: "-", required: false, description: "Error message shown below." },
  { name: "hint", type: "string", default: "-", required: false, description: "Hint text below." },
  { name: "value", type: "string", default: "-", required: false, description: "5-digit zip code." },
  { name: "onChange", type: "(value: string) => void", default: "-", required: false, description: "Called when value changes (max 5 digits)." },
  { name: "containerClassName", type: "string", default: "-", required: false, description: "Classes for the wrapper." },
  { name: "inputClassName", type: "string", default: "-", required: false, description: "Classes for the input element." },
]

export default function ZipCodeInputDocsPage() {
  const [zip, setZip] = useState("")

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Zip Code Input</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Input restricted to 5 numeric digits for US zip codes.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <CodeBlock
          code={`const [zip, setZip] = useState("")

<ZipCodeInput
  label="Zip code"
  placeholder="12345"
  value={zip}
  onChange={setZip}
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <ZipCodeInputUI
            label="Zip code"
            placeholder="12345"
            value={zip}
            onChange={setZip}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={zipCodeProps} />
      </DocSection>
    </article>
  )
}
