import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center px-6 text-center">
      <XCircle className="w-24 h-24 text-white/50 mb-8" />
      <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-white mb-6 uppercase">Paiement Annulé</h1>
      <p className="text-[#a0a5b0] text-xl max-w-2xl mb-12 font-light">
        Votre session a été interrompue. Aucun prélèvement n'a été effectué.
      </p>
      <Link href="/" className="px-10 py-4 border border-white/30 text-white font-bold rounded-full tracking-widest hover:bg-white hover:text-black transition-all duration-300">
        RETOURNER À L'ACCUEIL
      </Link>
    </div>
  );
}
