"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsNav } from "../nav"
import { cn } from "@workspace/ui/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-background/50 hidden md:block">
      <div className="sticky top-0 py-8 pl-8 pr-5">
        <Link
          href="/docs"
          className={cn(
            "text-lg font-semibold block mb-8 transition-colors",
            pathname === "/docs" ? "text-primary" : "text-foreground hover:text-primary"
          )}
        >
          BDMG UI
        </Link>
        <nav className="space-y-8">
          {docsNav.map((item) => (
            <div key={"href" in item ? item.href : item.title}>
              {"items" in item ? (
                <>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {item.title}
                  </p>
                  <ul className="space-y-1">
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={cn(
                            "block py-2 text-sm transition-colors",
                            pathname === sub.href
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "block py-1.5 text-sm transition-colors",
                    pathname === item.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
