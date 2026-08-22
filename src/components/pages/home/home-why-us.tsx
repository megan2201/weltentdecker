import {
  Globe2,
  ShieldCheck,
  Sparkles
} from "lucide-react"

export default function HomeWhyUs() {
    return (
        <section className="bg-gray-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Warum weltentdecken?
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Reisen buchen, ohne Kompromisse.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              Von der ersten Inspiration bis zur Rückkehr begleiten wir dich
              mit sorgfältig ausgewählten Angeboten und persönlichem Service.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Sorgfältig ausgewählt",
                text: "Wir zeigen dir nicht einfach alles. Wir suchen besondere Orte aus, die wirklich einen Besuch wert sind.",
              },
              {
                icon: ShieldCheck,
                title: "Sicher buchen",
                text: "Transparente Preise, sichere Zahlungen und flexible Stornierungsoptionen geben dir Planungssicherheit.",
              },
              {
                icon: Globe2,
                title: "Die ganze Welt",
                text: "Von Wochenendtrips in Europa bis zu einmaligen Fernreisen – entdecke die Welt mit weltentdecken.",
              },
            ].map((feature) => (
              <div key={feature.title}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <feature.icon className="h-6 w-6 text-emerald-400" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}