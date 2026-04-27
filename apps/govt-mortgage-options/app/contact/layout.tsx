import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Govt Mortgage Options",
  description: "Get in touch with Govt Mortgage Options for questions about our mortgage services. Contact us via email, phone, or our contact form.",
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
