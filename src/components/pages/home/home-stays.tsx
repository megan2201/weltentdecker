import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Heart,
  MapPin,
  Star
} from "lucide-react"

const stays = [
  {
    name: "Casa Mare",
    location: "Amalfiküste, Italien",
    price: "ab 189 €",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Aegean Blue",
    location: "Santorini, Griechenland",
    price: "ab 245 €",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Jungle House",
    location: "Ubud, Bali",
    price: "ab 129 €",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85",
  },
]

export default function HomeStays() {
    return (
        <section
        id="stays"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28"
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Handverlesene Unterkünfte
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bleib dort, wo es besonders ist.
            </h2>
          </div>

          <Button variant="ghost" className="w-fit">
            Alle Unterkünfte
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {stays.map((stay) => (
            <article key={stay.name} className="group">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{stay.name}</h3>

                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {stay.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    {stay.rating}
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">
                    {stay.price}
                  </span>{" "}
                  / Nacht
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
}