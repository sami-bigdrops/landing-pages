import { ProgressBar as ProgressBarUI } from "@workspace/ui/components/progress-bar"
import { Check } from "lucide-react"
import { DocSection } from "../../_components/DocSection"
import { CodeBlock } from "../../_components/CodeBlock"
import { PropsTable } from "../../_components/PropsTable"
import { DocPreview } from "../../_components/DocPreview"

const progressBarProps = [
  { name: "type", type: '"1" | "2" | "3" | "4" | "5" | "6"', default: '"1"', required: false, description: "Visual style (see Types section)." },
  { name: "currentStep", type: "number", default: "-", required: true, description: "Current step (1-based) or progress numerator." },
  { name: "totalSteps", type: "number", default: "-", required: true, description: "Total steps or progress denominator." },
  { name: "stepLabels", type: "string[]", default: "-", required: false, description: "Labels for each step (used by type 6)." },
  { name: "backgroundColor", type: "string", default: "var(--muted)", required: false, description: "Track/background color." },
  { name: "foregroundColor", type: "string", default: "var(--primary)", required: false, description: "Fill/active color." },
  { name: "icon", type: "ReactNode", default: "-", required: false, description: "Icon shown on the bar (type 1)." },
  { name: "topSlot", type: "ReactNode", default: "-", required: false, description: "Content above the bar (type 1)." },
  { name: "className", type: "string", default: "-", required: false, description: "Additional CSS classes for the wrapper." },
]

export default function ProgressBarDocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Progress Bar</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Progress indicators in six styles: bar with percentage, inline label, compact, step segments, label above bar, and stepper with labels.
      </p>

      <DocSection title="Installation" id="installation">
        <CodeBlock
          code={`import { ProgressBar } from "@workspace/ui/components/progress-bar"`}
          language="tsx"
        />
      </DocSection>

      <DocSection title="Basic usage" id="basic">
        <p className="text-muted-foreground mb-4">
          Pass <code className="text-sm bg-muted px-1.5 py-0.5 rounded">currentStep</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">totalSteps</code>. Progress is computed as (currentStep / totalSteps) * 100.
        </p>
        <CodeBlock
          code={`<ProgressBar type="1" currentStep={2} totalSteps={4} />`}
          language="tsx"
        />
        <DocPreview className="">
          <ProgressBarUI type="1" currentStep={2} totalSteps={4} />
        </DocPreview>
      </DocSection>

      <DocSection title="Types" id="types">
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li><strong>1</strong> – Bar with percentage below; optional icon and topSlot</li>
          <li><strong>2</strong> – Bar with label inside the fill</li>
          <li><strong>3</strong> – Compact bar with percentage to the right</li>
          <li><strong>4</strong> – Segmented steps (blocks)</li>
          <li><strong>5</strong> – Label above the bar</li>
          <li><strong>6</strong> – Stepper with circles and optional stepLabels</li>
        </ul>
        <CodeBlock
          code={`<ProgressBar type="2" currentStep={4} totalSteps={5} />
<ProgressBar type="4" currentStep={2} totalSteps={5} />
<ProgressBar
  type="6"
  currentStep={1}
  totalSteps={3}
  stepLabels={["Details", "Review", "Pay"]}
/>`}
          language="tsx"
        />
        <DocPreview className=" space-y-6">
          <ProgressBarUI type="2" currentStep={4} totalSteps={5} />
          <ProgressBarUI type="4" currentStep={2} totalSteps={5} />
          <ProgressBarUI
            type="6"
            currentStep={1}
            totalSteps={3}
            stepLabels={["Details", "Review", "Pay"]}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="With icon (type 1)" id="icon">
        <CodeBlock
          code={`<ProgressBar
  type="1"
  currentStep={2}
  totalSteps={4}
  icon={<Check className="size-5 text-primary-foreground" />}
/>`}
          language="tsx"
        />
        <DocPreview className="">
          <ProgressBarUI
            type="1"
            currentStep={2}
            totalSteps={4}
            icon={<Check className="size-5 text-primary-foreground" />}
          />
        </DocPreview>
      </DocSection>

      <DocSection title="Props" id="props">
        <PropsTable rows={progressBarProps} />
      </DocSection>
    </article>
  )
}
