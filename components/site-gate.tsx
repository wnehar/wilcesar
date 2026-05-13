"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getSessionEmail,
  isGateDone,
  setGateDone,
} from "@/lib/zenturo-storage";

type Phase = "hidden" | "wait" | "choice";

export function SiteGate() {
  /** Premier rendu = pas d’overlay (évite flash SSR), puis logique côté client. */
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (getSessionEmail() || isGateDone()) return;
    setPhase("wait");
    const t = window.setTimeout(() => setPhase("choice"), 4000);
    return () => window.clearTimeout(t);
  }, []);

  function dismissExplore() {
    setGateDone();
    setPhase("hidden");
  }

  function goAuth() {
    setGateDone();
    setPhase("hidden");
  }

  if (phase === "hidden") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6"
      >
        {phase === "wait" && (
          <motion.div
            key="wait"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 pointer-events-auto"
          />
        )}

        {phase === "choice" && (
          <>
            <motion.div
              key="dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/88 backdrop-blur-[2px]"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
              className="relative z-10 max-w-lg w-full text-center"
            >
              <p className="text-silver text-xs tracking-[0.35em] uppercase mb-4">
                Zenturo
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">
                Bienvenue
              </h2>
              <p className="text-silver text-base sm:text-lg font-light mb-10 leading-relaxed">
                Connectez-vous ou créez un compte pour enregistrer vos
                réservations et retrouver votre profil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <Link
                  href="/auth?mode=login"
                  onClick={goAuth}
                  className="flex-1 sm:flex-none min-w-[160px] py-4 px-8 border border-white/30 text-white font-bold rounded-full tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-center"
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth?mode=signup"
                  onClick={goAuth}
                  className="flex-1 sm:flex-none min-w-[160px] py-4 px-8 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300 text-center"
                >
                  Créer un compte
                </Link>
              </div>
              <button
                type="button"
                onClick={dismissExplore}
                className="mt-10 text-silver text-sm tracking-widest uppercase hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Explorer le site sans compte
              </button>
            </motion.div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
