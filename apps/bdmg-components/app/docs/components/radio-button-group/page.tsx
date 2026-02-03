"use client"

import { useState } from "react"
import { RadioButtonGroup as RadioButtonGroupUI } from "@workspace/ui/components/radio-button-group"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const radioProps = [
  { name: "name", type: "string", default: "-", required: true, description: "Form field name (and native name)." },
  { name: "options", type: "RadioOption[]", default: "-", required: true, description: "Array of { value, label, disabled? }." },
  { name: "value", type: "string", default: "-", required: false, description: "Controlled value." },
  { name: "onChange", type: "(value: string) => void", default: "-", required: false, description: "Called when selection changes." },
  { name: "type", type: '"1" | "2" | "3" | "4"', default: '"1"', required: false, description: "Style: 1=default circle, 2=pill, 3=bordered card, 4=segmented." },
  { name: "layout", type: '"row" | "column"', default: '"column"', required: false, description: "Options layout." },
  { name: "label", type: "string", default: "-", required: false, description: "Legend/label for the group." },
  { name: "error", type: "string", default: "-", required: false, description: "Error message below the group." },
  { name: "hint", type: "string", default: "-", required: false, description: "Hint text below." },
  { name: "containerClassName", type: "string", default: "-", required: false, description: "Classes for the wrapper." },
  { name: "optionClassName", type: "string", default: "-", required: false, description: "Classes for each option." },
]

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

const threeOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
]

export default function RadioButtonGroupDocsPage() {
  const [v1, setV1] = useState("")
  const [v2, setV2] = useState("")
  const [v3, setV3] = useState("")
  const [v4, setV4] = useState("")

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Radio Button Group</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Single-select radio group with four visual types and row or column layout. Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">value</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code> for controlled usage.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <CodeBlock
          code={`<RadioButtonGroup
  name="choice"
  label="Choose one"
  options={[
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]}
  value={value}
  onChange={setValue}
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <RadioButtonGroupUI
            name="choice"
            label="Choose one"
            options={options}
            value={v1}
            onChange={setV1}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Types" id="types">
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li><strong>1</strong> – Default circular radio</li>
          <li><strong>2</strong> – Pill style</li>
          <li><strong>3</strong> – Bordered card style</li>
          <li><strong>4</strong> – Segmented control</li>
        </ul>
        <CodeBlock
          code={`<RadioButtonGroup name="t2" type="2" options={options} value={v2} onChange={setV2} layout="row" />
<RadioButtonGroup name="t3" type="3" options={threeOptions} value={v3} onChange={setV3} />
<RadioButtonGroup name="t4" type="4" options={threeOptions} value={v4} onChange={setV4} />`}
          language="tsx"
        />
        <DocPreview className="space-y-6 max-w-md">
          <RadioButtonGroupUI name="t2" type="2" label="Type 2 (pill)" options={options} value={v2} onChange={setV2} layout="row" />
          <RadioButtonGroupUI name="t3" type="3" label="Type 3 (card)" options={threeOptions} value={v3} onChange={setV3} />
          <RadioButtonGroupUI name="t4" type="4" label="Type 4 (segmented)" options={threeOptions} value={v4} onChange={setV4} />
        </DocPreview>
      </DocSection>

      <DocSection title="Row layout" id="layout">
        <CodeBlock
          code={`<RadioButtonGroup
  name="row"
  label="Layout row"
  options={options}
  value={value}
  onChange={setValue}
  layout="row"
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <RadioButtonGroupUI
            name="row"
            label="Layout row"
            options={options}
            value={v1}
            onChange={setV1}
            layout="row"
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={radioProps} />
      </DocSection>
    </article>
  )
}
