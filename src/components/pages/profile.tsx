import {
  CalendarDays,
  Check,
  ChevronRight,
  CircleX,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useUser } from "../context/user-context";

export default function Profile() {
  const { setIsLoggedIn } = useUser();
  const [isProfileActivated, setIsProfileActivated] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-gray-900">
      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto mt-20 flex max-w-7xl gap-8 px-6 py-8 lg:px-8">
        {/* =====================================================
            SIDEBAR
        ====================================================== */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-8 rounded-2xl border bg-white p-3 shadow-sm">
            <div className="mb-3 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Mein Konto
              </p>
            </div>

            <nav className="space-y-1">
              <div
                onClick={() => setIsProfileActivated(!isProfileActivated)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isProfileActivated ? "text-gray-600 transition hover:bg-gray-50 hover:text-gray-900" : "bg-emerald-50 text-emerald-700"}`}
              >
                <CalendarDays className="h-5 w-5" />
                Meine Buchungen
              </div>

              <div
                onClick={() => setIsProfileActivated(!isProfileActivated)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isProfileActivated ? "bg-emerald-50 text-emerald-700" : "text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <User className="h-5 w-5" />
                Mein Profil
              </div>
            </nav>

            <Separator className="my-4" />

            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            >
              <ChevronRight className="h-5 w-5" />
              Zur Startseite
            </Link>

            <button
              onClick={() => {
                setIsLoggedIn(false);
              }}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Abmelden
            </button>
          </div>
        </aside>

        {/* =====================================================
            MAIN
        ====================================================== */}
        <div className="min-w-0 flex-1">
          {/* Mobile navigation */}
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            <Button variant="secondary" className="shrink-0 rounded-xl">
              <CalendarDays className="mr-2 h-4 w-4" />
              Buchungen
            </Button>

            <Button variant="ghost" className="shrink-0 rounded-xl">
              <User className="mr-2 h-4 w-4" />
              Profil
            </Button>
          </div>

          {/* =====================================================
              BOOKINGS OR PROFILE
          ====================================================== */}
          {isProfileActivated ? <MeinProfil /> : <MeineBuchungen />}
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   BOOKING CARD
============================================================ */
function BookingCard({
  booking,
}: {
  booking: {
    uid: string;
    Id: string;
    name: string;
    location: string;
    country: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    price: number;
    image: string;
    isStay: boolean;
  };
}) {
  const navigate = useNavigate();

  return (
    <article className="overflow-hidden mb-5 rounded-2xl border bg-white shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative h-56 shrink-0 md:h-auto md:w-64">
          <img
            src={booking.image}
            alt={booking.location}
            className="h-66 w-full object-cover"
          />

          <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md bg-emerald-100/95 text-emerald-700">
            Bestätigt
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Buchung {booking.uid}
                </p>

                <h3 className="mt-1 text-2xl font-semibold">{booking.name}</h3>

                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {booking.location}, {booking.country}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-gray-400">Gesamtpreis</p>

                <p className="mt-1 text-lg font-semibold">{booking.price} €</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <CalendarDays className="h-4 w-4 text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    {booking.isStay ? "Reisezeitraum" : "Datum"}
                  </p>

                  <p className="text-sm font-medium">
                    {booking.isStay
                      ? booking.checkIn.toLocaleDateString() +
                        " - " +
                        booking.checkOut.toLocaleDateString()
                      : booking.checkIn.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <User className="h-4 w-4 text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    {booking.isStay ? "Reisende" : "Teilnehmer"}
                  </p>

                  <p className="text-sm font-medium">{booking.guests}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              Buchung erfolgreich bestätigt
            </p>

            <Button
              onClick={() => {
                booking.isStay
                  ? navigate("/stays/" + booking.Id)
                  : navigate("/experiences/" + booking.Id);
              }}
              variant="outline"
              className="rounded-xl"
            >
              {booking.isStay ? "Unterkunft" : "Erlebnis"} ansehen
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function MeineBuchungen() {
  const { user } = useUser();

  return (
    <section id="bookings">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
          Meine Reisen & Erlebnisse
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Meine Buchungen
        </h1>

        <p className="mt-2 text-gray-500">
          Verwalte deine Reisen und Erlebnisse.
        </p>
      </div>

      {/* Reisen */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Reisen</h2>
        {user.stayBookings.length > 0 ? (
          user.stayBookings.map((booking) => (
            <BookingCard
              key={booking.uid}
              booking={{
                uid: booking.uid,
                Id: booking.stay.id,
                name: booking.stay.name,
                location: booking.stay.location,
                country: booking.stay.country,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                guests: booking.guests,
                price: booking.totalPrice,
                image: booking.stay.images[0],
                isStay: true,
              }}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Noch keine Unterkünfte gebucht
          </p>
        )}
      </div>

      {/* Erlebnisse */}
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Erlebnisse</h2>

        <div className="space-y-4">
          {user.experienceBookings.length > 0 ? (
            user.experienceBookings.map((booking) => (
              <BookingCard
                key={booking.uid}
                booking={{
                  uid: booking.uid,
                  Id: booking.experience.id,
                  name: booking.experience.title,
                  location: booking.experience.location,
                  country: booking.experience.country,
                  checkIn: booking.date,
                  checkOut: booking.date,
                  guests: booking.guests,
                  price: booking.totalPrice,
                  image: booking.experience.image,
                  isStay: false,
                }}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Noch keine Erlebnisse gebucht
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function MeinProfil() {
  const { user, setFirstName, setLastName, setEmail, setPassword } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(user.firstName);
  const [lastNameInput, setLastNameInput] = useState(user.lastName);
  const [emailInput, setEmailInput] = useState(user.email);
  const [passwordInput, setPasswordInput] = useState(user.password);

  return (
    <div>
      {/* =====================================================
              PROFILE
          ====================================================== */}
      <section id="profile">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Persönliche Daten
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Mein Profil
          </h2>

          <p className="mt-2 text-gray-500">
            Verwalte deine persönlichen Informationen.
          </p>
        </div>

        <form className="rounded-2xl border bg-white shadow-sm">
          {/* Profile header */}
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700">
                {user.firstName.at(0)}
                {user.lastName.at(0)}
              </div>

              <div>
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Mitglied seit{" "}
                  {new Date().toLocaleString("de-DE", { month: "long" })}{" "}
                  {new Date().getFullYear()}
                </p>
              </div>
            </div>

            {editProfile ? (
              <Button
                onClick={() => {
                  setFirstNameInput(user.firstName);
                  setLastNameInput(user.lastName);
                  setEmailInput(user.email);
                  setPasswordInput(user.password);
                  setEditProfile(false);
                }}
                variant="outline"
                className="rounded-xl"
              >
                <CircleX className="mr-2 h-4 w-4" />
                Abbrechen
              </Button>
            ) : (
              <Button
                onClick={() => setEditProfile(true)}
                variant="outline"
                className="rounded-xl"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Bearbeiten
              </Button>
            )}
          </div>

          <Separator />

          {/* Personal information */}
          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Vorname</label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  disabled={!editProfile}
                  value={firstNameInput}
                  onChange={(e) => setFirstNameInput(e.target.value)}
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Nachname</label>

              <Input
                disabled={!editProfile}
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                E-Mail-Adresse
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  disabled={!editProfile}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  type="email"
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Passwort
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    disabled={!editProfile}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Dein Passwort"
                    autoComplete="new-password"
                    minLength={8}
                    className="h-12 rounded-xl border-gray-200 pl-12 pr-12 shadow-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword ? "Passwort verstecken" : "Passwort anzeigen"
                    }
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {editProfile && (
            <div>
              <Separator />

              <div className="flex justify-end p-6">
                <Button
                  onClick={() => {
                    setFirstName(firstNameInput);
                    setLastName(lastNameInput);
                    setEmail(emailInput);
                    setPassword(passwordInput);

                    setEditProfile(false);
                  }}
                  type="submit"
                  disabled={passwordInput.length == 0}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                >
                  Änderungen speichern
                </Button>
              </div>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

/*
 * ==========================================================
 * PASSWORD REQUIREMENT COMPONENT
 * ==========================================================
 */

function PasswordRequirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        valid ? "text-emerald-600" : "text-gray-400"
      }`}
    >
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          valid ? "bg-emerald-100" : "bg-gray-200"
        }`}
      >
        {valid ? (
          <Check className="h-2.5 w-2.5" />
        ) : (
          <div className="h-1 w-1 rounded-full bg-gray-400" />
        )}
      </div>

      <span>{text}</span>
    </div>
  );
}
