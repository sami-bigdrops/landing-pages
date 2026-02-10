import Link from "next/link"
import { docsNav } from "./nav"
import { CodeBlock } from "./_components/CodeBlock"

export default function DocsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">BDMG UI</h1>
        <p className="text-muted-foreground text-lg">
          A production-ready component library for landing pages and forms. Built with React,
          Tailwind CSS, and full theme support (light/dark).
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-3 mb-6">
          Getting started
        </h2>
        <h3 className="text-base font-medium text-foreground mt-6 mb-3">Steps to use</h3>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground mb-6">
          <li>Add the workspace package to your app: <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@workspace/ui</code> (in this monorepo it is already in <code className="text-sm bg-muted px-1.5 py-0.5 rounded">package.json</code>).</li>
          <li>Import the global styles in your root layout: <code className="text-sm bg-muted px-1.5 py-0.5 rounded">import &quot;@workspace/ui/globals.css&quot;</code>.</li>
          <li>Import components from <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@workspace/ui/components/&lt;component-name&gt;</code> (e.g. <code className="text-sm bg-muted px-1.5 py-0.5 rounded">button</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">navbar</code>, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">text-input</code>).</li>
          <li>Use the component with the props described in each component page; see the Props table and examples.</li>
        </ol>
        <div className="mt-6">
          <CodeBlock
            code={`import "@workspace/ui/globals.css"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return <Button type="1" variant="default">Click me</Button>
}`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-3 mb-6">
          Documentation
        </h2>
        <p className="text-muted-foreground mb-4">
          For UI components use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@workspace/ui</code>. For UTM params and TrustedForm cert URL use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@workspace/lp-core</code>. For the reusable thank-you page use <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@workspace/bdmg-component</code>.
        </p>
        {docsNav.map((n) => {
          if (!("items" in n)) return null
          return (
            <div key={n.title} className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {n.title}
              </h3>
              <ul className="grid gap-2">
                {n.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-primary hover:underline font-medium">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-3 mb-6">
          Theming
        </h2>
        <p className="text-muted-foreground">
          All components use CSS variables from <code className="text-sm bg-muted px-1.5 py-0.5 rounded">globals.css</code>.
          Use the <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> class on a parent (e.g. <code className="text-sm bg-muted px-1.5 py-0.5 rounded">html</code>) to switch to dark mode.
          Buttons, inputs, and progress bars accept optional <code className="text-sm bg-muted px-1.5 py-0.5 rounded">backgroundColor</code> and <code className="text-sm bg-muted px-1.5 py-0.5 rounded">foregroundColor</code> for one-off overrides.
        </p>
      </section>
    </article>
  )
}
