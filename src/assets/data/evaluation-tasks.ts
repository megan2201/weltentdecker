export type EvaluationTask = {
  id: string
  title: string
  description: string
}

export const evaluationTasks: EvaluationTask[] = [
  {
    id: "search-destination",
    title: "Finde eine Reise",
    description:
      "Finde eine Reise nach Barcelona für zwei Personen.",
  },
  {
    id: "find-hotel",
    title: "Finde eine Unterkunft",
    description:
      "Wähle eine Unterkunft mit mindestens 4 Sternen.",
  },
  {
    id: "prepare-booking",
    title: "Bereite eine Buchung vor",
    description:
      "Gehe bis zur Buchungsübersicht, ohne die Buchung abzuschließen.",
  },
]