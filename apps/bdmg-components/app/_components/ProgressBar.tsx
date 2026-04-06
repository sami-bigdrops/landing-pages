import { ProgressBar as ProgressBarUI } from "@workspace/ui/components/progress-bar"
import { Check } from "lucide-react"

export default function ProgressBar() {
  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 1 (with icon and top slot)</h3>
        <ProgressBarUI
          type="1"
          currentStep={2}
          totalSteps={4}
          icon={<Check className="size-5 text-primary-foreground" />}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 2 (inline label)</h3>
        <ProgressBarUI type="2" currentStep={4} totalSteps={5} />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 3 (compact with percentage)</h3>
        <ProgressBarUI type="3" currentStep={4} totalSteps={5} />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 4 (step segments)</h3>
        <ProgressBarUI type="4" currentStep={2} totalSteps={5} />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 5 (label above bar)</h3>
        <ProgressBarUI type="5" currentStep={3} totalSteps={5} />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 6 (stepper with labels)</h3>
        <ProgressBarUI
          type="6"
          currentStep={1}
          totalSteps={3}
          stepLabels={["Vehicle Details", "Personal Details", "Payment Details"]}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 7 (minimal strip)</h3>
        <div className="overflow-hidden rounded-xl border bg-card">
          <ProgressBarUI
            type="7"
            currentStep={1}
            totalSteps={8}
            foregroundColor="#F5820D"
            backgroundColor="#FFEAD2"
          />
          <div className="p-4 text-sm text-muted-foreground">Content below the bar</div>
        </div>
      </section>
    </div>
  )
}