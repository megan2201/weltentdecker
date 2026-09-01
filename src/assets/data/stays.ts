import {
  Bath,
  BedDouble,
  Birdhouse,
  Building,
  Coffee,
  CookingPot,
  Flame,
  Home,
  Kayak,
  Landmark,
  MapPin,
  Mountain,
  Parasol,
  ParkingCircle,
  RockingChair,
  Ship,
  Snowflake,
  Sparkles,
  Sun,
  TrainFront,
  TreePine,
  Trees,
  Tv,
  Waves,
  WavesHorizontal,
  WavesLadder,
  WavesVertical,
  Wifi,
  Wine,
} from "lucide-react";

export type StayAmenity = {
  icon: any;
  title: string;
  description: string;
};

export type Stay = {
  id: string;
  name: string;
  type: string;
  location: string;
  country: string;
  countryImage: string;
  description: string;
  pricePerNight: number;
  rating: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  amenities: StayAmenity[];
  facilities: string[];
  tags: string[];
  featured?: boolean;
};

export const stays: Stay[] = [
  // =========================
  // 🇩🇪 DEUTSCHLAND
  // =========================
  {
    id: "stay-germany-01",
    name: "Alpen-Chalet am See",
    type: "Chalet",
    location: "Garmisch-Partenkirchen",
    country: "Deutschland",
    countryImage: new URL('../img/country/germany.jpg', import.meta.url).href,
    description:
      "Gemütliches Alpen-Chalet mit atemberaubendem Bergblick, privater Sauna und direktem Zugang zu zahlreichen Wanderwegen.",
    pricePerNight: 185,
    rating: 4.9,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      new URL('../img/stay/1_stay-germany-01.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-germany-01.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-germany-01.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Schnelles und zuverlässiges WLAN im gesamten Chalet.",
      },
      {
        icon: WavesVertical,
        title: "Private Sauna",
        description: "Entspannen Sie in Ihrer eigenen finnischen Sauna.",
      },
      {
        icon: Mountain,
        title: "Bergblick",
        description:
          "Genießen Sie einen wunderschönen Panoramablick auf die Alpen.",
      },
    ],
    facilities: [
      "Privater Parkplatz",
      "Voll ausgestattete Küche",
      "Kamin",
      "Terrasse",
      "Waschmaschine",
    ],
    tags: ["Berge", "Natur", "Familie", "Luxus"],
    featured: true,
  },
  {
    id: "stay-germany-02",
    name: "Urbanes Loft Berlin",
    type: "Loft",
    location: "Berlin",
    country: "Deutschland",
    countryImage: new URL('../img/country/germany.jpg', import.meta.url).href,
    description:
      "Stilvolles Loft im industriellen Design im Herzen Berlins, umgeben von Cafés, Galerien und dem pulsierenden Nachtleben.",
    pricePerNight: 125,
    rating: 4.7,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-germany-02.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-germany-02.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-germany-02.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Wifi,
        title: "Highspeed-WLAN",
        description: "Ideal zum Streamen und Arbeiten von unterwegs.",
      },
      {
        icon: Coffee,
        title: "Kaffeestation",
        description: "Genießen Sie jeden Morgen frisch zubereiteten Kaffee.",
      },
      {
        icon: Tv,
        title: "Smart-TV",
        description: "Unterhaltung mit beliebten Streaming-Diensten.",
      },
    ],
    facilities: [
      "Aufzug",
      "Voll ausgestattete Küche",
      "Arbeitsplatz",
      "Klimaanlage",
      "Kontaktloser Check-in",
    ],
    tags: ["Stadt", "Modern", "Paare", "Business"],
  },
  {
    id: "stay-germany-03",
    name: "Rückzugsort im Schwarzwald",
    type: "Ferienhaus",
    location: "Freiburg",
    country: "Deutschland",
    countryImage: new URL('../img/country/germany.jpg', import.meta.url).href,
    description:
      "Ruhiges Ferienhaus mitten in der Natur, umgeben von den Wäldern und sanften Hügeln des Schwarzwalds.",
    pricePerNight: 145,
    rating: 4.8,
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      new URL('../img/stay/1_stay-germany-03.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-germany-03.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-germany-03.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Trees,
        title: "Waldblick",
        description: "Wachen Sie umgeben von ruhiger Natur und Wald auf.",
      },
      {
        icon: Flame,
        title: "Holzofen",
        description:
          "Ein gemütlicher Holzofen sorgt an kalten Abenden für Wärme.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Bleiben Sie auch mitten in der Natur verbunden.",
      },
    ],
    facilities: [
      "Garten",
      "Grillplatz",
      "Kostenloser Parkplatz",
      "Küche",
      "Essbereich im Freien",
    ],
    tags: ["Natur", "Ruhe", "Familie", "Wandern"],
  },
  {
    id: "stay-germany-04",
    name: "Hafenblick Apartment",
    type: "Apartment",
    location: "Hamburg",
    country: "Deutschland",
    countryImage: new URL('../img/country/germany.jpg', import.meta.url).href,
    description:
      "Helles und modernes Apartment nahe dem Hamburger Hafen, zahlreichen Restaurants und der historischen Innenstadt.",
    pricePerNight: 110,
    rating: 4.6,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-germany-04.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-germany-04.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-germany-04.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Zuverlässiges Internet im gesamten Apartment.",
      },
      {
        icon: Ship,
        title: "Hafenblick",
        description:
          "Genießen Sie den Blick auf die Hamburger Wasserlandschaft.",
      },
      {
        icon: CookingPot,
        title: "Voll ausgestattete Küche",
        description:
          "Alles, was Sie für einen komfortablen Aufenthalt benötigen.",
      },
    ],
    facilities: [
      "Aufzug",
      "Balkon",
      "Küche",
      "Heizung",
      "Öffentliche Verkehrsmittel in der Nähe",
    ],
    tags: ["Stadt", "Hafen", "Paare", "Wochenende"],
  },

  // =========================
  // 🇮🇹 ITALIEN
  // =========================
  {
    id: "stay-italy-01",
    name: "Toskanische Weinberg-Villa",
    type: "Villa",
    location: "Toskana",
    country: "Italien",
    countryImage: new URL('../img/country/italy.jpg', import.meta.url).href,
    description:
      "Elegante Villa umgeben von Weinbergen und Olivenhainen im Herzen der Toskana.",
    pricePerNight: 320,
    rating: 4.9,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      new URL('../img/stay/1_stay-italy-01.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-italy-01.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-italy-01.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: WavesLadder,
        title: "Privater Pool",
        description: "Entspannen Sie an Ihrem eigenen privaten Außenpool.",
      },
      {
        icon: Wine,
        title: "Weinberge",
        description:
          "Die Villa liegt mitten in der wunderschönen toskanischen Weinlandschaft.",
      },
      {
        icon: Sun,
        title: "Sonnige Terrasse",
        description:
          "Perfekt für gemeinsame Mahlzeiten und entspannte Stunden im Freien.",
      },
    ],
    facilities: [
      "Privater Pool",
      "Garten",
      "Grill",
      "Parkplatz",
      "Voll ausgestattete Küche",
    ],
    tags: ["Luxus", "Weinberge", "Familie", "Romantisch"],
    featured: true,
  },
  {
    id: "stay-italy-02",
    name: "Meerblick an der Amalfiküste",
    type: "Apartment",
    location: "Positano",
    country: "Italien",
    countryImage: new URL('../img/country/italy.jpg', import.meta.url).href,
    description:
      "Romantisches Apartment hoch über der Amalfiküste mit atemberaubendem Blick auf das Mittelmeer.",
    pricePerNight: 245,
    rating: 4.8,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-italy-02.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-italy-02.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-italy-02.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: WavesHorizontal,
        title: "Meerblick",
        description:
          "Wachen Sie mit einem traumhaften Blick auf das Mittelmeer auf.",
      },
      {
        icon: Sun,
        title: "Privater Balkon",
        description: "Genießen Sie Ihr Frühstück mit Blick auf die Küste.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description:
          "Bleiben Sie während Ihres Aufenthalts jederzeit verbunden.",
      },
    ],
    facilities: [
      "Privater Balkon",
      "Kleine Küche",
      "Klimaanlage",
      "Strandzugang",
      "Flughafentransfer",
    ],
    tags: ["Meer", "Romantisch", "Paare", "Luxus"],
    featured: true,
  },
  {
    id: "stay-italy-03",
    name: "Historische Residenz Rom",
    type: "Boutique-Apartment",
    location: "Rom",
    country: "Italien",
    countryImage: new URL('../img/country/italy.jpg', import.meta.url).href,
    description:
      "Charmante historische Unterkunft in zentraler Lage, von der aus Sie die berühmtesten Sehenswürdigkeiten Roms bequem zu Fuß erreichen.",
    pricePerNight: 160,
    rating: 4.7,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-italy-03.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-italy-03.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-italy-03.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Schnelles WLAN zum Arbeiten und Entspannen.",
      },
      {
        icon: Coffee,
        title: "Kaffeestation",
        description: "Starten Sie Ihren Morgen mit italienischem Kaffee.",
      },
      {
        icon: MapPin,
        title: "Zentrale Lage",
        description: "Viele Sehenswürdigkeiten sind bequem zu Fuß erreichbar.",
      },
    ],
    facilities: [
      "Küche",
      "Klimaanlage",
      "Heizung",
      "Waschmaschine",
      "Kontaktloser Check-in",
    ],
    tags: ["Historisch", "Stadt", "Kultur", "Paare"],
  },
  {
    id: "stay-italy-04",
    name: "Gartenhaus am Comer See",
    type: "Gästehaus",
    location: "Comer See",
    country: "Italien",
    countryImage: new URL('../img/country/italy.jpg', import.meta.url).href,
    description:
      "Ruhiges Gartenhaus nahe dem Comer See – ideal für erholsame Tage inmitten der italienischen Landschaft.",
    pricePerNight: 195,
    rating: 4.8,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      new URL('../img/stay/1_stay-italy-04.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-italy-04.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-italy-04.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Birdhouse,
        title: "Privater Garten",
        description: "Ein ruhiger Garten zum Entspannen und Abschalten.",
      },
      {
        icon: Kayak,
        title: "Nähe zum See",
        description:
          "Der Comer See und umliegende Orte sind schnell erreichbar.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Zuverlässiges WLAN im gesamten Haus.",
      },
    ],
    facilities: [
      "Garten",
      "Parkplatz",
      "Küche",
      "Essbereich im Freien",
      "Fahrradstellplatz",
    ],
    tags: ["See", "Natur", "Erholung", "Familie"],
  },

  // =========================
  // 🇪🇸 SPANIEN
  // =========================
  {
    id: "stay-spain-01",
    name: "Strand-Loft Barcelona",
    type: "Loft",
    location: "Barcelona",
    country: "Spanien",
    countryImage: new URL('../img/country/spain.jpg', import.meta.url).href,
    description:
      "Helles und modernes Loft in Strandnähe, umgeben von Restaurants und dem lebendigen Stadtleben Barcelonas.",
    pricePerNight: 155,
    rating: 4.7,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-spain-01.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-spain-01.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-spain-01.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Parasol,
        title: "Strandnähe",
        description: "Der Strand ist bequem zu Fuß erreichbar.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Schnelles Internet im gesamten Loft.",
      },
      {
        icon: Sun,
        title: "Sonniger Balkon",
        description: "Entspannen Sie bei viel natürlichem Licht im Freien.",
      },
    ],
    facilities: ["Balkon", "Küche", "Klimaanlage", "Aufzug", "Strandzugang"],
    tags: ["Strand", "Stadt", "Modern", "Paare"],
    featured: true,
  },
  {
    id: "stay-spain-02",
    name: "Mallorquinische Finca",
    type: "Finca",
    location: "Mallorca",
    country: "Spanien",
    countryImage: new URL('../img/country/spain.jpg', import.meta.url).href,
    description:
      "Traditionelle mallorquinische Finca umgeben von Olivenbäumen mit privatem Pool und großzügigem Garten.",
    pricePerNight: 275,
    rating: 4.9,
    guests: 7,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      new URL('../img/stay/1_stay-spain-02.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-spain-02.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-spain-02.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: WavesLadder,
        title: "Privater Pool",
        description: "Erfrischen Sie sich in Ihrem eigenen Außenpool.",
      },
      {
        icon: TreePine,
        title: "Olivenhain",
        description: "Genießen Sie die ruhige mediterrane Landschaft.",
      },
      {
        icon: Sun,
        title: "Außenterrasse",
        description:
          "Große Terrasse für gemeinsame Mahlzeiten und entspannte Stunden.",
      },
    ],
    facilities: ["Privater Pool", "Garten", "Grill", "Parkplatz", "Außenküche"],
    tags: ["Insel", "Pool", "Natur", "Familie"],
    featured: true,
  },
  {
    id: "stay-spain-03",
    name: "Andalusisches Innenhofhaus",
    type: "Stadthaus",
    location: "Sevilla",
    country: "Spanien",
    countryImage: new URL('../img/country/spain.jpg', import.meta.url).href,
    description:
      "Traditionelles andalusisches Stadthaus mit wunderschönem privatem Innenhof im Herzen Sevillas.",
    pricePerNight: 135,
    rating: 4.6,
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      new URL('../img/stay/1_stay-spain-03.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-spain-03.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-spain-03.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Landmark,
        title: "Historischer Charme",
        description:
          "Traditionelle andalusische Architektur und liebevolle Details.",
      },
      {
        icon: Sun,
        title: "Privater Innenhof",
        description: "Ein ruhiger Innenhof mit mediterranen Pflanzen.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Zuverlässiges WLAN im gesamten Haus.",
      },
    ],
    facilities: [
      "Innenhof",
      "Küche",
      "Klimaanlage",
      "Waschmaschine",
      "Zentrale Lage",
    ],
    tags: ["Historisch", "Kultur", "Stadt", "Familie"],
  },
  {
    id: "stay-spain-04",
    name: "Villa an der Costa Brava",
    type: "Villa",
    location: "Costa Brava",
    country: "Spanien",
    countryImage: new URL('../img/country/spain.jpg', import.meta.url).href,
    description:
      "Moderne Küstenvilla mit spektakulärem Blick auf das Mittelmeer, großzügiger Terrasse und privatem Pool.",
    pricePerNight: 295,
    rating: 4.9,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      new URL('../img/stay/1_stay-spain-04.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-spain-04.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-spain-04.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: WavesHorizontal,
        title: "Meerblick",
        description: "Unverbauter Blick auf das Mittelmeer.",
      },
      {
        icon: WavesLadder,
        title: "Infinity-Pool",
        description: "Privater Pool mit Blick auf die Küste.",
      },
      {
        icon: Sun,
        title: "Große Terrasse",
        description: "Viel Platz zum Entspannen und Essen im Freien.",
      },
    ],
    facilities: [
      "Infinity-Pool",
      "Privater Parkplatz",
      "Grill",
      "Küche",
      "Außendusche",
    ],
    tags: ["Meer", "Luxus", "Pool", "Familie"],
  },

  // =========================
  // 🇯🇵 JAPAN
  // =========================
  {
    id: "stay-japan-01",
    name: "Traditionelles Machiya in Kyoto",
    type: "Machiya",
    location: "Kyoto",
    country: "Japan",
    countryImage: new URL('../img/country/japan.jpg', import.meta.url).href,
    description:
      "Liebevoll restauriertes traditionelles Stadthaus in Kyoto, das japanische Architektur mit modernem Komfort verbindet.",
    pricePerNight: 210,
    rating: 4.9,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-japan-01.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-japan-01.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-japan-01.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Sun,
        title: "Japanischer Garten",
        description:
          "Privater, ruhiger Garten im traditionellen japanischen Stil.",
      },
      {
        icon: Bath,
        title: "Japanisches Bad",
        description:
          "Entspannen Sie in einem traditionellen tiefen Badebecken.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Schnelles Internet im gesamten Haus.",
      },
    ],
    facilities: [
      "Privater Garten",
      "Traditionelles Tatami-Zimmer",
      "Küche",
      "Waschmaschine",
      "Klimaanlage",
    ],
    tags: ["Traditionell", "Kultur", "Romantisch", "Einzigartig"],
    featured: true,
  },
  {
    id: "stay-japan-02",
    name: "Apartment mit Blick über Tokio",
    type: "Apartment",
    location: "Tokio",
    country: "Japan",
    countryImage: new URL('../img/country/japan.jpg', import.meta.url).href,
    description:
      "Modernes Apartment in einem Hochhaus mit beeindruckendem Blick über die Skyline Tokios und zentraler Lage.",
    pricePerNight: 175,
    rating: 4.7,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      new URL('../img/stay/1_stay-japan-02.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-japan-02.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-japan-02.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Building,
        title: "Skyline-Blick",
        description: "Genießen Sie einen spektakulären Blick über Tokio.",
      },
      {
        icon: Wifi,
        title: "Highspeed-WLAN",
        description: "Schnelles Internet zum Arbeiten und Entspannen.",
      },
      {
        icon: TrainFront,
        title: "Nähe zur Metro",
        description: "Bequemer Zugang zum öffentlichen Verkehrsnetz Tokios.",
      },
    ],
    facilities: [
      "Aufzug",
      "Kleine Küche",
      "Klimaanlage",
      "Arbeitsplatz",
      "Waschmaschine",
    ],
    tags: ["Stadt", "Modern", "Business", "Paare"],
  },
  {
    id: "stay-japan-03",
    name: "Ryokan in den Bergen von Hakone",
    type: "Ryokan",
    location: "Hakone",
    country: "Japan",
    countryImage: new URL('../img/country/japan.jpg', import.meta.url).href,
    description:
      "Ruhiges traditionelles Ryokan inmitten der Berge mit authentischen Zimmern und entspannendem Thermalbad.",
    pricePerNight: 260,
    rating: 4.9,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      new URL('../img/stay/1_stay-japan-03.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-japan-03.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-japan-03.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Bath,
        title: "Thermalbad",
        description:
          "Entspannen Sie in einem traditionellen japanischen Onsen.",
      },
      {
        icon: Mountain,
        title: "Bergblick",
        description: "Ruhiger Blick auf die umliegenden Berge von Hakone.",
      },
      {
        icon: Coffee,
        title: "Teeraum",
        description:
          "Erleben Sie eine traditionelle japanische Tee-Atmosphäre.",
      },
    ],
    facilities: [
      "Onsen",
      "Traditionelle Futons",
      "Japanischer Garten",
      "Teeraum",
      "Kostenloser Parkplatz",
    ],
    tags: ["Onsen", "Traditionell", "Natur", "Erholung"],
    featured: true,
  },
  {
    id: "stay-japan-04",
    name: "Tropische Villa auf Okinawa",
    type: "Villa",
    location: "Okinawa",
    country: "Japan",
    countryImage: new URL('../img/country/japan.jpg', import.meta.url).href,
    description:
      "Moderne tropische Villa in Strandnähe – perfekt für eine entspannte Auszeit auf der Insel Okinawa.",
    pricePerNight: 230,
    rating: 4.8,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      new URL('../img/stay/1_stay-japan-04.jpg', import.meta.url).href,
      new URL('../img/stay/2_stay-japan-04.jpg', import.meta.url).href,
      new URL('../img/stay/3_stay-japan-04.jpg', import.meta.url).href,
    ],
    amenities: [
      {
        icon: Parasol,
        title: "Strandzugang",
        description: "Der Strand ist nur wenige Gehminuten entfernt.",
      },
      {
        icon: WavesLadder,
        title: "Privater Pool",
        description: "Privater Pool umgeben von tropischen Pflanzen.",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Zuverlässiges Internet in der gesamten Villa.",
      },
    ],
    facilities: [
      "Privater Pool",
      "Garten",
      "Grill",
      "Kostenloser Parkplatz",
      "Außendusche",
    ],
    tags: ["Strand", "Insel", "Pool", "Familie"],
  },
];

