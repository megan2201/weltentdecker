import { useEffect, useState } from "react";
import { useEvaluation } from "../context/evaluation-provider";
import EvaluationAccess from "./evaluation-access";
import EvaluationCountdown from "./evaluation-countdown";
import EvaluationDebriefing from "./evaluation-debriefing";
import EvaluationFinished from "./evaluation-finished";
import EvaluationIntro from "./evaluation-intro";
import EvaluationPreQuestionnaire from "./evaluation-pre-questionnaire";
import EvaluationSam from "./evaluation-sam";
import EvaluationTaskExplanation from "./evaluation-task-explanation";
import NaggingOverlay from "./nagging-overlay";
import TaskInstructionOverlay from "./task-instruction-overlay";

export default function EvaluationManager() {
  const { phase, naggingActivated, changeNagging, currentTask, completeTask } =
    useEvaluation();
  const [showNagging, setShowNagging] = useState(false);
  const nagging = currentTask.darkPattern === "nagging";

  useEffect(() => {
    if (!nagging || phase !== "task" || !naggingActivated) {
      setShowNagging(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowNagging(true);
    }, 1000);

    // Cleanup: Löscht den Timer, falls der Nutzer vor Ablauf der 5s navigiert
    return () => clearTimeout(timer);
  }, [naggingActivated]);

  return (
    <>
      {phase === "access" && <EvaluationAccess />}

      {phase === "intro" && <EvaluationIntro />}

      {phase === "pre-questionnaire" && <EvaluationPreQuestionnaire />}

      {phase === "pre-sam" && <EvaluationSam mode="pre" />}

      {phase === "task-explanation" && <EvaluationTaskExplanation />}

      {phase === "task" && (
        <>
          <TaskInstructionOverlay />
          {nagging && showNagging && (
            <NaggingOverlay
              onLater={() => {
                setShowNagging(false);
                changeNagging(false);

                if (sessionStorage.getItem("last-nagging") === "true") {
                  completeTask()
                }
              }}
            />
          )}
        </>
      )}

      {phase === "countdown" && <EvaluationCountdown />}

      {phase === "sam" && <EvaluationSam />}

      {phase === "debriefing" && <EvaluationDebriefing />}

      {phase === "finished" && <EvaluationFinished />}
    </>
  );
}
