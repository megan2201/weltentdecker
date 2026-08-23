import {
  Bath,
  BedDouble,
  Home,
  ParkingCircle,
  Snowflake,
  Sparkles,
  Waves,
  Wifi,
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
  longDescription: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  host: string;
  hostImage: string;
  images: string[];
  amenities: StayAmenity[];
  facilities: string[];
  tags: string[];
  featured?: boolean;
};

export const stays: Stay[] = [
  {
    id: "casa-mare",
    name: "Casa Mare",
    type: "Boutique-Hotel",
    location: "Amalfiküste",
    country: "Italien",
    countryImage:
      "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Mediterranes Boutique-Hotel mit traumhaftem Blick auf das Mittelmeer.",
    longDescription:
      "Casa Mare liegt hoch über der Küste von Amalfi und verbindet mediterranes Design mit modernem Komfort. Von der privaten Terrasse genießt du einen atemberaubenden Blick auf das tiefblaue Mittelmeer. Das familiengeführte Boutique-Hotel ist der perfekte Ausgangspunkt, um die kleinen Dörfer, Strände und kulinarischen Highlights der Amalfiküste zu entdecken.",
    pricePerNight: 189,
    rating: 4.9,
    reviews: 248,
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    host: "Sofia & Marco",
    hostImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90",
    ],
    amenities: [
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "Schnelles WLAN in der gesamten Unterkunft",
      },
      {
        icon: Bath,
        title: "Eigenes Badezimmer",
        description: "Modernes Badezimmer mit Dusche",
      },
      {
        icon: BedDouble,
        title: "Kingsize-Bett",
        description: "Hochwertige Bettwäsche inklusive",
      },
      {
        icon: Waves,
        title: "Meerblick",
        description: "Panoramablick über das Mittelmeer",
      },
    ],
    facilities: [
      "Privater Pool",
      "Meerblick",
      "Klimaanlage",
      "Kostenloses WLAN",
      "Frühstück inklusive",
      "Kostenloser Parkplatz",
      "Terrasse",
      "Nichtraucherzimmer",
      "Minibar",
      "24-Stunden-Rezeption",
      "Zimmerservice",
      "Haustiere erlaubt",
    ],
    tags: ["Meerblick", "Pool", "Frühstück"],
    featured: true,
  },

  {
    id: "aegean-blue",
    name: "Aegean Blue Villa",
    type: "Villa",
    location: "Santorini",
    country: "Griechenland",
    countryImage:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Private Villa mit Infinity-Pool und spektakulärem Sonnenuntergang.",
    longDescription:
      "Die Aegean Blue Villa verbindet die typische Architektur Santorinis mit modernem Luxus. Die ruhige Lage bietet Privatsphäre, während Restaurants und kleine Buchten schnell erreichbar sind.",
    pricePerNight: 295,
    rating: 4.8,
    reviews: 186,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: "Nikos",
    hostImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=90",
    ],
    amenities: [
      {
        icon: Waves,
        title: "Infinity-Pool",
        description: "Privater Pool mit Blick auf die Ägäis",
      },
      {
        icon: Wifi,
        title: "Kostenloses WLAN",
        description: "High-Speed-WLAN inklusive",
      },
      {
        icon: Snowflake,
        title: "Klimaanlage",
        description: "Individuell regulierbare Klimaanlage",
      },
      {
        icon: BedDouble,
        title: "3 Schlafzimmer",
        description: "Platz für bis zu sechs Gäste",
      },
    ],
    facilities: [
      "Privater Infinity-Pool",
      "Meerblick",
      "Klimaanlage",
      "Kostenloses WLAN",
      "Frühstück",
      "Private Terrasse",
      "Outdoor-Lounge",
      "Grill",
      "Küche",
      "Waschmaschine",
      "Kostenloser Parkplatz",
      "Flughafentransfer",
    ],
    tags: ["Infinity-Pool", "Meerblick", "Villa"],
    featured: true,
  },

  {
    id: "jungle-house",
    name: "Jungle House",
    type: "Eco-Lodge",
    location: "Ubud",
    country: "Indonesien",
    countryImage:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tropische Eco-Lodge mitten im Dschungel von Bali.",
    longDescription:
      "Jungle House ist ein besonderer Rückzugsort mitten in der tropischen Landschaft von Ubud. Nachhaltiges Design, natürliche Materialien und die Geräusche des Dschungels machen diese Unterkunft zu einem einzigartigen Erlebnis.",
    pricePerNight: 142,
    rating: 4.9,
    reviews: 312,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: "Made",
    hostImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1559628233-3e5f9c4c5b42?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=90",
    ],
    amenities: [
      {
        icon: Home,
        title: "Eco-Lodge",
        description: "Nachhaltig gebaut mit natürlichen Materialien",
      },
      {
        icon: Waves,
        title: "Dschungel-Pool",
        description: "Infinity-Pool mitten im Grünen",
      },
      {
        icon: Wifi,
        title: "WLAN",
        description: "Kostenloses WLAN verfügbar",
      },
      {
        icon: Sparkles,
        title: "Wellness",
        description: "Yoga und Wellnessangebote",
      },
    ],
    facilities: [
      "Infinity-Pool",
      "Dschungelblick",
      "Klimaanlage",
      "Kostenloses WLAN",
      "Yoga-Bereich",
      "Spa",
      "Restaurant",
      "Bar",
      "Frühstück",
      "Terrasse",
      "Fahrradverleih",
      "Flughafentransfer",
    ],
    tags: ["Dschungel", "Eco", "Wellness"],
    featured: true,
  },

  {
    id: "alpine-retreat",
    name: "Alpine Retreat",
    type: "Chalet",
    location: "Tirol",
    country: "Österreich",
    countryImage:
      "https://images.unsplash.com/photo-1597086831879-756db15e81d3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Modernes Bergchalet mit Sauna und Panoramablick.",
    longDescription:
      "Das Alpine Retreat liegt ruhig oberhalb eines kleinen Tiroler Bergdorfs. Nach einem Tag auf der Skipiste oder einer Wanderung kannst du dich in der privaten Sauna entspannen und den Blick auf die umliegenden Gipfel genießen.",
    pricePerNight: 225,
    rating: 4.7,
    reviews: 124,
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    host: "Anna",
    hostImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=90",
    ],
    amenities: [
      {
        icon: Waves,
        title: "Private Sauna",
        description: "Entspannung mit Bergblick",
      },
      {
        icon: BedDouble,
        title: "2 Schlafzimmer",
        description: "Platz für bis zu fünf Gäste",
      },
      {
        icon: Wifi,
        title: "WLAN",
        description: "Kostenloses High-Speed-WLAN",
      },
      {
        icon: ParkingCircle,
        title: "Parkplatz",
        description: "Privater Parkplatz direkt am Chalet",
      },
    ],
    facilities: [
      "Private Sauna",
      "Bergblick",
      "Kamin",
      "Klimaanlage",
      "Kostenloses WLAN",
      "Küche",
      "Waschmaschine",
      "Terrasse",
      "Grill",
      "Skiraum",
      "Kostenloser Parkplatz",
      "Haustiere erlaubt",
    ],
    tags: ["Berge", "Sauna", "Chalet"],
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
  return [...new Set(stays.filter((stay) => stay.location.includes(destination) || destination.includes(stay.location)))];
}

export function getMinPriceOfStaysAtDestination(destination: string): number {
  const stays = getStaysAtDestination(destination);

  // Falls keine Unterkünfte gefunden wurden
  if (stays.length === 0) return 0;

  // Extrahiert alle Preise und findet das Minimum
  return Math.min(...stays.map((stay) => stay.pricePerNight));
}
