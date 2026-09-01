import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getRandomStays } from "@/assets/data/stays";
import { getRandomExperience } from "@/assets/data/experiences";
import { Link } from "react-router-dom";

interface NaggingOverlayProps {
  onLater: () => void;
}

export default function NaggingOverlay({ onLater }: NaggingOverlayProps) {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const rdmStays = getRandomStays();
  const rdmExperience = getRandomExperience();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Inhalt */}
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Lass dich inspirieren!
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Entdecke passende Unterkünfte und Erlebnisse für deine Reise.
          </p>
        </div>

        {!showRecommendations ? (
          /* Buttons */
          <div className="mt-7 flex flex-col gap-3">
            <Button
              type="button"
              onClick={() => setShowRecommendations(true)}
              className="h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
            >
              Entdecken
            </Button>

            <Button
              onClick={onLater}
              type="button"
              variant="ghost"
              className="h-12 w-full rounded-xl text-gray-500 hover:text-gray-900"
            >
              Später
            </Button>
          </div>
        ) : (
          /* Unterkünfte und Erlebnisse */
          <div className="mt-7 space-y-3">
            <Link
              onClick={onLater}
              to={"/stays/" + rdmStays[0].id}
              className="group flex cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={rdmStays[0].images[0]}
                alt={rdmStays[0].name}
                className="h-24 w-28 shrink-0 object-cover"
              />

              <div className="flex min-w-0 flex-1 flex-col justify-center p-3 text-left">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {rdmStays[0].name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {rdmStays[0].location}
                </p>

                <p className="mt-2 text-xs font-medium text-emerald-600">
                  {rdmStays[0].pricePerNight} / Nacht
                </p>
              </div>
            </Link>

            <Link
              onClick={onLater}
              to={"/experiences/" + rdmExperience.id}
              className="group flex cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={rdmExperience.image}
                alt={rdmExperience.title}
                className="h-24 w-28 shrink-0 object-cover"
              />

              <div className="flex min-w-0 flex-1 flex-col justify-center p-3 text-left">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {rdmExperience.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {rdmExperience.location}
                </p>

                <p className="mt-2 text-xs font-medium text-emerald-600">
                  {rdmExperience.price} / Nacht
                </p>
              </div>
            </Link>

            <Link
              onClick={onLater}
              to={"/stays/" + rdmStays[1].id}
              className="group flex cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={rdmStays[1].images[0]}
                alt={rdmStays[1].name}
                className="h-24 w-28 shrink-0 object-cover"
              />

              <div className="flex min-w-0 flex-1 flex-col justify-center p-3 text-left">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {rdmStays[1].name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {rdmStays[1].location}
                </p>

                <p className="mt-2 text-xs font-medium text-emerald-600">
                  {rdmStays[1].pricePerNight} / Nacht
                </p>
              </div>
            </Link>

            <Button
              onClick={onLater}
              type="button"
              variant="ghost"
              className="mt-2 h-10 w-full rounded-xl text-gray-500 hover:text-gray-900"
            >
              Später
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
