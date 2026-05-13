"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  consumePendingIntoUser,
  getSessionEmail,
} from "@/lib/zenturo-storage";
import { useAuth } from "@/components/auth-provider";

export default function SuccessPage() {
  const { user, refresh } = useAuth();

  useEffect(() => {
    const email = getSessionEmail();
    if (email) {
      consumePendingIntoUser(email);
      refresh();
    }
  }, [refresh]);

  return (
    <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center px-6 text-center">
      <CheckCircle className="w-24 h-24 text-white mb-8" />
      <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-white mb-6 uppercase">
        Paiement réussi
      </h1>
      <p className="text-[#a0a5b0] text-xl max-w-2xl mb-6 font-light">
        Félicitations, votre réservation est confirmée. Préparez-vous à vivre
        une expérience de pilotage inoubliable avec Zenturo.
      </p>
      {!user && (
        <p className="text-silver text-sm max-w-md mb-10">
          Vous n&apos;êtes pas connecté : la réservation est mémorisée sur cet
          appareil. Après{" "}
          <Link href="/auth?mode=login" className="text-white underline">
            connexion
          </Link>
          , elle sera ajoutée à votre profil automatiquement.
        </p>
      )}
      {user && (
        <p className="text-silver text-sm max-w-md mb-10">
          Votre réservation figure dans votre profil.
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/profil"
          className="px-10 py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-gray-200 transition-all duration-300"
        >
          Mon profil
        </Link>
        <Link
          href="/"
          className="px-10 py-4 border border-white/30 text-white font-bold rounded-full tracking-widest hover:bg-white/10 transition-all duration-300"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
