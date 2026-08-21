import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Sparkles
} from "lucide-react"

export default function Inspiration() {
    return (
        <section className="bg-[#f5f7f5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                Reiseinspiration
              </div>

              <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Nicht nur reisen.
                <br />
                <span className="text-emerald-600">
                  Etwas erleben.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
                Wir helfen dir dabei, Reisen zu finden, die mehr sind als nur
                ein Ort auf der Landkarte. Entdecke besondere Unterkünfte,
                lokale Erlebnisse und Momente, die bleiben.
              </p>

              <Button className="mt-8 rounded-xl bg-gray-900 px-6 hover:bg-gray-800">
                Inspiration entdecken
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=90"
                  alt="Reise durch eine Berglandschaft"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 shadow-xl sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      2.400+ besondere Orte
                    </p>
                    <p className="text-xs text-gray-500">
                      persönlich ausgewählt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}