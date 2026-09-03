import {
  CheckCircle2,
  Clock3,
  MousePointer2,
  Info,
  IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "../context/evaluation-provider";
import { useEffect, useState } from "react";

export default function EvaluationIntro() {
  const { tasks, startPreQuestionnaire, sessionId } = useEvaluation();
  const [consentPreQuestionnaire, setConsentPreQuestionnaire] = useState(false);
  const [consentTimeTracking, setConsentTimeTracking] = useState(false);
  const [consentSam, setConsentSam] = useState(false);

  // Verhindert das Scrollen der Hauptseite im Hintergrund
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const allRequiredConsentsGiven =
    consentPreQuestionnaire && consentTimeTracking && consentSam;

  const handleStart = () => {
    if (!allRequiredConsentsGiven) {
      return;
    }

    // Hier könntest du die Einwilligung an dein Backend senden.
    //
    // Beispiel:
    // await saveConsent({
    //   sessionId,
    //   recording: consentRecording,
    //   transcription: consentTranscription,
    //   research: consentResearch,
    // });

    startPreQuestionnaire();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-50">
      <div className="min-h-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <header className="mb-8 text-center">
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Usability Evaluation
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Willkommen bei der Evaluation
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Bevor Sie starten, erhalten Sie einen kurzen Überblick über den
              Ablauf der Evaluation, den Umgang mit Ihren Daten und wichtige
              Hinweise zur Durchführung.
            </p>
          </header>

          {/* Projektinformationen */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Projektbezeichnung
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  Untersuchung der User Experience bei der Nutzung eines
                  Online-Reiseportals
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Durchführende Person
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  Megan Diekmann
                </p>
                <p className="text-sm text-slate-500">
                  megan.diekmann@hs-osnabrueck.de
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Betreuende Personen
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  Prof. Dr. Julius Schöning und Björn Plutka
                </p>
                <p className="text-sm text-slate-500">
                  Fakultät IuI · Hochschule Osnabrück
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Projektbeschreibung
                </p>
                <div className="mt-1 font-medium text-slate-900">
                  <p>Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,</p>
                  <p>
                    wir laden Sie herzlich ein, an einem Usability-Test
                    teilzunehmen. In dieser Evaluation untersuchen wir, wie
                    Nutzerinnen und Nutzer eine Online-Reiseplattform wahrnehmen
                    und bedienen. Ziel ist es, die Benutzerfreundlichkeit der
                    Plattform mithilfe der Messung emotionaler Reaktionen zu
                    bewerten.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <IdCard className="h-5 w-5 shrink-0 text-slate-400" />

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  Ihre Teilnehmenden-ID
                </p>

                <p className="truncate font-mono text-sm font-medium text-slate-800">
                  {sessionId}
                </p>
              </div>
            </div>
          </section>

          {/* Ablauf */}
          <section className="mt-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-950">
              Was passiert während des Tests?
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard
                icon={<Clock3 className="h-5 w-5" />}
                title="Dauer"
                description="Die Evaluation dauert etwa 10-15 Minuten."
              />

              <InfoCard
                icon={<MousePointer2 className="h-5 w-5" />}
                title="Aufgaben"
                description={`${tasks.length} Aufgaben warten auf Sie.`}
              />

              <InfoCard
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Fragebogen"
                description="Nach jeder Aufgabe beantworten Sie zwei kurze Fragen."
              />
            </div>
          </section>

          {/* Ablaufbeschreibung */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">
              So funktioniert die Evaluation
            </h2>

            <ol className="mt-5 space-y-4">
              <Step
                number="1"
                title="Vorab-Fragebogen"
                description="Zu Beginn beantworten Sie zwei Fragen zu Ihrer Person und Ihren Erfahrungen mit Online-Reiseplattformen. Danach folgen zwei weitere kurze Fragen."
              />

              <Step
                number="2"
                title="Aufgabe bearbeiten"
                description="Anschließend bearbeiten Sie eine konkrete Aufgabe auf der Reiseplattform."
              />

              <Step
                number="3"
                title="Kurze Bewertung"
                description="Nach jeder Aufgabe beantworten Sie zwei kurze Fragen zu Ihrem Erleben und Ihrer Wahrnehmung während der Bearbeitung."
              />

              <Step
                number="4"
                title="Nächste Aufgabe"
                description="Danach geht es direkt mit der nächsten Aufgabe weiter."
              />
            </ol>
          </section>

          {/* Datenschutz */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">
              Datenschutz und Anonymisierung
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <PrivacyPoint>
                Alle gespeicherten Daten werden so bearbeitet, dass kein
                Rückschluss auf Ihre Person möglich ist.
              </PrivacyPoint>

              <PrivacyPoint>
                Sie können jederzeit und ohne Angabe von Gründen unter Angabe
                Ihrer Teilnehmenden-ID die Löschung Ihrer Daten verlangen. Wir
                werden diese Daten dann unverzüglich und vollständig aus unseren
                Systemen entfernen.
              </PrivacyPoint>
            </div>
          </section>

          {/* Wichtige Hinweise */}
          <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 shadow-sm sm:p-8 text-amber-950">
            <h2 className="text-xl font-semibold">
              Wichtige Hinweise zur Durchführung
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <ImportantPoint>
                Bitte führen Sie die Evaluation auf einem Laptop, Tablet oder
                Desktop-Computer durch. Die Reiseplattform ist nicht für
                Smartphones optimiert.
              </ImportantPoint>

              <ImportantPoint>
                Bitte führen Sie die Evaluation an einem ruhigen und ungestörten
                Ort durch. Bei zwei Aufgaben werden Sie gebeten, Ihre
                Lieblingsmusik oder Musik, die Sie gerne hören, abzuspielen.
              </ImportantPoint>

              <ImportantPoint>
                Bitte geben Sie keine privaten oder sensiblen Daten ein.
              </ImportantPoint>

              <ImportantPoint>
                Sie müssen sich die Aufgabenstellung nicht merken oder
                aufschreiben. Die Aufgabenstellung ist während der
                Aufgabenbearbeitung sichtbar und kann auf- und zugeklappt sowie
                verschoben werden.
              </ImportantPoint>

              <ImportantPoint>
                Einige Werte und Eingabefelder können bereits vorausgefüllt
                sein. Lassen Sie sich davon nicht beirren. Dies dient dazu,
                Ihnen unnötige Eingaben zu ersparen.
              </ImportantPoint>
            </div>
          </section>

          {/* Einwilligung */}
          <section className="mt-6 rounded-3xl border-2 border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Einwilligungserklärung
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Ihre Zustimmung
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Ich habe die oben genannten Informationen gelesen und
                verstanden. Ich willige hiermit ein, dass:
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <ConsentCheckbox
                checked={consentPreQuestionnaire}
                onChange={setConsentPreQuestionnaire}
                required
              >
                meine Angaben aus dem Fragebogen (z. B. Alter und Erfahrung mit
                Online-Reiseportalen) erhoben und für die Zwecke der
                wissenschaftlichen Untersuchung verarbeitet werden.
              </ConsentCheckbox>

              <ConsentCheckbox
                checked={consentTimeTracking}
                onChange={setConsentTimeTracking}
                required
              >
                meine Bearbeitungszeiten bei der Durchführung der Aufgaben
                erfasst und für die Zwecke der wissenschaftlichen Untersuchung
                verarbeitet werden.
              </ConsentCheckbox>

              <ConsentCheckbox
                checked={consentSam}
                onChange={setConsentSam}
                required
              >
                meine Antworten zu meiner Wahrnehmung und meinem Erleben während
                der Evaluation erhoben und für die wissenschaftliche Auswertung
                verarbeitet werden.
              </ConsentCheckbox>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              Mir ist bekannt, dass ich meine Teilnahme jederzeit ohne Angabe
              von Gründen abbrechen kann. Zudem wurde ich darüber informiert,
              dass ich die Löschung meiner Daten jederzeit auf Antrag unter
              Angabe meiner Teilnehmenden-ID erwirken kann. In diesem Fall
              werden meine bisherigen Daten gelöscht.
            </p>

            {/* Datum */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Datum
                </p>

                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {new Date().toLocaleDateString("de-DE")}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Teilnehmenden-ID
                </p>

                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  {sessionId}
                </div>
              </div>
            </div>
          </section>

          {/* Start */}
          <div className="pb-10 pt-8 text-center">
            <Button
              onClick={handleStart}
              disabled={!allRequiredConsentsGiven}
              className="h-12 rounded-xl bg-emerald-600 px-10 text-base font-medium shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {allRequiredConsentsGiven
                ? "Einwilligen & Evaluation starten"
                : "Bitte erforderliche Zustimmungen bestätigen"}
            </Button>

            <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-slate-400">
              Mit dem Start bestätigen Sie, dass Sie die Informationen gelesen
              und verstanden haben und den erforderlichen Einwilligungen
              zustimmen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Components                         */
/* ---------------------------------- */

function InfoCard({
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

      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
        {number}
      </div>

      <div>
        <h3 className="font-medium text-slate-900">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </li>
  );
}

function PrivacyPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

      <p>{children}</p>
    </div>
  );
}

function ImportantPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

      <p>{children}</p>
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  children,
  required = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition ${
        checked
          ? "border-emerald-300 bg-emerald-50/50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-emerald-600"
      />

      <span className="text-sm leading-6 text-slate-700">
        {children}

        {required && (
          <span className="ml-1 font-medium text-emerald-600">*</span>
        )}
      </span>
    </label>
  );
}
