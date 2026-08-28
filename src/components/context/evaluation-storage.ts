const EVALUATION_FINISHED_KEY = "evaluation-finished";

export function markEvaluationFinished() {
  localStorage.setItem(EVALUATION_FINISHED_KEY, "true");
}

export function isEvaluationFinished() {
  return localStorage.getItem(EVALUATION_FINISHED_KEY) === "true";
}
