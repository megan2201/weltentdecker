import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";

type EvaluationSamProps = {
  mode?: "pre" | "post";
};

export default function EvaluationSam({ mode = "post" }: EvaluationSamProps) {
  const {
    currentTask,
    currentTaskIndex,
    tasks,
    nextTask,
    submitAnswer,
    startEvaluation,
  } = useEvaluation();

  const [valence, setValence] = useState<number | null>(null);
  const [arousal, setArousal] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPreSam = mode === "pre";

  // Auslesen aller SVGs im Ordner
  const valenceImgsRecord = import.meta.glob<string>("../../assets/img/valence/*.svg", {
    eager: true,
    import: "default",
  });
  const arousalImgsRecord = import.meta.glob<string>("../../assets/img/arousal/*.svg", {
    eager: true,
    import: "default",
  });

  const valenceImgs: string[] = Object.values(valenceImgsRecord);
  const arousalImgs: string[] = Object.values(arousalImgsRecord);

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async () => {
    if (valence === null || arousal === null || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const [successValence, successArousal] = await Promise.all([
      submitAnswer(
        isPreSam ? "pre-valence" : "valence",
        valence.toString(),
        currentTask.id,
      ),
      submitAnswer(
        isPreSam ? "pre-arousal" : "arousal",
        arousal.toString(),
        currentTask.id,
      ),
    ]);

    if (!successValence || !successArousal) {
      setIsSubmitting(false);
      return;
    }

    if (isPreSam) {
      startEvaluation();
    } else {
      nextTask();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-white px-6 py-12">
      <div className="my-auto w-full max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            {isPreSam
              ? "Vor Beginn der Aufgaben"
              : `Aufgabe ${currentTaskIndex + 1} von ${tasks.length}`}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Wie fühlen Sie sich gerade?
          </h2>

          <p className="mt-3 text-gray-500">
            Wählen Sie bitte bei jeder Frage das Bild aus, das Ihren aktuellen
            Gefühlszustand am besten beschreibt.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {/* Valenz */}
          <Question title="Wie angenehm oder unangenehm fühlen Sie sich gerade?">
            <SamRating
              value={valence}
              onChange={setValence}
              images={valenceImgs}
              leftLabel="Sehr unangenehm"
              rightLabel="Sehr angenehm"
              altPrefix="Valenz"
            />
          </Question>

          {/* Arousal */}
          <Question title="Wie ruhig oder aufgeregt fühlen Sie sich gerade?">
            <SamRating
              value={arousal}
              onChange={setArousal}
              images={arousalImgs}
              leftLabel="Sehr ruhig"
              rightLabel="Sehr aufgeregt"
              altPrefix="Arousal"
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

function SamRating({
  value,
  onChange,
  images,
  leftLabel,
  rightLabel,
  altPrefix,
}: {
  value: number | null;
  onChange: (value: number) => void;
  images: string[];
  leftLabel: string;
  rightLabel: string;
  altPrefix: string;
}) {
  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        {images.map((image, index) => {
          const valueForImage = index + 1;
          const isSelected = value === valueForImage;

          return (
            <button
              key={image}
              type="button"
              onClick={() => onChange(valueForImage)}
              aria-label={`${altPrefix} ${valueForImage} von 5`}
              className={`flex aspect-square items-center justify-center rounded-xl border p-2 transition ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <img
                src={image}
                alt={`${altPrefix} ${valueForImage} von 5`}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </>
  );
}
