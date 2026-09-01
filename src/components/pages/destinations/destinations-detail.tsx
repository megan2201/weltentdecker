import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Navigation,
  Star,
  Sun,
  Waves,
  Wind,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { destinations } from "@/assets/data/destinations";
import { useMemo, useState } from "react";
import { useTrip } from "@/components/context/trip-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Home from "@/components/pages/home";
import {
  getMinPriceOfStaysAtDestination,
  getStaysAtDestination,
} from "@/assets/data/stays";

export default function DestinationDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const destination = useMemo(
    () => destinations.find((item) => item.slug === slug),
    [slug],
  );
  const { trip, setCheckIn, setCheckOut, setGuests } = useTrip();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  if (!destination) {
    return <Home />;
  }

  const minPrice = getMinPriceOfStaysAtDestination(destination.name);

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

            <span className="text-white">{destination.name}</span>
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
            <p className="text-sm font-semibold text-gray-500">Deine Reise</p>

            <h3 className="mt-2 text-2xl font-semibold">
              {destination.name} entdecken
            </h3>

            {/* Dates */}
            <div className="mt-6 overflow-hidden rounded-2xl border">
              <div className="grid grid-cols-2 divide-x">
                <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                  <PopoverTrigger>
                    <div className="p-4 text-left">
                      <p className="text-[10px] font-bold uppercase tracking-wider">
                        Check-in
                      </p>

                      <p className="mt-1 text-sm">
                        {trip.checkIn
                          ? trip.checkIn.toLocaleDateString("de-DE")
                          : "Datum auswählen"}
                      </p>
                    </div>
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

                <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                  <PopoverTrigger>
                    <div className="p-4 text-left">
                      <p className="text-[10px] font-bold uppercase tracking-wider">
                        Check-out
                      </p>

                      <p className="mt-1 text-sm">
                        {trip.checkOut
                          ? trip.checkOut.toLocaleDateString("de-DE")
                          : "Datum auswählen"}
                      </p>
                    </div>
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

              {/* Guests */}
              <div className="border-t p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider">
                  Gäste
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm">
                    {trip.guests} {trip.guests === 1 ? "Gast" : "Gäste"}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, trip.guests - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-full border"
                    >
                      −
                    </button>

                    <span>{trip.guests}</span>

                    <button
                      onClick={() => setGuests(trip.guests + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 border-t" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">Unterkünfte</p>

                <p className="mt-1 text-2xl font-semibold">
                  {minPrice > 0 ? "ab " + minPrice + " €" : "-"}
                </p>
              </div>

              <p className="text-sm text-gray-500">/ Nacht</p>
            </div>

            <Button
              onClick={() => {
                navigate(`/stays?q=${encodeURIComponent(destination.name)}`);
              }}
              className="mt-6 h-13 w-full rounded-xl bg-emerald-600 text-base hover:bg-emerald-700"
            >
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
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {getStaysAtDestination(destination.name).map((stay) => (
              <Link to={"/stays/" + stay.id} key={stay.name} className="group">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={stay.images[0]}
                    alt={stay.name}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{stay.name}</h3>

                      <p className="mt-1 text-sm text-gray-500">{stay.type}</p>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Star className="h-4 w-4 fill-current" />
                      {stay.rating}
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-semibold">
                      {stay.pricePerNight} €
                    </span>

                    <span className="text-sm text-gray-500">/ Nacht</span>
                  </div>
                </div>
              </Link>
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
              Entdecke die Umgebung von {destination.name} und plane deine Reise
              mit weiteren Orten in der Nähe.
            </p>

            <div className="mt-8 space-y-4">
              {destination.nearby.map((place) => (
                <div key={place.name} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Navigation className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{place.name}</p>

                    <p className="text-sm text-gray-500">{place.distance}</p>
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
              <p className="text-xs text-gray-500">Region</p>

              <p className="mt-1 text-sm font-semibold">
                {destination.region}, {destination.country}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
