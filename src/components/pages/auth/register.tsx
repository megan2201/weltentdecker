import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/components/context/user-context";
import heroImg from "/img/weltentdecker_register.webp";

export default function Register() {
  const navigate = useNavigate();

  const {
    user,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setIsLoggedIn,
  } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * ==========================================================
   * SUBMIT
   * ==========================================================
   */

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password.length == 0) {
      return;
    }
    if (!acceptTerms) {
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoggedIn(true);
    setLoading(false);
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT — IMAGE
        ====================================================== */}

        <section className="relative hidden overflow-hidden lg:block">
          <img
            src={heroImg}
            alt="Strand und Meer"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}

            <Link
              to="/"
              className="w-fit text-2xl font-bold tracking-tight text-white"
            >
              welt<span className="text-emerald-300">entdecker</span>
            </Link>

            {/* Bottom content */}

            <div className="max-w-xl text-white">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <span className="text-xl">✦</span>
              </div>

              <h2 className="text-4xl font-semibold leading-tight xl:text-5xl">
                Deine nächste
                <br />
                Geschichte beginnt
                <br />
                <span className="text-emerald-300">hier.</span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                Erstelle dein kostenloses Konto und entdecke besondere Orte,
                Unterkünfte und Erlebnisse rund um die Welt.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" />
                  Kostenlos starten
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" />
                  Reisen speichern
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" />
                  Einfach buchen
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — REGISTER
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}

            <Link
              to="/"
              className="mb-8 block text-2xl font-bold tracking-tight lg:hidden"
            >
              welt<span className="text-emerald-600">entdecker</span>
            </Link>

            {/* Back */}

            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Startseite
            </Link>

            {/* Heading */}

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Kostenlos registrieren
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950">
                Starte deine Reise.
              </h1>

              <p className="mt-3 text-gray-500">
                Erstelle dein Konto und entdecke die Welt mit weltentdecker.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {/* Name */}

              <div className="flex gap-5">
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Vorname
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      value={user.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="firstName"
                      type="text"
                      placeholder="Vorname"
                      autoComplete="given-name"
                      className="h-12 rounded-xl border-gray-200 pl-12 shadow-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Nachname
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      value={user.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      id="lastName"
                      type="text"
                      placeholder="Nachname"
                      autoComplete="family-name"
                      className="h-12 rounded-xl border-gray-200 pl-12 shadow-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  E-Mail-Adresse
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="h-12 rounded-xl border-gray-200 pl-12 shadow-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                    required
                  />
                </div>
              </div>

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
                    value={user.password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* =================================================
                  TERMS
              ================================================== */}

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked === true)
                  }
                  className="mt-0.5"
                />

                <label
                  htmlFor="terms"
                  className="cursor-pointer text-sm leading-5 text-gray-500"
                >
                  Ich akzeptiere die{" "}
                  <a href="#" className="font-medium text-gray-800 underline">
                    Nutzungsbedingungen
                  </a>{" "}
                  und die{" "}
                  <a href="#" className="font-medium text-gray-800 underline">
                    Datenschutzerklärung
                  </a>
                  .
                </label>
              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}
              <Button
                type="submit"
                disabled={
                  loading ||
                  !acceptTerms ||
                  user.password.length == 0 ||
                  user.firstName.length == 0 ||
                  user.lastName.length == 0 ||
                  user.email.length == 0
                }
                className="mt-2 h-12 w-full rounded-xl bg-emerald-600 text-base font-medium shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Konto wird erstellt..." : "Konto erstellen"}
              </Button>
            </form>

            {/* Login */}

            <p className="mt-7 text-center text-sm text-gray-500">
              Du hast bereits ein Konto?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}