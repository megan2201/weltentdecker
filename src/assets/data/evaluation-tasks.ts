export type DarkPattern =
  | "immortal-accounts"
  | "nagging"
  | "sneaking-into-basket"
  | "confirmshaming";

export type EvaluationTask = {
  id: string;
  title: string;
  scenario?: string;
  description: string;
  darkPattern: DarkPattern;
};

export const evaluationTasks: EvaluationTask[] = [
  {
    id: "search-destination",
    title: "Finde eine Reise",
    scenario:
      "Du bist Daniel Weber und möchtest eine Unterkunft für deine Reise buchen.",
    description: "Finde eine Reise nach Barcelona für zwei Personen.",
    darkPattern: "sneaking-into-basket",
  },
  {
    id: "find-hotel",
    title: "Finde eine Unterkunft",
    description: "Wähle eine Unterkunft mit mindestens 4 Sternen.",
    darkPattern: "immortal-accounts",
  },
  {
    id: "prepare-booking",
    title: "Bereite eine Buchung vor",
    description:
      "Gehe bis zur Buchungsübersicht, ohne die Buchung abzuschließen.",
    darkPattern: "immortal-accounts",
  },
];
