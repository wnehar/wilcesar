import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center px-6 text-center">
      <CheckCircle className="w-24 h-24 text-white mb-8" />
      <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-white mb-6 uppercase">Paiement Réussi</h1>
      <p className="text-[#a0a5b0] text-xl max-w-2xl mb-12 font-light">
        Félicitations, votre réservation est confirmée. Préparez-vous à vivre une expérience de pilotage inoubliable avec Zenturo.
      </p>
      <Link href="/" className="px-10 py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-gray-200 transition-all duration-300">
        RETOURNER À L'ACCUEIL
      </Link>
    </div>
  );
}
