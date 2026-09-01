import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "/img/weltentdecker-hero.webp"
import { useUser } from "@/components/context/user-context";

export default function Login() {
  const {user, setEmail, setPassword, setIsLoggedIn} = useUser()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password.length == 0) {
      return;
    }
    if (user.email.length == 0) {
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
            alt="Traumhafte Reiselandschaft"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              to="/"
              className="w-fit text-2xl font-bold tracking-tight text-white"
            >
              welt<span className="text-emerald-300">entdecker</span>
            </Link>

            {/* Quote */}
            <div className="max-w-xl text-white">
              <div className="mb-5 h-1 w-10 rounded-full bg-emerald-300" />

              <blockquote className="text-3xl font-medium leading-tight xl:text-4xl">
                „Die Welt ist zu groß, um immer am gleichen Ort zu bleiben.“
              </blockquote>

              <p className="mt-5 text-sm text-white/70">
                Entdecke neue Orte. Sammle neue Erinnerungen.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — LOGIN
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <Link
              to="/"
              className="mb-12 block text-2xl font-bold tracking-tight lg:hidden"
            >
              wander<span className="text-emerald-600">ly</span>
            </Link>

            {/* Back */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Startseite
            </Link>

            {/* Heading */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Willkommen zurück
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950">
                Schön, dich zu sehen.
              </h1>

              <p className="mt-3 text-gray-500">
                Melde dich an, um deine Reisen und Buchungen zu verwalten.
              </p>
            </div>

            {/* Login form */}
            <form
              className="mt-10 space-y-5"
              onSubmit={handleSubmit}
            >
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
                    className="h-12 rounded-xl border-gray-200 pl-12 shadow-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-800"
                  >
                    Passwort
                  </label>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    value={user.password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Dein Passwort"
                    className="h-12 rounded-xl border-gray-200 pl-12 pr-12 shadow-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword ? "Passwort anzeigen" : "Passwort verstecken"
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

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || user.email.length == 0 || user.password.length == 0}
                className="h-12 w-full mt-5 rounded-xl bg-emerald-600 text-base font-medium shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
              >
                {loading ? "Wird angemeldet..." : "Anmelden"}
              </Button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Noch kein Konto?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Jetzt registrieren
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-12 text-center text-xs leading-5 text-gray-400">
              Mit der Anmeldung akzeptierst du unsere{" "}
              <a href="#" className="underline hover:text-gray-600">
                Nutzungsbedingungen
              </a>{" "}
              und{" "}
              <a href="#" className="underline hover:text-gray-600">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
