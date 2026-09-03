import { useEffect, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvaluation } from "../context/evaluation-provider";

export default function EvaluationAccess() {
  const { verifyEvaluationCode } = useEvaluation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    const success = await verifyEvaluationCode(code);
    setIsSubmitting(false);

    if (!success) {
      setError("Der eingegebene Code ist nicht gültig.");
      return;
    }

    setError("");
  };

  return (
    <div className="fixed inset-0 z-[300] flex min-h-screen justify-center bg-gray-50 px-6">
      <div className="my-auto w-full max-w-md">
        <div className="rounded-3xl border bg-white p-8 shadow-xl">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <LockKeyhole className="h-7 w-7 text-emerald-600" />
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-950">
              Evaluation starten
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Bitte geben Sie den Evaluationscode ein, den Sie erhalten haben.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="evaluation-code"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Evaluationscode
              </label>

              <Input
                id="evaluation-code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError("");
                }}
                placeholder="Evaluationscode eingeben"
                autoComplete="off"
                className="h-12 rounded-xl text-center text-lg tracking-widest"
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              disabled={!code.trim() || isSubmitting}
              className="h-12 w-full rounded-xl bg-emerald-600 text-base hover:bg-emerald-700"
            >
              {isSubmitting
                ? "Evaluationscode wird geprüft..."
                : "Evaluation starten"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
