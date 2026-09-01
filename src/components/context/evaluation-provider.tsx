import {
  evaluationTasks,
  type EvaluationTask,
} from "@/assets/data/evaluation-tasks";
import { createClient } from "@/lib/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  isEvaluationFinished,
  markEvaluationFinished,
} from "./evaluation-storage";

const STORAGE_KEY = "evaluation-state";

export type EvaluationPhase =
  | "access"
  | "intro"
  | "pre-questionnaire"
  | "pre-sam"
  | "task-explanation"
  | "task"
  | "countdown"
  | "sam"
  | "debriefing"
  | "finished";

type SavedEvaluationState = {
  phase: EvaluationPhase;
  currentTaskIndex: number;
  countdown: number;
  sessionId: string | null;
  sessionToken: string | null;
};

function getInitialEvaluationState(): SavedEvaluationState {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      return {
        phase: parsed.phase ?? "access",
        currentTaskIndex: parsed.currentTaskIndex ?? 0,
        countdown: parsed.countdown ?? 3,
        sessionId: parsed.sessionId ?? null,
        sessionToken: parsed.sessionToken ?? null,
      };
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    phase: "access",
    currentTaskIndex: 0,
    countdown: 3,
    sessionId: null,
    sessionToken: null,
  };
}

type EvaluationContextType = {
  phase: EvaluationPhase;
  tasks: EvaluationTask[];
  currentTaskIndex: number;
  currentTask: EvaluationTask;
  naggingActivated: boolean;
  countdown: number;
  sessionId: string | null;
  sessionToken: string | null;
  changeNagging: (activate: boolean) => void;
  verifyEvaluationCode: (code: string) => Promise<boolean>;
  startPreQuestionnaire: () => void;
  startPreSam: () => void;
  startEvaluation: () => void;
  startTask: () => Promise<void>;
  completeTask: () => Promise<void>;
  nextTask: () => void;
  submitAnswer: (
    questionId: string,
    answer: string,
    taskId?: string,
  ) => Promise<boolean>;
  finishEvaluation: () => Promise<boolean>;
};

const EvaluationContext = createContext<EvaluationContextType | null>(null);

