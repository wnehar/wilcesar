import type { Metadata } from "next";
import { Suspense } from "react";
import StageReservationFlow from "./StageReservationFlow";

export const metadata: Metadata = {
  title: "Réserver un stage | ZENTURO",
  description:
    "Choisissez votre date, renseignez vos informations et finalisez votre réservation de stage de pilotage.",
};

export default function ReservationStagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-silver tracking-widest text-sm uppercase">
          Chargement…
        </div>
      }
    >
      <StageReservationFlow />
    </Suspense>
  );
}
