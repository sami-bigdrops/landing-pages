import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"

export default function Navbar() {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 1 (default, with contact)</h3>
        <NavbarUI
          variant="default"
          type="1"
          contactText="Call us"
          contactTextClassName="text-base font-semibold"
          contactHref="#contact"
          contactLabel="(1800) 123 - 4567"
          contactButton={{ type: "1", variant: "default", size: "sm" }}
          className="p-6 border-border"
          logo={<h1 className="text-2xl font-bold">BRAND</h1>}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Type 2 (centered logo only)</h3>
        <NavbarUI
          variant="default"
          type="2"
          className="p-4 border-border"
          logo={<h1 className="text-2xl font-bold">BRAND</h1>}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Variant: sticky</h3>
        <NavbarUI
          variant="sticky"
          type="1"
          contactText="Call us"
          contactHref="#contact"
          contactLabel="Contact"
          logo={<h1 className="text-2xl font-bold">BRAND</h1>}
        />
      </section>
    </div>
  )
}