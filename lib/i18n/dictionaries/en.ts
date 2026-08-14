/**
 * English master dictionary.
 *
 * This object defines the shape every other locale must satisfy (see `Dictionary`
 * in ../types). Two kinds of entries live here:
 *
 *  - `ui`      — structural strings, checked at compile time so a missing key in
 *                Hindi or Gujarati is a type error, not a blank spot on the page.
 *  - `content` — lookup maps keyed by the English source string (image alt text,
 *                gallery captions, product features…). These fall back to the
 *                English key when a translation is missing, so CMS-authored
 *                content added later still renders.
 */
export const en = {
  ui: {
    nav: {
      home: "Home",
      products: "Collections",
      gallery: "Gallery",
      process: "Craft",
      about: "Studio",
      contact: "Visit",
      enquire: "Enquire",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      homeAria: "Kanchan Marble Arts — home",
      logoAlt: "Kanchan Marble Arts",
      chooseLanguage: "Choose language",
    },

    common: {
      whatsappUs: "WhatsApp us",
      call: (phone: string) => `Call ${phone}`,
      callAria: "Call Kanchan Marble Arts",
      whatsappAria: "Chat on WhatsApp",
      requestQuote: "Request a quote",
      quickView: "Quick view",
      quickViewOf: (title: string) => `Quick view ${title}`,
      fullDetails: "Full details",
      enquireAboutPiece: "Enquire about this piece",
      price: "Price",
      startingFrom: "Starting from",
      scrollToTop: "Scroll to top",
      dismissAnnouncement: "Dismiss announcement",
      close: "Close",
      all: "All",
      brandName: "Kanchan Marble Arts",
      businessHours: "Mon – Sun: 9:00 AM – 9:00 PM",
      addressLines: [
        "Kanchan Marble Arts, Ashok Nagar,",
        "Near Akurli Metro Station,",
        "Beside Mahanagar CNG Pump,",
        "Kandivali East, Mumbai 400101",
      ],
    },

    hero: {
      kicker: "Kandivali East, Mumbai · Est. 2002",
      headingBefore: "Carving legacy in ",
      headingHighlight: "marble",
      headingAfter: ".",
      subhead:
        "Custom mandirs and murtis crafted for your home, delivered and fitted with care. Each piece tells a story of devotion, artistry, and timeless beauty.",
      statYears: "Years",
      statOrders: "Orders",
      statDelivery: "Delivery & fitting",
      location: "Ashok Nagar, Kandivali East",
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
      goToSlide: (n: number) => `Go to slide ${n}`,
    },

    home: {
      collections: {
        kicker: "The collections",
        title: "Four things we make, and have made for two decades.",
        link: "All collections",
        items: {
          mandirs: { title: "Mandirs", description: "Sacred temples crafted with devotion and precision." },
          murtis: { title: "Murtis", description: "Divine sculptures bringing spirituality to life." },
          articles: { title: "Articles", description: "Decorative pieces for homes and sacred spaces." },
          jain: { title: "Jain designs", description: "Specialised creations for Jain traditions." },
        },
      },
      workshop: {
        kicker: "The workshop",
        title: "A family dream, still cut by hand.",
        body1:
          "Founded in 2002, Kanchan Marble Arts began as a family dream to preserve and celebrate the ancient art of marble craftsmanship. What started as a small workshop has grown into a trusted name in premium marble work across India.",
        body2:
          "Our journey is built on three fundamental pillars: unwavering trust, uncompromising quality, and a legacy that spans generations.",
        stones: {
          australian: "Pure white, durable",
          indian: "Makrana & Rajasthani",
          italian: "Carrara, finest grade",
        },
      },
      featured: {
        title: "Featured pieces",
        link: "See the full catalogue",
      },
      steps: {
        kicker: "From vision to installation",
        title: "Four steps, unchanged since 2002.",
        items: {
          consult: {
            title: "Consult",
            body: "We understand your vision and spiritual needs through detailed consultation.",
          },
          design: {
            title: "Design",
            body: "Custom designs tailored to your space, preferences, and spiritual requirements.",
          },
          craft: { title: "Craft", body: "Master artisans bring your vision to life with traditional techniques." },
          deliver: { title: "Deliver", body: "Professional installation and fitting service with complete care." },
        },
      },
      jain: {
        kicker: "Jain artistic heritage",
        title: "Not just art. Devotion.",
        body1:
          "Every design is shaped with deep respect for tradition, keeping alive the timeless beauty of Jain architecture. We know the spiritual value these works hold, which is why each piece is crafted with care, balance, and purity of detail.",
        body2:
          "From grand temple structures to serene corners for personal prayer, our Jain collection connects people to this sacred heritage.",
        cta: "Explore Jain designs",
      },
      mosaic: {
        kicker: "In their homes",
        title: "Completed work, photographed on site.",
        link: "Full gallery",
      },
      contact: {
        title: "Tell us what you have in mind.",
        body:
          "Consultation is free. Send a photo of the space, or just the measurements — we will come back with a design and a price.",
        visitStudio: "Visit the studio",
        open: "Open",
        hours: "Mon – Sun, 9:00 AM – 9:00 PM",
        email: "Email",
      },
    },

    products: {
      kicker: "Nine pieces, made to order",
      title: "Every piece is cut for one home.",
      subhead:
        "Sizes, carvings and stone are chosen with you. What you see here is what we have made before — a starting point, not a fixed catalogue.",
      showing: (n: number) => `Showing ${n} ${n === 1 ? "piece" : "pieces"}`,
      closeQuickView: "Close quick view",
      cta: {
        title: "Not seeing your size?",
        body: "Nearly everything we make is custom. Send the measurements of your space and we will design to it.",
        primary: "Start a custom piece",
      },
    },

    productDetail: {
      breadcrumbRoot: "Collections",
      whatYouGet: "What you get",
      chooseStone: "Choose the stone",
      priceNote: "Final price depends on size, stone and carving detail. Delivery and fitting included within Mumbai.",
      whatsappPhoto: "WhatsApp a photo of your space",
      repliesNote: "Typically replies within a few hours, 9 AM – 9 PM",
      howItIsMade: "How this one is made",
      alsoIn: (category: string) => `Also in ${category}`,
      allOf: (category: string) => `All ${category.toLowerCase()}`,
      enquireShort: "Enquire",
      viewImage: (n: number, title: string) => `View image ${n} of ${title}`,
      steps: {
        consult: { title: "Consult", body: "We measure the space and agree the design." },
        design: { title: "Design", body: "Sketches for approval before any stone is cut." },
        craft: { title: "Craft", body: "Hand-carved by our artisans, 4–8 weeks typical." },
        fit: { title: "Fit", body: "Delivered and installed by our own team." },
      },
    },

    gallery: {
      kicker: "Completed pieces, in the homes they were made for",
      title: "Photographed after fitting, not in a studio.",
      aside: "Every image here is a completed commission. Tap any one to see it full-screen with its caption.",
      loadRemaining: (n: number) => `Load the remaining ${n}`,
      viewImage: (caption: string) => `View ${caption}`,
      lightboxLabel: "Image lightbox",
      closeLightbox: "Close lightbox",
      previousImage: "Previous image",
      nextImage: "Next image",
      viewImageNumber: (n: number) => `View image ${n}`,
      cta: {
        title: "Seen something close to what you want?",
        body: "Send us the image. We will tell you what it would take in your size and stone.",
        primary: "Send a reference",
      },
    },

    process: {
      kicker: "Our crafting process",
      title: "Every masterpiece begins with a vision.",
      subhead: "Our time-tested process ensures that your sacred space is crafted with precision, care, and devotion.",
      steps: {
        consultation: {
          title: "Consultation & Design",
          description:
            "We begin with understanding your vision, space requirements, and spiritual preferences. Our designers have in-depth discussions with you and create detailed sketches for your approval.",
          highlights: ["Free consultation", "3D visualization", "Custom sizing", "Material selection"],
        },
        planning: {
          title: "Artistic Planning",
          description:
            "Our master craftsmen plan every detail, from marble selection to carving techniques. We source premium materials and prepare detailed work schedules.",
          highlights: ["Premium marble sourcing", "Detailed blueprints", "Quality assurance", "Timeline planning"],
        },
        crafting: {
          title: "Precision Crafting",
          description:
            "Using traditional techniques passed down through generations, our artisans hand-carve each piece with meticulous attention to detail and spiritual significance.",
          highlights: ["Hand-carved details", "Traditional techniques", "Quality checkpoints", "Progress updates"],
        },
        installation: {
          title: "Expert Installation",
          description:
            "Our experienced team handles delivery and professional installation, ensuring your sacred space is perfectly positioned and ready for worship.",
          highlights: ["Safe delivery", "Professional installation", "Final inspection", "Care instructions"],
        },
      },
      quality: {
        title: "Quality assurance",
        body:
          "Throughout every step, our quality control team ensures that each piece meets our exacting standards. We believe that sacred art deserves nothing less than perfection, and we stand behind every creation with our lifetime craftsmanship guarantee.",
      },
      cta: {
        title: "Start with a conversation.",
        body: "Step one is free and takes about twenty minutes. Bring photos or measurements of the space.",
        primary: "Book a consultation",
      },
    },

    about: {
      kicker: "Our story",
      title: "For over two decades, crafting sacred spaces.",
      subhead:
        "Kanchan Marble Arts has been crafting sacred spaces and artistic masterpieces, blending traditional techniques with contemporary aesthetics.",
      legacy: {
        kicker: "Legacy of excellence",
        period: "2002 — today",
        body1:
          "Founded in 2002, Kanchan Marble Arts began as a family dream to preserve and celebrate the ancient art of marble craftsmanship. What started as a small workshop has grown into a trusted name in premium marble work across India.",
        body2:
          "Our journey is built on three fundamental pillars: unwavering trust, uncompromising quality, and a legacy that spans generations. Every piece we create carries the weight of tradition and the promise of excellence.",
        body3:
          "With over 50,000 satisfied customers and countless sacred spaces created, we continue to honor the divine through our craft, ensuring each creation becomes a cherished part of your spiritual journey.",
      },
      stats: {
        years: { label: "Years of excellence", note: "Trusted craftsmanship since 2002." },
        orders: { label: "Orders completed", note: "Satisfied customers nationwide." },
        delivery: { label: "Delivery & fitting", note: "Complete installation service." },
      },
      materials: {
        kicker: "Premium materials",
        title: "Three stones. Each chosen for a reason.",
        australian: {
          title: "Australian Marble",
          body: "Premium white marble known for its purity and durability, perfect for sacred sculptures and mandirs.",
        },
        indian: {
          title: "Indian Marble",
          body: "Traditional Makrana and Rajasthani marble, the same stone used in the Taj Mahal, for authentic Indian craftsmanship.",
        },
        italian: {
          title: "Italian Marble",
          body: "Luxurious Carrara marble for premium sculptures and artistic pieces requiring the finest quality.",
        },
      },
      jain: {
        kicker: "Jain artistic heritage",
        title: "Not just art. Devotion.",
        body1:
          "Our Jain-inspired creations reflect not just art, but devotion. Every design is shaped with deep respect for tradition, keeping alive the timeless beauty of Jain architecture.",
        body2:
          "We know the spiritual value these works hold, which is why each piece is crafted with care, balance, and purity of detail. For us, it is not only about creating marble work — it is about honoring faith and creating spaces of peace.",
        body3:
          "From grand temple structures to serene corners for personal prayer, our Jain collection connects people to this sacred heritage, carrying forward a tradition that inspires hearts across the world.",
      },
      cta: {
        title: "Come and see the stone.",
        body:
          "The workshop is open seven days a week in Kandivali East. No appointment needed — though a call ahead helps.",
        primary: "Get directions",
      },
    },

    contact: {
      kicker: "Get in touch",
      title: "Ready to create your sacred space?",
      subhead:
        "Contact us for a free consultation and let's bring your vision to life with our expert craftsmanship.",
      whatsappCard: { title: "WhatsApp us now", note: (phone: string) => `${phone} · fastest reply` },
      callCard: { title: "Call directly" },
      emailCard: { title: "Email" },
      workshop: {
        title: "The workshop",
        addressLabel: "Address",
        hoursLabel: "Business hours",
        hoursValue: "Mon – Sun: 9:00 AM – 9:00 PM",
        hoursNote: "Timings may vary during festive seasons. We recommend contacting us before your visit.",
        stationLabel: "Nearest station",
        stationValue: "Akurli Metro — 2 minutes walking distance",
        directions: "Take me there",
        mapTitle: "Kanchan Marble Arts location",
      },
    },

    footer: {
      blurb: "Marble mandir and murti manufacturer in Mumbai. Handcrafted since 2002.",
      explore: "Explore",
      contact: "Contact",
      whatsapp: "WhatsApp",
      rights: (year: number) => `© ${year} Kanchan Marble Arts. All rights reserved.`,
    },

    notFound: {
      title: "Page Not Found",
      body: "The page you're looking for doesn't exist or has been moved to a new location.",
      goHome: "Go Home",
      viewProducts: "View Products",
      needHelp: "Need help?",
      contactUs: "Contact us",
    },

    error: {
      heading: "Oops!",
      title: "Something went wrong",
      body: "We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.",
      tryAgain: "Try Again",
      goHome: "Go Home",
      errorId: (digest: string) => `Error ID: ${digest}`,
      needHelp: "Need help?",
      contactSupport: "Contact support",
    },

    offline: {
      title: "You're Offline",
      body: "It looks like you've lost your internet connection. Please check your connection and try again.",
      tryAgain: "Try Again",
      note: "Some content may be available offline",
    },
  },

  content: {
    /** Product category names, keyed by the English name used in the data files. */
    categories: {
      Mandirs: "Mandirs",
      Murtis: "Murtis",
      Articles: "Articles",
      Jain: "Jain",
      "Tulsi Stand": "Tulsi Stand",
    } as Record<string, string>,

    /** Marble types offered on the product detail page. */
    stones: {
      Australian: "Australian",
      Indian: "Indian",
      Italian: "Italian",
    } as Record<string, string>,

    /** Product titles and descriptions, keyed by slug. */
    products: {
      "premium-white-marble-mandir": {
        title: "Premium White Marble Mandir",
        description: "Elegant home temple with intricate carvings and traditional design elements.",
      },
      "lord-ganesha-marble-murti": {
        title: "Lord Ganesha Marble Murti",
        description: "Hand-carved Lord Ganesha sculpture in premium Italian marble.",
      },
      "jain-mandir": {
        title: "Jain Mandir",
        description:
          "Elegant home temple in Premium White Marble with intricate carvings and traditional design elements.",
      },
      "radha-krishna-marble-murti": {
        title: "Radha Krishna Marble Murti",
        description: "Beautiful sculpture in various poses and sizes.",
      },
      "corian-mandir": {
        title: "Corian Mandir",
        description: "Modern corian mandir design for contemporary homes.",
      },
      "jain-tirthankar-sculpture": {
        title: "Jain Tirthankar Sculpture",
        description: "Sacred Jain Tirthankar murti crafted with devotion and precision.",
      },
      "marble-tulsi-stand": {
        title: "Marble Tulsi Stand",
        description: "Traditional tulsi plant stand with intricate base design.",
      },
      "lord-hanuman-marble-murti": {
        title: "Lord Hanuman Marble Murti",
        description: "Beautiful sculpture in various poses and sizes.",
      },
      "swastik-marble-jaali": {
        title: "Swastik marble jaali",
        description: "Ornate marble pillar with traditional motifs for architectural enhancement.",
      },
    } as Record<string, { title: string; description: string }>,

    /** Product feature bullets, keyed by the English string in lib/products.ts. */
    features: {
      "Custom sizing": "Custom sizing",
      "Hand-carved details": "Hand-carved details",
      "Premium white marble": "Premium white marble",
      "Expert installation": "Expert installation",
      "Italian marble": "Italian marble",
      "Hand-carved": "Hand-carved",
      "Multiple sizes": "Multiple sizes",
      "Custom poses available": "Custom poses available",
      "Multiple poses": "Multiple poses",
      "Fine detailing": "Fine detailing",
      "Premium marble": "Premium marble",
      "Custom expressions": "Custom expressions",
      "In-depth details": "In-depth details",
      "Premium material": "Premium material",
      "Sacred proportions": "Sacred proportions",
      "Traditional design": "Traditional design",
      "Drainage system": "Drainage system",
      "Durable marble": "Durable marble",
      "Easy maintenance": "Easy maintenance",
      "Traditional motifs": "Traditional motifs",
      "Custom heights": "Custom heights",
      "Architectural grade": "Architectural grade",
    } as Record<string, string>,

    /** Gallery captions and image alt text, keyed by the English source string. */
    captions: {
      "Elegant australian marble mandir with intricate jain carvings":
        "Elegant australian marble mandir with intricate jain carvings",
      "Hand-carved Lord Ganesha murti in premium Italian marble":
        "Hand-carved Lord Ganesha murti in premium Italian marble",
      "Modern Corian mandir design for contemporary homes": "Modern Corian mandir design for contemporary homes",
      "Radha Krishna murti with fine hand-carved detailing": "Radha Krishna murti with fine hand-carved detailing",
      "Traditional marble temple with red and gold accents": "Traditional marble temple with red and gold accents",
      "Lord Hanuman, hand-carved in premium Italian marble": "Lord Hanuman, hand-carved in premium Italian marble",
      "Ambe mata marble murti with detailed craftsmanship": "Ambe mata marble murti with detailed craftsmanship",
      "Lord Ganesha murti with red and gold accents": "Lord Ganesha murti with red and gold accents",
      "Elegant white marble mandir with intricate Jain carvings":
        "Elegant white marble mandir with intricate Jain carvings",
      "Elegant Jain shrine with polished marble finish": "Elegant Jain shrine with polished marble finish",
      "Only white marble mandir with intricate carvings and hathi ghumat":
        "Only white marble mandir with intricate carvings and hathi ghumat",
      "Traditional design mandir showcasing 14 swapnas carvings":
        "Traditional design mandir showcasing 14 swapnas carvings",
      "Corian mandir with lighting": "Corian mandir with lighting",
      "Jain Tirthankar sculpture with detailed craftsmanship": "Jain Tirthankar sculpture with detailed craftsmanship",
      "Marble tulsi stand with floral engravings": "Marble tulsi stand with floral engravings",
      "Handcrafted marble railing pillar with elegant finish": "Handcrafted marble railing pillar with elegant finish",
      "Decorative marble pillar with traditional motifs": "Decorative marble pillar with traditional motifs",
      "Jain Tirthankar sculpture with detailed craftsmanship in premium italian marble":
        "Jain Tirthankar sculpture with detailed craftsmanship in premium italian marble",
      "Marble mandir crafted by Kanchan Marble Arts": "Marble mandir crafted by Kanchan Marble Arts",
      "Hand-carved marble murtis in premium Italian marble": "Hand-carved marble murtis in premium Italian marble",
      "Beautiful marble mandir with intricate carvings and traditional architecture":
        "Beautiful marble mandir with intricate carvings and traditional architecture",
      "Elegant marble murti sculpture with detailed craftsmanship":
        "Elegant marble murti sculpture with detailed craftsmanship",
      "Decorative marble articles including pillars and ornamental pieces":
        "Decorative marble articles including pillars and ornamental pieces",
      "Traditional Jain marble designs with symbolic patterns":
        "Traditional Jain marble designs with symbolic patterns",
      "Master craftsman at work in the Kanchan Marble Arts workshop":
        "Master craftsman at work in the Kanchan Marble Arts workshop",
      "Master craftsman at work": "Master craftsman at work",
      "Jain marble sculpture": "Jain marble sculpture",
      "Consultation and design at the workshop": "Consultation and design at the workshop",
      "Marble selection and planning": "Marble selection and planning",
      "Hand-carving in progress": "Hand-carving in progress",
      "Installed mandir with lighting": "Installed mandir with lighting",
    } as Record<string, string>,

    /** Testimonials, keyed by the reviewer name in content/testimonials.json. */
    testimonials: {
      "Rajesh Sharma": {
        name: "Rajesh Sharma",
        location: "Mumbai",
        review:
          "The marble mandir they created for our home is absolutely divine. The craftsmanship is exceptional and the installation was seamless.",
      },
      "Priya Patel": {
        name: "Priya Patel",
        location: "Ahmedabad",
        review:
          "Twenty years of trust well placed. The murti they crafted captures every detail with such precision and devotion.",
      },
      "Amit Jain": {
        name: "Amit Jain",
        location: "Delhi",
        review:
          "Professional service from start to finish. The Jain temple design exceeded our expectations in every way.",
      },
      "Sunita Gupta": {
        name: "Sunita Gupta",
        location: "Jaipur",
        review:
          "Beautiful marble work with attention to every detail. The team was professional and delivered exactly what we envisioned.",
      },
      "Vikram Singh": {
        name: "Vikram Singh",
        location: "Udaipur",
        review:
          "Exceptional quality and timely delivery. The marble mandir has become the centerpiece of our home temple.",
      },
      "Meera Joshi": {
        name: "Meera Joshi",
        location: "Pune",
        review:
          "Outstanding craftsmanship and customer service. They understood our requirements perfectly and delivered beyond expectations.",
      },
    } as Record<string, { name: string; location: string; review: string }>,
  },
}
