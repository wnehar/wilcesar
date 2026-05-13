"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/components/auth-provider";

function AuthForms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const r = login(email, password);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    router.push("/profil");
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const r = register(prenom, nom, email, password);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    router.push("/profil");
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 py-24">
      <Link
        href="/"
        className="absolute top-6 left-6 text-silver text-sm tracking-widest uppercase hover:text-white transition-colors"
      >
        ← Accueil
      </Link>

      <div className="w-full max-w-md border border-border-subtle rounded-3xl bg-surface/60 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
        <div className="flex gap-2 mb-10 p-1 rounded-full bg-white/5 border border-white/10">
          <Link
            href="/auth?mode=login"
            className={`flex-1 text-center py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
              mode === "login"
                ? "bg-white text-black"
                : "text-silver hover:text-white"
            }`}
          >
            Connexion
          </Link>
          <Link
            href="/auth?mode=signup"
            className={`flex-1 text-center py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
              mode === "signup"
                ? "bg-white text-black"
                : "text-silver hover:text-white"
            }`}
          >
            Inscription
          </Link>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <h1 className="text-2xl font-black text-white tracking-wide mb-2">
              Se connecter
            </h1>
            <p className="text-silver text-sm mb-6">
              Accédez à votre profil et à vos réservations.
            </p>
            <div>
              <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-colors"
            >
              Connexion
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-5">
            <h1 className="text-2xl font-black text-white tracking-wide mb-2">
              Créer un compte
            </h1>
            <p className="text-silver text-sm mb-6">
              Démo locale : vos données restent dans ce navigateur.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                  Prénom
                </label>
                <input
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                  Nom
                </label>
                <input
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                required
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-colors"
            >
              Créer mon compte
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-silver">
          Chargement…
        </div>
      }
    >
      <AuthForms />
    </Suspense>
  );
}
