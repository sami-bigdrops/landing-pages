import { TextArea as TextAreaUI } from "@workspace/ui/components/text-area"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const textAreaProps = [
  { name: "label", type: "string", default: "-", required: false, description: "Label above the textarea." },
  { name: "error", type: "string", default: "-", required: false, description: "Error message shown below." },
  { name: "hint", type: "string", default: "-", required: false, description: "Hint text below the textarea." },
  { name: "resize", type: "boolean", default: "true", required: false, description: "Allow vertical resize handle." },
  { name: "containerClassName", type: "string", default: "-", required: false, description: "Classes for the wrapper." },
  { name: "textareaClassName", type: "string", default: "-", required: false, description: "Classes for the textarea element." },
]

export default function TextAreaDocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Text Area</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Multi-line text input with optional label, error, hint, and configurable resize.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { TextArea } from "@workspace/ui/components/text-area"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <CodeBlock
          code={`<TextArea
  label="Message"
  placeholder="Enter your message..."
  rows={4}
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <TextAreaUI
            label="Message"
            placeholder="Enter your message..."
            rows={4}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="No resize" id="no-resize">
        <CodeBlock
          code={`<TextArea
  label="Fixed height"
  placeholder="No resize"
  resize={false}
  rows={3}
/>`}
          language="tsx"
        />
        <DocPreview className="max-w-sm">
          <TextAreaUI
            label="Fixed height"
            placeholder="No resize"
            resize={false}
            rows={3}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={textAreaProps} />
      </DocSection>
    </article>
  )
}
