import { useState } from "react";

import { CalendarDays, ChevronDown, MapPin, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useTrip } from "@/components/context/trip-context";
import { useNavigate } from "react-router-dom";
import { useEvaluation } from "@/components/context/evaluation-provider";
import heroImg from "@/assets/img/weltentdecker-hero.jpg"

export default function HomeHero() {
  const navigate = useNavigate();
  const {completeTask} = useEvaluation()
  const { trip, setCheckIn, setCheckOut, setGuests } = useTrip();
  const [searchInput, setSearchInput] = useState("");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  return (
    <main className="bg-white text-gray-900">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative flex min-h-[760px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

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
              <span onClick={completeTask} className="text-emerald-300">Reise</span> beginnt hier.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
              Finde besondere Orte, unvergessliche Erlebnisse und Hotels, die
              perfekt zu dir passen.
            </p>
          </div>

          {/* Booking search */}
          <div className="mt-12 max-w-7xl rounded-3xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 divide-y md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:divide-x md:divide-y-0">
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="w-full">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Reiseziel
                  </label>

                  <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (searchInput.trim()) {
                          navigate(
                            `/stays?q=${encodeURIComponent(searchInput.trim())}`,
                          );
                        } else {
                          navigate("/stays");
                        }
                      }
                    }}
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
                    Check-in
                  </p>

                  <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                    <PopoverTrigger className="mt-1 cursor-pointer flex items-center gap-2 text-sm font-medium">
                      {trip.checkIn
                        ? trip.checkIn.toLocaleDateString("de-DE")
                        : "Datum auswählen"}
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={trip.checkIn}
                        onSelect={(date) => {
                          if (date) {
                            setCheckIn(date);
                            if (trip.checkOut && date > trip.checkOut)
                              setCheckOut(undefined);
                            setIsCheckInOpen(false);
                          }
                        }}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Check-out
                  </p>

                  <Popover
                    open={isCheckOutOpen}
                    onOpenChange={setIsCheckOutOpen}
                  >
                    <PopoverTrigger className="mt-1 cursor-pointer flex items-center gap-2 text-sm font-medium">
                      {trip.checkOut
                        ? trip.checkOut.toLocaleDateString("de-DE")
                        : "Datum auswählen"}
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={trip.checkOut}
                        onSelect={(date) => {
                          setCheckOut(date);
                          setIsCheckOutOpen(false);
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          const isPast = date < today;

                          // 2. Tage deaktivieren, die nach/ab dem Check-Out-Datum liegen (falls Check-Out gesetzt ist)
                          const isAfterCheckIn = trip.checkIn
                            ? date < trip.checkIn
                            : false;

                          return isPast || isAfterCheckIn;
                        }}
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
                      onClick={() => setGuests(Math.max(1, trip.guests - 1))}
                      className="flex cursor-pointer h-6 w-6 items-center justify-center rounded-full border hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="min-w-16 text-sm font-medium">
                      {trip.guests} {trip.guests === 1 ? "Person" : "Personen"}
                    </span>

                    <button
                      onClick={() => setGuests(trip.guests + 1)}
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-2">
                <Button
                  onClick={() => {
                    if (searchInput.trim()) {
                      navigate(
                        `/stays?q=${encodeURIComponent(searchInput.trim())}`,
                      );
                    } else {
                      navigate("/stays");
                    }
                  }}
                  size="lg"
                  className="h-14 w-full cursor-pointer rounded-2xl bg-emerald-600 px-6 text-white hover:bg-emerald-700 md:w-auto"
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
  );
}
