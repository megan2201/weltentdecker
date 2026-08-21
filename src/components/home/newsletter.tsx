import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
    return (
        <section className="px-6 pb-20 lg:px-8 lg:pb-28">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-cover bg-center px-6 py-20 text-center sm:px-12"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85')",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative mx-auto max-w-2xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Reiseinspiration direkt in dein Postfach
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Dein nächstes Abenteuer wartet.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/80">
              Erhalte besondere Reiseideen, neue Destinationen und exklusive
              Angebote.
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Deine E-Mail-Adresse"
                className="h-12 border-white/20 bg-white text-gray-900"
              />

              <Button className="h-12 bg-emerald-600 px-6 hover:bg-emerald-700">
                Anmelden
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/60">
              Kein Spam. Jederzeit abmeldbar.
            </p>
          </div>
        </div>
      </section>
    )
}