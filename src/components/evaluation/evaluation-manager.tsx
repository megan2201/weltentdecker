import { useEvaluation } from "../context/evaluation-provider";
import EvaluationAccess from "./evaluation-access";
import EvaluationCountdown from "./evaluation-countdown";
import EvaluationDebriefing from "./evaluation-debriefing";
import EvaluationFinished from "./evaluation-finished";
import EvaluationIntro from "./evaluation-intro";
import EvaluationPreQuestionnaire from "./evaluation-pre-questionnaire";
import EvaluationSam from "./evaluation-sam";
import EvaluationTaskExplanation from "./evaluation-task-explanation";
import TaskInstructionOverlay from "./task-instruction-overlay";

export default function EvaluationManager() {
  const { phase } = useEvaluation();

  return (
    <>
      {phase === "access" && <EvaluationAccess />}
      
      {phase === "intro" && <EvaluationIntro />}

      {phase === "pre-questionnaire" && <EvaluationPreQuestionnaire />}

      {phase === "pre-sam" && <EvaluationSam mode="pre" />}

      {phase === "task-explanation" && <EvaluationTaskExplanation />}

      {phase === "task" && <TaskInstructionOverlay />}

      {phase === "countdown" && <EvaluationCountdown />}

      {phase === "sam" && <EvaluationSam />}

      {phase === "debriefing" && <EvaluationDebriefing />}

      {phase === "finished" && <EvaluationFinished />}
    </>
  );
}
