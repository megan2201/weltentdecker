export type DarkPattern =
  | "disguised-ads"
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
    id: "sneak-stay-hamburg",
    title: "Buchen Sie eine Unterkunft",
    scenario:
      "Sie sind Lars Weber und reisen vom 25. September 2026 bis zum 27. September 2026 nach Hamburg. Dort möchten Sie eine **Unterkunft** buchen.",
    description: "**Buchen** Sie eine **Unterkunft** in Hamburg vom 25. September 2026 bis zum 27. September 2026 für eine Person.",
    darkPattern: "sneaking-into-basket",
  },
  {
    id: "ads-find-experience-freiburg",
    title: "Finden Sie ein Erlebnis",
    scenario:
      "Sie sind Lars Weber und suchen für Ihren Ausflug nach Freiburg am 22. September 2026 ein **Erlebnis**.",
    description: "**Wählen** Sie ein **Erlebnis** in Freiburg für den 22. September 2026 für eine Person. Es muss keine Buchung abgeschlossen werden.",
    darkPattern: "disguised-ads",
  },
  {
    id: "confirmshaming-stay-berlin",
    title: "Buchen Sie eine Unterkunft",
    scenario:
      "Sie sind Lars Weber und planen vom 15. Oktober 2026 bis zum 18. Oktober 2026 einen Urlaub in Berlin. Dafür möchten Sie eine **Unterkunft** buchen.",
    description:
      "**Buchen** Sie eine **Unterkunft** in Berlin vom 15. Oktober 2026 bis zum 18. Oktober 2026 für eine Person.",
    darkPattern: "confirmshaming",
  },
  {
    id: "nagging-experience-berlin",
    scenario:
      "Sie sind Lars Weber und planen vom 15. Oktober 2026 bis zum 18.10.2026 einen Urlaub in Berlin. Am 16.10.206 möchten Sie dort ein **Erlebnis** buchen.",
    title: "Buchen Sie ein Erlebnis",
    description:
      "Buchen Sie ein **Erlebnis** in Berlin für den 16. Oktober 2026 für eine Person",
    darkPattern: "nagging",
  },
];
