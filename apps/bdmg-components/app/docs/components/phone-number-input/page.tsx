"use client"

import { useState } from "react"
import { PhoneNumberInput as PhoneNumberInputUI } from "@workspace/ui/components/phone-number-input"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const phoneNumberProps = [
  { name: "label", type: "string", default: "-", required: false, description: "Label above the input." },
  { name: "error", type: "string", default: "-", required: false, description: "Error message shown below." },
  { name: "hint", type: "string", default: "-", required: false, description: "Hint text below." },
  { name: "value", type: "string", default: "-", required: false, description: "Digits only (e.g. 10 digits for US)." },
  { name: "onChange", type: "(digits: string) => void", default: "-", required: false, description: "Called with digits only when value changes." },
  { name: "containerClassName", type: "string", default: "-", required: false, description: "Classes for the wrapper." },
  { name: "inputClassName", type: "string", default: "-", required: false, description: "Classes for the input element." },
]

export default function PhoneNumberInputDocsPage() {
  const [digits, setDigits] = useState("")

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Phone Number Input</h1>
      <p className="text-muted-foreground text-lg mb-8">
        US-format phone input: displays as <code className="text-sm bg-muted px-1.5 py-0.5 rounded">(123) 456 - 7890</code>. Stores and passes only digits (max 10). Handles backspace and restricts to numbers.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <CodeBlock
          code={`const [digits, setDigits] = useState("")

<PhoneNumberInput
  label="Phone"
  value={digits}
  onChange={setDigits}
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <PhoneNumberInputUI
            label="Phone"
            value={digits}
            onChange={setDigits}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={phoneNumberProps} />
      </DocSection>
    </article>
  )
}