export function getStayById(id: string): Stay | undefined {
  return stays.find((stay) => stay.id === id);
}

export function getStayTypes(): string[] {
  return [...new Set(stays.map((stay) => stay.type))];
}

export function getStayTypeCount(type: string): number {
  return [...new Set(stays.filter((stay) => stay.type === type))].length;
}

export function getStayFacilities(): string[] {
  return [...new Set(stays.flatMap((stay) => stay.facilities))];
}

export function getStayCountryDetails(): [string, string][] {
  const uniqueCountries = stays.filter(
    (stay, index, self) =>
      index === self.findIndex((s) => s.country === stay.country),
  );

  // Mappt die gefilterten Unterkünfte zu einem Array von Tupeln [country, countryImage]
  return uniqueCountries.map((stay) => [stay.country, stay.countryImage]);
}

export function getStaysAtDestination(destination: string): Stay[] {
  return [
    ...new Set(
      stays.filter(
        (stay) =>
          stay.location.includes(destination) ||
          destination.includes(stay.location),
      ),
    ),
  ];
}

export function getMinPriceOfStaysAtDestination(destination: string): number {
  const stays = getStaysAtDestination(destination);

  // Falls keine Unterkünfte gefunden wurden
  if (stays.length === 0) return 0;

  // Extrahiert alle Preise und findet das Minimum
  return Math.min(...stays.map((stay) => stay.pricePerNight));
}
