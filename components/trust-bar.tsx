import { Clock, Package, Truck } from "lucide-react"

export function TrustBar() {
  const stats = [
    {
      icon: Clock,
      value: "20+",
      label: "Years of Excellence",
      description: "Trusted craftsmanship since 2002",
    },
    {
      icon: Package,
      value: "10,000+",
      label: "Orders Completed",
      description: "Satisfied customers nationwide",
    },
    {
      icon: Truck,
      value: "100%",
      label: "Delivery & Fitting",
      description: "Complete installation service",
    },
  ]

  return (
    <section id="trust" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-background to-accent/5"></div>
      <div className="absolute inset-0 marble-veins opacity-20"></div>

      <div className="absolute top-10 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-accent/3 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 fade-in">
            Built on Trust & Excellence
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {stats.map((stat, index) => (
            <div key={index} className="text-center slide-up h-full" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300 group h-full min-h-[300px] flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full flex flex-col"></div>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <stat.icon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="text-4xl font-serif font-bold text-foreground mb-3">{stat.value}</div>
                  <div className="text-xl font-medium text-foreground mb-2 min-h-[48px]">{stat.label}</div>
                  <div className="text-muted-foreground min-h-[40px]">{stat.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
