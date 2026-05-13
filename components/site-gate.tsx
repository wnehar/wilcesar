"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getSessionEmail,
  isGateDone,
  setGateDone,
} from "@/lib/zenturo-storage";

type Phase = "hidden" | "waiting" | "prompt";

const easeOut = [0.16, 1, 0.3, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.94,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function SiteGate() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (getSessionEmail() || isGateDone()) return;
    setPhase("waiting");
    const t = window.setTimeout(() => setPhase("prompt"), 4000);
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

  /** Pendant l’attente : rien à l’écran — le site reste 100 % normal. */
  if (phase === "hidden" || phase === "waiting") return null;

  return (
    <AnimatePresence mode="wait">
      {phase === "prompt" && (
        <motion.div
          key="gate-prompt"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-5 sm:px-6"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden
          />

          <motion.div
            variants={cardVariants}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#0a0b0e]/95 p-8 sm:p-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_80px_rgba(0,0,0,0.65),0_0_120px_rgba(255,255,255,0.06)]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.15), transparent 55%)",
              }}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.p
                variants={staggerItem}
                className="text-silver text-[0.65rem] sm:text-xs tracking-[0.4em] uppercase mb-3"
              >
                Zenturo
              </motion.p>
              <motion.h2
                variants={staggerItem}
                className="text-3xl sm:text-4xl font-black text-white tracking-[0.08em] mb-3"
              >
                Bienvenue
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-silver text-sm sm:text-base font-light leading-relaxed mb-10 max-w-sm mx-auto"
              >
                Connectez-vous ou créez un compte pour enregistrer vos
                réservations et retrouver votre profil.
              </motion.p>
              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-3 justify-center items-stretch"
              >
                <Link
                  href="/auth?mode=login"
                  onClick={goAuth}
                  className="flex-1 sm:flex-none min-h-[52px] flex items-center justify-center py-3.5 px-8 border border-white/25 text-white font-bold rounded-full tracking-[0.2em] text-xs sm:text-sm uppercase hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth?mode=signup"
                  onClick={goAuth}
                  className="flex-1 sm:flex-none min-h-[52px] flex items-center justify-center py-3.5 px-8 bg-white text-black font-bold rounded-full tracking-[0.2em] text-xs sm:text-sm uppercase hover:bg-silver transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)]"
                >
                  Créer un compte
                </Link>
              </motion.div>
              <motion.button
                variants={staggerItem}
                type="button"
                onClick={dismissExplore}
                className="mt-10 text-silver/90 text-xs tracking-[0.25em] uppercase hover:text-white transition-colors underline-offset-[6px] hover:underline"
              >
                Explorer le site sans compte
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
