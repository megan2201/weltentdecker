import { CheckCircle2, Clock3, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEvaluation } from "../context/evaluation-provider"

export default function EvaluationIntro() {
  const { startEvaluation, tasks } = useEvaluation()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-white px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Usability Evaluation
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Willkommen bei der Evaluation
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            In dieser Evaluation testest du eine Reiseplattform. Deine
            Aufgabe ist es, verschiedene Aufgaben auf der Webseite zu
            bearbeiten.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<MousePointer2 className="h-5 w-5" />}
            title="Aufgaben"
            description={`${tasks.length} Aufgaben warten auf dich.`}
          />

          <InfoCard
            icon={<Clock3 className="h-5 w-5" />}
            title="Unterbrechungen"
            description="Nach jeder Aufgabe folgt eine kurze Pause."
          />

          <InfoCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Fragebogen"
            description="Nach jeder Aufgabe beantwortest du einige Fragen."
          />
        </div>

        <div className="mt-8 rounded-2xl bg-gray-50 p-6">
          <h2 className="font-semibold text-gray-900">
            So funktioniert es
          </h2>

          <ol className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              <span className="font-medium text-gray-900">1.</span>{" "}
              Bearbeite die angezeigte Aufgabe.
            </li>

            <li>
              <span className="font-medium text-gray-900">2.</span>{" "}
              Sobald du die Aufgabe erfolgreich abgeschlossen hast, wird die
              Webseite kurz unterbrochen.
            </li>

            <li>
              <span className="font-medium text-gray-900">3.</span>{" "}
              Nach einem kurzen Countdown erscheint ein Fragebogen.
            </li>

            <li>
              <span className="font-medium text-gray-900">4.</span>{" "}
              Danach kannst du mit der nächsten Aufgabe fortfahren.
              Zusätzlich erklären:
              - manche werte sind schon vorausgefüllt
              - keine privaten daten zb passwörter eingeben
              - auf und einklappen und verschieben der aufgaben
              - manche sachen sind nicht anklickbar
              - eval code ändern und ins backend
              - local storage am ende der eval leeren
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={startEvaluation}
            className="h-12 rounded-xl bg-emerald-600 px-8 text-base hover:bg-emerald-700"
          >
            Evaluation starten
          </Button>

          <p className="mt-3 text-xs text-gray-400">
            Die Evaluation beginnt, sobald du auf den Button klickst.
          </p>
        </div>
      </div>
    </div>
  )
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  )
}