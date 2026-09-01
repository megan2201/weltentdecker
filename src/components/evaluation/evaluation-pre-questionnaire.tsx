import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";

export default function EvaluationPreQuestionnaire() {
  const { submitAnswer, startPreSam } = useEvaluation();

  const [age, setAge] = useState<string | null>(null);
  const [travelBookingExperience, setTravelBookingExperience] = useState<
    string | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async () => {
    if (!age || !travelBookingExperience || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const [successAge, successExperience] = await Promise.all([
      submitAnswer("age", age),
      submitAnswer("travel-booking-experience", travelBookingExperience),
    ]);

    if (!successAge || !successExperience) {
        setIsSubmitting(false)
      return;
    }

    startPreSam();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-white px-6 py-12">
      <div className="my-auto w-full max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Kurz vor dem Start
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
            Erzähle uns kurz etwas über dich
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Die folgenden Angaben helfen uns dabei, die Ergebnisse der
            Evaluation besser einzuordnen.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {/* Alter */}
          <Question title="Wie alt bist du?">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Unter 18",
                "18–29",
                "30–44",
                "45-59",
                "60 oder älter",
              ].map((option) => (
                <OptionButton
                  key={option}
                  selected={age === option}
                  onClick={() => setAge(option)}
                >
                  {option}
                </OptionButton>
              ))}
            </div>
          </Question>

          {/* Erfahrung */}
          <Question title="Wie viel Erfahrung hast du mit Online-Reisebuchungen?">
            <div className="space-y-3">
              {[
                {
                  value: "Keine Erfahrung",
                  description:
                    "Ich habe bisher noch keine Reise online gebucht.",
                },
                {
                  value: "Wenig Erfahrung",
                  description:
                    "Ich habe bisher ein- bis zweimal online eine Reise gebucht.",
                },
                {
                  value: "Etwas Erfahrung",
                  description: "Ich habe bereits mehrmals Reisen online gebucht.",
                },
                {
                  value: "Viel Erfahrung",
                  description: "Ich buche fast alle meine Reisen online und kenne mich mit Online-Reisebuchungen gut aus.",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTravelBookingExperience(option.value)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    travelBookingExperience === option.value
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`font-semibold ${
                      travelBookingExperience === option.value
                        ? "text-emerald-700"
                        : "text-gray-900"
                    }`}
                  >
                    {option.value}
                  </div>

                  <div className="mt-1 text-sm text-gray-500">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </Question>
        </div>

        <Button
          disabled={
            age === null || travelBookingExperience === null || isSubmitting
          }
          onClick={handleSubmit}
          className="mt-10 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
        >
          {isSubmitting ? "Wird gespeichert..." : "Weiter zur Evaluation"}
        </Button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Die Angaben werden ausschließlich für die Auswertung der Evaluation
          verwendet.
        </p>
      </div>
    </div>
  );
}

function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <div className="mt-4">{children}</div>
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-14 rounded-xl border px-3 text-sm font-semibold transition ${
        selected
          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
          : "border-gray-200 text-gray-900 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}
