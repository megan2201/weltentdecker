import {
  ArrowRight,
  Globe2,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"
import { destinations } from "@/assets/data/destinations"
import { getStayCountryDetails } from "@/assets/data/stays"

export default function Destinations() {
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState<string | null>("alle Regionen")
  const [category, setCategory] = useState<string | null>("alle Reisearten");
  const destinationsRef = useRef<HTMLElement | null>(null);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.country.toLowerCase().includes(search.toLowerCase())

    const matchesRegion =
      region === "alle Regionen" || destination.region === region

    const matchesCategory =
      category === "alle Reisearten" || destination.category === category

    return matchesSearch && matchesRegion && matchesCategory
  })

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#f4f7f4]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                <Globe2 className="h-4 w-4" />
                Die Welt wartet
              </div>

              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Entdecke Orte,
                <br />
                <span className="text-emerald-600">
                  die bleiben.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
                Von mediterranen Küsten bis zu abgelegenen Bergdörfern:
                entdecke Reiseziele, die zu deinem nächsten Abenteuer passen.
              </p>

              {/* Search */}
              <div className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        setSearch(searchInput)
                        destinationsRef.current?.scrollIntoView({ behavior: 'smooth' })
                        }
                    }}
                    placeholder="Reiseziel oder Land suchen..."
                    className="h-14 rounded-2xl border-gray-200 bg-white pl-12 shadow-sm"
                  />
                </div>

                <Button 
                    onClick={() => {
                        setSearch(searchInput)
                        destinationsRef.current?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="h-14 rounded-2xl bg-emerald-600 px-7 hover:bg-emerald-700">
                        Suchen
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=90"
                  alt="Berglandschaft"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-xl sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      3.200+ Reiseziele
                    </p>
                    <p className="text-xs text-gray-500">
                      weltweit entdecken
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTER
      ====================================================== */}
      <section ref={destinationsRef} className="scroll-mt-18 border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />

              <span className="text-sm font-medium">
                Reiseziele filtern
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:flex">
              <Select
                value={region}
                onValueChange={setRegion}
              >
                <SelectTrigger className="w-full rounded-xl lg:w-44">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="alle Regionen">
                    Alle Regionen
                  </SelectItem>
                  <SelectItem value="Europa">
                    Europa
                  </SelectItem>
                  <SelectItem value="Asien">
                    Asien
                  </SelectItem>
                  <SelectItem value="Afrika">
                    Afrika
                  </SelectItem>
                  <SelectItem value="Amerika">
                    Amerika
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="w-full rounded-xl lg:w-44">
                  <SelectValue placeholder="Reiseart" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="alle Reisearten">
                    Alle Reisearten
                  </SelectItem>
                  <SelectItem value="Meer">
                    Strand & Meer
                  </SelectItem>
                  <SelectItem value="Natur">
                    Natur
                  </SelectItem>
                  <SelectItem value="Stadt">
                    Städtereise
                  </SelectItem>
                  <SelectItem value="Kultur">
                    Kultur
                  </SelectItem>
                  <SelectItem value="Abenteuer">
                    Abenteuer
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setSearch("")
                  setRegion("alle Regionen")
                  setCategory("alle Reisearten")
                }}
              >
                Filter zurücksetzen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DESTINATION GRID
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Entdecke
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Beliebte Reiseziele
            </h2>
          </div>

          <p className="hidden text-sm text-gray-500 sm:block">
            {filteredDestinations.length} Reiseziele
          </p>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map((destination) => (
              <Link
                to={`/destinations/${destination.slug}`}
                key={destination.name}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
                    {destination.category}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {destination.name}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {destination.country}
                      </p>
                    </div>

                    <span className="text-sm font-semibold">
                      {destination.price}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                    {destination.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-medium text-emerald-700">
                    Entdecken
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed p-12 text-center">
            <Globe2 className="mx-auto h-10 w-10 text-gray-300" />

            <h3 className="mt-4 text-lg font-semibold">
              Kein Reiseziel gefunden
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Versuche einen anderen Suchbegriff oder ändere deine Filter.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          Länder
      ====================================================== */}
      <section className="bg-gray-950 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Nach Land
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Wohin möchtest du?
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-400">
              Entdecke neue Reiseideen nach Länder und finde deinen
              persönlichen nächsten Lieblingsort.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {getStayCountryDetails().slice(0, 4).map((countryDetails) => (
              <Link
                to={`/stays?q=${encodeURIComponent(countryDetails[0])}`}
                key={countryDetails[0]}
                className="group relative h-72 overflow-hidden rounded-3xl"
              >
                <img
                  src={countryDetails[1]}
                  alt={countryDetails[0]}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <h3 className="text-2xl font-semibold">
                    {countryDetails[0]}
                  </h3>

                  <p className="mt-1 text-sm text-white/65">
                    {(Math.floor(Math.random() * 201))} Unterkünfte
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}