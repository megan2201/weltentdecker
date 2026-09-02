export type Experience = {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  country: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  durationMinutes: number;
  rating: number;
  maxGuests: number;
  image: string;
  included: string[];
  notIncluded?: string[];
  meetingPoint: string;
  languages: string[];
  tags: string[];
  featured?: boolean;
  sponsored?: boolean;
  instantBooking?: boolean;
};

export const experiences: Experience[] = [
  // =========================
  // 🇩🇪 DEUTSCHLAND
  // =========================
  {
    id: "experience-germany-01",
    title: "Wanderung auf die Zugspitze",
    type: "Geführte Wanderung",
    category: "Natur & Abenteuer",
    location: "Garmisch-Partenkirchen",
    country: "Deutschland",
    description:
      "Erlebe die beeindruckende Bergwelt rund um Deutschlands höchsten Gipfel bei einer geführten Wanderung mit erfahrenem Bergführer.",
    price: 89,
    currency: "EUR",
    duration: "6 Stunden",
    durationMinutes: 360,
    rating: 4.9,
    maxGuests: 8,
    image: new URL(
      "/img/experience/experience-germany-01.webp",
      import.meta.url,
    ).href,
    included: [
      "Erfahrener Bergführer",
      "Geführte Wanderung",
      "Kleine Erfrischung",
      "Sicherheitsausrüstung",
    ],
    notIncluded: ["Seilbahnticket", "Persönliche Ausgaben", "Mittagessen"],
    meetingPoint: "Bahnhof Garmisch-Partenkirchen",
    languages: ["Deutsch", "Englisch"],
    tags: ["Berge", "Wandern", "Natur", "Abenteuer"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-02",
    title: "Berliner Street-Art & Kieztour",
    type: "Stadtführung",
    category: "Kultur & Kunst",
    location: "Berlin",
    country: "Deutschland",
    description:
      "Entdecke Berlins kreative Seite bei einem geführten Rundgang durch alternative Viertel, vorbei an beeindruckender Street-Art und versteckten Galerien.",
    price: 35,
    currency: "EUR",
    duration: "2,5 Stunden",
    durationMinutes: 150,
    rating: 4.8,
    maxGuests: 12,
    image: new URL(
      "/img/experience/experience-germany-02.webp",
      import.meta.url,
    ).href,
    included: ["Lokaler Guide", "Geführter Rundgang", "Kleine Überraschung"],
    notIncluded: ["Getränke", "Persönliche Ausgaben"],
    meetingPoint: "U-Bahnhof Kottbusser Tor",
    languages: ["Deutsch", "Englisch"],
    tags: ["Street-Art", "Kultur", "Stadt", "Kunst"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-03",
    title: "Berliner Geschichte & Sehenswürdigkeiten",
    type: "Stadtführung",
    category: "Kultur & Geschichte",
    location: "Berlin",
    country: "Deutschland",
    description:
      "Begib dich auf eine spannende Reise durch die Geschichte Berlins und entdecke berühmte Orte wie das Brandenburger Tor, den Reichstag und die Berliner Mauer.",
    price: 39,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.9,
    maxGuests: 15,
    image: new URL(
      "/img/experience/experience-germany-03.webp",
      import.meta.url,
    ).href,
    included: [
      "Lokaler Guide",
      "Geführter Stadtrundgang",
      "Historische Hintergrundinformationen",
      "Kleine Pause",
    ],
    notIncluded: [
      "ÖPNV-Tickets",
      "Eintritt zu Sehenswürdigkeiten",
      "Persönliche Ausgaben",
    ],
    meetingPoint: "Brandenburger Tor",
    languages: ["Deutsch", "Englisch"],
    tags: [
      "Berlin",
      "Geschichte",
      "Brandenburger Tor",
      "Kultur",
      "Sightseeing",
    ],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-04",
    title: "Berliner Food-Tour durch Kreuzberg",
    type: "Food-Tour",
    category: "Essen & Kultur",
    location: "Berlin",
    country: "Deutschland",
    description:
      "Entdecke die kulinarische Vielfalt Kreuzbergs und probiere internationale Spezialitäten, Berliner Klassiker und lokale Geheimtipps.",
    price: 65,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.8,
    maxGuests: 10,
    image: new URL(
      "/img/experience/experience-germany-04.webp",
      import.meta.url,
    ).href,
    included: [
      "Lokaler Food-Guide",
      "Mehrere Verkostungen",
      "Berliner Spezialität",
      "Internationale Snacks",
      "Getränk",
    ],
    notIncluded: ["Weitere Getränke", "Persönliche Ausgaben"],
    meetingPoint: "Kottbusser Tor",
    languages: ["Deutsch", "Englisch"],
    tags: ["Berlin", "Food", "Kreuzberg", "Street Food", "Kulinarik"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-5",
    title: "Spree-Bootstour durch Berlin",
    type: "Bootstour",
    category: "Sightseeing & Erholung",
    location: "Berlin",
    country: "Deutschland",
    description:
      "Erlebe Berlin vom Wasser aus und gleite entspannt über die Spree vorbei an historischen Gebäuden, modernen Wahrzeichen und berühmten Sehenswürdigkeiten.",
    price: 45,
    currency: "EUR",
    duration: "2 Stunden",
    durationMinutes: 120,
    rating: 4.8,
    maxGuests: 20,
    image: new URL(
      "/img/experience/experience-germany-05.webp",
      import.meta.url,
    ).href,
    included: [
      "Bootsfahrt auf der Spree",
      "Audiokommentar",
      "Sitzplatz an Bord",
      "Getränk",
    ],
    notIncluded: ["Weitere Getränke", "Snacks", "Persönliche Ausgaben"],
    meetingPoint: "Anleger Friedrichstraße",
    languages: ["Deutsch", "Englisch"],
    tags: ["Berlin", "Spree", "Boot", "Sightseeing", "Stadt"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-06",
    title: "Schwarzwald-Wanderung mit regionaler Verkostung",
    type: "Naturerlebnis",
    category: "Natur & Genuss",
    location: "Freiburg",
    country: "Deutschland",
    description:
      "Wandere durch die idyllische Landschaft des Schwarzwalds und probiere regionale Spezialitäten bei einem gemütlichen Zwischenstopp.",
    price: 59,
    currency: "EUR",
    duration: "4 Stunden",
    durationMinutes: 240,
    rating: 4.8,
    maxGuests: 10,
    image: new URL(
      "/img/experience/experience-germany-06.webp",
      import.meta.url,
    ).href,
    included: [
      "Lokaler Guide",
      "Geführte Wanderung",
      "Regionale Verkostung",
      "Wasser",
    ],
    notIncluded: ["An- und Abreise", "Weitere Getränke"],
    meetingPoint: "Freiburg Hauptbahnhof",
    languages: ["Deutsch", "Englisch"],
    tags: ["Natur", "Wandern", "Essen", "Schwarzwald"],
    instantBooking: true,
  },

  {
    id: "experience-germany-07",
    title: "Historische Altstadt-Tour durch Freiburg",
    type: "Stadtführung",
    category: "Kultur & Geschichte",
    location: "Freiburg",
    country: "Deutschland",
    description:
      "Entdecke die historische Freiburger Altstadt mit ihren verwinkelten Gassen, den berühmten Bächle und beeindruckenden Sehenswürdigkeiten.",
    price: 32,
    currency: "EUR",
    duration: "2 Stunden",
    durationMinutes: 120,
    rating: 4.8,
    maxGuests: 12,
    image: new URL('/img/experience/experience-germany-07.webp', import.meta.url).href,
    included: [
      "Lokaler Guide",
      "Geführter Rundgang",
      "Historische Geschichten",
      "Kleine regionale Überraschung",
    ],
    notIncluded: ["Getränke", "Eintritt zu Sehenswürdigkeiten", "Persönliche Ausgaben"],
    meetingPoint: "Rathausplatz Freiburg",
    languages: ["Deutsch", "Englisch"],
    tags: ["Freiburg", "Altstadt", "Geschichte", "Kultur"],
    sponsored: true,
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-08",
    title: "Freiburger Weinwanderung mit Verkostung",
    type: "Weinwanderung",
    category: "Natur & Genuss",
    location: "Freiburg",
    country: "Deutschland",
    description:
      "Wandere durch die Weinberge rund um Freiburg und genieße eine Auswahl regionaler Weine mit spannenden Einblicken in den badischen Weinbau.",
    price: 69,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.9,
    maxGuests: 10,
    image: new URL('/img/experience/experience-germany-08.webp', import.meta.url).href,
    included: [
      "Lokaler Guide",
      "Geführte Weinwanderung",
      "Weinverkostung",
      "Regionale Snacks",
      "Wasser",
    ],
    notIncluded: ["An- und Abreise", "Zusätzliche Getränke", "Persönliche Ausgaben"],
    meetingPoint: "Freiburg-Wiehre",
    languages: ["Deutsch", "Englisch"],
    tags: ["Wein", "Weinberge", "Genuss", "Natur", "Freiburg"],
    sponsored: true,
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-09",
    title: "Schauinsland-Abenteuer mit Panorama",
    type: "Naturerlebnis",
    category: "Natur & Abenteuer",
    location: "Freiburg",
    country: "Deutschland",
    description:
      "Erkunde die Höhen des Schauinslands bei einer geführten Wanderung mit spektakulären Ausblicken über den Schwarzwald und die Rheinebene.",
    price: 64,
    currency: "EUR",
    duration: "4,5 Stunden",
    durationMinutes: 270,
    rating: 4.8,
    maxGuests: 8,
    image: new URL('/img/experience/experience-germany-09.webp', import.meta.url).href,
    included: [
      "Erfahrener Wanderführer",
      "Geführte Wanderung",
      "Panoramastopps",
      "Kleine Erfrischung",
    ],
    notIncluded: ["Seilbahnticket", "An- und Abreise", "Mittagessen"],
    meetingPoint: "Talstation Schauinslandbahn",
    languages: ["Deutsch", "Englisch"],
    tags: ["Schwarzwald", "Wandern", "Schauinsland", "Panorama", "Natur"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-germany-10",
    title: "Hamburger Hafen bei Sonnenuntergang",
    type: "Hafenrundfahrt",
    category: "Sightseeing",
    location: "Hamburg",
    country: "Deutschland",
    description:
      "Erlebe Hamburg vom Wasser aus und genieße den Blick auf Hafen, Speicherstadt und Elbphilharmonie während des Sonnenuntergangs.",
    price: 42,
    currency: "EUR",
    duration: "2 Stunden",
    durationMinutes: 120,
    rating: 4.7,
    maxGuests: 20,
    image: new URL(
      "/img/experience/experience-germany-10.webp",
      import.meta.url,
    ).href,
    included: ["Hafenrundfahrt", "Audiokommentar", "Getränk an Bord"],
    notIncluded: ["Weitere Getränke", "Persönliche Ausgaben"],
    meetingPoint: "Landungsbrücken, Brücke 3",
    languages: ["Deutsch", "Englisch"],
    tags: ["Hafen", "Boot", "Sonnenuntergang", "Sightseeing"],
    featured: true,
    instantBooking: true,
  },

  // =========================
  // 🇮🇹 ITALIEN
  // =========================
  {
    id: "experience-italy-01",
    title: "Toskanische Wein- & Olivenölverkostung",
    type: "Kulinarisches Erlebnis",
    category: "Essen & Trinken",
    location: "Toskana",
    country: "Italien",
    description:
      "Verbringe einen genussvollen Nachmittag auf einem traditionellen Weingut und entdecke die Aromen der Toskana.",
    price: 75,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.9,
    maxGuests: 12,
    image: new URL("/img/experience/experience-italy-01.webp", import.meta.url)
      .href,
    included: [
      "Führung durch das Weingut",
      "Weinverkostung",
      "Olivenölverkostung",
      "Regionale Spezialitäten",
    ],
    notIncluded: ["An- und Abreise", "Zusätzliche Weinflaschen"],
    meetingPoint: "Weingut im Chianti-Gebiet",
    languages: ["Italienisch", "Englisch", "Deutsch"],
    tags: ["Wein", "Kulinarik", "Toskana", "Genuss"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-italy-02",
    title: "Bootstour entlang der Amalfiküste",
    type: "Bootstour",
    category: "Meer & Natur",
    location: "Positano",
    country: "Italien",
    description:
      "Entdecke die spektakuläre Amalfiküste vom Wasser aus und schwimme in versteckten Buchten des Mittelmeers.",
    price: 110,
    currency: "EUR",
    duration: "4 Stunden",
    durationMinutes: 240,
    rating: 4.9,
    maxGuests: 8,
    image: new URL("/img/experience/experience-italy-02.webp", import.meta.url)
      .href,
    included: [
      "Bootsfahrt",
      "Skipper",
      "Getränke",
      "Schnorchelausrüstung",
      "Kleine Snacks",
    ],
    notIncluded: ["Mittagessen", "Handtücher", "Persönliche Ausgaben"],
    meetingPoint: "Hafen von Positano",
    languages: ["Italienisch", "Englisch"],
    tags: ["Meer", "Boot", "Schwimmen", "Amalfiküste"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-italy-03",
    title: "Kulinarische Entdeckungstour durch Rom",
    type: "Food-Tour",
    category: "Essen & Kultur",
    location: "Rom",
    country: "Italien",
    description:
      "Probiere dich durch Roms kulinarische Klassiker und entdecke dabei versteckte Gassen und historische Plätze.",
    price: 69,
    currency: "EUR",
    duration: "3,5 Stunden",
    durationMinutes: 210,
    rating: 4.8,
    maxGuests: 10,
    image: new URL("/img/experience/experience-italy-03.webp", import.meta.url)
      .href,
    included: [
      "Lokaler Guide",
      "Mehrere Verkostungen",
      "Pizza",
      "Pasta",
      "Italienisches Dessert",
    ],
    notIncluded: ["Zusätzliche Getränke", "Persönliche Ausgaben"],
    meetingPoint: "Piazza Navona",
    languages: ["Italienisch", "Deutsch", "Englisch"],
    tags: ["Essen", "Pizza", "Pasta", "Kultur"],
    instantBooking: true,
  },

  {
    id: "experience-italy-04",
    title: "Bootsausflug auf dem Comer See",
    type: "Bootstour",
    category: "Natur & Erholung",
    location: "Comer See",
    country: "Italien",
    description:
      "Entdecke die malerischen Orte und eleganten Villen rund um den Comer See bei einer entspannten privaten Bootsfahrt.",
    price: 95,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.8,
    maxGuests: 6,
    image: new URL("/img/experience/experience-italy-04.webp", import.meta.url)
      .href,
    included: [
      "Private Bootsfahrt",
      "Erfahrener Skipper",
      "Getränke",
      "Fotostopps",
    ],
    notIncluded: ["Mittagessen", "Hoteltransfer", "Persönliche Ausgaben"],
    meetingPoint: "Hafen von Como",
    languages: ["Italienisch", "Englisch", "Deutsch"],
    tags: ["See", "Boot", "Natur", "Romantisch"],
    featured: true,
    instantBooking: true,
  },

  // =========================
  // 🇪🇸 SPANIEN
  // =========================
  {
    id: "experience-spain-01",
    title: "Tapas- und Architektur-Tour durch Barcelona",
    type: "Kulinarische Stadtführung",
    category: "Essen & Kultur",
    location: "Barcelona",
    country: "Spanien",
    description:
      "Entdecke Barcelona zu Fuß, probiere traditionelle Tapas und erfahre mehr über die außergewöhnliche Architektur der Stadt.",
    price: 65,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.8,
    maxGuests: 10,
    image: new URL("/img/experience/experience-spain-01.webp", import.meta.url)
      .href,
    included: [
      "Lokaler Guide",
      "Mehrere Tapas",
      "Getränke",
      "Historische Stadtführung",
    ],
    notIncluded: ["Eintritt zu Sehenswürdigkeiten", "Persönliche Ausgaben"],
    meetingPoint: "Plaça de Catalunya",
    languages: ["Spanisch", "Deutsch", "Englisch"],
    tags: ["Tapas", "Architektur", "Kultur", "Stadt"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-spain-02",
    title: "Segeltörn vor Mallorca",
    type: "Segeltörn",
    category: "Meer & Abenteuer",
    location: "Mallorca",
    country: "Spanien",
    description:
      "Verbringe einen entspannten Tag auf dem Mittelmeer, entdecke versteckte Buchten und springe ins kristallklare Wasser.",
    price: 120,
    currency: "EUR",
    duration: "5 Stunden",
    durationMinutes: 300,
    rating: 4.9,
    maxGuests: 8,
    image: new URL("/img/experience/experience-spain-02.webp", import.meta.url)
      .href,
    included: [
      "Segeltörn",
      "Skipper",
      "Schnorchelausrüstung",
      "Getränke",
      "Obst und Snacks",
    ],
    notIncluded: ["Hoteltransfer", "Mittagessen", "Handtücher"],
    meetingPoint: "Hafen von Palma",
    languages: ["Spanisch", "Deutsch", "Englisch"],
    tags: ["Meer", "Segeln", "Strand", "Sommer"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-spain-03",
    title: "Flamenco-Abend mit Tapas",
    type: "Kulturabend",
    category: "Kultur & Genuss",
    location: "Sevilla",
    country: "Spanien",
    description:
      "Erlebe die Leidenschaft des traditionellen Flamenco bei einer Live-Aufführung und genieße dazu andalusische Spezialitäten.",
    price: 79,
    currency: "EUR",
    duration: "2,5 Stunden",
    durationMinutes: 150,
    rating: 4.9,
    maxGuests: 20,
    image: new URL("/img/experience/experience-spain-03.webp", import.meta.url)
      .href,
    included: [
      "Flamenco-Aufführung",
      "Sitzplatzreservierung",
      "Tapas-Auswahl",
      "Ein Getränk",
    ],
    notIncluded: ["Weitere Getränke", "Persönliche Ausgaben"],
    meetingPoint: "Altstadt von Sevilla",
    languages: ["Spanisch", "Deutsch", "Englisch"],
    tags: ["Flamenco", "Tapas", "Kultur", "Abend"],
    instantBooking: true,
  },

  {
    id: "experience-spain-04",
    title: "Kajaktour entlang der Costa Brava",
    type: "Kajaktour",
    category: "Meer & Abenteuer",
    location: "Costa Brava",
    country: "Spanien",
    description:
      "Paddele entlang der spektakulären Küste, entdecke versteckte Buchten und erkunde kleine Meereshöhlen.",
    price: 70,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.8,
    maxGuests: 12,
    image: new URL("/img/experience/experience-spain-04.webp", import.meta.url)
      .href,
    included: ["Kajak", "Paddel", "Schwimmweste", "Erfahrener Guide", "Wasser"],
    notIncluded: ["Hoteltransfer", "Mittagessen", "Wasserschuhe"],
    meetingPoint: "Strand von Tossa de Mar",
    languages: ["Spanisch", "Deutsch", "Englisch"],
    tags: ["Kajak", "Meer", "Abenteuer", "Buchten"],
    featured: true,
    instantBooking: true,
  },

  // =========================
  // 🇯🇵 JAPAN
  // =========================
  {
    id: "experience-japan-01",
    title: "Traditionelle Teezeremonie in Kyoto",
    type: "Kulturerlebnis",
    category: "Kultur & Tradition",
    location: "Kyoto",
    country: "Japan",
    description:
      "Tauche in die japanische Teekultur ein und erlebe eine traditionelle Teezeremonie in einem ruhigen historischen Ambiente.",
    price: 55,
    currency: "EUR",
    duration: "1,5 Stunden",
    durationMinutes: 90,
    rating: 4.9,
    maxGuests: 8,
    image: new URL("/img/experience/experience-japan-01.webp", import.meta.url)
      .href,
    included: [
      "Traditionelle Teezeremonie",
      "Matcha-Tee",
      "Japanische Süßigkeit",
      "Einführung in die Teekultur",
    ],
    notIncluded: ["Kimono-Verleih", "Persönliche Ausgaben"],
    meetingPoint: "Gion, Kyoto",
    languages: ["Japanisch", "Deutsch", "Englisch"],
    tags: ["Teezeremonie", "Kultur", "Tradition", "Matcha"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-japan-02",
    title: "Tokio bei Nacht – Neon & Street Food",
    type: "Abendliche Stadtführung",
    category: "Stadt & Kulinarik",
    location: "Tokio",
    country: "Japan",
    description:
      "Erlebe Tokio nach Sonnenuntergang und entdecke leuchtende Straßen, versteckte Bars und typisch japanisches Street Food.",
    price: 59,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.8,
    maxGuests: 10,
    image: new URL("/img/experience/experience-japan-02.webp", import.meta.url)
      .href,
    included: [
      "Lokaler Guide",
      "Street-Food-Verkostung",
      "Getränk",
      "Besuch mehrerer Stadtviertel",
    ],
    notIncluded: ["Weitere Getränke", "Persönliche Ausgaben"],
    meetingPoint: "Shibuya Crossing",
    languages: ["Japanisch", "Deutsch", "Englisch"],
    tags: ["Tokio", "Nachtleben", "Street Food", "Neon"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-japan-03",
    title: "Hakone Onsen & Fuji-Erlebnis",
    type: "Wellness-Erlebnis",
    category: "Entspannung & Natur",
    location: "Hakone",
    country: "Japan",
    description:
      "Entspanne in einem traditionellen Onsen und entdecke die natürliche Schönheit Hakones mit Blick auf den Fuji.",
    price: 95,
    currency: "EUR",
    duration: "5 Stunden",
    durationMinutes: 300,
    rating: 4.9,
    maxGuests: 8,
    image: new URL("/img/experience/experience-japan-03.webp", import.meta.url)
      .href,
    included: [
      "Eintritt ins Onsen",
      "Lokaler Guide",
      "Tee",
      "Transport innerhalb Hakones",
    ],
    notIncluded: ["Mahlzeiten", "Private Handtücher", "Persönliche Ausgaben"],
    meetingPoint: "Hakone-Yumoto Bahnhof",
    languages: ["Japanisch", "Deutsch", "Englisch"],
    tags: ["Onsen", "Fuji", "Wellness", "Natur"],
    featured: true,
    instantBooking: true,
  },

  {
    id: "experience-japan-04",
    title: "Schnorcheln in Okinawas Korallenriffen",
    type: "Schnorcheltour",
    category: "Meer & Abenteuer",
    location: "Okinawa",
    country: "Japan",
    description:
      "Entdecke die farbenprächtige Unterwasserwelt Okinawas bei einer geführten Schnorcheltour durch kristallklares Wasser.",
    price: 85,
    currency: "EUR",
    duration: "3 Stunden",
    durationMinutes: 180,
    rating: 4.9,
    maxGuests: 10,
    image: new URL("/img/experience/experience-japan-04.webp", import.meta.url)
      .href,
    included: [
      "Schnorchelausrüstung",
      "Schwimmweste",
      "Erfahrener Guide",
      "Wasser",
      "Versicherung",
    ],
    notIncluded: ["Hoteltransfer", "Mittagessen", "Unterwasserkamera"],
    meetingPoint: "Strand von Onna",
    languages: ["Japanisch", "Deutsch", "Englisch"],
    tags: ["Schnorcheln", "Meer", "Korallenriff", "Abenteuer"],
    featured: true,
    instantBooking: true,
  },
];

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((experience) => experience.id === id);
}

export function getRandomExperience(): Experience {
  const rdm = Math.floor(Math.random() * experiences.length);
  return experiences[rdm];
}

export function getExperiencesByCategory(category: string): Experience[] {
  return experiences.filter((experience) => experience.category === category);
}

export function getFeaturedExperiences(): Experience[] {
  return experiences.filter((experience) => experience.featured);
}

export function searchExperiences(query: string): Experience[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return experiences;
  }

  return experiences.filter((experience) => {
    const searchableText = [
      experience.title,
      experience.type,
      experience.category,
      experience.location,
      experience.country,
      experience.description,
      ...experience.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getExperienceCategoryCount(category: string): number {
  return [
    ...new Set(
      experiences.filter((experience) => experience.category === category),
    ),
  ].length;
}

export function getExperienceTags(): string[] {
  return [...new Set(experiences.flatMap((experience) => experience.tags))];
}

export function getExperienceCategories(): string[] {
  return [...new Set(experiences.map((experience) => experience.category))];
}

export function getExperiencesAtDestination(destination: string): Experience[] {
  return [
    ...new Set(
      experiences.filter((experience) => experience.location === destination),
    ),
  ];
}
