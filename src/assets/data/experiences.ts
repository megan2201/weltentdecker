import {
  Bike,
  Camera,
  Coffee,
  CookingPot,
  Footprints,
  Mountain,
  Sailboat,
  Sparkles,
  Utensils,
  Waves,
  Wine,
} from "lucide-react";

export type ExperienceAmenity = {
  icon: any;
  title: string;
  description: string;
};

export type Experience = {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  country: string;

  description: string;
  longDescription: string;

  price: number;
  currency: string;
  duration: string;
  durationMinutes: number;

  rating: number;
  reviews: number;

  maxGuests: number;
  minAge?: number;

  images: string[];

  included: string[];
  notIncluded?: string[];

  amenities: ExperienceAmenity[];

  meetingPoint: string;
  meetingPointImage: string;
  meetingPointDescription: string;

  languages: string[];

  tags: string[];

  featured?: boolean;
  instantBooking?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "amalfi-boat-tour",
    title: "Private Bootstour entlang der Amalfiküste",
    type: "Bootstour",
    category: "Wasser & Meer",

    location: "Amalfiküste",
    country: "Italien",

    description:
      "Entdecke versteckte Buchten, kleine Küstendörfer und das türkisblaue Meer bei einer privaten Bootstour.",

    longDescription:
      "Verbringe einen unvergesslichen Tag auf dem Mittelmeer und entdecke die Amalfiküste aus einer ganz neuen Perspektive. Dein lokaler Skipper bringt dich zu versteckten Buchten, kleinen Grotten und ruhigen Badestellen, die vom Land aus kaum erreichbar sind. Zwischendurch kannst du ins kristallklare Wasser springen oder an Bord ein Glas Prosecco genießen.",

    price: 129,
    currency: "EUR",

    duration: "4 Stunden",
    durationMinutes: 240,

    rating: 4.9,
    reviews: 327,

    maxGuests: 8,

    images: [
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=90",
    ],

    included: [
      "Privates Boot",
      "Lokaler Skipper",
      "Schwimmwesten",
      "Wasser",
      "Prosecco",
      "Schnorchelausrüstung",
    ],

    notIncluded: ["Hoteltransfer", "Mittagessen", "Persönliche Ausgaben"],

    amenities: [
      {
        icon: Sailboat,
        title: "Privates Boot",
        description: "Nur du, deine Gruppe und dein Skipper",
      },
      {
        icon: Waves,
        title: "Schwimmen & Schnorcheln",
        description: "Stopps an ausgewählten Badestellen",
      },
      {
        icon: Camera,
        title: "Fotostopps",
        description: "Die schönsten Aussichtspunkte der Küste",
      },
      {
        icon: Sparkles,
        title: "Kleine Extras",
        description: "Wasser und Prosecco inklusive",
      },
    ],

    meetingPoint: "Marina Grande, Amalfi",

    meetingPointImage: "https://images.unsplash.com/photo-1578508448485-446f3b009b37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    meetingPointDescription:
      "Treffpunkt direkt am Haupthafen von Amalfi. Dein Skipper erwartet dich vor dem Haupteingang der Marina.",

    languages: ["Deutsch", "Englisch", "Italienisch"],

    tags: ["Meer", "Boot", "Privat", "Familienfreundlich"],

    featured: true,
    instantBooking: true,
  },

  {
    id: "amalfi-cooking-class",
    title: "Italienischer Kochkurs bei einer lokalen Familie",
    type: "Kochkurs",
    category: "Essen & Trinken",

    location: "Ravello",
    country: "Italien",

    description:
      "Lerne traditionelle Gerichte der Amalfiküste kennen und koche gemeinsam mit einer italienischen Familie.",

    longDescription:
      "Tauche für einen Nachmittag in die italienische Küche ein. Gemeinsam mit deiner Gastgeberin lernst du, wie frische Pasta, traditionelle Saucen und ein typisches Dessert der Region zubereitet werden. Nach dem Kochen sitzt ihr gemeinsam am Tisch und genießt eure Kreationen mit regionalem Wein.",

    price: 89,
    currency: "EUR",

    duration: "3,5 Stunden",
    durationMinutes: 210,

    rating: 4.95,
    reviews: 184,

    maxGuests: 8,

    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90",
    ],

    included: [
      "Alle Zutaten",
      "Kochkurs",
      "Gemeinsames Abendessen",
      "Regionaler Wein",
      "Rezepte zum Mitnehmen",
    ],

    notIncluded: ["Hoteltransfer", "Zusätzliche Getränke"],

    amenities: [
      {
        icon: CookingPot,
        title: "Gemeinsam kochen",
        description: "Traditionelle italienische Rezepte",
      },
      {
        icon: Utensils,
        title: "Gemeinsames Essen",
        description: "Genieße deine selbst gekochten Gerichte",
      },
      {
        icon: Wine,
        title: "Regionaler Wein",
        description: "Lokale Weine begleiten das Essen",
      },
      {
        icon: Sparkles,
        title: "Kleine Gruppe",
        description: "Persönliche Atmosphäre mit maximal 8 Gästen",
      },
    ],

    meetingPoint: "Ravello, Amalfiküste",

    meetingPointImage: "https://images.unsplash.com/photo-1612277262334-257287134cc4?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    meetingPointDescription:
      "Die genaue Adresse wird nach der Buchung mitgeteilt.",

    languages: ["Deutsch", "Englisch", "Italienisch"],

    tags: ["Kulinarik", "Pasta", "Lokal", "Kleine Gruppe"],

    featured: true,
    instantBooking: true,
  },

  {
    id: "santorini-sunset-sailing",
    title: "Sunset Sailing vor Santorini",
    type: "Segeltörn",
    category: "Wasser & Meer",

    location: "Santorini",
    country: "Griechenland",

    description:
      "Segle bei Sonnenuntergang entlang der Caldera und genieße Santorini vom Wasser aus.",

    longDescription:
      "Erlebe einen der schönsten Sonnenuntergänge Griechenlands vom Deck eines traditionellen Segelboots. Nach einem entspannten Nachmittag auf dem Wasser ankern wir in einer ruhigen Bucht. Während die Sonne langsam hinter der Caldera verschwindet, genießt du lokale Snacks, Wein und den Blick auf die weißen Dörfer von Santorini.",

    price: 145,
    currency: "EUR",

    duration: "5 Stunden",
    durationMinutes: 300,

    rating: 4.9,
    reviews: 412,

    maxGuests: 12,

    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=90",
    ],

    included: [
      "Segeltörn",
      "Skipper",
      "Lokale Snacks",
      "Wein und Getränke",
      "Schnorchelausrüstung",
      "Handtücher",
    ],

    notIncluded: ["Hoteltransfer", "Persönliche Ausgaben"],

    amenities: [
      {
        icon: Sailboat,
        title: "Segelboot",
        description: "Entspannter Segeltörn entlang der Caldera",
      },
      {
        icon: Waves,
        title: "Schwimmen",
        description: "Badepause in einer ruhigen Bucht",
      },
      {
        icon: Wine,
        title: "Lokale Getränke",
        description: "Wein, Wasser und Snacks inklusive",
      },
      {
        icon: Camera,
        title: "Sunset",
        description: "Perfekte Aussicht auf den Sonnenuntergang",
      },
    ],

    meetingPoint: "Vlychada Marina, Santorini",

    meetingPointImage: "https://images.unsplash.com/photo-1594048069339-42ae0e89376a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    meetingPointDescription:
      "Treffpunkt an der Marina von Vlychada. Ein Transfer kann optional hinzugebucht werden.",

    languages: ["Englisch", "Griechisch", "Deutsch"],

    tags: ["Sunset", "Segeln", "Meer", "Romantisch"],

    featured: true,
    instantBooking: true,
  },

  {
    id: "ubud-jungle-hike",
    title: "Dschungelwanderung bei Sonnenaufgang",
    type: "Wanderung",
    category: "Natur & Outdoor",

    location: "Ubud",
    country: "Indonesien",

    description:
      "Erkunde den tropischen Dschungel Balis bei einer frühen Wanderung mit lokalem Guide.",

    longDescription:
      "Starte deinen Tag früh und erlebe Bali, bevor die ersten Besucher unterwegs sind. Dein lokaler Guide führt dich durch tropische Wälder, vorbei an kleinen Wasserfällen und traditionellen Reisfeldern. Unterwegs erfährst du mehr über die Pflanzenwelt, lokale Traditionen und das Leben rund um Ubud.",

    price: 52,
    currency: "EUR",

    duration: "4 Stunden",
    durationMinutes: 240,

    rating: 4.8,
    reviews: 156,

    maxGuests: 10,
    minAge: 12,

    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=90",
    ],

    included: ["Lokaler Guide", "Wasser", "Frühstück", "Hotelabholung in Ubud"],

    notIncluded: ["Persönliche Ausgaben", "Trinkgeld"],

    amenities: [
      {
        icon: Footprints,
        title: "Geführte Wanderung",
        description: "Erfahrene lokale Guides begleiten dich",
      },
      {
        icon: Mountain,
        title: "Natur pur",
        description: "Dschungel, Wasserfälle und Reisfelder",
      },
      {
        icon: Camera,
        title: "Fotostopps",
        description: "Besondere Orte abseits der Touristenpfade",
      },
      {
        icon: Coffee,
        title: "Frühstück",
        description: "Kleines lokales Frühstück inklusive",
      },
    ],

    meetingPoint: "Ubud Zentrum",

    meetingPointImage: "https://images.unsplash.com/photo-1643346173514-74a489cedccf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    meetingPointDescription:
      "Kostenlose Abholung von Unterkünften im Zentrum von Ubud.",

    languages: ["Englisch", "Deutsch", "Indonesisch"],

    tags: ["Dschungel", "Wandern", "Sonnenaufgang", "Natur"],

    instantBooking: true,
  },

  {
    id: "dolomites-bike-tour",
    title: "E-Bike Tour durch die Dolomiten",
    type: "E-Bike Tour",
    category: "Sport & Abenteuer",

    location: "Südtirol",
    country: "Italien",

    description: "Erkunde spektakuläre Bergpässe und Almen mit dem E-Bike.",

    longDescription:
      "Diese geführte E-Bike-Tour führt dich durch einige der schönsten Landschaften der Dolomiten. Dank moderner E-Bikes kannst du auch längere Anstiege entspannt bewältigen und hast genügend Zeit, die Aussicht zu genießen.",

    price: 79,
    currency: "EUR",

    duration: "6 Stunden",
    durationMinutes: 360,

    rating: 4.9,
    reviews: 98,

    maxGuests: 8,
    minAge: 14,

    images: [
      "https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=90",
    ],

    included: ["E-Bike", "Helm", "Lokaler Guide", "Wasser", "Kleine Snacks"],

    notIncluded: ["Mittagessen", "Hoteltransfer", "Persönliche Ausgaben"],

    amenities: [
      {
        icon: Bike,
        title: "Modernes E-Bike",
        description: "Hochwertige E-Bikes inklusive",
      },
      {
        icon: Mountain,
        title: "Dolomiten",
        description: "Panoramablicke auf die Bergwelt",
      },
      {
        icon: Camera,
        title: "Fotostopps",
        description: "Zeit für die schönsten Aussichtspunkte",
      },
      {
        icon: Sparkles,
        title: "Kleine Gruppe",
        description: "Maximal acht Teilnehmer",
      },
    ],

    meetingPoint: "Cortina d'Ampezzo",

    meetingPointImage: "https://images.unsplash.com/photo-1665317039412-e58541bbe47e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    meetingPointDescription:
      "Treffpunkt am Fahrradverleih im Zentrum von Cortina.",

    languages: ["Deutsch", "Englisch", "Italienisch"],

    tags: ["E-Bike", "Berge", "Sport", "Outdoor"],

    featured: true,
    instantBooking: true,
  },

  {
    id: "amalfi-wine-tasting",
    title: "Weinverkostung mit Blick auf das Meer",
    type: "Weinverkostung",
    category: "Essen & Trinken",

    location: "Praiano",
    country: "Italien",

    description:
      "Verkoste ausgewählte Weine aus Kampanien auf einer privaten Terrasse über dem Meer.",

    longDescription:
      "Entdecke die Weine Kampaniens bei einer entspannten Verkostung mit Blick auf das Mittelmeer. Ein lokaler Sommelier erklärt dir die Besonderheiten der Region und kombiniert die Weine mit Käse, Oliven, hausgemachtem Brot und weiteren regionalen Spezialitäten.",

    price: 68,
    currency: "EUR",

    duration: "2 Stunden",
    durationMinutes: 120,

    rating: 4.9,
    reviews: 203,

    maxGuests: 10,
    minAge: 18,

    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=90",
    ],

    included: [
      "5 regionale Weine",
      "Sommelier",
      "Käseauswahl",
      "Oliven",
      "Hausgemachtes Brot",
    ],

    notIncluded: ["Hoteltransfer", "Weitere Getränke"],

    amenities: [
      {
        icon: Wine,
        title: "5 Weine",
        description: "Ausgewählte Weine aus Kampanien",
      },
      {
        icon: Utensils,
        title: "Regionale Snacks",
        description: "Käse, Oliven und lokale Spezialitäten",
      },
      {
        icon: Waves,
        title: "Meerblick",
        description: "Private Terrasse über dem Mittelmeer",
      },
      {
        icon: Sparkles,
        title: "Sommelier",
        description: "Persönliche Einführung in die Weine",
      },
    ],

    meetingPoint: "Praiano, Amalfiküste",

    meetingPointImage: "https://images.unsplash.com/photo-1675267374972-45358f240163?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    meetingPointDescription:
      "Die genaue Adresse wird nach der Buchung mitgeteilt.",

    languages: ["Deutsch", "Englisch", "Italienisch"],

    tags: ["Wein", "Kulinarik", "Meerblick", "Romantisch"],

    instantBooking: true,
  },
];

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((experience) => experience.id === id);
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
  return [...new Set(experiences.filter((experience) => experience.location === destination))];
}
