import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const navbarProps = [
  { name: "variant", type: '"default" | "sticky"', default: '"default"', required: false, description: "Default or sticky (with backdrop)." },
  { name: "type", type: '"1" | "2" | "3"', default: '"1"', required: false, description: "Layout: 1=logo left + contact right, 2=centered logo only." },
  { name: "logo", type: "ReactNode", default: "-", required: false, description: "Logo or brand element." },
  { name: "contactText", type: "string", default: '"Call us"', required: false, description: "Text shown before the contact CTA (type 1)." },
  { name: "contactHref", type: "string", default: '"#"', required: false, description: "URL for the contact link/button." },
  { name: "contactLabel", type: "string", default: '"Contact"', required: false, description: "Button/link label and aria-label." },
  { name: "contactTextClassName", type: "string", default: "-", required: false, description: "Classes for the contact text span." },
  { name: "contactButton", type: "NavbarContactButtonProps", default: "-", required: false, description: "Button type, variant, size, backgroundColor, foregroundColor, className." },
  { name: "className", type: "string", default: "-", required: false, description: "Additional CSS classes for the nav." },
]

export default function NavbarDocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Navbar</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Top navigation with optional logo and contact CTA. Supports default and sticky variants and multiple layout types.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { Navbar } from "@workspace/ui/components/navbar"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <p className="text-muted-foreground mb-4">
          Type <code className="text-sm bg-muted px-1.5 py-0.5 rounded">1</code> shows logo on the left and contact text + button on the right.
        </p>
        <CodeBlock
          code={`<Navbar
  type="1"
  logo={<h1 className="text-2xl font-bold">BRAND</h1>}
  contactText="Call us"
  contactHref="#contact"
  contactLabel="(1800) 123 - 4567"
/>`}
          language="tsx"
        />
        <DocPreview>
          <NavbarUI
            type="1"
            logo={<h1 className="text-2xl font-bold">BRAND</h1>}
            contactText="Call us"
            contactHref="#contact"
            contactLabel="(1800) 123 - 4567"
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Centered logo (type 2)" id="type-2">
        <p className="text-muted-foreground mb-4">
          Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">type="2"</code> for a centered logo with no contact CTA.
        </p>
        <CodeBlock
          code={`<Navbar
  type="2"
  logo={<h1 className="text-2xl font-bold">BRAND</h1>}
/>`}
          language="tsx"
        />
        <DocPreview>
          <NavbarUI
            type="2"
            logo={<h1 className="text-2xl font-bold">BRAND</h1>}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Sticky variant" id="sticky">
        <p className="text-muted-foreground mb-4">
          Use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">variant="sticky"</code> for a fixed top bar with backdrop blur.
        </p>
        <CodeBlock
          code={`<Navbar
  variant="sticky"
  type="1"
  logo={<h1 className="text-2xl font-bold">BRAND</h1>}
  contactLabel="Contact"
/>`}
          language="tsx"
        />
        <DocPreview>
          <NavbarUI
            variant="sticky"
            type="1"
            logo={<h1 className="text-2xl font-bold">BRAND</h1>}
            contactLabel="Contact"
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Custom contact button" id="contact-button">
        <p className="text-muted-foreground mb-4">
          Use the <code className="text-sm bg-muted px-1.5 py-0.5 rounded">contactButton</code> prop to set type, variant, size, or <code className="text-sm bg-muted px-1.5 py-0.5 rounded">className</code> for full control.
        </p>
        <CodeBlock
          code={`<Navbar
  type="1"
  logo={<span className="font-bold">BRAND</span>}
  contactButton={{ type: "1", variant: "default", size: "sm" }}
  contactLabel="Call"
/>`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={navbarProps} />
      </DocSection>
    </article>
  )
}
