import { ProgressBar as ProgressBarUI } from "@workspace/ui/components/progress-bar"
import { Check } from "lucide-react"

export default function ProgressBar() {
  return (
    <div className="container mx-auto max-w-2xl p-6">
        {/* Type 1 with custom colors */}
        <ProgressBarUI
          type="1"
          currentStep={2}
          totalSteps={4}
          backgroundColor="#e5e7eb"
          foregroundColor="#059669"
          icon={<Check className="size-5 text-[#059669]" />}
        />

        {/* Type 2 with custom colors */}
        <ProgressBarUI
          type="2"
          currentStep={4}
          totalSteps={5}
          backgroundColor="#e5e7eb"
          foregroundColor="#059669"
        />

        {/* Type 3 with custom colors */}
        <ProgressBarUI
          type="3"
          currentStep={4}
          totalSteps={5}
          backgroundColor="#e5e7eb"
          foregroundColor="#059669"
        />

        {/* Type 4 with custom colors */}
        <ProgressBarUI
          type="4"
          currentStep={2}
          totalSteps={5}
          backgroundColor="#e5e7eb"
          foregroundColor="#059669"
        />

        {/* Type 5 with custom colors */}
        <ProgressBarUI
          type="5"
          currentStep={3}
          totalSteps={5}
          backgroundColor="#e5e7eb"
          foregroundColor="#059669"
        />

        {/* Type 6 with custom colors */}
        <ProgressBarUI
          type="6"
          currentStep={1}
          totalSteps={3}
          stepLabels={["Vehicle Details", "Personal Details", "Payment Details"]}
          backgroundColor="#e5e7eb"
          foregroundColor="#059669"
        />
      </div>
  )
}