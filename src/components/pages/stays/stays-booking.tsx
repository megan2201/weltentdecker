import { useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useTrip } from "@/components/context/trip-context"
import { getStayById, type Stay } from "@/assets/data/stays"
import { useUser } from "@/components/context/user-context"
import NotFound from "../not-found"

function formatDate(date: Date) {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function StaysBooking() {
  const navigate = useNavigate()
  const { trip } = useTrip();
  const {user} = useUser()
  const { addStayBooking } = useUser()
  const { id } = useParams();
  const stay = id ? getStayById(id) : undefined;
  if (!stay) {
    return <NotFound />;
  }

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242")
  const [expiry, setExpiry] = useState("10 / 26")
  const [cvc, setCvc] = useState("123")

  const [acceptTerms, setAcceptTerms] = useState(false)

  const cleaningFee = 35
  const serviceFee = 42

  const nights =
    trip.checkIn && trip.checkOut
      ? Math.max(
          1,
          Math.ceil(
            (trip.checkOut.getTime() -
              trip.checkIn.getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0

  const accommodationPrice =
    stay.pricePerNight * nights

  const total =
    accommodationPrice +
    cleaningFee +
    serviceFee

  function handleGuestSubmit(
    event: SyntheticEvent,
  ) {
    event.preventDefault()

    if (
      !firstName ||
      !lastName ||
      !email
    ) {
      return
    }

    setStep(2)
  }

  async function handlePayment(
    event: SyntheticEvent, stay: Stay, checkIn: Date, checkOut: Date, guests: number
  ) {
    event.preventDefault()

    if (
      !cardNumber ||
      !expiry ||
      !cvc ||
      !acceptTerms
    ) {
      return
    }

    setLoading(true)

    addStayBooking({
      uid: crypto.randomUUID().toString(),
      stay: stay,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      totalPrice: total
    })

    // Hier später deine Payment-API / Stripe-Integration.
    await new Promise((resolve) =>
      setTimeout(resolve, 1500),
    )

    setLoading(false)

    setStep(3)
  }

  if (!trip.checkIn || !trip.checkOut || nights <= 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">
            Buchung nicht möglich
          </h1>

          <p className="mt-3 text-gray-500">
            Bitte wähle zuerst einen gültigen
            Reisezeitraum aus.
          </p>

          <Button
            className="mt-6"
            onClick={() => navigate(-1)}
          >
            Zur Unterkunft
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8faf9]">
      {/* Progress */}
      <div className="mt-20 border-b bg-white">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <div className="flex items-center justify-center">
            {[
              ["1", "Gastdaten"],
              ["2", "Zahlung"],
              ["3", "Bestätigung"],
            ].map(([number, label], index) => {
              const active =
                Number(number) <= step

              return (
                <div
                  key={number}
                  className="flex items-center"
                >
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
                        active
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>

                  {index < 2 && (
                    <div
                      className={`mx-4 h-px w-12 sm:w-20 ${
                        Number(number) < step
                          ? "bg-emerald-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        {step < 3 ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Main */}
            <div>
              {step === 1 && (
                <>
                  <div className="mb-8">
                    <button
                      onClick={() =>
                        navigate(-1)
                      }
                      className="flex items-center cursor-pointer gap-2 text-sm text-gray-500 hover:text-gray-900"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Zurück zur Unterkunft
                    </button>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                      Deine Buchung
                    </h1>

                    <p className="mt-2 text-gray-500">
                      Gib deine Kontaktdaten ein, um
                      fortzufahren.
                    </p>
                  </div>

                  <form
                    onSubmit={handleGuestSubmit}
                    className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
                  >
                    <h2 className="text-xl font-semibold">
                      Deine Daten
                    </h2>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">
                          Vorname
                        </label>

                        <Input
                          value={firstName}
                          onChange={(e) =>
                            setFirstName(
                              e.target.value,
                            )
                          }
                          placeholder="Max"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Nachname
                        </label>

                        <Input
                          value={lastName}
                          onChange={(e) =>
                            setLastName(
                              e.target.value,
                            )
                          }
                          placeholder="Mustermann"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                        <label className="text-sm font-medium">
                          E-Mail-Adresse
                        </label>

                        <Input
                          type="email"
                          value={email}
                          onChange={(e) =>
                            setEmail(
                              e.target.value,
                            )
                          }
                          placeholder="max@example.com"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>

                    <div className="mt-8 rounded-2xl bg-emerald-50 p-4">
                      <div className="flex gap-3">
                        <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />

                        <div>
                          <p className="text-sm font-medium">
                            Deine Daten sind geschützt
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Wir verwenden deine Daten
                            ausschließlich zur
                            Bearbeitung deiner Buchung.
                          </p>
                        </div>
                      </div>
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
                      Deine Zahlung wird sicher
                      verarbeitet.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => handlePayment(e, stay, trip.checkIn!, trip.checkOut!, trip.guests)}
                    className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        Zahlungsmethode
                      </h2>

                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>

                    <div className="mt-6">
                      <label className="text-sm font-medium">
                        Karteninhaber
                      </label>

                      <Input
                        defaultValue={`${firstName} ${lastName}`}
                        className="mt-2 h-12 rounded-xl"
                      />
                    </div>

                    <div className="mt-5">
                      <label className="text-sm font-medium">
                        Kartennummer
                      </label>

                      <Input
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(
                            e.target.value,
                          )
                        }
                        placeholder="4242 4242 4242 4242"
                        className="mt-2 h-12 rounded-xl"
                        inputMode="numeric"
                        required
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">
                          Ablaufdatum
                        </label>

                        <Input
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(
                              e.target.value,
                            )
                          }
                          placeholder="MM / JJ"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          CVC
                        </label>

                        <Input
                          value={cvc}
                          onChange={(e) =>
                            setCvc(e.target.value)
                          }
                          placeholder="123"
                          className="mt-2 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-7 flex items-start gap-3">
                      <Checkbox
                        checked={acceptTerms}
                        onCheckedChange={(value) =>
                          setAcceptTerms(
                            value === true,
                          )
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
                      disabled={
                        loading || !acceptTerms
                      }
                      className="mt-8 h-13 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
                    >
                      {loading
                        ? "Zahlung wird verarbeitet..."
                        : `Jetzt ${total} € bezahlen`}
                      {!loading && (
                        <Lock className="ml-2 h-4 w-4" />
                      )}
                    </Button>

                    <p className="mt-4 text-center text-xs text-gray-400">
                      Deine Zahlungsdaten werden
                      verschlüsselt übertragen.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Summary */}
            <aside>
              <div className="sticky top-8 rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <img
                    src={stay.images[0]}
                    alt={stay.name}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {stay.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {stay.location}, {stay.country}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      {stay.rating}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="font-semibold">
                  Deine Reise
                </h3>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Check-in
                    </span>

                    <span className="font-medium">
                      {formatDate(trip.checkIn)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Check-out
                    </span>

                    <span className="font-medium">
                      {formatDate(trip.checkOut)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Reisende
                    </span>

                    <span className="font-medium">
                      {trip.guests}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Nächte
                    </span>

                    <span className="font-medium">
                      {nights}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>
                      {stay.pricePerNight} € × {nights}
                    </span>

                    <span>
                      {accommodationPrice} €
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Endreinigung</span>
                    <span>{cleaningFee} €</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Servicegebühr</span>
                    <span>{serviceFee} €</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between">
                  <span className="font-semibold">
                    Gesamt
                  </span>

                  <span className="text-xl font-semibold">
                    {total} €
                  </span>
                </div>

                <div className="mt-6 flex gap-3 rounded-2xl bg-gray-50 p-4">
                  <Check className="h-5 w-5 shrink-0 text-emerald-600" />

                  <p className="text-xs leading-5 text-gray-500">
                    Kostenlose Stornierung bis 7 Tage
                    vor Anreise.
                  </p>
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
              Deine Reise ist gebucht!
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-gray-500">
              Danke, {firstName}. Wir haben deine
              Buchung für {stay.name} erfolgreich
              bestätigt.
            </p>

            <div className="mt-10 rounded-3xl border bg-white p-6 text-left shadow-sm">
              <div className="flex gap-4">
                <img
                  src={stay.images[0]}
                  alt={stay.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="font-semibold">
                    {stay.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {stay.location}, {stay.country}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    {stay.rating}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Check-in
                  </p>

                  <p className="mt-1 font-medium">
                    {formatDate(trip.checkIn)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Check-out
                  </p>

                  <p className="mt-1 font-medium">
                    {formatDate(trip.checkOut)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Reisende
                  </p>

                  <p className="mt-1 font-medium">
                    {trip.guests}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Bezahlt
                </span>

                <span className="text-xl font-semibold">
                  {total} €
                </span>
              </div>
            </div>

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
  )
}