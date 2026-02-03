import { Button } from "@workspace/ui/components/button"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"
import { Settings } from "lucide-react"

const buttonProps = [
  { name: "type", type: '"1" | "2" | "3" | "4" | "5" | "6"', default: '"1"', required: false, description: "Visual style: 1=default, 2=icon, 3=pill, 4=square, 5=link, 6=no padding (custom)." },
  { name: "variant", type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', default: '"default"', required: false, description: "Color variant." },
  { name: "size", type: '"default" | "sm" | "lg" | "icon"', default: '"default"', required: false, description: "Button size." },
  { name: "htmlType", type: '"button" | "submit" | "reset"', default: '"button"', required: false, description: "Native button type." },
  { name: "backgroundColor", type: "string", default: "-", required: false, description: "Override background color (e.g. CSS variable or hex)." },
  { name: "foregroundColor", type: "string", default: "-", required: false, description: "Override text/icon color." },
  { name: "asChild", type: "boolean", default: "false", required: false, description: "Render as child (e.g. Radix Slot); use for <a> or custom element." },
  { name: "className", type: "string", default: "-", required: false, description: "Additional CSS classes." },
]

export default function ButtonDocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Button</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Buttons in six visual types and multiple variants. Supports custom colors and rendering as a link via <code className="text-sm bg-muted px-1.5 py-0.5 rounded">asChild</code>.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { Button } from "@workspace/ui/components/button"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <p className="text-muted-foreground mb-4">
          Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">type</code> for style and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">variant</code> for color.
        </p>
        <CodeBlock
          code={`<Button type="1" variant="default">Click me</Button>
<Button type="1" variant="outline">Outline</Button>
<Button type="1" variant="secondary" size="sm">Small</Button>`}
          language="tsx"
        />
        <DocPreview className="flex flex-wrap gap-2">
          <Button type="1" variant="default">Click me</Button>
          <Button type="1" variant="outline">Outline</Button>
          <Button type="1" variant="secondary" size="sm">Small</Button>
        </DocPreview>
      </DocSection>

      <DocSection title="Types" id="types">
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li><strong>1</strong> – Default rectangular button</li>
          <li><strong>2</strong> – Icon-only (square)</li>
          <li><strong>3</strong> – Pill (fully rounded)</li>
          <li><strong>4</strong> – Square icon</li>
          <li><strong>5</strong> – Link style (underline on hover)</li>
          <li><strong>6</strong> – No padding; use with <code className="text-sm bg-muted px-1.5 py-0.5 rounded">className</code> for full control</li>
        </ul>
        <CodeBlock
          code={`<Button type="2" variant="default" aria-label="Settings">
  <Settings className="size-4" />
</Button>
<Button type="3" variant="default">Pill</Button>
<Button type="5" variant="link">Link style</Button>`}
          language="tsx"
        />
        <DocPreview className="flex flex-wrap gap-2 items-center">
          <Button type="2" variant="default" aria-label="Settings">
            <Settings className="size-4" />
          </Button>
          <Button type="3" variant="default">Pill</Button>
          <Button type="5" variant="link">Link style</Button>
        </DocPreview>
      </DocSection>

      <DocSection title="As link" id="as-link">
        <p className="text-muted-foreground mb-4">
          Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">asChild</code> to render the button as an anchor or custom element.
        </p>
        <CodeBlock
          code={`<Button type="1" variant="default" asChild>
  <a href="/contact">Contact</a>
</Button>`}
          language="tsx"
        />
        <DocPreview>
          <Button type="1" variant="default" asChild>
            <a href="#contact">Contact</a>
          </Button>
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={buttonProps} />
      </DocSection>
    </article>
  )
}
