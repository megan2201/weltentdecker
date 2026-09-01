import { useEffect, useState, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  Globe2,
  Lock,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { useTrip } from "@/components/context/trip-context";
import { getExperienceById, type Experience } from "@/assets/data/experiences";
import { useUser } from "@/components/context/user-context";
import NotFound from "../not-found";
import { useEvaluation } from "@/components/context/evaluation-provider";

function formatDate(date?: Date) {
  if (!date) return "—";

  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ExperiencesBooking() {
  const navigate = useNavigate();
  const { trip } = useTrip();
  const { user, addExperienceBooking } = useUser();
  const { currentTask, changeNagging } = useEvaluation();
  const { id } = useParams();

  const experience = id ? getExperienceById(id) : undefined;

  if (!experience) {
    return <NotFound />;
  }

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("10 / 26");
  const [cvc, setCvc] = useState("123");
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    // Wird einmalig nach dem ersten Rendern ausgeführt
    if (currentTask.darkPattern === "nagging") {
      changeNagging(true);
    }
  }, []);

  /*
   * Für Erlebnisse:
   * Preis = Preis pro Person × Anzahl Teilnehmer
   */
  const experiencePrice = experience.price * trip.guests;

  /*
   * Optional kann später noch eine Servicegebühr
   * aus deiner API kommen.
   */
  const validGuests = trip.guests >= 1 && trip.guests <= experience.maxGuests;
  const validDate = Boolean(trip.date);

  function handleGuestSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!firstName || !lastName || !email || !validGuests || !validDate) {
      return;
    }

    setStep(2);
  }

  async function handlePayment(
    event: SyntheticEvent,
    experience: Experience,
    date: Date,
    guests: number,
  ) {
    event.preventDefault();

    if (!cardNumber || !expiry || !cvc || !acceptTerms) {
      return;
    }

    setLoading(true);

    addExperienceBooking({
      uid: crypto.randomUUID().toString(),
      experience: experience,
      date: date,
      guests: guests,
      totalPrice: experiencePrice,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setStep(3);

    if (currentTask.darkPattern === "nagging") {
      changeNagging(true);
    }
  }

  /*
   * Kein Datum ausgewählt
   */
  if (!validDate) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CalendarDays className="h-7 w-7 text-emerald-600" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            Kein Termin ausgewählt
          </h1>

          <p className="mt-3 text-gray-500">
            Bitte wähle zuerst einen Termin für dieses Erlebnis aus.
          </p>

          <Button
            className="mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-700"
            onClick={() => navigate(-1)}
          >
            Zurück zum Erlebnis
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf9]">
      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div className="mt-20 border-b bg-white">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <div className="flex items-center justify-center">
            {[
              ["1", "Teilnehmerdaten"],
              ["2", "Zahlung"],
              ["3", "Bestätigung"],
            ].map(([number, label], index) => {
              const active = Number(number) <= step;

              return (
                <div key={number} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                        active
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {Number(number) < step ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        number
                      )}
                    </div>

                    <span
                      className={`hidden text-sm font-medium sm:block ${
                        active ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>

                  {index < 2 && (
                    <div
                      className={`mx-4 h-px w-10 sm:w-20 ${
                        Number(number) < step ? "bg-emerald-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        {step < 3 ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* =================================================
                MAIN
            ================================================== */}

            <div>
              {/* ===============================================
                  STEP 1
              ================================================ */}

              {step === 1 && (
                <>
                  <div className="mb-8">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Zurück zum Erlebnis
                    </button>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                      Dein Erlebnis
                    </h1>

                    <p className="mt-2 text-gray-500">
                      Gib deine Kontaktdaten ein, um die Buchung abzuschließen.
                    </p>
                  </div>

                  <form
                    onSubmit={handleGuestSubmit}
                    className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
                  >
                    <h2 className="text-xl font-semibold">Deine Daten</h2>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {/* Vorname */}

                      <div>
                        <label className="text-sm font-medium">Vorname</label>

                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Max"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>

                      {/* Nachname */}

                      <div>
                        <label className="text-sm font-medium">Nachname</label>

                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Mustermann"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    {/* E-Mail */}

                    <div className="mt-5">
                      <label className="text-sm font-medium">
                        E-Mail-Adresse
                      </label>

                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="max@example.com"
                        className="mt-2 h-12 rounded-xl"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="mt-8 h-13 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
                    >
                      Weiter zur Zahlung
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}

              {/* ===============================================
                  STEP 2
              ================================================ */}

              {step === 2 && (
                <>
                  <div className="mb-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Zurück
                    </button>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                      Zahlung
                    </h1>

                    <p className="mt-2 text-gray-500">
                      Deine Zahlung wird sicher verarbeitet.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) =>
                      handlePayment(e, experience, trip.date!, trip.guests)
                    }
                    className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Zahlungsmethode</h2>

                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>

                    {/* Karteninhaber */}

                    <div className="mt-6">
                      <label className="text-sm font-medium">
                        Karteninhaber
                      </label>

                      <Input
                        defaultValue={`${firstName} ${lastName}`}
                        className="mt-2 h-12 rounded-xl"
                      />
                    </div>

                    {/* Karte */}

                    <div className="mt-5">
                      <label className="text-sm font-medium">
                        Kartennummer
                      </label>

                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="mt-2 h-12 rounded-xl"
                        inputMode="numeric"
                        required
                      />
                    </div>

                    {/* Ablauf / CVC */}

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">
                          Ablaufdatum
                        </label>

                        <Input
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM / JJ"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">CVC</label>

                        <Input
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          placeholder="123"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    {/* Bedingungen */}

                    <div className="mt-7 flex items-start gap-3">
                      <Checkbox
                        checked={acceptTerms}
                        onCheckedChange={(value) =>
                          setAcceptTerms(value === true)
                        }
                      />

                      <label className="text-sm leading-6 text-gray-600">
                        Ich akzeptiere die
                        <span className="mx-1 font-medium text-gray-900 underline">
                          Buchungsbedingungen
                        </span>
                        und
                        <span className="ml-1 font-medium text-gray-900 underline">
                          Datenschutzbestimmungen
                        </span>
                        .
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !acceptTerms}
                      className="mt-8 h-13 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
                    >
                      {loading
                        ? "Zahlung wird verarbeitet..."
                        : `Jetzt ${experiencePrice} € bezahlen`}

                      {!loading && <Lock className="ml-2 h-4 w-4" />}
                    </Button>

                    <p className="mt-4 text-center text-xs text-gray-400">
                      Deine Zahlungsdaten werden verschlüsselt übertragen.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* =================================================
                SUMMARY
            ================================================== */}

            <aside>
              <div className="sticky top-8 rounded-3xl border bg-white p-6 shadow-sm">
                {/* Experience */}

                <div className="flex gap-4">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div className="min-w-0">
                    <h2 className="font-semibold">{experience.title}</h2>

                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {experience.location}, {experience.country}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-current" />

                      {experience.rating}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Reise */}

                <h3 className="font-semibold">Dein Erlebnis</h3>

                <div className="mt-5 space-y-4 text-sm">
                  {/* Datum */}

                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2 text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      Termin
                    </span>

                    <span className="font-medium">{formatDate(trip.date)}</span>
                  </div>

                  {/* Dauer */}

                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2 text-gray-500">
                      <Clock3 className="h-4 w-4" />
                      Dauer
                    </span>

                    <span className="font-medium">{experience.duration}</span>
                  </div>

                  {/* Teilnehmer */}

                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2 text-gray-500">
                      <Users className="h-4 w-4" />
                      Teilnehmer
                    </span>

                    <span className="font-medium">{trip.guests}</span>
                  </div>

                  {/* Sprache */}

                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2 text-gray-500">
                      <Globe2 className="h-4 w-4" />
                      Sprache
                    </span>

                    <span className="text-right font-medium">
                      {experience.languages.join(", ")}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Preis */}

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>
                      {experience.price} € × {trip.guests} Personen
                    </span>

                    <span>{experiencePrice} €</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between">
                  <span className="font-semibold">Gesamt</span>

                  <span className="text-xl font-semibold">
                    {experiencePrice} €
                  </span>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* =================================================
             SUCCESS
          ================================================== */

          <div className="mx-auto max-w-2xl py-10 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Buchung bestätigt
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Dein Erlebnis ist gebucht!
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-gray-500">
              Danke, {firstName}. Deine Buchung für {experience.title} wurde
              erfolgreich bestätigt.
            </p>

            {/* Confirmation card */}

            <div className="mt-10 rounded-3xl border bg-white p-6 text-left shadow-sm">
              <div className="flex gap-4">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div className="min-w-0">
                  <h2 className="font-semibold">{experience.title}</h2>

                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {experience.location}, {experience.country}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-current" />

                    {experience.rating}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase text-gray-400">Termin</p>

                  <p className="mt-1 font-medium">{formatDate(trip.date)}</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">Dauer</p>

                  <p className="mt-1 font-medium">{experience.duration}</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">Teilnehmer</p>

                  <p className="mt-1 font-medium">{trip.guests}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Bezahlt</span>

                <span className="text-xl font-semibold">
                  {experiencePrice} €
                </span>
              </div>
            </div>

            {/* Actions */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="rounded-xl"
              >
                Zur Startseite
              </Button>

              <Button
                onClick={() => navigate("/profile")}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                Meine Buchungen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="mt-6 text-xs text-gray-400">
              Eine Bestätigung wurde an {email} gesendet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
