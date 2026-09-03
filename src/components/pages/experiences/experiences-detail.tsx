import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock3,
  Languages,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getExperienceById } from "@/assets/data/experiences";

import { useTrip } from "@/components/context/trip-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEvaluation } from "@/components/context/evaluation-provider";

export default function ExperiencesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTask, completeTask } = useEvaluation();
  const experience = id ? getExperienceById(id) : undefined;
  const { trip, setDate, setGuests } = useTrip();
  const [isDateOpen, setIsDateOpen] = useState(false);

  if (!experience) {
    return (
      <main className="min-h-screen bg-white pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-3xl font-semibold">Erlebnis nicht gefunden</h1>

          <p className="mt-3 text-gray-500">
            Dieses Erlebnis existiert nicht oder wurde entfernt.
          </p>

          <Link
            to="/experiences"
            className="mt-6 inline-flex items-center text-emerald-700"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Zurück zu den Erlebnissen
          </Link>
        </div>
      </main>
    );
  }

  const disguisedAds = currentTask?.darkPattern === "disguised-ads";

  useEffect(() => {
    if (disguisedAds && experience.location === "Freiburg") {
      completeTask()
    }
  }, []);

  const canBook =
    trip.guests > 0 && trip.guests <= experience.maxGuests && trip.date;
  const total = experience.price * trip.guests;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto mt-20 max-w-7xl px-6 py-8 lg:px-8">
        {/* =====================================================
            BREADCRUMB
        ====================================================== */}

        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>

          <span>/</span>

          <Link to="/experiences" className="hover:text-gray-900">
            Erlebnisse
          </Link>

          <span>/</span>

          <span className="text-gray-900">{experience.title}</span>
        </div>

        {/* =====================================================
            TITLE
        ====================================================== */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {experience.featured && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Beliebt
                </span>
              )}

              {experience.instantBooking && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                  Sofort buchbar
                </span>
              )}

              <span className="flex items-center gap-1 text-sm font-medium">
                <Star className="h-4 w-4 fill-current" />
                {experience.rating}
              </span>

              {/* Sponsored */}
              {disguisedAds && experience.sponsored && (
                <div className="text-gray-500 text-xs italic">· Gesponsert</div>
              )}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {experience.title}
            </h1>

            <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {experience.location}, {experience.country}
            </p>
          </div>

          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm">
              <Clock3 className="h-4 w-4" />
              {experience.duration}
            </span>

            <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm">
              <Users className="h-4 w-4" />
              Bis zu {experience.maxGuests}
            </span>
          </div>
        </div>

        {/* =====================================================
            IMAGE GALLERY
        ====================================================== */}

        <div className="mt-8 overflow-hidden rounded-3xl">
          <img
            src={experience.image}
            alt={experience.title}
            className="h-90 w-full object-cover"
          />
        </div>

        {/* =====================================================
            MAIN CONTENT + BOOKING
        ====================================================== */}

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_390px]">
          {/* ===================================================
              LEFT
          ==================================================== */}

          <div>
            {/* Intro */}

            <section>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {experience.type} in {experience.location}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {experience.duration}
                    </span>

                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Bis zu {experience.maxGuests} Personen
                    </span>

                    <span className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      {experience.languages.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-emerald-100 sm:flex">
                  <SparkleIcon />
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-[16px] leading-8 text-gray-600">
                {experience.description}
              </p>
            </section>

            <Separator className="my-10" />

            {/* =================================================
                HIGHLIGHTS
            ================================================== */}

            <section>
              <h2 className="text-2xl font-semibold">Das erwartet dich</h2>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                {experience.tags.slice(0, 6).map((tag) => (
                  <div key={tag} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <SparkleIcon />
                    </div>

                    <div>
                      <h3 className="font-medium">{tag}</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Ein besonderer Bestandteil dieses Erlebnisses.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-10" />

            {/* =================================================
                INCLUDED
            ================================================== */}

            <section>
              <h2 className="text-2xl font-semibold">Im Preis enthalten</h2>

              <div className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {experience.included.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Nicht enthalten */}

            {experience.notIncluded?.length &&
              experience.notIncluded?.length > 0 && (
                <>
                  <div className="mt-6">
                    <h3 className="font-medium">Nicht enthalten</h3>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {experience.notIncluded.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm text-gray-500"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

            <Separator className="my-10" />

            {/* =================================================
                MEETING POINT
            ================================================== */}

            <section>
              <h2 className="text-2xl font-semibold">Treffpunkt</h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />

                {experience.meetingPoint}
              </p>

              <div className="relative mt-6 h-[360px] overflow-hidden rounded-3xl bg-gray-200">
                <img
                  src={experience.image}
                  alt={experience.meetingPoint}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl">
                  <MapPin className="h-6 w-6" />
                </div>

                <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-3 shadow-lg">
                  <p className="text-sm font-semibold">Treffpunkt</p>

                  <p className="mt-1 text-xs text-gray-500">
                    {experience.meetingPoint}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================
              BOOKING CARD
          ==================================================== */}

          <aside>
            <div className="sticky top-28 rounded-3xl border bg-white p-6 shadow-xl shadow-gray-200/50">
              {/* Price */}

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-semibold">
                    {experience.price} €
                  </span>

                  <span className="text-sm text-gray-500"> / Person</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-current" />

                  {experience.rating}
                </div>
              </div>

              {/* Experience info */}

              <div className="mt-6 overflow-hidden rounded-2xl border">
                {/* date */}

                <div className="grid border-b grid-cols-2 divide-x">
                  <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                    <PopoverTrigger>
                      <div className="p-4 text-left">
                        <p className="text-[10px] font-bold uppercase tracking-wider">
                          Datum
                        </p>

                        <p className="mt-1 text-sm">
                          {trip.date
                            ? trip.date.toLocaleDateString("de-DE")
                            : "Datum auswählen"}
                        </p>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={trip.date}
                        onSelect={(date) => {
                          if (date) {
                            setDate(date);
                            setIsDateOpen(false);
                          }
                        }}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider">
                      Dauer
                    </p>

                    <p className="mt-1 text-sm">{experience.duration}</p>
                  </div>
                </div>

                {/* Guests */}
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider">
                    Teilnehmer
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm">
                      {trip.guests} {trip.guests === 1 ? "Person" : "Personen"}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, trip.guests - 1))}
                        className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border"
                      >
                        −
                      </button>

                      <span>{trip.guests}</span>

                      <button
                        onClick={() =>
                          setGuests(
                            Math.min(trip.guests + 1, experience.maxGuests),
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-full border"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="underline">
                    {experience.price} € × {trip.guests} Personen
                  </span>

                  <span>{total} €</span>
                </div>

                <Separator />

                <div className="flex justify-between text-base">
                  <span className="font-semibold">Gesamt</span>

                  <span className="font-semibold">{total} €</span>
                </div>
              </div>

              <Button
                size="lg"
                disabled={!canBook}
                onClick={() => {
                  if (!canBook) return;

                  navigate(`/experiences/${experience.id}/booking`);
                }}
                className="mt-6 h-14 w-full rounded-xl bg-emerald-600 text-base font-semibold hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Erlebnis buchen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="mt-3 text-center text-xs text-gray-500">
                {experience.duration} · {trip.guests}{" "}
                {trip.guests === 1 ? "Person" : "Personen"}
              </p>
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
