import { TextInput as TextInputUI } from "@workspace/ui/components/text-input"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const textInputProps = [
  { name: "label", type: "string", default: "-", required: false, description: "Label above the input." },
  { name: "error", type: "string", default: "-", required: false, description: "Error message shown below the input." },
  { name: "hint", type: "string", default: "-", required: false, description: "Hint text below the input." },
  { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', required: false, description: "Input size." },
  { name: "containerClassName", type: "string", default: "-", required: false, description: "Classes for the wrapper." },
  { name: "inputClassName", type: "string", default: "-", required: false, description: "Classes for the input element." },
]

export default function TextInputDocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Text Input</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Single-line text input with optional label, error, and hint. Supports all native input props (placeholder, disabled, etc.).
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { TextInput } from "@workspace/ui/components/text-input"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <CodeBlock
          code={`<TextInput
  label="Email"
  placeholder="you@example.com"
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <TextInputUI label="Email" placeholder="you@example.com" />
        </DocPreview>
      </DocSection>

      <DocSection title="With error and hint" id="error-hint">
        <CodeBlock
          code={`<TextInput
  label="Username"
  placeholder="johndoe"
  error="Username is already taken"
  hint="Choose a unique username"
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <TextInputUI
            label="Username"
            placeholder="johndoe"
            error="Username is already taken"
            hint="Choose a unique username"
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <CodeBlock
          code={`<TextInput label="Small" size="sm" placeholder="Small" />
<TextInput label="Default" size="default" placeholder="Default" />
<TextInput label="Large" size="lg" placeholder="Large" />`}
          language="tsx"
        />
        <DocPreview className="max-w-sm space-y-4">
          <TextInputUI label="Small" size="sm" placeholder="Small" />
          <TextInputUI label="Default" size="default" placeholder="Default" />
          <TextInputUI label="Large" size="lg" placeholder="Large" />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={textInputProps} />
      </DocSection>
    </article>
  )
}
