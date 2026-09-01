export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;
  category: string;
  description: string;
  longDescription: string[];
  heroImage: string;
  bestTime: string;
  temperature: string;
  seaTemperature: string;
  flightTime: string;
  highlights: string[];
  nearby: {
    name: string;
    distance: string;
  }[];
};

export const destinations: Destination[] = [
  // =========================
  // 🇩🇪 DEUTSCHLAND
  // =========================
  {
    slug: "garmisch-partenkirchen",
    name: "Garmisch-Partenkirchen",
    country: "Deutschland",
    region: "Bayern",
    category: "Berge",
    description:
      "Alpenpanorama, klare Bergluft und eine große Auswahl an Wander- und Wintersportmöglichkeiten.",
    longDescription: [
      "Garmisch-Partenkirchen zählt zu den schönsten Urlaubszielen in den bayerischen Alpen. Umgeben von imposanten Gipfeln bietet die Region ideale Voraussetzungen für einen erholsamen Urlaub in der Natur.",
      "Im Sommer laden zahlreiche Wanderwege, Bergseen und Almen zu aktiven Tagen in den Bergen ein. Im Winter verwandelt sich die Region in ein beliebtes Ziel für Skifahrer, Snowboarder und Winterwanderer.",
      "Neben der beeindruckenden Landschaft überzeugt Garmisch-Partenkirchen mit traditioneller bayerischer Architektur, gemütlichen Gasthäusern und einer entspannten Atmosphäre.",
    ],
    heroImage: new URL(
      "/img/destination/garmisch-partenkirchen.webp",
      import.meta.url,
    ).href,
    bestTime: "Mai – Oktober",
    temperature: "15 – 25 °C",
    seaTemperature: "–",
    flightTime: "ca. 1 Std. ab Berlin",
    highlights: [
      "Zugspitze",
      "Partnachklamm",
      "Eibsee",
      "Alpspitz",
      "Historisches Ortszentrum",
    ],
    nearby: [
      {
        name: "Eibsee",
        distance: "15 km",
      },
      {
        name: "Zugspitze",
        distance: "20 km",
      },
      {
        name: "Mittenwald",
        distance: "25 km",
      },
    ],
  },

  {
    slug: "berlin",
    name: "Berlin",
    country: "Deutschland",
    region: "Berlin",
    category: "Stadt",
    description:
      "Eine vielseitige Metropole voller Geschichte, Kultur, Kunst, Restaurants und pulsierendem Nachtleben.",
    longDescription: [
      "Berlin ist eine Stadt voller Gegensätze und gehört zu den spannendsten Reisezielen Europas. Historische Sehenswürdigkeiten treffen hier auf moderne Architektur, kreative Viertel und eine lebendige Kulturszene.",
      "Vom Brandenburger Tor über die Museumsinsel bis zur East Side Gallery gibt es unzählige Orte zu entdecken. Gleichzeitig laden Viertel wie Kreuzberg, Friedrichshain und Prenzlauer Berg zum Bummeln, Essen und Ausgehen ein.",
      "Dank des gut ausgebauten öffentlichen Verkehrsnetzes lässt sich Berlin unkompliziert erkunden. Ob Kultururlaub, Wochenendtrip oder längerer Aufenthalt – die deutsche Hauptstadt bietet für jeden etwas.",
    ],
    heroImage: new URL("/img/destination/berlin.webp", import.meta.url).href,
    bestTime: "April – Oktober",
    temperature: "15 – 25 °C",
    seaTemperature: "–",
    flightTime: "Direktflüge aus vielen deutschen Städten",
    highlights: [
      "Brandenburger Tor",
      "Museumsinsel",
      "East Side Gallery",
      "Reichstagsgebäude",
      "Alexanderplatz",
    ],
    nearby: [
      {
        name: "Potsdam",
        distance: "35 km",
      },
      {
        name: "Wannsee",
        distance: "20 km",
      },
      {
        name: "Spreewald",
        distance: "90 km",
      },
    ],
  },

  {
    slug: "freiburg",
    name: "Freiburg",
    country: "Deutschland",
    region: "Baden-Württemberg",
    category: "Natur",
    description:
      "Sonnige Altstadt, Schwarzwaldlandschaften und entspannte Lebensart am Rande der Natur.",
    longDescription: [
      "Freiburg im Breisgau liegt am Fuße des Schwarzwalds und verbindet eine charmante historische Altstadt mit einer außergewöhnlich schönen Naturkulisse.",
      "Die Region eignet sich hervorragend für Wanderungen, Fahrradtouren und entspannte Ausflüge in den Schwarzwald. Gleichzeitig bietet die Stadt zahlreiche Cafés, Restaurants und kleine Geschäfte.",
      "Dank des milden Klimas gehört Freiburg zu den wärmsten Städten Deutschlands und ist zu jeder Jahreszeit ein attraktives Reiseziel.",
    ],
    heroImage: new URL("/img/destination/freiburg.webp", import.meta.url).href,
    bestTime: "April – Oktober",
    temperature: "16 – 27 °C",
    seaTemperature: "–",
    flightTime: "ca. 1 Std. ab Berlin",
    highlights: [
      "Freiburger Münster",
      "Schlossberg",
      "Schwarzwald",
      "Historische Altstadt",
      "Seepark",
    ],
    nearby: [
      {
        name: "Titisee",
        distance: "35 km",
      },
      {
        name: "Baden-Baden",
        distance: "110 km",
      },
      {
        name: "Straßburg",
        distance: "90 km",
      },
    ],
  },

  {
    slug: "hamburg",
    name: "Hamburg",
    country: "Deutschland",
    region: "Norddeutschland",
    category: "Stadt & Meer",
    description:
      "Maritimes Flair, historische Speicherstadt und lebendige Viertel direkt an der Elbe.",
    longDescription: [
      "Hamburg verbindet Großstadtleben mit maritimer Atmosphäre. Der Hafen, die Elbe und die historische Speicherstadt prägen das Stadtbild und machen Hamburg zu einem besonderen Reiseziel.",
      "Neben bekannten Sehenswürdigkeiten wie der Elbphilharmonie und der Speicherstadt warten zahlreiche Restaurants, Bars, Museen und Einkaufsmöglichkeiten darauf, entdeckt zu werden.",
      "Auch die Umgebung Hamburgs lohnt sich für Ausflüge. Die Nordseeküste, Lübeck und das Alte Land sind bequem erreichbar.",
    ],
    heroImage: new URL("/img/destination/hamburg.webp", import.meta.url).href,
    bestTime: "Mai – September",
    temperature: "15 – 23 °C",
    seaTemperature: "16 – 19 °C",
    flightTime: "Direktflüge aus vielen deutschen Städten",
    highlights: [
      "Elbphilharmonie",
      "Speicherstadt",
      "Hamburger Hafen",
      "Landungsbrücken",
      "Reeperbahn",
    ],
    nearby: [
      {
        name: "Lübeck",
        distance: "65 km",
      },
      {
        name: "Lüneburger Heide",
        distance: "55 km",
      },
      {
        name: "Altes Land",
        distance: "30 km",
      },
    ],
  },

  // =========================
  // 🇮🇹 ITALIEN
  // =========================
  {
    slug: "toskana",
    name: "Toskana",
    country: "Italien",
    region: "Mittelitalien",
    category: "Natur & Genuss",
    description:
      "Sanfte Hügel, Weinberge, Olivenhaine und historische Städte machen die Toskana zu einem zeitlosen Reiseziel.",
    longDescription: [
      "Die Toskana steht für italienische Lebensfreude, beeindruckende Landschaften und kulinarischen Genuss. Zwischen sanften Hügeln, Weinbergen und Olivenhainen liegen zahlreiche historische Orte.",
      "Florenz, Siena und San Gimignano bieten Kunst, Geschichte und beeindruckende Architektur. Außerhalb der Städte laden kleine Dörfer und Weingüter zum Entdecken und Entspannen ein.",
      "Die Kombination aus Landschaft, Kultur und hervorragender Küche macht die Toskana ideal für einen romantischen Urlaub, eine Reise mit Freunden oder einen entspannten Familienaufenthalt.",
    ],
    heroImage: new URL("/img/destination/toskana.webp", import.meta.url).href,
    bestTime: "April – Oktober",
    temperature: "18 – 30 °C",
    seaTemperature: "20 – 25 °C",
    flightTime: "ca. 1:45 Std. ab Frankfurt",
    highlights: [
      "Florenz",
      "Siena",
      "San Gimignano",
      "Chianti-Weinregion",
      "Val d'Orcia",
    ],
    nearby: [
      {
        name: "Florenz",
        distance: "80 km",
      },
      {
        name: "Siena",
        distance: "35 km",
      },
      {
        name: "Lucca",
        distance: "140 km",
      },
    ],
  },

  {
    slug: "positano",
    name: "Positano",
    country: "Italien",
    region: "Amalfiküste",
    category: "Meer",
    description:
      "Bunte Häuser an steilen Klippen, türkisblaues Wasser und mediterranes Lebensgefühl an der Amalfiküste.",
    longDescription: [
      "Positano gehört zu den bekanntesten Orten an der italienischen Amalfiküste. Die bunten Häuser ziehen sich malerisch die steilen Hänge hinunter und bieten spektakuläre Ausblicke auf das Mittelmeer.",
      "Die engen Gassen laden zum Bummeln ein, während kleine Restaurants und Cafés traditionelle italienische Küche servieren. Rund um Positano befinden sich zahlreiche kleine Buchten und Strände.",
      "Die Amalfiküste lässt sich außerdem hervorragend mit dem Boot oder entlang der berühmten Küstenstraße erkunden.",
    ],
    heroImage: new URL("/img/destination/positano.webp", import.meta.url).href,
    bestTime: "Mai – September",
    temperature: "22 – 31 °C",
    seaTemperature: "22 – 27 °C",
    flightTime: "ca. 2 Std. ab Frankfurt",
    highlights: [
      "Amalfiküste",
      "Spiaggia Grande",
      "Path of the Gods",
      "Bootstouren",
      "Altstadt von Positano",
    ],
    nearby: [
      {
        name: "Amalfi",
        distance: "17 km",
      },
      {
        name: "Ravello",
        distance: "25 km",
      },
      {
        name: "Sorrent",
        distance: "18 km",
      },
    ],
  },

  {
    slug: "rom",
    name: "Rom",
    country: "Italien",
    region: "Latium",
    category: "Stadt & Kultur",
    description:
      "Antike Geschichte, beeindruckende Architektur und italienische Lebensfreude in einer einzigartigen Stadt.",
    longDescription: [
      "Rom ist eine Stadt, in der Geschichte auf Schritt und Tritt spürbar wird. Antike Bauwerke, prachtvolle Plätze und weltberühmte Kunst machen die italienische Hauptstadt zu einem außergewöhnlichen Reiseziel.",
      "Das Kolosseum, das Forum Romanum und der Vatikan gehören zu den bekanntesten Sehenswürdigkeiten. Gleichzeitig bietet Rom unzählige kleine Gassen, traditionelle Restaurants und gemütliche Plätze.",
      "Wer Rom besucht, sollte genügend Zeit einplanen, um die Stadt auch abseits der großen Sehenswürdigkeiten zu entdecken.",
    ],
    heroImage: new URL("/img/destination/rom.webp", import.meta.url).href,
    bestTime: "April – Juni & September – Oktober",
    temperature: "18 – 30 °C",
    seaTemperature: "21 – 26 °C",
    flightTime: "ca. 2 Std. ab Frankfurt",
    highlights: [
      "Kolosseum",
      "Vatikanstadt",
      "Trevi-Brunnen",
      "Pantheon",
      "Forum Romanum",
    ],
    nearby: [
      {
        name: "Vatikanstadt",
        distance: "3 km",
      },
      {
        name: "Tivoli",
        distance: "30 km",
      },
      {
        name: "Ostia",
        distance: "30 km",
      },
    ],
  },

  {
    slug: "comer-see",
    name: "Comer See",
    country: "Italien",
    region: "Lombardei",
    category: "See & Natur",
    description:
      "Elegante Dörfer, alpine Landschaften und mediterranes Flair rund um einen der schönsten Seen Italiens.",
    longDescription: [
      "Der Comer See verbindet beeindruckende Berglandschaften mit mediterraner Atmosphäre. Entlang des Ufers liegen elegante Villen, kleine Dörfer und gepflegte Gärten.",
      "Orte wie Como, Bellagio und Varenna laden zu Spaziergängen und entspannten Tagen am Wasser ein. Mit dem Boot lassen sich die verschiedenen Orte besonders schön erkunden.",
      "Die Region eignet sich sowohl für einen romantischen Urlaub zu zweit als auch für erholsame Tage mit der Familie.",
    ],
    heroImage: new URL("/img/destination/comer-see.webp", import.meta.url).href,
    bestTime: "Mai – September",
    temperature: "20 – 29 °C",
    seaTemperature: "–",
    flightTime: "ca. 1:20 Std. ab Frankfurt",
    highlights: [
      "Bellagio",
      "Como",
      "Varenna",
      "Villa Carlotta",
      "Bootstour auf dem See",
    ],
    nearby: [
      {
        name: "Mailand",
        distance: "50 km",
      },
      {
        name: "Lugano",
        distance: "35 km",
      },
      {
        name: "Bergamo",
        distance: "80 km",
      },
    ],
  },

  // =========================
  // 🇪🇸 SPANIEN
  // =========================
  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Spanien",
    region: "Katalonien",
    category: "Stadt & Strand",
    description:
      "Architektur, mediterranes Lebensgefühl und kilometerlange Strände machen Barcelona einzigartig.",
    longDescription: [
      "Barcelona verbindet Großstadt, Kultur und Strand wie kaum eine andere europäische Stadt. Die katalanische Hauptstadt ist bekannt für ihre außergewöhnliche Architektur und das mediterrane Lebensgefühl.",
      "Die Werke Antoni Gaudís, darunter die Sagrada Família und der Park Güell, gehören zu den absoluten Höhepunkten. Gleichzeitig laden die Altstadt und das Gotische Viertel zum Erkunden ein.",
      "Nach einem Tag voller Sightseeing kann man am Strand entspannen oder den Abend in einem der zahlreichen Restaurants und Bars ausklingen lassen.",
    ],
    heroImage: new URL("/img/destination/barcelona.webp", import.meta.url).href,
    bestTime: "Mai – Juni & September – Oktober",
    temperature: "21 – 29 °C",
    seaTemperature: "21 – 25 °C",
    flightTime: "ca. 2 Std. ab Frankfurt",
    highlights: [
      "Sagrada Família",
      "Park Güell",
      "Gotisches Viertel",
      "Barceloneta",
      "La Rambla",
    ],
    nearby: [
      {
        name: "Montserrat",
        distance: "60 km",
      },
      {
        name: "Sitges",
        distance: "40 km",
      },
      {
        name: "Costa Brava",
        distance: "80 km",
      },
    ],
  },

  {
    slug: "mallorca",
    name: "Mallorca",
    country: "Spanien",
    region: "Balearen",
    category: "Insel & Strand",
    description:
      "Traumhafte Strände, mediterrane Landschaften und charmante Dörfer auf einer der beliebtesten Inseln Spaniens.",
    longDescription: [
      "Mallorca bietet weit mehr als klassische Strandurlaube. Die Insel begeistert mit kristallklarem Wasser, beeindruckenden Berglandschaften, traditionellen Dörfern und einer abwechslungsreichen Küche.",
      "Die Serra de Tramuntana eignet sich hervorragend zum Wandern und Radfahren, während zahlreiche Buchten und Strände zum Schwimmen und Entspannen einladen.",
      "Palma bietet zusätzlich Kultur, Shopping und ein lebendiges Nachtleben und macht Mallorca damit zu einem vielseitigen Reiseziel für nahezu jede Art von Urlaub.",
    ],
    heroImage: new URL("/img/destination/mallorca.webp", import.meta.url).href,
    bestTime: "Mai – Oktober",
    temperature: "22 – 31 °C",
    seaTemperature: "22 – 27 °C",
    flightTime: "ca. 2:15 Std. ab Frankfurt",
    highlights: [
      "Palma",
      "Serra de Tramuntana",
      "Cala d'Or",
      "Cap de Formentor",
      "Valldemossa",
    ],
    nearby: [
      {
        name: "Palma",
        distance: "25 km",
      },
      {
        name: "Sóller",
        distance: "50 km",
      },
      {
        name: "Alcúdia",
        distance: "55 km",
      },
    ],
  },

  {
    slug: "sevilla",
    name: "Sevilla",
    country: "Spanien",
    region: "Andalusien",
    category: "Stadt & Kultur",
    description:
      "Flamenco, maurische Architektur und andalusisches Lebensgefühl im Herzen Südspaniens.",
    longDescription: [
      "Sevilla ist eine der faszinierendsten Städte Andalusiens und bekannt für ihre prachtvollen historischen Bauwerke, lebhaften Plätze und ihre besondere Atmosphäre.",
      "Die Kathedrale, der Alcázar und die Plaza de España gehören zu den wichtigsten Sehenswürdigkeiten. In den traditionellen Vierteln lässt sich außerdem die Geschichte des Flamenco hautnah erleben.",
      "Besonders am Abend erwacht Sevilla zum Leben. Kleine Tapas-Bars, Restaurants und Plätze laden dazu ein, die andalusische Küche und Lebensart zu genießen.",
    ],
    heroImage: new URL("/img/destination/sevilla.webp", import.meta.url).href,
    bestTime: "März – Mai & Oktober",
    temperature: "20 – 32 °C",
    seaTemperature: "19 – 24 °C",
    flightTime: "ca. 3 Std. ab Frankfurt",
    highlights: [
      "Plaza de España",
      "Königlicher Alcázar",
      "Kathedrale von Sevilla",
      "Barrio Santa Cruz",
      "Flamenco",
    ],
    nearby: [
      {
        name: "Córdoba",
        distance: "140 km",
      },
      {
        name: "Cádiz",
        distance: "125 km",
      },
      {
        name: "Ronda",
        distance: "130 km",
      },
    ],
  },

  {
    slug: "costa-brava",
    name: "Costa Brava",
    country: "Spanien",
    region: "Katalonien",
    category: "Küste & Strand",
    description:
      "Spektakuläre Küstenlandschaften, versteckte Buchten und mediterrane Dörfer entlang der spanischen Mittelmeerküste.",
    longDescription: [
      "Die Costa Brava erstreckt sich entlang der nordöstlichen Mittelmeerküste Spaniens und begeistert mit felsigen Klippen, kleinen Buchten und kristallklarem Wasser.",
      "Neben beliebten Badeorten gibt es zahlreiche kleinere Küstendörfer, die ihren ursprünglichen Charme bewahrt haben. Wanderwege entlang der Küste bieten immer wieder spektakuläre Ausblicke.",
      "Auch kulturell hat die Region einiges zu bieten. Girona, historische Dörfer und das Erbe Salvador Dalís machen die Costa Brava zu einem abwechslungsreichen Urlaubsziel.",
    ],
    heroImage: new URL("/img/destination/costa-brava.webp", import.meta.url)
      .href,
    bestTime: "Mai – September",
    temperature: "22 – 30 °C",
    seaTemperature: "21 – 25 °C",
    flightTime: "ca. 2 Std. ab Frankfurt",
    highlights: [
      "Tossa de Mar",
      "Cadaqués",
      "Cap de Creus",
      "Küstenwanderwege",
      "Versteckte Buchten",
    ],
    nearby: [
      {
        name: "Girona",
        distance: "40 km",
      },
      {
        name: "Barcelona",
        distance: "100 km",
      },
      {
        name: "Figueres",
        distance: "70 km",
      },
    ],
  },

  // =========================
  // 🇯🇵 JAPAN
  // =========================
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Kansai",
    category: "Kultur",
    description:
      "Traditionelle Tempel, ruhige Gärten und historische Gassen machen Kyoto zum kulturellen Herzen Japans.",
    longDescription: [
      "Kyoto war über tausend Jahre lang die Hauptstadt Japans und gilt bis heute als kulturelles Zentrum des Landes. Zahlreiche Tempel, Schreine und traditionelle Häuser prägen das Stadtbild.",
      "Besonders im Frühling zur Kirschblüte und im Herbst mit seinen farbenprächtigen Wäldern zeigt sich Kyoto von seiner schönsten Seite. Ruhige Gärten und historische Viertel laden dazu ein, die japanische Kultur zu erleben.",
      "Neben den bekannten Sehenswürdigkeiten lohnt es sich, kleinere Gassen und traditionelle Teehäuser zu entdecken und die besondere Ruhe der Stadt auf sich wirken zu lassen.",
    ],
    heroImage: new URL("/img/destination/kyoto.webp", import.meta.url).href,
    bestTime: "März – Mai & Oktober – November",
    temperature: "15 – 28 °C",
    seaTemperature: "–",
    flightTime: "ca. 11:30 Std. ab Frankfurt",
    highlights: [
      "Fushimi Inari-Schrein",
      "Kinkaku-ji",
      "Arashiyama",
      "Gion",
      "Kiyomizu-dera",
    ],
    nearby: [
      {
        name: "Osaka",
        distance: "55 km",
      },
      {
        name: "Nara",
        distance: "45 km",
      },
      {
        name: "Biwasee",
        distance: "70 km",
      },
    ],
  },

  {
    slug: "tokio",
    name: "Tokio",
    country: "Japan",
    region: "Kantō",
    category: "Stadt",
    description:
      "Eine faszinierende Megametropole, in der futuristische Architektur auf traditionelle japanische Kultur trifft.",
    longDescription: [
      "Tokio ist eine der größten und aufregendsten Metropolen der Welt. Wolkenkratzer, Neonlichter und moderne Technologie treffen hier auf jahrhundertealte Tempel und traditionelle Viertel.",
      "In Stadtteilen wie Shibuya, Shinjuku und Ginza warten Shopping, Restaurants und Unterhaltung. Gleichzeitig bieten Orte wie Asakusa und der Meiji-Schrein einen Einblick in die traditionelle Seite Japans.",
      "Tokio ist außerdem ein idealer Ausgangspunkt für Ausflüge zu den Bergen, Seen und historischen Orten der umliegenden Region.",
    ],
    heroImage: new URL("/img/destination/tokio.webp", import.meta.url).href,
    bestTime: "März – Mai & Oktober – November",
    temperature: "15 – 28 °C",
    seaTemperature: "18 – 25 °C",
    flightTime: "ca. 11:30 Std. ab Frankfurt",
    highlights: [
      "Shibuya Crossing",
      "Senso-ji",
      "Tokyo Skytree",
      "Meiji-Schrein",
      "Shinjuku",
    ],
    nearby: [
      {
        name: "Yokohama",
        distance: "35 km",
      },
      {
        name: "Kamakura",
        distance: "60 km",
      },
      {
        name: "Hakone",
        distance: "100 km",
      },
    ],
  },

  {
    slug: "hakone",
    name: "Hakone",
    country: "Japan",
    region: "Kantō",
    category: "Berge & Erholung",
    description:
      "Heiße Quellen, Berglandschaften und beeindruckende Ausblicke auf den Fuji machen Hakone zum perfekten Rückzugsort.",
    longDescription: [
      "Hakone liegt nur wenige Stunden von Tokio entfernt und ist eines der beliebtesten Erholungsziele rund um die japanische Hauptstadt. Die Region ist vor allem für ihre heißen Quellen und traditionellen Ryokans bekannt.",
      "Die abwechslungsreiche Landschaft bietet Seen, Berge und Wälder. Bei gutem Wetter eröffnet sich außerdem ein beeindruckender Blick auf den Fuji.",
      "Eine Reise nach Hakone eignet sich ideal, um nach einem Aufenthalt in Tokio zur Ruhe zu kommen und die traditionelle japanische Gastfreundschaft zu erleben.",
    ],
    heroImage: new URL("/img/destination/hakone.webp", import.meta.url).href,
    bestTime: "März – Mai & Oktober – November",
    temperature: "10 – 25 °C",
    seaTemperature: "–",
    flightTime: "ca. 11:30 Std. bis Tokio",
    highlights: [
      "Fuji-Blick",
      "Ashinoko-See",
      "Heiße Quellen",
      "Hakone-Schrein",
      "Hakone-Seilbahn",
    ],
    nearby: [
      {
        name: "Tokio",
        distance: "100 km",
      },
      {
        name: "Fuji",
        distance: "45 km",
      },
      {
        name: "Yokohama",
        distance: "75 km",
      },
    ],
  },

  {
    slug: "okinawa",
    name: "Okinawa",
    country: "Japan",
    region: "Ryūkyū-Inseln",
    category: "Insel & Strand",
    description:
      "Tropische Strände, türkisblaues Wasser und eine einzigartige Inselkultur im Süden Japans.",
    longDescription: [
      "Okinawa fühlt sich anders an als viele andere Regionen Japans. Die subtropischen Inseln bieten warme Temperaturen, weiße Sandstrände und kristallklares Wasser.",
      "Die Region eignet sich hervorragend zum Schwimmen, Schnorcheln und Tauchen. Gleichzeitig besitzt Okinawa eine eigene Kultur, Küche und Geschichte, die sich deutlich vom japanischen Festland unterscheidet.",
      "Wer Ruhe und Natur sucht, findet auf den kleineren Inseln besonders abgeschiedene Strände und eine entspannte Atmosphäre.",
    ],
    heroImage: new URL("/img/destination/okinawa.webp", import.meta.url).href,
    bestTime: "April – Oktober",
    temperature: "24 – 32 °C",
    seaTemperature: "24 – 29 °C",
    flightTime: "ca. 14 Std. ab Frankfurt",
    highlights: [
      "Karibikähnliche Strände",
      "Korallenriffe",
      "Churaumi Aquarium",
      "Shurijo-Schloss",
      "Schnorcheln & Tauchen",
    ],
    nearby: [
      {
        name: "Naha",
        distance: "10 km",
      },
      {
        name: "Kerama-Inseln",
        distance: "40 km",
      },
      {
        name: "Miyakojima",
        distance: "300 km",
      },
    ],
  },
];

export function getDestinationImage(name: string): string {
  return (
    destinations.find((destination) => destination.name === name)?.heroImage ?? ""
  );
}

export function getDestinationsNearby(name: string): {
  name: string;
  distance: string;
}[] {
  return (
    destinations.find((destination) => destination.name === name)?.nearby ?? []
  );
}
