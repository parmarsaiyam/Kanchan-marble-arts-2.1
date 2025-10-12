// components/ga-listener.tsx
"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (typeof window !== "undefined" && (window as any).gtag && process.env.NEXT_PUBLIC_GA_ID) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    }
  }, [pathname, searchParams]);

  return null;
}