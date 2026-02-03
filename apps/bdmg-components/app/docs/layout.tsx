import Link from "next/link"
import { DocsSidebar } from "./_components/DocsSidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <header className="border-b border-border bg-background/95 shrink-0 px-6 py-4 md:pl-8">
        <Link href="/docs" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
          BDMG UI
        </Link>
      </header>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <DocsSidebar />
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
