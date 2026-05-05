import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Insurlii Life Insurance",
  description:
    "Get in touch with Insurlii for questions about life insurance quotes and coverage. Contact us via email, phone, or our contact form.",
};

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
