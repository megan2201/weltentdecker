import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Navigation,
  Share2,
  Sparkles,
  Star,
  Sun,
  Users,
  Waves,
  Wind,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { destinations } from "@/assets/data/destinations"
import { useMemo } from "react"
import Home from "../home"

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>()

  const destination = useMemo(
    () => destinations.find((item) => item.slug === slug),
    [slug],
  )

  if (!destination) {
    return <Home />
  }
  
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[680px] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl flex-col justify-end px-6 pb-14 lg:px-8 lg:pb-20">
          {/* Breadcrumb */}
          <div className="absolute left-6 top-28 flex items-center gap-2 text-sm text-white/75 lg:left-8">
            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link to="/destinations" className="hover:text-white">
              Reiseziele
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-white">
              {destination.name}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                <MapPin className="h-4 w-4" />
                {destination.region} · {destination.country}
              </div>

              <h1 className="text-6xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
                {destination.name}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                {destination.description}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-gray-900"
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-gray-900"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK INFO
      ====================================================== */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x sm:grid-cols-4">
          <div className="flex items-center gap-3 px-6 py-6 lg:px-8">
            <Sun className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-xs text-gray-500">Beste Reisezeit</p>
              <p className="mt-1 text-sm font-semibold">
                {destination.bestTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-6 lg:px-8">
            <Wind className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-xs text-gray-500">Temperatur</p>
              <p className="mt-1 text-sm font-semibold">
                {destination.temperature}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-6 lg:px-8">
            <Waves className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-xs text-gray-500">Meer</p>
              <p className="mt-1 text-sm font-semibold">
                {destination.seaTemperature}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-6 lg:px-8">
            <Clock3 className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-xs text-gray-500">Flug ab Deutschland</p>
              <p className="mt-1 text-sm font-semibold">
                {destination.flightTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO + BOOKING CARD
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_380px] lg:gap-20">
          <article>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Willkommen in {destination.name}
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Entdecke deinen nächsten Lieblingsort.
            </h2>

            <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-gray-600">
              {destination.longDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {destination.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>

                  {highlight}
                </div>
              ))}
            </div>
          </article>

          {/* Booking card */}
          <aside className="h-fit rounded-3xl border bg-white p-6 shadow-xl shadow-gray-200/50 lg:sticky lg:top-8">
            <p className="text-sm font-semibold text-gray-500">
              Deine Reise
            </p>

            <h3 className="mt-2 text-2xl font-semibold">
              {destination.name} entdecken
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Reisedatum
                    </p>
                    <p className="text-sm font-medium">
                      Datum auswählen
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Reisende
                    </p>
                    <p className="text-sm font-medium">
                      2 Personen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 border-t" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  Unterkünfte
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  ab {destination.price}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                / Nacht
              </p>
            </div>

            <Button className="mt-6 h-13 w-full rounded-xl bg-emerald-600 text-base hover:bg-emerald-700">
              Reise planen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Kostenlose Stornierung bei ausgewählten Unterkünften
            </p>
          </aside>
        </div>
      </section>

      {/* =====================================================
          HOTELS
      ====================================================== */}
      <section className="bg-[#f5f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Übernachten
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Bleib in {destination.name}.
            </h2>
          </div>

          <Button variant="ghost">
            Alle Unterkünfte
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {destination.hotels.map((hotel) => (
            <a
              href="#"
              key={hotel.name}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {hotel.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {hotel.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    {hotel.rating}
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-semibold">
                    {hotel.price}
                  </span>

                  <span className="text-sm text-gray-500">
                    / Nacht
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      </section>
      

      {/* =====================================================
          EXPERIENCES
      ====================================================== */}
      <section className="bg-gray-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Erlebnisse
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                Mach mehr aus deiner Reise.
              </h2>
            </div>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              Alle Erlebnisse
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {destination.experiences.map((experience) => (
              <a
                href="#"
                key={experience.title}
                className="group overflow-hidden rounded-3xl bg-white/5"
              >
                <div className="overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {experience.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock3 className="h-4 w-4" />
                      {experience.duration}
                    </div>

                    <span className="font-semibold">
                      {experience.price}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP / LOCATION
      ====================================================== */}
      {/* =====================================================
          LOCATION
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Lage
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Wo genau liegt {destination.name}?
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Entdecke die Umgebung von {destination.name} und plane deine
              Reise mit weiteren Orten in der Nähe.
            </p>

            <div className="mt-8 space-y-4">
              {destination.nearby.map((place) => (
                <div
                  key={place.name}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Navigation className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {place.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {place.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#e7eee9]">
            <div className="absolute inset-0 opacity-40">
              <svg
                viewBox="0 0 600 500"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M50 100 C180 40 220 180 350 100 C430 50 500 100 570 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M20 300 C130 250 180 360 300 290 C400 230 470 330 600 260"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M100 0 C160 100 120 190 220 250 C300 310 280 400 390 500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="absolute left-[58%] top-[48%]">
              <div className="relative">
                <div className="absolute -inset-3 animate-pulse rounded-full bg-emerald-400/20" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold shadow-lg">
                {destination.name}
              </div>
            </div>

            <div className="absolute bottom-5 left-5 rounded-xl bg-white px-4 py-3 shadow-lg">
              <p className="text-xs text-gray-500">
                Region
              </p>

              <p className="mt-1 text-sm font-semibold">
                {destination.region}, {destination.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-600 px-6 py-16 text-center text-white sm:px-12 lg:py-20">
          <Sparkles className="mx-auto h-8 w-8 text-emerald-200" />

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Bereit für {destination.name}?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-emerald-50">
            Finde deine Unterkunft, plane deine Erlebnisse und mach{" "}
            {destination.name} zu deinem nächsten Lieblingsort.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-13 rounded-xl bg-white px-7 text-gray-900 hover:bg-gray-100"
            >
              Unterkünfte ansehen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-13 rounded-xl border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
            >
              Reise planen
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}