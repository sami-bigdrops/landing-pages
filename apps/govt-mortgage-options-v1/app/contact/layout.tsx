import type { Metadata } from "next"
import { SITE_BRAND } from "@/lib/constant"

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_BRAND.name}`,
  description: `Get in touch with ${SITE_BRAND.name} for questions about mortgage and refinance options. Email us at ${SITE_BRAND.email} or use our contact form.`,
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-y-auto">
      {children}
    </div>
  );
}
