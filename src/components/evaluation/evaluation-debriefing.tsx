import {
  Info,
  ShoppingBasket,
  Megaphone,
  Bell,
  HeartOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";
import { useEffect, useState } from "react";

export default function EvaluationDebriefing() {
  const { sessionId, finishEvaluation } = useEvaluation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await finishEvaluation();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-50">
      <div className="min-h-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <header className="mb-8 text-center">
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Debriefing
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Vielen Dank für Ihre Teilnahme!
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Sie haben die Evaluation erfolgreich abgeschlossen. Im Folgenden
              möchten wir Ihnen den tatsächlichen Hintergrund der Untersuchung
              erläutern.
            </p>
          </header>

          {/* Aufklärung / eigentlicher Untersuchungsgegenstand */}
          <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Hintergrund der Untersuchung
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  Worum ging es in dieser Untersuchung?
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-m leading-7 text-slate-600">
              <p>
                Zu Beginn der Evaluation wurde Ihnen mitgeteilt, dass Sie eine
                Reiseplattform hinsichtlich ihrer Benutzerfreundlichkeit und
                Nutzungserfahrung untersuchen. Der tatsächliche
                Untersuchungsgegenstand wurde Ihnen zu diesem Zeitpunkt bewusst
                nicht mitgeteilt. Ziel der Untersuchung war es, Ihre Interaktion
                mit sogenannten{" "}
                <strong className="font-semibold text-slate-900">
                  Dark Patterns
                </strong>{" "}
                und die daraus resultierenden emotionalen Reaktionen zu
                untersuchen.
              </p>

              <p>
                Dies war für die Untersuchung erforderlich, da das Wissen über
                den Untersuchungsgegenstand Ihr Verhalten und Ihre Wahrnehmung
                während der Aufgaben beeinflussen könnte. Insbesondere wollten
                wir vermeiden, dass Sie gezielt nach Dark Patterns suchen oder
                Ihre Reaktionen auf deren Auftreten bewusst verändern.
              </p>

              <p>
                Während der Evaluation wurden Ihnen daher vier unterschiedliche
                Dark Patterns präsentiert. Nach der Interaktion mit den
                jeweiligen Dark Patterns wurden Ihre subjektiven Empfindungen
                erfasst. Dabei gab es keine richtigen oder falschen Antworten –
                von Interesse war ausschließlich Ihre persönliche Wahrnehmung
                und Ihr tatsächliches Erleben.
              </p>
            </div>
          </section>

          {/* Was sind Dark Patterns? */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Begriffserklärung
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  Was sind Dark Patterns?
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-m leading-7 text-slate-600">
              <p>
                Als Dark Patterns werden Gestaltungsmuster in digitalen Benutzeroberflächen
                bezeichnet, die darauf ausgelegt sein können, Nutzerinnen und
                Nutzer in ihrer Entscheidung oder ihrem Verhalten zu
                beeinflussen. Sie können beispielsweise dazu führen, dass eine
                Person etwas auswählt, kauft, abonniert oder akzeptiert, die sie
                unter einer anderen Gestaltung möglicherweise nicht gewählt oder
                vorgenommen hätte. In dieser Evaluation wurden vier
                unterschiedliche Dark Patterns betrachtet.
              </p>
            </div>
          </section>

          {/* Vier Dark Patterns */}
          <section className="mt-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-950">
              Die untersuchten Dark Patterns
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <PatternCard
                icon={<ShoppingBasket className="h-5 w-5" />}
                title="Sneak into Basket"
                description="Ein zusätzliches Produkt oder eine zusätzliche Leistung wird dem Warenkorb hinzugefügt, ohne dass dies für die Nutzerin oder den Nutzer unmittelbar deutlich ist."
              />

              <PatternCard
                icon={<Megaphone className="h-5 w-5" />}
                title="Disguised Ads"
                description="Werbung wird so gestaltet oder platziert, dass sie wie reguläre Inhalte oder Bestandteile der Benutzeroberfläche erscheinen kann."
              />

              <PatternCard
                icon={<Bell className="h-5 w-5" />}
                title="Nagging"
                description="Nutzerinnen und Nutzer werden wiederholt durch Hinweise, Aufforderungen oder Unterbrechungen zu einer bestimmten Handlung aufgefordert."
              />

              <PatternCard
                icon={<HeartOff className="h-5 w-5" />}
                title="Confirmshaming"
                description="Eine Ablehnung oder das Überspringen einer Option wird mit einer beschämenden, wertenden oder emotionalisierenden Formulierung versehen."
              />
            </div>
          </section>

          {/* Wichtiger Hinweis */}
          <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <h2 className="text-xl font-semibold text-amber-950">
                  Ein wichtiger Hinweis
                </h2>

                <p className="mt-3 text-m leading-7 text-amber-900/80">
                  Die dargestellten Inhalte und Dark Pattern dienten
                  ausschließlich zu Forschungszwecken. Es wurden im Rahmen der
                  Untersuchung keine tatsächlichen Buchungen vorgenommen.
                  Sollten Sie nach Kenntnis des tatsächlichen
                  Untersuchungszwecks Ihre Teilnahme bzw. die Verwendung Ihrer
                  erhobenen Daten nicht wünschen, können Sie sich unter Angabe
                  Ihrer Teilnehmenden-ID ({sessionId}) an die Verantwortlichen
                  wenden.
                </p>
              </div>
            </div>
          </section>

          {/* Abschluss */}
          <div className="pb-10 pt-8 text-center">
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="h-12 rounded-xl bg-emerald-600 px-10 text-base font-medium shadow-sm transition hover:bg-emerald-700"
            >
              {isSubmitting
                ? "Wird abgeschlossen..."
                : "Evaluation abschließen"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Components                         */
/* ---------------------------------- */

function PatternCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 text-m leading-6 text-slate-500">{description}</p>
    </div>
  );
}
