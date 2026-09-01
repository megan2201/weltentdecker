import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStayById } from "@/assets/data/stays";
import { useTrip } from "@/components/context/trip-context";
import NotFound from "../not-found";
import {
  getDestinationImage,
  getDestinationsNearby,
} from "@/assets/data/destinations";

function calculateNights(checkIn?: Date, checkOut?: Date) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const difference = end.getTime() - start.getTime();

  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

export default function StaysDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const stay = id ? getStayById(id) : undefined;
  if (!stay) {
    return <NotFound />;
  }

  const destinationImg = getDestinationImage(stay.location);
  const destinationsNearby = getDestinationsNearby(stay.location);

  const { trip, setCheckIn, setCheckOut, setGuests } = useTrip();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const nights = calculateNights(trip.checkIn, trip.checkOut);
  const total = stay.pricePerNight * nights;
  const canBook =
    !!trip.checkIn && !!trip.checkOut && nights > 0 && trip.guests > 0;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =====================================================
          PAGE
      ====================================================== */}
      <div className="mt-20 mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>

          <span>/</span>

          <Link to="/stays" className="hover:text-gray-900">
            Unterkünfte
          </Link>

          <span>/</span>

          <span className="text-gray-900">{stay.name}</span>
        </div>

        {/* =====================================================
            TITLE
        ====================================================== */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              {stay.featured && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Beliebt
                </span>
              )}

              <span className="flex items-center gap-1 text-sm font-medium">
                <Star className="h-4 w-4 fill-current" />
                {stay.rating}
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {stay.name}
            </h1>

            <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {stay.location}, {stay.country}
            </p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {stay.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-2 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* =====================================================
            IMAGE GALLERY
        ====================================================== */}
        <div className="mt-8 grid h-[500px] grid-cols-1 gap-2 overflow-hidden rounded-3xl md:grid-cols-2">
          {/* Main image */}
          <div className="relative overflow-hidden">
            <img
              src={stay.images[selectedImage]}
              alt={stay.name}
              className="h-full w-full object-cover"
            />

            <button
              onClick={() =>
                setSelectedImage(
                  selectedImage === 0
                    ? stay.images.length - 1
                    : selectedImage - 1,
                )
              }
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() =>
                setSelectedImage(
                  selectedImage === stay.images.length - 1
                    ? 0
                    : selectedImage + 1,
                )
              }
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-xs text-white backdrop-blur">
              {selectedImage + 1} / {stay.images.length}
            </div>
          </div>

          {/* Gallery thumbnails */}
          <div className="hidden grid-cols-2 gap-2 md:grid">
            {stay.images.slice(1, 5).map((image, index) => (
              <div
                key={image}
                onClick={() => {
                  if (index != 3) setSelectedImage(index + 1);
                }}
                className="relative overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Casa Mare ${index + 2}`}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />

                {index === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button variant="outline" className="rounded-xl">
                      Alle Fotos ansehen
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT + BOOKING
        ====================================================== */}
        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_390px]">
          {/* LEFT */}
          <div>
            {/* Intro */}
            <section>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {stay.type} in {stay.location}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {stay.guests} Gäste · {stay.bedrooms}{" "}
                    {stay.bedrooms === 1 ? "Schlafzimmer" : "Schlafzimmer"} ·{" "}
                    {stay.bathrooms}{" "}
                    {stay.bathrooms === 1 ? "Badezimmer" : "Badezimmer"}
                  </p>
                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-emerald-100 sm:flex">
                  <SparkleIcon />
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-[16px] leading-8 text-gray-600">
                {stay.description}
              </p>
            </section>

            <Separator className="my-10" />

            {/* Features */}
            <section>
              <h2 className="text-2xl font-semibold">Das erwartet dich</h2>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                {stay.amenities.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <item.icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-medium">{item.title}</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-10" />

            {/* Facilities */}
            <section>
              <h2 className="text-2xl font-semibold">Ausstattung</h2>

              <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                {stay.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Check className="h-4 w-4 text-emerald-600" />
                    {facility}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-10" />

            {/* Location */}
            <section>
              <h2 className="text-2xl font-semibold">Lage</h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {stay.location}, {stay.country}
              </p>

              <div className="relative mt-6 h-[360px] overflow-hidden rounded-3xl bg-gray-200">
                <img
                  src={destinationImg}
                  alt={stay.location}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl">
                  <MapPin className="h-6 w-6" />
                </div>

                <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-3 shadow-lg">
                  <p className="text-sm font-semibold">{stay.name}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                {destinationsNearby.map((destinationNearby) => (
                  <div key={destinationNearby.name} className="rounded-xl bg-gray-50 p-4">
                    <p className="font-medium">{destinationNearby.name}</p>
                    <p className="mt-1 text-gray-500">
                      {destinationNearby.distance}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* =====================================================
              BOOKING CARD
          ====================================================== */}
          <aside>
            <div className="sticky top-28 rounded-3xl border bg-white p-6 shadow-xl shadow-gray-200/50">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-semibold">
                    {stay.pricePerNight} €
                  </span>

                  <span className="text-sm text-gray-500"> / Nacht</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-current" />
                  {stay.rating}
                </div>
              </div>

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

                  <Popover
                    open={isCheckOutOpen}
                    onOpenChange={setIsCheckOutOpen}
                  >
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
                        onClick={() =>
                          setGuests(Math.min(trip.guests + 1, stay.guests))
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              {nights > 0 ? (
                <div className="mt-6 space-y-4 text-sm">
                  <Separator />

                  <div className="flex justify-between text-base">
                    <span className="font-semibold">Gesamt</span>

                    <span className="font-semibold">{total} €</span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
                  Wähle deinen Reisezeitraum, um den Gesamtpreis zu sehen.
                </div>
              )}

              <Button
                size="lg"
                disabled={!canBook}
                onClick={() => {
                  if (!canBook) return;

                  navigate(`/stays/${stay.id}/booking`);
                }}
                className="mt-6 h-14 w-full rounded-xl bg-emerald-600 text-base font-semibold hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Unterkunft buchen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {canBook && (
                <p className="mt-3 text-center text-xs text-gray-500">
                  {nights} {nights === 1 ? "Nacht" : "Nächte"} · {trip.guests}{" "}
                  {trip.guests === 1 ? "Gast" : "Gäste"}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="text-emerald-600"
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}
