import { useEvaluation } from "../context/evaluation-provider";
import EvaluationAccess from "./evaluation-access";
import EvaluationCountdown from "./evaluation-countdown";
import EvaluationFinished from "./evaluation-finished";
import EvaluationIntro from "./evaluation-intro";
import EvaluationQuestionnaire from "./evaluation-questionnaire";
import EvaluationTaskExplanation from "./evaluation-task-explanation";
import TaskInstructionOverlay from "./task-instruction-overlay";

export default function EvaluationManager() {
  const { phase } = useEvaluation();

  return (
    <>
      {phase === "access" && <EvaluationAccess />}
      
      {phase === "intro" && <EvaluationIntro />}

      {phase === "task-explanation" && <EvaluationTaskExplanation />}

      {phase === "task" && <TaskInstructionOverlay />}

      {phase === "countdown" && <EvaluationCountdown />}

      {phase === "questionnaire" && <EvaluationQuestionnaire />}

      {phase === "finished" && <EvaluationFinished />}
    </>
  );
}
