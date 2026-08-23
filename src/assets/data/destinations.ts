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