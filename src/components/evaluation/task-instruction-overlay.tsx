import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { GripVertical, Maximize2, Minimize2 } from "lucide-react";
import { useEvaluation } from "../context/evaluation-provider";

export default function TaskInstructionOverlay() {
  const { currentTask, currentTaskIndex, tasks } = useEvaluation();

  const [isMinimized, setIsMinimized] = useState(false);

  const [position, setPosition] = useState({
    x: 24,
    y: 24,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;

    setPosition((current) => {
      const panelWidth = 340;
      const panelHeight = 220;

      const padding = 8;

      const maxX = window.innerWidth - panelWidth - padding;

      const maxY = window.innerHeight - panelHeight - padding;

      return {
        x: Math.min(Math.max(padding, current.x + delta.x), maxX),

        y: Math.min(Math.max(padding, current.y + delta.y), maxY),
      };
    });
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition hover:scale-105 hover:bg-emerald-700"
        aria-label="Aufgabe öffnen"
      >
        <Maximize2 className="h-5 w-5" />
      </button>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <DraggablePanel
        position={position}
        currentTask={currentTask}
        currentTaskIndex={currentTaskIndex}
        totalTasks={tasks.length}
        onMinimize={() => setIsMinimized(true)}
      />
    </DndContext>
  );
}

function DraggablePanel({
  position,
  currentTask,
  currentTaskIndex,
  totalTasks,
  onMinimize,
}: {
  position: {
    x: number;
    y: number;
  };
  currentTask: {
    title: string;
    description: string;
  };
  currentTaskIndex: number;
  totalTasks: number;
  onMinimize: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "evaluation-task",
  });

  const style = {
    left: position.x,
    top: position.y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="fixed z-[90] w-[340px] overflow-hidden rounded-2xl border bg-white shadow-2xl"
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className="flex cursor-grab items-center justify-between border-b bg-gray-50 px-4 py-3 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400" />

          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Aufgabe {currentTaskIndex + 1} von {totalTasks}
          </span>
        </div>

        <button
          onClick={onMinimize}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
          aria-label="Aufgabe minimieren"
        >
          <Minimize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Task */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentTask.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {currentTask.description}
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Bearbeite die Aufgabe auf der Webseite.
        </div>
      </div>
    </div>
  );
}
