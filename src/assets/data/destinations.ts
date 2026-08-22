export type Destination = {
  slug: string
  name: string
  country: string
  region: string
  category: string
  description: string
  longDescription: string[]
  heroImage: string
  price: string
  bestTime: string
  temperature: string
  seaTemperature: string
  flightTime: string
  highlights: string[]
  hotels: {
    name: string
    type: string
    rating: string
    reviews: string
    price: string
    image: string
  }[]
  experiences: {
    title: string
    duration: string
    price: string
    image: string
  }[]
  nearby: {
    name: string
    distance: string
  }[]
}

export const destinations: Destination[] = [
  {
    slug: "amalfi",
    name: "Amalfi",
    country: "Italien",
    region: "Europa",
    category: "Meer",

    description:
      "Eine Küste wie aus einem Traum. Zwischen dramatischen Klippen, türkisblauem Meer und kleinen italienischen Dörfern.",

    longDescription: [
      "Die Amalfiküste gehört zu den spektakulärsten Küstenregionen Europas. Steile Felsen treffen auf das tiefblaue Mittelmeer, während sich kleine Orte wie Positano, Ravello und Amalfi an die Hänge schmiegen.",
      "Hier geht es weniger darum, möglichst viele Sehenswürdigkeiten abzuhaken. Es geht um lange Mittagessen, spontane Sprünge ins Meer, Sonnenuntergänge und das Gefühl, für ein paar Tage wirklich angekommen zu sein.",
    ],

    heroImage:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=90",

    price: "189 €",

    bestTime: "Mai – Oktober",
    temperature: "22 – 29 °C",
    seaTemperature: "24 °C",
    flightTime: "ca. 2:15 Std.",

    highlights: [
      "Mediterrane Küche",
      "Traumhafte Küsten",
      "Historische Dörfer",
      "Wanderrouten",
      "Bootsausflüge",
      "Italienisches Dolce Vita",
    ],

    hotels: [
      {
        name: "Casa Mare",
        type: "Boutique Hotel",
        rating: "4.9",
        reviews: "284",
        price: "189 €",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "Villa Aurora",
        type: "Villa",
        rating: "4.8",
        reviews: "172",
        price: "245 €",
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "La Terrazza",
        type: "Luxury Stay",
        rating: "4.9",
        reviews: "98",
        price: "310 €",
        image:
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=85",
      },
    ],

    experiences: [
      {
        title: "Bootsfahrt entlang der Küste",
        duration: "4 Stunden",
        price: "ab 65 €",
        image:
          "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=85",
      },
      {
        title: "Pasta & Limoncello Workshop",
        duration: "3 Stunden",
        price: "ab 79 €",
        image:
          "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=1000&q=85",
      },
      {
        title: "Wanderung auf dem Sentiero",
        duration: "5 Stunden",
        price: "ab 55 €",
        image:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=85",
      },
    ],

    nearby: [
      {
        name: "Positano",
        distance: "ca. 18 km",
      },
      {
        name: "Ravello",
        distance: "ca. 7 km",
      },
      {
        name: "Neapel",
        distance: "ca. 75 km",
      },
    ],
  },

  {
    slug: "santorini",
    name: "Santorini",
    country: "Griechenland",
    region: "Europa",
    category: "Meer",

    description:
      "Weiße Häuser, tiefblaues Meer und Sonnenuntergänge, die jeden Abend wie ein kleines Spektakel wirken.",

    longDescription: [
      "Santorini ist eine Insel, die man kaum mit Worten beschreiben kann. Die weißen Häuser von Oia und Fira kleben an den Vulkanhängen und bieten spektakuläre Ausblicke über die Ägäis.",
      "Neben den bekannten Postkartenmotiven findest du schwarze Sandstrände, kleine Tavernen, Weingüter und ruhige Buchten, die perfekt für entspannte Tage am Meer sind.",
    ],

    heroImage:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=90",

    price: "245 €",

    bestTime: "April – Oktober",
    temperature: "23 – 30 °C",
    seaTemperature: "23 °C",
    flightTime: "ca. 2:50 Std.",

    highlights: [
      "Oia Sonnenuntergang",
      "Vulkanlandschaft",
      "Griechische Küche",
      "Schwarze Strände",
      "Weinverkostungen",
      "Katamaran-Touren",
    ],

    hotels: [
      {
        name: "Aegean Blue",
        type: "Boutique Hotel",
        rating: "4.8",
        reviews: "421",
        price: "245 €",
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "Oia Horizon",
        type: "Luxury Hotel",
        rating: "4.9",
        reviews: "306",
        price: "329 €",
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "Caldera House",
        type: "Villa",
        rating: "4.9",
        reviews: "117",
        price: "390 €",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
      },
    ],

    experiences: [
      {
        title: "Katamaran bei Sonnenuntergang",
        duration: "5 Stunden",
        price: "ab 95 €",
        image:
          "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1000&q=85",
      },
      {
        title: "Santorini Weinverkostung",
        duration: "3 Stunden",
        price: "ab 70 €",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85",
      },
      {
        title: "Vulkan & heiße Quellen",
        duration: "6 Stunden",
        price: "ab 59 €",
        image:
          "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1000&q=85",
      },
    ],

    nearby: [
      {
        name: "Oia",
        distance: "ca. 12 km",
      },
      {
        name: "Fira",
        distance: "ca. 5 km",
      },
      {
        name: "Kamari",
        distance: "ca. 8 km",
      },
    ],
  },

  {
    slug: "bali",
    name: "Bali",
    country: "Indonesien",
    region: "Asien",
    category: "Natur",

    description:
      "Tropische Strände, grüne Reisterrassen, Tempel und eine Kultur, die dich sofort entschleunigt.",

    longDescription: [
      "Bali verbindet Natur, Kultur und Entspannung auf einzigartige Weise. Zwischen tropischem Dschungel, Vulkanen und Reisfeldern liegen kleine Dörfer, Tempel und moderne Cafés.",
      "Während Ubud für Kultur und Natur bekannt ist, findest du im Süden traumhafte Strände und rund um Canggu eine lebendige Surf- und Food-Szene.",
    ],

    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=90",

    price: "129 €",

    bestTime: "April – Oktober",
    temperature: "26 – 31 °C",
    seaTemperature: "28 °C",
    flightTime: "ca. 16 Std.",

    highlights: [
      "Reisterrassen",
      "Tropische Strände",
      "Balinesische Tempel",
      "Surfing",
      "Dschungel",
      "Yoga & Wellness",
    ],

    hotels: [
      {
        name: "Jungle House",
        type: "Jungle Villa",
        rating: "4.9",
        reviews: "382",
        price: "129 €",
        image:
          "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "Ubud Sanctuary",
        type: "Resort",
        rating: "4.8",
        reviews: "251",
        price: "165 €",
        image:
          "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "Ocean Soul",
        type: "Beach Resort",
        rating: "4.9",
        reviews: "189",
        price: "210 €",
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
      },
    ],

    experiences: [
      {
        title: "Ubud Reisterrassen Tour",
        duration: "6 Stunden",
        price: "ab 45 €",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
      },
      {
        title: "Balinesischer Kochkurs",
        duration: "4 Stunden",
        price: "ab 39 €",
        image:
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
      },
      {
        title: "Sunrise am Mount Batur",
        duration: "8 Stunden",
        price: "ab 55 €",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
      },
    ],

    nearby: [
      {
        name: "Ubud",
        distance: "ca. 35 km",
      },
      {
        name: "Canggu",
        distance: "ca. 20 km",
      },
      {
        name: "Seminyak",
        distance: "ca. 25 km",
      },
    ],
  },
]