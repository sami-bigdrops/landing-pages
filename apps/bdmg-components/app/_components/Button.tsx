import { Button as ButtonUI } from "@workspace/ui/components/button"

export default function Button() {
  return (
    <div className="p-6">
      <ButtonUI
        type="1"
        variant="default"
        size="default"
        className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md"
      >
        <span>Click me</span>
      </ButtonUI>
    </div>
  )
}