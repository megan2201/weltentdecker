import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";

export default function EvaluationQuestionnaire() {
  const { currentTask, currentTaskIndex, tasks, nextTask, submitAnswer } =
    useEvaluation();
  const [valence, setValence] = useState<number | null>(null);
  const [arousal, setArousal] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!valence || !arousal) {
      return;
    }

    setIsSubmitting(true);
    const [successValence, successArousal] = await Promise.all([
      submitAnswer("valence", valence.toString(), currentTask.id),
      submitAnswer("arousal", arousal.toString(), currentTask.id),
    ]);

    if (!successValence || !successArousal) {
      setIsSubmitting(false);
      return;
    }

    await nextTask();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-white px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Aufgabe {currentTaskIndex + 1} von {tasks.length}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Wie war die Aufgabe?
          </h2>

          <p className="mt-3 text-gray-500">
            Beantworte bitte kurz die folgenden Fragen.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {/* Schwierigkeit */}
          <Question title="Valence?">
            <Rating
              value={valence}
              onChange={setValence}
              leftLabel="Sehr schwierig"
              rightLabel="Sehr einfach"
            />
          </Question>

          {/* Zufriedenheit */}
          <Question title="Arousal?">
            <Rating
              value={arousal}
              onChange={setArousal}
              leftLabel="Sehr unzufrieden"
              rightLabel="Sehr zufrieden"
            />
          </Question>

          {/* Kommentar */}
          <Question title="Möchtest du noch etwas zur Aufgabe sagen?">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Optionaler Kommentar..."
              className="min-h-32 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </Question>
        </div>

        <Button
          disabled={valence === null || arousal === null || isSubmitting}
          onClick={handleSubmit}
          className="mt-10 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
        >
          {isSubmitting ? "Wird gespeichert..." : "Bewertung abgeben"}
        </Button>
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

function Rating({
  value,
  onChange,
  leftLabel,
  rightLabel,
}: {
  value: number | null;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            onClick={() => onChange(number)}
            className={`h-14 rounded-xl border text-sm font-semibold transition ${
              value === number
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </>
  );
}
