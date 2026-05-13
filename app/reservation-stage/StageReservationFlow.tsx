"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Loader2,
  MapPin,
  User,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

const OFFRES = {
  decouverte: {
    titre: "Stage de pilotage",
    coeff: 1,
  },
  premium: {
    titre: "Pass Premium Zenturo",
    coeff: 1.12,
  },
} as const;

type OffreKey = keyof typeof OFFRES;

/** Prix public par tour et par catégorie (hors coefficient offre). */
const TYPES_VEHICULE = [
  { value: "sportive", label: "Sportive", prixTour: 85 },
  { value: "supercar", label: "Supercar", prixTour: 155 },
  { value: "hypercar", label: "Hypercar", prixTour: 245 },
  { value: "conseiller", label: "Au choix avec un conseiller", prixTour: 120 },
] as const;

const MIN_TOURS = 2;
const MAX_TOURS = 40;

function prixTourBrut(typeVehicule: string) {
  const row = TYPES_VEHICULE.find((t) => t.value === typeVehicule);
  return row?.prixTour ?? TYPES_VEHICULE[0].prixTour;
}

function calculerPrixStage(
  typeVehicule: string,
  nombreTours: number,
  coeffOffre: number
) {
  const tours = Math.min(MAX_TOURS, Math.max(MIN_TOURS, nombreTours));
  const unitaire = prixTourBrut(typeVehicule);
  return Math.round(tours * unitaire * coeffOffre);
}

function formatEuros(n: number) {
  return `${n.toLocaleString("fr-FR")} €`;
}

type PaymentMode = "apple" | "card" | "onsite";

function acompteSurPlace(prixTotal: number) {
  return Math.max(49, Math.round(prixTotal * 0.25));
}

