import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function EvaluationFinished() {
  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center bg-white px-6">
      <div className="my-auto max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>

        <h1 className="mt-7 text-4xl font-semibold tracking-tight">
          Vielen Dank!
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Du hast alle Aufgaben der Evaluation erfolgreich abgeschlossen. Vielen
          Dank für deine Zeit und dein Feedback.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          Du kannst dieses Fenster nun schließen.
        </p>
      </div>
    </div>
  );
}
