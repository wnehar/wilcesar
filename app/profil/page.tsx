"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Car, LogOut, Mail, User } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function ProfilPage() {
  const router = useRouter();
  const { user, reservations, logout, refresh } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/auth?mode=login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center text-silver text-sm tracking-widest uppercase">
        Chargement…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white px-4 sm:px-6 py-16 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-block text-silver text-sm tracking-widest uppercase hover:text-white mb-10 transition-colors"
      >
        ← Accueil
      </Link>

      <header className="border-b border-border-subtle pb-8 mb-10">
        <h1 className="text-4xl font-black tracking-wide text-white mb-2">
          Mon profil
        </h1>
        <p className="text-silver font-light">
          Vos informations et réservations enregistrées sur cet appareil.
        </p>
      </header>

      <section className="rounded-2xl border border-border-subtle bg-surface/40 p-6 sm:p-8 mb-10">
        <h2 className="text-lg font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5" />
          Compte
        </h2>
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-silver uppercase tracking-widest">Nom</dt>
            <dd className="text-white font-medium text-right">
              {user.prenom} {user.nom}
            </dd>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <dt className="text-silver uppercase tracking-widest shrink-0">
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> Email
              </span>
            </dt>
            <dd className="text-white break-all text-right">{user.email}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="mt-8 flex items-center gap-2 text-silver hover:text-white text-sm tracking-widest uppercase transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </section>

      <section>
        <h2 className="text-lg font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Mes réservations
        </h2>
        {reservations.length === 0 ? (
          <p className="text-silver font-light py-8 border border-dashed border-white/15 rounded-2xl text-center">
            Aucune réservation pour le moment. Après un paiement simulé, votre
            réservation apparaîtra ici si vous êtes connecté, ou après
            connexion si vous aviez payé en invité.
          </p>
        ) : (
          <ul className="space-y-4">
            {reservations.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-border-subtle bg-white/[0.03] p-5 sm:p-6"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Car className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white tracking-wide">{r.titre}</p>
                    <p className="text-silver text-sm mt-1">{r.sousTitre}</p>
                  </div>
                  <span className="text-white font-black tabular-nums shrink-0">
                    {r.montantEuros.toLocaleString("fr-FR")} €
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-silver uppercase tracking-widest mt-4 pt-4 border-t border-white/10">
                  <span>{r.type === "stage" ? "Stage" : "Véhicule"}</span>
                  <span>·</span>
                  <span>{r.statut}</span>
                  <span>·</span>
                  <span>
                    {new Date(r.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
