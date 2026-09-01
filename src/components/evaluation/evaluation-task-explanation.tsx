import { ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";
import { useEffect, useState } from "react";

export default function EvaluationTaskExplanation() {
  const { currentTask, currentTaskIndex, tasks, startTask } = useEvaluation();
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
    await startTask();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center bg-white px-6">
      <div className="my-auto w-full max-w-2xl">
        {/* Fortschritt */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Aufgabe {currentTaskIndex + 1} von {tasks.length}
          </p>

          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <Target className="h-8 w-8 text-emerald-600" />
          </div>

          {/* Titel */}
          <h1 className="mt-7 text-4xl font-semibold tracking-tight text-gray-950">
            {currentTask.title}
          </h1>

          {/* Aufgabe */}
          {currentTask.scenario && (
            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Szenario
              </p>

              <p className="mt-2 text-base leading-7 text-gray-700">
                {currentTask.scenario}
              </p>
            </div>
          )}

          <div className="mx-auto mt-4 max-w-xl rounded-2xl bg-gray-50 p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Deine Aufgabe
            </p>

            <p className="mt-3 text-lg leading-8 text-gray-700">
              {currentTask.description}
            </p>
          </div>

          {/* Start */}
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="mt-8 h-12 rounded-xl bg-emerald-600 px-8 text-base hover:bg-emerald-700"
          >
            {isSubmitting ? "Wird gestartet..." : "Aufgabe starten"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
