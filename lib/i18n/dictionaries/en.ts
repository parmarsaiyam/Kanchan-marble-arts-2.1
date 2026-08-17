/**
 * English master dictionary.
 *
 * This object defines the shape every other locale must satisfy (see `Dictionary`
 * in ../types). Two kinds of entries live here:
 *
 *  - `ui`      : structural strings, checked at compile time so a missing key in
 *                Hindi or Gujarati is a type error, not a blank spot on the page.
 *  - `content`: lookup maps keyed by the English source string (image alt text,
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
      enquire: "Contact us",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      homeAria: "Kanchan Marble Arts home page",
      logoAlt: "Kanchan Marble Arts",
      chooseLanguage: "Choose language",
    },

    common: {
      whatsappUs: "WhatsApp us",
      call: (phone: string) => `Call ${phone}`,
      callAria: "Call Kanchan Marble Arts",
      whatsappAria: "Chat on WhatsApp",
      getDirections: "Get directions",
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
        "A custom marble mandir for your home in Mumbai, hand-carved to your measurements and fitted by our own team. Each piece tells a story of devotion, artistry and timeless beauty.",
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
          mandirs: {
            title: "Mandirs",
            description: "Premium marble pooja mandirs, from a small home shrine to a full family temple.",
          },
          murtis: { title: "Murtis", description: "Hand-carved marble murtis of any deity, in the size and pose you choose." },
          articles: { title: "Articles", description: "Tulsi stands, jaalis and pillars for homes and sacred spaces." },
          jain: {
            title: "Jain designs",
            description: "White marble Jain mandirs with Ashtamangala, 14 Swapna and Siddhachakra carving.",
          },
        },
      },
      workshop: {
        kicker: "The workshop",
        title: "A family dream, still cut by hand.",
        body1:
          "Founded in 2002, Kanchan Marble Arts began as a family dream to preserve and celebrate the ancient art of marble craftsmanship. What started as a small workshop has grown into a trusted name in premium marble work across India.",
        body2:
          "Every handmade marble mandir still leaves this workshop the way it did in 2002: cut, carved and finished by hand. Trust, quality and a legacy that spans generations are the three pillars the work rests on.",
        link: "Read our story",
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
        link: "See the full craft process",
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
          "From a full derasar to a Jain marble temple for home, our Jain work carries Ashtamangala, 14 Swapna and Siddhachakra detail carved into the stone itself.",
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
          "Consultation is free. Send a photo of the space, or just the measurements, and we will come back with a design and a price.",
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
        "Premium marble pooja mandirs, small marble mandirs for home, Jain mandirs and hand-carved murtis. Sizes, carving and stone are chosen with you, so treat this as a starting point rather than a fixed catalogue.",
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
      aside:
        "Every image here is a completed commission: marble mandirs, white marble Jain mandirs and murtis, in the homes they were made for. Tap any one to see it full-screen with its caption.",
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
      subhead:
        "The same four steps behind every handmade marble mandir we have built since 2002, so your sacred space is finished with precision, care and devotion.",
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
        "One of the family-run marble temple manufacturers in Mumbai, crafting sacred spaces and artistic masterpieces since 2002, blending traditional techniques with contemporary aesthetics.",
      legacy: {
        kicker: "Legacy of excellence",
        period: "2002 to today",
        body1:
          "Founded in 2002, Kanchan Marble Arts began as a family dream to preserve and celebrate the ancient art of marble craftsmanship. What started as a small workshop has grown into a trusted name in premium marble work across India.",
        body2:
          "Our journey is built on three fundamental pillars: unwavering trust, uncompromising quality, and a legacy that spans generations. Every piece we create carries the weight of tradition and the promise of excellence.",
        body3:
          "With over 1,00,000 satisfied customers and countless sacred spaces created, we continue to honor the divine through our craft, ensuring each creation becomes a cherished part of your spiritual journey.",
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
          "We know the spiritual value these works hold, which is why each piece is crafted with care, balance, and purity of detail. For us, it is not only about creating marble work. It is about honoring faith and creating spaces of peace.",
        body3:
          "From grand temple structures to serene corners for personal prayer, our Jain collection connects people to this sacred heritage, carrying forward a tradition that inspires hearts across the world.",
      },
      cta: {
        title: "Come and see the stone.",
        body:
          "The workshop is open seven days a week in Kandivali East. No appointment needed, though a call ahead helps.",
        primary: "Get directions",
      },
      facts: {
        kicker: "At a glance",
        title: "Who we are, in plain answers.",
        items: {
          who: {
            q: "Who are we?",
            a: "Kanchan Marble Arts is a family-run marble temple manufacturer in Mumbai. We design, hand-carve, deliver and install marble mandirs, Jain temples and murtis. Every piece is made in our own workshop rather than bought in and resold.",
          },
          where: {
            q: "Where are we located?",
            a: "Our workshop and showroom are at Ashok Nagar, Kandivali East, Mumbai 400101, two minutes' walk from Akurli Metro station, beside the Mahanagar CNG pump. If you are looking for a marble mandir shop near Kandivali, you can walk in any day of the week.",
          },
          since: {
            q: "How long have we been operating?",
            a: "Since 2002. That is more than twenty years and over 1,00,000 completed orders. The same family has run the workshop throughout, and several of our carvers have been with us for more than a decade.",
          },
          products: {
            q: "What products do we specialise in?",
            a: "Custom marble mandirs for homes, white marble Jain mandirs and Jain temples, hand-carved murtis, and decorative marble articles such as tulsi stands, jaalis and pillars. Roughly half of what we make each year is a marble mandir for a home in Mumbai.",
          },
          marble: {
            q: "What marble do we use?",
            a: "Three stones. Australian white marble for its purity and hardness, Indian Makrana and Rajasthani marble (the same stone used in the Taj Mahal), and Italian Carrara for the finest sculptural work. You see the actual slab before it is cut.",
          },
          custom: {
            q: "Do we customise?",
            a: "Almost everything we make is customised. Size, carving, ghumat style, stone and finish are chosen with you, and we work from your room measurements. A customized Jain mandir with Ashtamangala or 14 Swapna panels is among our most frequent commissions.",
          },
          areas: {
            q: "Which areas do we serve?",
            a: "All of Mumbai and the MMR: Kandivali, Borivali, Malad, Goregaon, Andheri, Thane and Navi Mumbai, with delivery and fitting included free inside Mumbai. We also crate and ship across India, and have sent pieces to Gujarat, Rajasthan, Delhi and overseas.",
          },
          contact: {
            q: "How can you contact us?",
            a: (phone: string, email: string) =>
              `WhatsApp or call ${phone}, email ${email}, or simply visit the workshop between 9 AM and 9 PM any day of the week. WhatsApp is fastest. Send a photo of the space and we usually reply within a few hours.`,
          },
        },
      },
    },

    faq: {
      kicker: "Common questions",
      title: "Frequently asked questions",
      subhead: "The things customers ask us most often, answered honestly. For anything else, just call or WhatsApp.",
      stillDeciding: "Still deciding?",
      seeProcess: "See how a mandir is made",
      seeCollections: "Browse the collections",
      items: {
        homeMandir: {
          q: "Do you make a marble mandir for home in Mumbai?",
          a: "That is most of what we do. A marble mandir for home in Mumbai is our commonest commission, from a compact shrine in a flat to a full family temple in a bungalow. We measure your space, carve to fit it, then deliver and install anywhere in Mumbai at no extra charge.",
        },
        price: {
          q: "What is the price of a marble mandir?",
          a: "A small marble mandir for a home starts at around ₹25,000, and most family mandirs fall between ₹45,000 and ₹1,1,00,000. The final figure depends on size, the stone you choose and how much carving you want. Murtis start at about ₹5,000. Tell us the size of your space and we will send an exact quote.",
        },
        customJain: {
          q: "Do you make customized Jain marble mandirs?",
          a: "Yes, customized Jain mandirs are one of our specialities. We build both compact home shrines and full derasar installations in white marble, with the parikar, toran, ghumat and panelling carved to the design your family follows.",
        },
        bestMarble: {
          q: "Which marble is best for a home temple?",
          a: "For most homes we recommend Australian white marble: it is dense, bright white and resists staining from oil and kumkum. Makrana is the traditional choice and ages beautifully. Italian Carrara is best where fine sculptural detail matters more than everyday hardness.",
        },
        ashtamangala: {
          q: "Do you make Jain mandirs with Ashtamangala?",
          a: "Yes. We carve all eight Ashtamangala symbols by hand, and regularly make Jain mandirs with 14 Swapna panels, Siddhachakra and Chovisi. They are carved in relief in the stone itself rather than applied on top, so the detail lasts as long as the marble does.",
        },
        sizeDesign: {
          q: "Can I customise the size and design?",
          a: "Yes, that is simply how we work. Send the height, width and depth of your space, or a photo with rough measurements, and we will draw a design to fit it. Nothing is cut until you have approved the sketch.",
        },
        outsideMumbai: {
          q: "Do you deliver outside Mumbai?",
          a: "Yes. Delivery and fitting are included free within Mumbai. Outside the city we crate the piece and ship it anywhere in India at cost, and for larger installations we can send our own fitters to assemble it.",
        },
        howLong: {
          q: "How long does a customized marble mandir take?",
          a: "Four to eight weeks for most mandirs, from approved design to installation. Simple murtis take two to three weeks. Large Jain temple work can run longer. We give you a date in writing before starting, and send progress photographs as the carving advances.",
        },
      },
    },

    contact: {
      kicker: "Get in touch",
      title: "Ready to create your sacred space?",
      subhead:
        "A marble mandir shop near Kandivali you can simply walk into. Come by for a free consultation, or send your measurements and we will quote.",
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
        stationValue: "Akurli Metro, 2 minutes walking distance",
        directions: "Take me there",
        mapTitle: "Kanchan Marble Arts location",
      },
    },

    footer: {
      blurb: "Marble mandir and marble murti manufacturer in Mumbai. Hand-carved in Kandivali East since 2002.",
      explore: "Explore",
      contact: "Contact",
      whatsapp: "WhatsApp",
      adminLogin: "Site login",
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
      "White marble mandir with a domed ghumat, Jain carving worked across the arch and pillars":
        "White marble mandir with a domed ghumat, Jain carving worked across the arch and pillars",
      "Ganesha murti in white Italian marble, seated with one hand raised in blessing":
        "Ganesha murti in white Italian marble, seated with one hand raised in blessing",
      "Plain modern Corian mandir in white, straight edges and no carving":
        "Plain modern Corian mandir in white, straight edges and no carving",
      "Radha and Krishna standing together, carved from a single block of pale marble":
        "Radha and Krishna standing together, carved from a single block of pale marble",
      "Marble temple with red and gold picked out along the carved arches and dome":
        "Marble temple with red and gold picked out along the carved arches and dome",
      "Hanuman murti in white Italian marble, standing with hands folded":
        "Hanuman murti in white Italian marble, standing with hands folded",
      "Ambe Mata murti in marble, seated and crowned, fine carving across the robes":
        "Ambe Mata murti in marble, seated and crowned, fine carving across the robes",
      "Ganesha murti in marble, crown and robes finished in red and gold":
        "Ganesha murti in marble, crown and robes finished in red and gold",
      "White marble Jain mandir, arch and side panels carved edge to edge":
        "White marble Jain mandir, arch and side panels carved edge to edge",
      "Jain shrine in polished white marble, plain surfaces framing a carved doorway":
        "Jain shrine in polished white marble, plain surfaces framing a carved doorway",
      "White marble mandir topped with a hathi ghumat, elephants carved at the dome":
        "White marble mandir topped with a hathi ghumat, elephants carved at the dome",
      "Mandir with the 14 Swapna carved in relief in a row across the upper panel":
        "Mandir with the 14 Swapna carved in relief in a row across the upper panel",
      "Corian mandir lit from within, the glow showing through the back panel":
        "Corian mandir lit from within, the glow showing through the back panel",
      "Jain Tirthankar murti in Italian marble, face and drapery finely finished":
        "Jain Tirthankar murti in Italian marble, face and drapery finely finished",
      "Seated Jain Tirthankar murti in white marble, hands resting in the lap":
        "Seated Jain Tirthankar murti in white marble, hands resting in the lap",
      "Marble tulsi stand, flowers carved around the base and the rim":
        "Marble tulsi stand, flowers carved around the base and the rim",
      "Turned marble railing pillar, polished smooth, with a carved capital":
        "Turned marble railing pillar, polished smooth, with a carved capital",
      "Marble pillar carved with traditional motifs down its full length":
        "Marble pillar carved with traditional motifs down its full length",
      "White marble home mandir, carved dome above a pillared arch":
        "White marble home mandir, carved dome above a pillared arch",
      "Several hand-carved marble murtis grouped together in Italian marble":
        "Several hand-carved marble murtis grouped together in Italian marble",
      "Marble mandir with carved pillars and a stepped dome, in traditional temple proportions":
        "Marble mandir with carved pillars and a stepped dome, in traditional temple proportions",
      "Marble murti with the face and the folds of the robe carved by hand":
        "Marble murti with the face and the folds of the robe carved by hand",
      "Marble articles on a shelf: turned pillars, jaali panels and small ornaments":
        "Marble articles on a shelf: turned pillars, jaali panels and small ornaments",
      "Jain marble panel carved with the symbolic patterns used in derasar work":
        "Jain marble panel carved with the symbolic patterns used in derasar work",
      "Craftsman at the Kanchan Marble Arts workshop, chisel in hand, shaping a marble panel":
        "Craftsman at the Kanchan Marble Arts workshop, chisel in hand, shaping a marble panel",
      "Craftsman shaping marble by hand with a chisel": "Craftsman shaping marble by hand with a chisel",
      "Jain figure carved in white marble, seated and still": "Jain figure carved in white marble, seated and still",
      "A mandir drawing spread on the workshop bench, being talked through":
        "A mandir drawing spread on the workshop bench, being talked through",
      "Marble slabs stacked at the workshop, waiting to be matched and cut":
        "Marble slabs stacked at the workshop, waiting to be matched and cut",
      "A murti part finished, chisel marks still showing in the stone":
        "A murti part finished, chisel marks still showing in the stone",
      "A finished mandir installed in a home, lit from above":
        "A finished mandir installed in a home, lit from above",
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
