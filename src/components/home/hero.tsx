import { useState } from "react"

import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function Hero() {
  const [date, setDate] = useState<Date>()
  const [guests, setGuests] = useState(2)

  return (
    <main className="bg-white text-gray-900">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative flex min-h-[760px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

        {/* Navigation */}
        <header className="absolute left-0 right-0 top-0 z-50">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
            <a
              href="#"
              className="text-2xl font-bold tracking-tight text-white"
            >
              welt<span className="text-emerald-300">entdecken</span>
            </a>

            <div className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
              <a href="#destinations" className="hover:text-white">
                Reiseziele
              </a>
              <a href="#stays" className="hover:text-white">
                Unterkünfte
              </a>
              <a href="#experiences" className="hover:text-white">
                Erlebnisse
              </a>
              <a href="#about" className="hover:text-white">
                Über uns
              </a>
            </div>

            <Button
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-gray-900"
            >
              Anmelden
            </Button>
          </nav>
        </header>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pt-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Entdecke die Welt neu
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Deine nächste
              <br />
              <span className="text-emerald-300">Reise</span> beginnt hier.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
              Finde besondere Orte, unvergessliche Erlebnisse und Hotels, die
              perfekt zu dir passen.
            </p>
          </div>

          {/* Booking search */}
          <div className="mt-12 max-w-5xl rounded-3xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 divide-y md:grid-cols-[1.4fr_1fr_1fr_auto] md:divide-x md:divide-y-0">
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="w-full">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Reiseziel
                  </label>

                  <Input
                    placeholder="Wohin möchtest du?"
                    className="mt-1 h-auto border-0 p-0 text-sm font-medium shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Zeitraum
                  </p>

                  <Popover>
                    <PopoverTrigger className="mt-1 flex items-center gap-2 text-sm font-medium">
                      {date
                        ? date.toLocaleDateString("de-DE")
                        : "Datum auswählen"}
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Reisende
                  </p>

                  <div className="mt-1 flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="flex h-6 w-6 items-center justify-center rounded-full border hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="min-w-16 text-sm font-medium">
                      {guests} {guests === 1 ? "Person" : "Personen"}
                    </span>

                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-2">
                <Button
                  size="lg"
                  className="h-14 w-full rounded-2xl bg-emerald-600 px-7 text-white hover:bg-emerald-700 md:w-auto"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Suchen
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <span>✓ Bestpreis-Garantie</span>
            <span>✓ Kostenlose Stornierung</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </section>
    </main>
  )
}