import {
  evaluationTasks,
  type EvaluationTask,
} from "@/assets/data/evaluation-tasks";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const EVALUATION_CODE = "EVAL-2026";
const STORAGE_KEY = "evaluation-state";

export type EvaluationPhase =
  | "access"
  | "intro"
  | "task-explanation"
  | "task"
  | "countdown"
  | "questionnaire"
  | "finished";

type SavedEvaluationState = {
  phase: EvaluationPhase;
  currentTaskIndex: number;
  countdown: number;
  sessionId: string | null;
  taskStartedAt: number | null;
};

function getInitialEvaluationState(): SavedEvaluationState {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    phase: "access",
    currentTaskIndex: 0,
    countdown: 3,
    sessionId: null,
    taskStartedAt: null,
  };
}

type EvaluationContextType = {
  phase: EvaluationPhase;
  tasks: EvaluationTask[];
  currentTaskIndex: number;
  currentTask: EvaluationTask;
  countdown: number;
  sessionId: string | null;

  verifyEvaluationCode: (code: string) => boolean;
  startIntro: () => void;
  startEvaluation: () => void;
  startTask: () => void;
  completeTask: () => void;
  nextTask: () => void;
};

const EvaluationContext = createContext<EvaluationContextType | null>(null);

export function EvaluationProvider({ children }: { children: ReactNode }) {
  const initialState = getInitialEvaluationState();

  const [phase, setPhase] = useState<EvaluationPhase>(initialState.phase);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(initialState.currentTaskIndex);
  const [countdown, setCountdown] = useState(initialState.countdown);
  const [sessionId, setSessionId] = useState<string | null>(initialState.sessionId);
  const [taskStartedAt, setTaskStartedAt] = useState<number | null>(initialState.taskStartedAt);

  const currentTask = evaluationTasks[currentTaskIndex];

  /*
   * Evaluationscode überprüfen
   */
  const verifyEvaluationCode = (inputCode: string) => {
    const isValid = inputCode.trim().toUpperCase() === EVALUATION_CODE;

    if (!isValid) {
      return false;
    }

    /*
     * Neue anonyme Session erzeugen
     */
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    return true;
  };

  /*
   * Intro starten
   */
  const startIntro = () => {
    setPhase("intro");
  };

  /*
   * Evaluation starten
   */
  const startEvaluation = () => {
    setCurrentTaskIndex(0);
    setPhase("task-explanation");
  };

  /*
   * Aufgabe starten
   */
  const startTask = () => {
    setTaskStartedAt(Date.now());
    setPhase("task");
  };

  /*
   * Aufgabe erfolgreich abgeschlossen
   */
  const completeTask = () => {
    let duration: number | null = null;
    if (taskStartedAt !== null) {
      duration = Math.round((Date.now() - taskStartedAt) / 1000);
    }

    console.log("Evaluation Task abgeschlossen:", {
      sessionId,
      taskId: currentTask.id,
      duration,
    });

    setCountdown(3);
    setPhase("countdown");
  };

  /*
   * Countdown
   */
  useEffect(() => {
    if (phase !== "countdown") {
      return;
    }

    const interval = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(interval);

          setPhase("questionnaire");

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [phase]);

  /*
   * Vorhandene Session speichern
   */
  useEffect(() => {
    const state: SavedEvaluationState = {
      phase,
      currentTaskIndex,
      countdown,
      sessionId,
      taskStartedAt,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [phase, currentTaskIndex, countdown, sessionId, taskStartedAt]);

  /*
   * Nach dem Fragebogen:
   * nächste Aufgabe oder Evaluation beendet
   */
  const nextTask = () => {
    const isLastTask = currentTaskIndex >= evaluationTasks.length - 1;

    if (isLastTask) {
      setPhase("finished");
      return;
    }

    setCurrentTaskIndex((current) => current + 1);
    setPhase("task-explanation");
  };

  return (
    <EvaluationContext.Provider
      value={{
        phase,
        tasks: evaluationTasks,
        currentTaskIndex,
        currentTask,
        countdown,
        sessionId,
        verifyEvaluationCode,
        startIntro,
        startEvaluation,
        startTask,
        completeTask,
        nextTask,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
}

export function useEvaluation() {
  const context = useContext(EvaluationContext);

  if (!context) {
    throw new Error("useEvaluation must be used inside EvaluationProvider");
  }

  return context;
}
