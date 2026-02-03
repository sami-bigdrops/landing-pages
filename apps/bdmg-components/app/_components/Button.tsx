import { Button as ButtonUI } from "@workspace/ui/components/button"
import { Settings, Phone } from "lucide-react"

export default function Button() {
  return (
    <div className="flex items-start justify-between p-6">
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 1 (default)</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonUI type="1" variant="default">
            Click me
          </ButtonUI>
          <ButtonUI type="1" variant="outline">
            Outline
          </ButtonUI>
          <ButtonUI type="1" variant="secondary" size="sm">
            Small
          </ButtonUI>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 2 (icon)</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonUI type="2" variant="default" aria-label="Settings">
            <Settings className="size-4" />
          </ButtonUI>
          <ButtonUI type="2" variant="outline" aria-label="Phone">
            <Phone className="size-4" />
          </ButtonUI>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 3 (pill)</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonUI type="3" variant="default">
            Pill button
          </ButtonUI>
          <ButtonUI type="3" variant="secondary">
            Secondary pill
          </ButtonUI>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 4 (square)</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonUI type="4" variant="default" aria-label="Square">
            <Settings className="size-4" />
          </ButtonUI>
          <ButtonUI type="4" variant="outline" aria-label="Square outline">
            <Phone className="size-4" />
          </ButtonUI>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 5 (link)</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonUI type="5" variant="link">
            Link style button
          </ButtonUI>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 6 (custom padding)</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonUI
            type="6"
            variant="default"
            className="px-6 py-3 text-base font-semibold"
          >
            Custom padding
          </ButtonUI>
        </div>
      </section>
    </div>
  )
}