export default function StageReservationFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const offreParam = (searchParams.get("offre") || "decouverte") as OffreKey;
  const offre = OFFRES[offreParam in OFFRES ? offreParam : "decouverte"];

  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [dateSession, setDateSession] = useState("");
  const [heureSession, setHeureSession] = useState("10:00");
  const [typeVehicule, setTypeVehicule] = useState<string>("sportive");
  const [nombreTours, setNombreTours] = useState<number>(MIN_TOURS);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [departement, setDepartement] = useState("");
  const [permisTroisAns, setPermisTroisAns] = useState<"" | "oui" | "non">("");

  const [paymentMode, setPaymentMode] = useState<PaymentMode>("apple");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const prixUnitaireBrut = prixTourBrut(typeVehicule);
  const libelleCategorie =
    TYPES_VEHICULE.find((t) => t.value === typeVehicule)?.label ?? "";
  const prixTotal = useMemo(
    () =>
      calculerPrixStage(typeVehicule, nombreTours, offre.coeff),
    [typeVehicule, nombreTours, offre.coeff]
  );

  const acompte = useMemo(() => acompteSurPlace(prixTotal), [prixTotal]);

  const montantAPayer =
    paymentMode === "onsite" ? acompte : prixTotal;

  const step1Valid =
    dateSession &&
    heureSession &&
    typeVehicule &&
    nombreTours >= MIN_TOURS &&
    nombreTours <= MAX_TOURS;
  const step2Valid =
    prenom.trim() &&
    nom.trim() &&
    email.trim() &&
    telephone.trim() &&
    dateNaissance &&
    departement.trim() &&
    permisTroisAns;

  const cardValid =
    paymentMode !== "card" ||
    (cardNumber.replace(/\s/g, "").length >= 12 &&
      cardExpiry.trim().length >= 4 &&
      cardCvc.trim().length >= 3 &&
      cardName.trim().length > 1);

  const canPay =
    paymentMode === "apple" ||
    paymentMode === "onsite" ||
    (paymentMode === "card" && cardValid);

  function simulatePay() {
    if (!canPay || processing) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      router.push("/success");
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-30%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.07] blur-[140px]" />
      </div>

      <header className="relative z-10 border-b border-border-subtle bg-surface/40 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
          <Link
            href="/#stages"
            className="inline-flex items-center gap-2 text-silver hover:text-white text-sm tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <span className="text-xs font-bold tracking-[0.2em] text-white/90">
            ZENTURO
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-24">
        <p className="text-silver text-xs tracking-[0.25em] uppercase mb-2">
          Réservation stage
        </p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-wide text-white mb-2">
          {offre.titre}
        </h1>
        <p className="text-silver font-light mb-10">
          Tarif = nombre de tours (min. {MIN_TOURS}) × tarif selon la catégorie
          {offre.coeff > 1 ? (
            <>
              {" "}
              × coefficient{" "}
              <span className="text-white font-semibold">Premium</span>
            </>
          ) : null}
          . Simulation, aucun prélèvement réel.
        </p>

        <ol className="flex items-center gap-2 mb-12 text-xs font-bold tracking-widest uppercase">
          {["Date & véhicule", "Vos infos", "Paiement"].map((label, i) => (
            <li key={label} className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                  step === i
                    ? "border-white bg-white text-black"
                    : step > i
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/15 text-silver"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden sm:inline truncate ${
                  step === i ? "text-white" : "text-silver/60"
                }`}
              >
                {label}
              </span>
              {i < 2 && (
                <span className="hidden sm:block h-px flex-1 bg-white/10 mx-1" />
              )}
            </li>
          ))}
        </ol>

        <div className="rounded-3xl border border-border-subtle bg-surface/50 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-white">
                  <Calendar className="w-7 h-7 opacity-90" />
                  <h2 className="text-xl font-bold tracking-wide">
                    Créneau & type de véhicule
                  </h2>
                </div>

                <div>
                  <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    value={dateSession}
                    onChange={(e) => setDateSession(e.target.value)}
                    min={new Date().toISOString().slice(0, 10)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                    Heure d&apos;arrivée
                  </label>
                  <input
                    type="time"
                    value={heureSession}
                    onChange={(e) => setHeureSession(e.target.value)}
                    className="w-full max-w-xs bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                    Type de véhicule souhaité
                  </label>
                  <select
                    value={typeVehicule}
                    onChange={(e) => setTypeVehicule(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/40 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23CECECE' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                    }}
                  >
                    {TYPES_VEHICULE.map((t) => (
                      <option key={t.value} value={t.value} className="bg-obsidian">
                        {t.label} — {t.prixTour} € / tour
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                    Nombre de tours de circuit
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      min={MIN_TOURS}
                      max={MAX_TOURS}
                      value={nombreTours}
                      onChange={(e) => {
                        const raw = parseInt(e.target.value, 10);
                        if (Number.isNaN(raw)) {
                          setNombreTours(MIN_TOURS);
                          return;
                        }
                        setNombreTours(
                          Math.min(MAX_TOURS, Math.max(MIN_TOURS, raw))
                        );
                      }}
                      className="w-28 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-center font-bold tabular-nums focus:outline-none focus:border-white/40"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[2, 4, 6, 8, 10].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setNombreTours(n)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest border transition-colors ${
                            nombreTours === n
                              ? "border-white bg-white text-black"
                              : "border-white/15 text-silver hover:border-white/40"
                          }`}
                        >
                          {n} tours
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-silver">
                    Minimum {MIN_TOURS} tours. Maximum {MAX_TOURS} tours par
                    réservation.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <p className="text-xs uppercase tracking-widest text-silver mb-1">
                    Estimation
                  </p>
                  <p className="text-lg text-white font-semibold tabular-nums">
                    {nombreTours} tour{nombreTours > 1 ? "s" : ""} ×{" "}
                    {prixUnitaireBrut} €
                    {offre.coeff !== 1 ? (
                      <span className="text-silver font-normal">
                        {" "}
                        × {offre.coeff} (offre)
                      </span>
                    ) : null}{" "}
                    = <span className="text-white">{formatEuros(prixTotal)}</span>
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!step1Valid}
                  onClick={() => setStep(1)}
                  className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  Continuer
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-white">
                  <User className="w-7 h-7 opacity-90" />
                  <h2 className="text-xl font-bold tracking-wide">
                    Vos informations
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                      Prénom
                    </label>
                    <input
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Prénom"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                      Nom
                    </label>
                    <input
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Nom"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-silver text-xs uppercase tracking-widest mb-2">
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      value={dateNaissance}
                      onChange={(e) => setDateNaissance(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-silver text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Département
                    </label>
                    <input
                      value={departement}
                      onChange={(e) => setDepartement(e.target.value)}
                      placeholder="ex. 75, 13, 2A…"
                      maxLength={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="block text-silver text-xs uppercase tracking-widest mb-3">
                    Permis obtenu depuis au moins 3 ans
                  </legend>
                  <div className="flex flex-wrap gap-4">
                    {(["oui", "non"] as const).map((v) => (
                      <label
                        key={v}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                          permisTroisAns === v
                            ? "border-white bg-white text-black"
                            : "border-white/15 text-silver hover:border-white/35"
                        }`}
                      >
                        <input
                          type="radio"
                          name="permis3"
                          className="sr-only"
                          checked={permisTroisAns === v}
                          onChange={() => setPermisTroisAns(v)}
                        />
                        {v === "oui" ? "Oui" : "Non"}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 py-4 border border-white/20 text-white font-bold rounded-full tracking-widest hover:bg-white/5 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    disabled={!step2Valid}
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Continuer vers le paiement
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-white">
                  <CreditCard className="w-7 h-7 opacity-90" />
                  <h2 className="text-xl font-bold tracking-wide">Paiement</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3 text-sm">
                  <div className="flex justify-between text-silver">
                    <span>Offre</span>
                    <span className="text-white text-right">{offre.titre}</span>
                  </div>
                  <div className="flex justify-between text-silver">
                    <span>Date & heure</span>
                    <span className="text-white text-right">
                      {dateSession} à {heureSession}
                    </span>
                  </div>
                  <div className="flex justify-between text-silver">
                    <span>Catégorie</span>
                    <span className="text-white text-right">{libelleCategorie}</span>
                  </div>
                  <div className="flex justify-between text-silver">
                    <span>Nombre de tours</span>
                    <span className="text-white font-semibold tabular-nums">
                      {nombreTours} tour{nombreTours > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-silver">
                    <span>Tarif / tour (base)</span>
                    <span className="text-white tabular-nums">
                      {prixUnitaireBrut} €
                    </span>
                  </div>
                  {offre.coeff !== 1 && (
                    <div className="flex justify-between text-silver">
                      <span>Coefficient offre Premium</span>
                      <span className="text-white tabular-nums">× {offre.coeff}</span>
                    </div>
                  )}
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-silver">Total stage</span>
                    <span className="text-2xl font-black text-white tabular-nums shrink-0">
                      {formatEuros(prixTotal)}
                    </span>
                  </div>
                  {paymentMode === "onsite" && (
                    <p className="text-xs text-silver pt-2 leading-relaxed">
                      Paiement sur place : un acompte de{" "}
                      <strong className="text-white">{acompte} €</strong> est
                      demandé maintenant pour bloquer votre créneau. Le solde (
                      {prixTotal - acompte} €) sera réglé le jour du stage.
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-silver text-xs uppercase tracking-widest">
                    Mode de règlement (simulation)
                  </p>

                  <div className="grid gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMode("apple")}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-4 font-bold tracking-widest transition-colors ${
                        paymentMode === "apple"
                          ? "border-white bg-white text-black"
                          : "border-white/15 text-white hover:border-white/35"
                      }`}
                    >
                      Apple Pay
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode("card")}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-4 font-bold tracking-widest transition-colors ${
                        paymentMode === "card"
                          ? "border-white bg-white text-black"
                          : "border-white/15 text-white hover:border-white/35"
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      Carte bancaire
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode("onsite")}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-4 font-bold tracking-widest transition-colors ${
                        paymentMode === "onsite"
                          ? "border-white bg-white text-black"
                          : "border-white/15 text-white hover:border-white/35"
                      }`}
                    >
                      <Wallet className="w-5 h-5" />
                      Sur place + acompte
                    </button>
                  </div>
                </div>

                {paymentMode === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pt-2"
                  >
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Numéro de carte"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                      />
                      <input
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Nom sur la carte"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
                    />
                  </motion.div>
                )}

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-silver text-sm uppercase tracking-widest">
                      {paymentMode === "onsite"
                        ? "Acompte à régler maintenant"
                        : "Montant simulé"}
                    </span>
                    <span className="text-2xl font-black text-white tabular-nums">
                      {formatEuros(montantAPayer)}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={!canPay || processing}
                    onClick={simulatePay}
                    className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-colors flex items-center justify-center gap-2 disabled:opacity-45"
                  >
                    {processing && (
                      <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                    )}
                    {paymentMode === "apple" && "Payer avec Apple Pay"}
                    {paymentMode === "card" && "Payer par carte"}
                    {paymentMode === "onsite" &&
                      `Valider l'acompte (${formatEuros(acompte)})`}
                  </button>
                  <p className="text-center text-silver/70 text-xs mt-4">
                    Aucun paiement réel — redirection vers la page de
                    confirmation.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-silver text-sm tracking-widest uppercase hover:text-white transition-colors"
                >
                  Retour aux informations
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
