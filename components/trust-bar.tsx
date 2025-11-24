"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Package, Truck } from "lucide-react";

const statsConfig = [
  {
    icon: Clock,
    value: 20,
    suffix: "+",
    label: "Years of Excellence",
    description: "Trusted craftsmanship since 2002",
  },
  {
    icon: Package,
    value: 50000,
    suffix: "+",
    label: "Orders Completed",
    description: "Satisfied customers nationwide",
  },
  {
    icon: Truck,
    value: 100,
    suffix: "%",
    label: "Delivery & Fitting",
    description: "Complete installation service",
  },
];

export function TrustBar() {
  const [counts, setCounts] = useState<number[]>(statsConfig.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  const firstCardRef = useRef<HTMLDivElement | null>(null);

  // helper: easing
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    useEffect(() => {
    if (!firstCardRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCounts();          // your existing function
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.9, // 👉 ~50% of the first card must be visible
      }
    );

    observer.observe(firstCardRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);



  const animateCounts = () => {
    const duration = 1500;
    const start = performance.now();
    const targets = statsConfig.map((s) => s.value);

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutCubic(progress);

      setCounts(
        targets.map((target) => Math.floor(target * eased))
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCounts(targets); // ensure final values
      }
    };

    requestAnimationFrame(step);
  };

  const formatValue = (value: number, suffix: string) => {
    if (suffix === "+") {
      return `${value.toLocaleString()}+`;
    }
    if (suffix === "%") {
      return `${value}%`;
    }
    return value.toLocaleString();
  };

  return (
    <section
      id="trust"
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-background to-accent/5"></div>
      <div className="absolute inset-0 marble-veins opacity-20"></div>

      <div className="absolute top-10 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-accent/3 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 fade-in">
            Built on Trust & Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We are a Mumbai-based marble mandir and murti manufacturer, serving homes across Kandivali,
            Borivali, Malad and the wider Mumbai region.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {statsConfig.map((stat, index) => (
            <div
              key={index}
              ref={index === 0 ? firstCardRef : null}
              className="text-center slide-up h-full"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300 group h-full min-h-[300px] flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full flex flex-col"></div>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <stat.icon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="text-4xl font-serif font-bold text-foreground mb-3 tabular-nums">
                    {formatValue(counts[index], stat.suffix)}
                  </div>
                  <div className="text-xl font-medium text-foreground mb-2 min-h-[48px]">
                    {stat.label}
                  </div>
                  <div className="text-muted-foreground min-h-[40px]">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
