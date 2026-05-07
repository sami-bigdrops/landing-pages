"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function FormRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zip = (searchParams.get("zip") ?? "").replace(/\D/g, "").slice(0, 5);

  useEffect(() => {
    const params = new URLSearchParams();
    if (zip.length === 5) params.set("zip", zip);
    const query = params.toString();
    router.replace(query ? `/form/refinance?${query}` : "/form/refinance");
  }, [router, zip]);

  return null;
}

export default function FormPage() {
  return <FormRedirect />;
}
