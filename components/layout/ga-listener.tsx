// components/ga-listener.tsx
"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function GAListenerContent() {
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

export default function GAListener() {
  return (
    <Suspense fallback={null}>
      <GAListenerContent />
    </Suspense>
  );
}