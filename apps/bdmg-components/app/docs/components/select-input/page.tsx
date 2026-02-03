"use client"

import { useState } from "react"
import { SelectInput as SelectInputUI } from "@workspace/ui/components/select-input"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const selectInputProps = [
  { name: "label", type: "string", default: "-", required: false, description: "Label above the select." },
  { name: "error", type: "string", default: "-", required: false, description: "Error message shown below." },
  { name: "hint", type: "string", default: "-", required: false, description: "Hint text below." },
  { name: "placeholder", type: "string", default: "-", required: false, description: "Placeholder when no value selected." },
  { name: "options", type: "SelectOption[]", default: "-", required: true, description: "Array of { value, label }." },
  { name: "value", type: "string", default: "-", required: false, description: "Controlled value." },
  { name: "onChange", type: "(value: string) => void", default: "-", required: false, description: "Called when selection changes." },
  { name: "searchable", type: "boolean", default: "false", required: false, description: "Show search in dropdown (debounced 300ms)." },
  { name: "searchPlaceholder", type: "string", default: "-", required: false, description: "Placeholder for search input." },
  { name: "containerClassName", type: "string", default: "-", required: false, description: "Classes for the wrapper." },
  { name: "selectClassName", type: "string", default: "-", required: false, description: "Classes for the trigger." },
]

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
]

const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `opt-${i}`,
  label: `Option ${i + 1}`,
}))

export default function SelectInputDocsPage() {
  const [value, setValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Select Input</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Custom dropdown (no native select). Optional search with debounced filtering. Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">value</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code> for controlled usage.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { SelectInput } from "@workspace/ui/components/select-input"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <CodeBlock
          code={`const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
]

<SelectInput
  label="Choose one"
  placeholder="Select..."
  options={options}
  value={value}
  onChange={setValue}
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <SelectInputUI
            label="Choose one"
            placeholder="Select..."
            options={options}
            value={value}
            onChange={setValue}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Searchable" id="searchable">
        <p className="text-muted-foreground mb-4">
          Set <code className="text-sm bg-muted px-1.5 py-0.5 rounded">searchable</code> to true to filter options by typing. Search is debounced (300ms).
        </p>
        <CodeBlock
          code={`<SelectInput
  label="Searchable"
  placeholder="Type to search..."
  options={manyOptions}
  value={searchValue}
  onChange={setSearchValue}
  searchable
  searchPlaceholder="Search options..."
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <SelectInputUI
            label="Searchable"
            placeholder="Type to search..."
            options={manyOptions}
            value={searchValue}
            onChange={setSearchValue}
            searchable
            searchPlaceholder="Search options..."
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={selectInputProps} />
      </DocSection>
    </article>
  )
}