export function EvaluationProvider({ children }: { children: ReactNode }) {
  const initialState = getInitialEvaluationState();

  const [phase, setPhase] = useState<EvaluationPhase>(initialState.phase);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(
    initialState.currentTaskIndex,
  );
  const [countdown, setCountdown] = useState(initialState.countdown);
  const [sessionId, setSessionId] = useState<string | null>(
    initialState.sessionId,
  );
  const [sessionToken, setSessionToken] = useState<string | null>(
    initialState.sessionToken,
  );
  const [naggingActivated, setNaggingActivated] = useState(false);

  const currentTask = evaluationTasks[currentTaskIndex];
  const supabase = createClient();

  const changeNagging = (activate: boolean) => {
    setNaggingActivated(activate)
  };

  /*
   * Evaluation-Code überprüfen
   */
  const verifyEvaluationCode = async (inputCode: string): Promise<boolean> => {
    if (isEvaluationFinished()) {
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "start-evaluation",
        {
          body: {
            code: inputCode,
          },
        },
      );

      if (error) {
        console.error("start-evaluation error:", error);
        return false;
      }

      if (!data?.sessionId || !data?.sessionToken) {
        console.error("Ungültige Antwort:", data);
        return false;
      }

      setSessionId(data.sessionId);
      setSessionToken(data.sessionToken);
      setCurrentTaskIndex(0);
      setCountdown(3);
      setPhase("intro");

      return true;
    } catch (error) {
      console.error("Evaluation konnte nicht gestartet werden:", error);

      return false;
    }
  };

  /*
   * Pre Questionnaire starten
   */
  const startPreQuestionnaire = () => {
    setPhase("pre-questionnaire");
  };

  /*
   * Pre Questionnaire starten
   */
  const startPreSam = () => {
    setPhase("pre-sam");
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
  const startTask = async () => {
    if (!sessionId || !sessionToken) {
      console.error("Keine gültige Evaluation-Session vorhanden.");

      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("start-task", {
        body: {
          sessionId,
          sessionToken,
          taskId: currentTask.id,
        },
      });

      if (error) {
        console.error("start-task error:", error);
        return;
      }

      if (!data?.success) {
        console.error("Task konnte nicht gestartet werden:", data);
        return;
      }

      /*
       * Erst wenn der Server bestätigt hat,
       * dass die Aufgabe gestartet wurde,
       * wechseln wir in die Task-Phase.
       */
      setPhase("task");
    } catch (error) {
      console.error("Task konnte nicht gestartet werden:", error);
    }
  };

  /*
   * Aufgabe abschließen
   */
  const completeTask = async () => {
    if (!sessionId || !sessionToken) {
      console.error("Keine gültige Evaluation-Session vorhanden.");

      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("complete-task", {
        body: {
          sessionId,
          sessionToken,
          taskId: currentTask.id,
        },
      });

      if (error) {
        console.error("complete-task error:", error);

        return;
      }

      if (!data?.success) {
        console.error("Task konnte nicht abgeschlossen werden:", data);

        return;
      }

      /*
       * Erst nachdem der Server den
       * Abschluss bestätigt hat,
       * starten wir den Countdown.
       */
      setCountdown(3);
      setPhase("countdown");
    } catch (error) {
      console.error("Task konnte nicht abgeschlossen werden:", error);
    }
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

          setPhase("sam");

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
   * Gesamten Evaluation-State speichern
   */
  useEffect(() => {
    if (isEvaluationFinished()) {
      return;
    }

    const state: SavedEvaluationState = {
      phase,
      currentTaskIndex,
      countdown,
      sessionId,
      sessionToken,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [phase, currentTaskIndex, countdown, sessionId, sessionToken]);

  /*
   * Nächste Aufgabe
   */
  const nextTask = () => {
    const isLastTask = currentTaskIndex >= evaluationTasks.length - 1;

    if (isLastTask) {
      setPhase("debriefing");
      return;
    }

    setCurrentTaskIndex((current) => current + 1);
    setCountdown(3);
    setPhase("task-explanation");
  };

  const submitAnswer = async (
    questionId: string,
    answer: string,
    taskId?: string,
  ): Promise<boolean> => {
    if (!sessionId || !sessionToken) {
      console.error("Keine gültige Evaluation-Session vorhanden.");

      return false;
    }

    if (!questionId || !answer) {
      console.error("questionId und answer sind erforderlich.");

      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke("submit-answer", {
        body: {
          sessionId,
          sessionToken,
          questionId,
          answer,
          taskId: taskId ?? null,
        },
      });

      if (error) {
        console.error("submit-answer error:", error);
        return false;
      }

      if (!data?.success) {
        console.error("Antwort konnte nicht gespeichert werden:", data);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Antwort konnte nicht gespeichert werden:", error);
      return false;
    }
  };

  const finishEvaluation = async (): Promise<boolean> => {
    if (!sessionId || !sessionToken) {
      console.error("Keine gültige Evaluation-Session vorhanden.");
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "finish-evaluation",
        {
          body: {
            sessionId,
            sessionToken,
          },
        },
      );

      if (error) {
        console.error("finish-evaluation error:", error);
        return false;
      }

      if (!data?.success) {
        console.error("Evaluation konnte nicht beendet werden:", data);
        return false;
      }

      /*
       * Erst nach erfolgreicher
       * Serverbestätigung die
       * lokale Phase ändern.
       */
      setPhase("finished");
      localStorage.clear();
      markEvaluationFinished();

      return true;
    } catch (error) {
      console.error("Evaluation konnte nicht beendet werden:", error);
      return false;
    }
  };

  return (
    <EvaluationContext.Provider
      value={{
        phase,
        tasks: evaluationTasks,
        currentTaskIndex,
        currentTask,
        naggingActivated: naggingActivated,
        countdown,
        sessionId,
        sessionToken,
        verifyEvaluationCode,
        startPreQuestionnaire,
        startPreSam: startPreSam,
        startEvaluation,
        startTask,
        changeNagging,
        completeTask,
        nextTask,
        submitAnswer,
        finishEvaluation,
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
