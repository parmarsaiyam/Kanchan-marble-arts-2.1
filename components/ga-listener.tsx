"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const searchParams = useSearchParams();

export default function GAListener() {
  const pathname = usePathname();
  
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    // send a page_view on client-side navigation
    if (typeof window !== "undefined" && (window as any).gtag && process.env.NEXT_PUBLIC_GA_ID) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    }
  }, [pathname, searchParams]);

  return null;
}
