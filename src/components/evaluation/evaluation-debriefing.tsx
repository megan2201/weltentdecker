import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";

export default function EvaluationDebriefing() {
  const { finishEvaluation } = useEvaluation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await finishEvaluation();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-white px-6 py-12">
      <div className="my-auto w-full max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Debriefing
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Vielen Dank für deine Teilnahme!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Bevor du die Evaluation abschließt, möchten wir dir noch kurz
            erklären, worum es bei dieser Untersuchung tatsächlich ging.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {/* Ziel der Untersuchung */}
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Was wurde untersucht?
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Bei dieser Untersuchung ging es{" "}
              <strong>
                nicht darum, die Benutzerfreundlichkeit (UX) der Website zu
                bewerten
              </strong>
              . Stattdessen wurde untersucht, wie sich bestimmte
              Gestaltungselemente und mögliche Dark Patterns auf deinen
              emotionalen Zustand auswirken können.
            </p>

            <p className="mt-3 leading-7 text-gray-600">
              Deshalb haben wir dich während der Aufgaben wiederholt gebeten,
              deinen aktuellen emotionalen Zustand einzuschätzen.
            </p>
          </section>

          {/* Was sind Dark Patterns? */}
          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Was sind Dark Patterns?
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Als <strong>Dark Patterns</strong> werden Gestaltungsmuster in
              digitalen Produkten bezeichnet, die Nutzerinnen und Nutzer gezielt
              zu bestimmten Entscheidungen lenken oder beeinflussen können.
            </p>

            <p className="mt-3 leading-7 text-gray-600">
              Dabei kann beispielsweise der Eindruck entstehen, dass eine
              bestimmte Entscheidung besonders dringend, vorteilhaft oder
              alternativlos ist, obwohl andere Möglichkeiten bestehen.
            </p>
          </section>

          {/* Beispiele */}
          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Mögliche Beispiele
            </h2>

            <div className="mt-4 space-y-3">
              <DarkPatternExample
                title="Künstliche Verknappung"
                description="Ein Hinweis vermittelt beispielsweise, dass nur noch wenige Plätze oder Angebote verfügbar sind."
              />

              <DarkPatternExample
                title="Zeitdruck"
                description="Ein Countdown oder eine zeitlich begrenzte Meldung kann den Eindruck erzeugen, dass schnell gehandelt werden muss."
              />

              <DarkPatternExample
                title="Social Proof"
                description="Hinweise darauf, was andere Personen gerade buchen oder ansehen, können die eigene Entscheidung beeinflussen."
              />

              <DarkPatternExample
                title="Irreführende Hervorhebung"
                description="Bestimmte Optionen werden visuell besonders stark hervorgehoben, während alternative Möglichkeiten weniger auffällig dargestellt werden."
              />
            </div>
          </section>

          {/* Wichtig für die Interpretation */}
          <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Wichtig für deine Teilnahme
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Deine Antworten zu Valence und Arousal wurden erhoben, um mögliche
              Veränderungen deines emotionalen Zustands während der Interaktion
              untersuchen zu können.
            </p>

            <p className="mt-3 leading-7 text-gray-600">
              Es gab dabei{" "}
              <strong>keine richtigen oder falschen Antworten</strong>.
              Entscheidend war deine persönliche Wahrnehmung und dein
              persönliches Empfinden während der Aufgaben.
            </p>
          </section>

          {/* Abschluss */}
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Wenn du noch Fragen zur Untersuchung hast, kannst du dich nach
              Abschluss der Evaluation an die verantwortliche Person der Studie
              wenden.
            </p>

            <Button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="mt-6 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 sm:w-auto sm:min-w-64"
            >
              {isSubmitting
                ? "Wird abgeschlossen..."
                : "Evaluation abschließen"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkPatternExample({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <h3 className="font-medium text-gray-900">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
}
