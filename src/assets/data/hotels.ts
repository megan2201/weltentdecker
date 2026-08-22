export type Hotel = {
  slug: string
  name: string
  location: string
  destination: string
  destinationSlug: string
  category: string
  rating: number
  reviews: number
  price: number
  currency: string
  description: string
  heroImage: string
  gallery: string[]
  amenities: string[]
  rooms: {
    name: string
    description: string
    guests: number
    size: string
    price: number
    image: string
    features: string[]
  }[]
  highlights: string[]
}

export const hotels: Hotel[] = [
  {
    slug: "casa-mare",
    name: "Casa Mare",
    location: "Amalfi, Italien",
    destination: "Amalfi",
    destinationSlug: "amalfi",
    category: "Boutique Hotel",
    rating: 4.9,
    reviews: 284,
    price: 189,
    currency: "€",

    description:
      "Ein stilvolles Boutique-Hotel mit Blick auf das Mittelmeer, privaten Terrassen und dem entspannten Gefühl eines italienischen Sommerhauses.",

    heroImage:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2400&q=90",

    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85",
    ],

    amenities: [
      "Kostenloses WLAN",
      "Pool",
      "Frühstück",
      "Meerblick",
      "Restaurant",
      "Bar",
      "Klimaanlage",
      "Flughafentransfer",
    ],

    highlights: [
      "Panoramablick auf das Mittelmeer",
      "Nur wenige Minuten vom historischen Zentrum entfernt",
      "Frühstück mit regionalen Produkten",
      "Persönlicher Concierge-Service",
    ],

    rooms: [
      {
        name: "Classic Sea View",
        description:
          "Helles Doppelzimmer mit privatem Balkon und Blick auf das Mittelmeer.",
        guests: 2,
        size: "24 m²",
        price: 189,
        image:
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
        features: [
          "Meerblick",
          "Balkon",
          "Kingsize-Bett",
          "Frühstück inklusive",
        ],
      },
      {
        name: "Deluxe Terrace",
        description:
          "Großzügiges Zimmer mit eigener Terrasse und spektakulärem Küstenblick.",
        guests: 2,
        size: "34 m²",
        price: 245,
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        features: [
          "Private Terrasse",
          "Meerblick",
          "Kingsize-Bett",
          "Frühstück inklusive",
        ],
      },
      {
        name: "Casa Mare Suite",
        description:
          "Unsere großzügige Suite für besondere Anlässe mit separatem Wohnbereich.",
        guests: 3,
        size: "52 m²",
        price: 320,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
        features: [
          "Separate Lounge",
          "Große Terrasse",
          "Meerblick",
          "Frühstück inklusive",
        ],
      },
    ],
  },

  {
    slug: "oia-horizon",
    name: "Oia Horizon",
    location: "Oia, Santorini",
    destination: "Santorini",
    destinationSlug: "santorini",
    category: "Luxury Hotel",
    rating: 4.9,
    reviews: 306,
    price: 329,
    currency: "€",

    description:
      "Ein exklusives Hotel oberhalb der Caldera mit privaten Terrassen, Infinity-Pool und unvergesslichem Blick auf die Ägäis.",

    heroImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=90",

    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1576675784201-0e142b423952?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85",
    ],

    amenities: [
      "Infinity-Pool",
      "Kostenloses WLAN",
      "Frühstück",
      "Caldera-Blick",
      "Spa",
      "Restaurant",
      "Bar",
      "Concierge",
    ],

    highlights: [
      "Direkter Blick auf die Caldera",
      "Privater Infinity-Pool",
      "Sonnenuntergang von der Hotelterrasse",
      "Exklusiver Concierge-Service",
    ],

    rooms: [
      {
        name: "Caldera Room",
        description:
          "Elegantes Zimmer mit privatem Balkon und spektakulärem Caldera-Blick.",
        guests: 2,
        size: "28 m²",
        price: 329,
        image:
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
        features: [
          "Caldera-Blick",
          "Balkon",
          "Kingsize-Bett",
          "Frühstück",
        ],
      },
      {
        name: "Infinity Suite",
        description:
          "Luxuriöse Suite mit privatem Pool und großzügiger Terrasse.",
        guests: 2,
        size: "45 m²",
        price: 490,
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
        features: [
          "Privater Pool",
          "Terrasse",
          "Caldera-Blick",
          "Frühstück",
        ],
      },
    ],
  },
]