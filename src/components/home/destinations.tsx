import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    name: "Amalfi",
    country: "Italien",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Santorini",
    country: "Griechenland",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Bali",
    country: "Indonesien",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Lissabon",
    country: "Portugal",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85",
  },
]

export default function Destinations() {
    return (
        <section
        id="destinations"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28"
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Beliebte Ziele
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Wohin geht deine nächste Reise?
            </h2>
          </div>

          <Button variant="ghost" className="w-fit">
            Alle Reiseziele
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <a
              href="#"
              key={destination.name}
              className="group relative h-72 overflow-hidden rounded-3xl"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold">{destination.name}</h3>
                <p className="mt-1 text-sm text-white/75">
                  {destination.country}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    )
}