import { ArrowRight, Target, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function EvaluationTaskExplanation() {
  const navigate = useNavigate();
  const { currentTask, currentTaskIndex, tasks, startTask } = useEvaluation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ab Aufgabe 3 soll Musik gehört werden
  const shouldListenToMusic = currentTaskIndex >= 2;

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async () => {
    navigate("/");
    setIsSubmitting(true);
    await startTask();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center bg-white px-6 overflow-y-auto">
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
            {currentTask?.title}
          </h1>

          {/* Szenario */}
          {currentTask?.scenario && (
            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Szenario
              </p>

              <p className="mt-2 text-base leading-7 text-gray-700">
                <ReactMarkdown>{currentTask.scenario}</ReactMarkdown>
              </p>
            </div>
          )}

          {/* Aufgabe */}
          <div className="mx-auto mt-4 max-w-xl rounded-2xl bg-gray-50 p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Ihre Aufgabe
            </p>

            <p className="mt-3 text-lg leading-8 text-gray-700">
              <ReactMarkdown>{currentTask?.description}</ReactMarkdown>
            </p>
          </div>

          {/* Musikhinweis ab Aufgabe 3 */}
          {shouldListenToMusic && (
            <div className="mx-auto mt-4 flex max-w-xl items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50 p-5 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                <Music2 className="h-5 w-5 text-violet-600" />
              </div>

              <div>
                <p className="text-m font-semibold text-violet-900">
                  Bitte hören Sie während der Aufgabe Musik
                </p>

                <p className="mt-1 text-m leading-6 text-violet-800">
                  Wählen Sie Ihre Lieblingsmusik oder Musik, die Sie gerne
                  hören, und lassen Sie sie während der Bearbeitung dieser
                  Aufgabe laufen.
                </p>
              </div>
            </div>
          )}

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
