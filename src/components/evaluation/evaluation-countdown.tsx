import { CheckCircle2 } from "lucide-react";
import { useEvaluation } from "../context/evaluation-provider";

export default function EvaluationCountdown() {
  const { countdown } = useEvaluation();

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[300px] rounded-2xl border bg-white p-5 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <p className="font-semibold text-gray-900">
            Aufgabe abgeschlossen
          </p>

          <p className="text-xs text-gray-500">
            Der Fragebogen wird gleich angezeigt.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <span
          key={countdown}
          className="text-6xl font-bold tabular-nums text-emerald-600"
        >
          {countdown}
        </span>
      </div>
    </div>
  );
}