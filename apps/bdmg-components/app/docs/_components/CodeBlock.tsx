"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

export function CodeBlock({
  code,
  language = "tsx",
  className,
}: {
  code: string
  language?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const preRef = React.useRef<HTMLPreElement>(null)

  const copy = async () => {
    if (!preRef.current) return
    const text = preRef.current.querySelector("code")?.textContent ?? code
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative rounded-lg border border-border bg-muted/40", className)}>
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded px-2 py-1 -mr-1"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-x-auto p-5 text-sm font-mono leading-relaxed text-foreground"
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
