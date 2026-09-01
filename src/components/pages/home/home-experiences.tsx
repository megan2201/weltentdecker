import { experiences } from "@/assets/data/experiences"
import { ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function HomeExperiences() {
  const navigate = useNavigate()

    return (
        <section
        id="experiences"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Erlebnisse
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Deine Reise. Deine Geschichte.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Fülle deine Reise mit Momenten, die du noch Jahre später erzählen
            wirst.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {experiences.slice(0, 3).map((experience) => (
            <Link
              to={"/experiences/" + experience.id}
              key={experience.title}
              className="group relative min-h-[480px] overflow-hidden rounded-[2rem]"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <h3 className="text-2xl font-semibold">
                  {experience.title}
                </h3>

                <div className="mt-5 flex items-center text-sm font-medium">
                  Entdecken
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
}