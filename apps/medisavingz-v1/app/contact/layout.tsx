import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact MediSavingz for questions about comparing Medicare options, our website, or your privacy choices. Reach us by email at contact@medisavingz.com.",
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
