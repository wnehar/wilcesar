"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, ChevronDown, Loader2, X, Calendar, User, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const CARS = [
  { 
    id: 1, name: "BMW M4 Competition", category: "Sportive", image: "/cars/bmw_m4.jpg", badges: ["NOUVEAUTÉ", "510 CH"],
    specs: { engine: "6 en ligne 3.0L Bi-Turbo", power: "510 CH", acceleration: "3.9s", topSpeed: "290 km/h" },
    description: "La quintessence de la sportivité allemande. Un coupé racé offrant un compromis parfait entre confort au quotidien et performances redoutables."
  },
  { 
    id: 2, name: "Audi RS6 Avant", category: "Sportive", image: "/cars/audi_rs6.avif", badges: ["V8", "QUATTRO"],
    specs: { engine: "V8 4.0L TFSI Bi-Turbo", power: "600 CH", acceleration: "3.6s", topSpeed: "305 km/h" },
    description: "Le break familial le plus brutal du marché. Une polyvalence exceptionnelle couplée à des accélérations foudroyantes grâce au système Quattro."
  },
  { 
    id: 3, name: "Mercedes AMG GT", category: "Sportive", image: "/cars/mercedes_amg_gt.jpg", badges: ["V8 BITURBO"],
    specs: { engine: "V8 4.0L Bi-Turbo", power: "585 CH", acceleration: "3.6s", topSpeed: "318 km/h" },
    description: "L'esprit de la course automobile encapsulé dans une silhouette d'une élégance rare. Un V8 tonitruant signé Affalterbach."
  },
  { 
    id: 5, name: "Ferrari F8 Tributo", category: "Supercar", image: "/cars/ferrari_f8.jpg", badges: ["V8", "720 CH"],
    specs: { engine: "V8 3.9L Bi-Turbo", power: "720 CH", acceleration: "2.9s", topSpeed: "340 km/h" },
    description: "Un hommage roulant au moteur V8 le plus primé de l'histoire de Maranello. Une agilité phénoménale sur piste comme sur route."
  },
  { 
    id: 6, name: "Lamborghini Huracán", category: "Supercar", image: "/cars/lamborghini_huracan.jpg", badges: ["V10"],
    specs: { engine: "V10 5.2L Atmosphérique", power: "640 CH", acceleration: "2.9s", topSpeed: "325 km/h" },
    description: "Le hurlement de son V10 atmosphérique est légendaire. Un taureau mécanique sculpté pour l'émotion pure et la précision chirurgicale."
  },
  { 
    id: 7, name: "McLaren 720S", category: "Supercar", image: "/cars/mclaren_720s.jpg", badges: ["AÉRO"],
    specs: { engine: "V8 4.0L Bi-Turbo", power: "720 CH", acceleration: "2.9s", topSpeed: "341 km/h" },
    description: "La supercar britannique qui redéfinit les lois de l'aérodynamisme. Légère, incisive et d'une vélocité diabolique."
  },
  { 
    id: 8, name: "Bugatti Chiron", category: "Hypercar", image: "/cars/bugatti_chiron.jpg", badges: ["W16", "1500 CH"],
    specs: { engine: "W16 8.0L Quadri-Turbo", power: "1500 CH", acceleration: "2.4s", topSpeed: "420 km/h" },
    description: "L'apogée absolue de l'ingénierie automobile. Une hypercar hors norme alliant luxe royal et vitesse de pointe vertigineuse."
  },
  { 
    id: 9, name: "Pagani Huayra", category: "Hypercar", image: "/cars/pagani_huayra.jpg", badges: ["V12", "ART"],
    specs: { engine: "V12 6.0L Bi-Turbo (AMG)", power: "730 CH", acceleration: "2.8s", topSpeed: "383 km/h" },
    description: "Une œuvre d'art sur roues forgée en titane et carbone. Chaque détail de la Huayra a été dessiné par le maître Horacio Pagani."
  },
  { 
    id: 10, name: "Koenigsegg Jesko", category: "Hypercar", image: "/cars/jesko.jpg", badges: ["V8", "PISTE"],
    specs: { engine: "V8 5.0L Bi-Turbo", power: "1600 CH", acceleration: "2.5s", topSpeed: "480 km/h" },
    description: "Un monstre taillé pour pulvériser les records. Équipée d'une transmission révolutionnaire LST et d'un appui aérodynamique colossal."
  }
];

const SUBSCRIPTIONS = [
  { title: "SPORTIVE", desc: "4 véhicules d'exception. Idéal pour s'initier aux sensations fortes sur notre circuit.", price: "499€", priceAmount: 499, cars: 4 },
  { title: "SUPERCAR", desc: "3 monstres de puissance. Accédez à l'élite de l'ingénierie automobile.", price: "1 299€", priceAmount: 1299, cars: 3 },
  { title: "HYPERCAR", desc: "3 légendes absolues. L'expérience ultime, réservée à une poignée de passionnés.", price: "3 499€", priceAmount: 3499, cars: 3 },
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, -100, 0],
          y: [0, 100, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[150px]"
      />
    </div>
  );
};

export default function Home() {
  const [openCategory, setOpenCategory] = useState<string | null>("Sportive");
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<number>(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  const closeCarModal = () => {
    setSelectedCar(null);
    setTimeout(() => setCheckoutStep(0), 300);
  };

  useEffect(() => {
    if (selectedCar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset" };
  }, [selectedCar]);

  const handleCheckout = async (itemName: string, itemPrice: number) => {
    try {
      setLoadingCheckout(itemName);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName, itemPrice }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Une erreur est survenue");
        setLoadingCheckout(null);
      }
    } catch (err) {
      alert("Erreur réseau");
      setLoadingCheckout(null);
    }
  };
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const globalCarX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* GLOBAL FIXED ANIMATED BACKGROUND IMAGE */}
      <motion.div style={{ opacity: bgOpacity }} className="fixed inset-0 z-[-3] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian/80 z-10"></div>
        <motion.div style={{ x: globalCarX }} className="absolute inset-0 w-[130%] h-[120%] top-[-10%] left-0">
          <Image 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2000" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-90"
            priority
          />
        </motion.div>
      </motion.div>

      <AnimatedBackground />

      {/* HERO SECTION */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 perspective-1000">

        
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-[9rem] font-black tracking-[0.2em] text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-silver to-white/50">
              ZENTURO
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-silver tracking-wide mb-12 max-w-3xl font-light"
          >
            L'abonnement automobile redéfini. Pilotez vos rêves une journée par mois sur notre circuit privé.
          </motion.p>

          <motion.a 
            href="#abonnements"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-white text-black font-bold rounded-full tracking-widest overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              DÉCOUVRIR LES OFFRES
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-silver to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.a>
        </div>
      </section>

      {/* SUBSCRIPTIONS SECTION */}
      <section id="abonnements" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-[0.1em] text-white mb-6">ABONNEMENTS</h2>
          <p className="text-silver text-xl md:text-2xl font-light max-w-2xl mx-auto">Trois niveaux d'intensité. Une expérience sans compromis.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBSCRIPTIONS.map((sub, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-surface/80 backdrop-blur-md border border-border-subtle hover:border-white/30 rounded-3xl p-10 transition-all duration-500 overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white tracking-[0.2em] mb-6">{sub.title}</h3>
                <p className="text-silver text-lg mb-12 flex-grow leading-relaxed">{sub.desc}</p>
              </div>

              <div className="relative z-10 flex flex-col mt-auto pt-8 border-t border-border-subtle">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-5xl font-bold text-white tracking-tighter">{sub.price}</span>
                    <span className="text-silver text-sm ml-2 tracking-widest uppercase">/ mois</span>
                  </div>
                  <span className="text-xs font-bold px-4 py-2 bg-obsidian border border-border-subtle rounded-full text-white tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {sub.cars} MODÈLES
                  </span>
                </div>
                <button 
                  onClick={() => handleCheckout(`Abonnement ${sub.title}`, sub.priceAmount)}
                  disabled={loadingCheckout === `Abonnement ${sub.title}`}
                  className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {loadingCheckout === `Abonnement ${sub.title}` ? <Loader2 className="w-5 h-5 animate-spin" /> : "SÉLECTIONNER"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STAGES DE CONDUITE (ONE-OFF) */}
      <section id="stages" className="relative py-32 px-6 bg-surface/30 border-y border-border-subtle overflow-hidden">
        {/* Glow effect behind */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <Image 
                src="https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=1000" 
                alt="Circuit de course" 
                fill 
                className="object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-2 bg-white text-black font-bold text-sm tracking-widest rounded-full">CIRCUIT INTÉGRÉ</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-[0.1em] text-white mb-8">STAGES À LA CARTE</h2>
            <p className="text-silver text-xl mb-10 leading-relaxed font-light">
              L'adrénaline à l'état pur, sans engagement. Réservez une session ponctuelle sur notre piste privée et défiez les lois de la physique au volant de supercars mythiques.
            </p>
            <ul className="space-y-6 mb-12">
              {["Réservation flexible au nombre de tours", "Coaching individuel par nos pilotes pros", "Paiement instantané Apple Pay & Stripe"].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                  className="flex items-center text-white text-lg tracking-wide"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-4">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.button 
              onClick={() => handleCheckout("Stage de Pilotage", 399)}
              disabled={loadingCheckout === "Stage de Pilotage"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block group px-10 py-4 border border-white/30 text-white font-bold rounded-full tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 flex items-center justify-center"
            >
              {loadingCheckout === "Stage de Pilotage" && <Loader2 className="w-5 h-5 animate-spin mr-3" />}
              RÉSERVER UN STAGE
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CATALOGUE SECTION */}
      <section id="catalogue" className="py-32 px-6 max-w-7xl mx-auto mb-40">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-[0.1em] text-white mb-6">LE CATALOGUE</h2>
          <p className="text-silver text-xl md:text-2xl font-light">10 chefs-d'œuvre de l'ingénierie automobile.</p>
        </motion.div>

        {/* TABS NAVIGATION */}
        <div className="flex justify-center gap-8 md:gap-16 mb-16 border-b border-white/10 pb-2">
          {["Sportive", "Supercar", "Hypercar"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setOpenCategory(tab)}
              className={`relative pb-4 text-sm md:text-xl font-bold tracking-widest uppercase transition-colors duration-300 ${openCategory === tab ? 'text-white' : 'text-silver/40 hover:text-white'}`}
            >
              {tab}
              {openCategory === tab && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-white"
                />
              )}
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={openCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {CARS.filter(c => c.category === openCategory).map((car) => (
                <div key={car.id} onClick={() => setSelectedCar(car)} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-6 shadow-2xl">
                    <Image 
                      src={car.image} 
                      alt={car.name} 
                      fill 
                      className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                    />
                    <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-700"></div>
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                      {car.badges.map(badge => (
                        <span key={badge} className="px-3 py-1 bg-obsidian/80 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-white rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-2">
                    <h4 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">{car.name}</h4>
                    <div className="flex items-center text-silver/60 group-hover:text-white transition-colors duration-300">
                      <span className="text-xs font-bold tracking-[0.2em]">DÉCOUVRIR LE VÉHICULE</span>
                      <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FLOATING DOCK */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-[#101111]/70 backdrop-blur-2xl border border-white/10 p-2.5 rounded-full flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="px-6 py-2">
            <span className="text-white font-black tracking-[0.15em]">ZENTURO</span>
            <span className="text-silver/70 ml-3 hidden sm:inline font-light tracking-wide">| Prêt à piloter ?</span>
          </div>
          <motion.button 
            onClick={() => handleCheckout("Pass Premium Zenturo", 999)}
            disabled={loadingCheckout === "Pass Premium Zenturo"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-3.5 rounded-full font-bold tracking-widest text-xs hover:bg-silver transition-all ml-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loadingCheckout === "Pass Premium Zenturo" ? <Loader2 className="w-4 h-4 animate-spin" /> : "RÉSERVER"}
          </motion.button>
        </div>
      </motion.div>

      {/* CAR DETAILS MODAL */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Overlay background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCarModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="relative w-full max-w-5xl bg-obsidian border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 max-h-[90vh]"
            >
              <button 
                onClick={closeCarModal}
                className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <Image 
                  src={selectedCar.image} 
                  alt={selectedCar.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                {checkoutStep === 0 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                    <span className="text-silver uppercase tracking-[0.3em] text-xs font-bold mb-2">{selectedCar.category}</span>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-wide mb-6">{selectedCar.name}</h3>
                    
                    <p className="text-[#a0a5b0] text-lg font-light leading-relaxed mb-8">
                      {selectedCar.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span className="text-silver text-xs uppercase tracking-widest block mb-1">Moteur</span>
                        <span className="text-white font-bold text-lg">{selectedCar.specs.engine}</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span className="text-silver text-xs uppercase tracking-widest block mb-1">Puissance</span>
                        <span className="text-white font-bold text-lg">{selectedCar.specs.power}</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span className="text-silver text-xs uppercase tracking-widest block mb-1">0 - 100 km/h</span>
                        <span className="text-white font-bold text-lg">{selectedCar.specs.acceleration}</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span className="text-silver text-xs uppercase tracking-widest block mb-1">Vitesse Max</span>
                        <span className="text-white font-bold text-lg">{selectedCar.specs.topSpeed}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button 
                        onClick={() => setCheckoutStep(1)}
                        className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300 flex items-center justify-center"
                      >
                        RÉSERVER CE MODÈLE
                      </button>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                    <button onClick={() => setCheckoutStep(0)} className="flex items-center text-silver hover:text-white mb-6 text-sm tracking-widest uppercase transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Retour</button>
                    <div className="flex items-center mb-8">
                      <Calendar className="w-8 h-8 text-white mr-4" />
                      <h3 className="text-3xl font-black text-white tracking-wide">Date & Heure</h3>
                    </div>
                    
                    <div className="space-y-6 flex-grow">
                      <div>
                        <label className="block text-silver text-sm uppercase tracking-widest mb-2">Départ</label>
                        <div className="flex gap-4">
                          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/50" defaultValue="2026-05-10" />
                          <input type="time" className="w-1/3 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/50" defaultValue="09:00" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-silver text-sm uppercase tracking-widest mb-2">Retour</label>
                        <div className="flex gap-4">
                          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/50" defaultValue="2026-05-11" />
                          <input type="time" className="w-1/3 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/50" defaultValue="18:00" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <button 
                        onClick={() => setCheckoutStep(2)}
                        className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300"
                      >
                        CONTINUER
                      </button>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                    <button onClick={() => setCheckoutStep(1)} className="flex items-center text-silver hover:text-white mb-6 text-sm tracking-widest uppercase transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Retour</button>
                    <div className="flex items-center mb-8">
                      <User className="w-8 h-8 text-white mr-4" />
                      <h3 className="text-3xl font-black text-white tracking-wide">Informations</h3>
                    </div>
                    
                    <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="PRÉNOM" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                        <input type="text" placeholder="NOM" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      </div>
                      <input type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      <input type="text" placeholder="TÉLÉPHONE" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      <input type="text" placeholder="ADRESSE COMPLÈTE" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="ÂGE" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                        <input type="text" placeholder="N° PERMIS" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      </div>
                    </div>

                    <div className="mt-8">
                      <button 
                        onClick={() => setCheckoutStep(3)}
                        className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300"
                      >
                        CONTINUER AU PAIEMENT
                      </button>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                    <button onClick={() => setCheckoutStep(2)} className="flex items-center text-silver hover:text-white mb-6 text-sm tracking-widest uppercase transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Retour</button>
                    <div className="flex items-center mb-8">
                      <CreditCard className="w-8 h-8 text-white mr-4" />
                      <h3 className="text-3xl font-black text-white tracking-wide">Paiement</h3>
                    </div>
                    
                    <div className="space-y-4 flex-grow">
                      <button className="w-full py-4 bg-black border border-white text-white font-bold rounded-xl tracking-widest flex items-center justify-center hover:bg-white hover:text-black transition-colors mb-6">
                         Pay
                      </button>
                      <div className="text-center text-silver text-xs tracking-widest mb-6">OU CARTE BANCAIRE</div>
                      
                      <input type="text" placeholder="NUMÉRO DE CARTE" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/AA" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                        <input type="text" placeholder="CVC" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                      </div>
                      <input type="text" placeholder="NOM SUR LA CARTE" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50" />
                    </div>

                    <div className="mt-8 flex justify-between items-center px-2 mb-4">
                      <span className="text-silver uppercase tracking-widest text-sm">Total à payer</span>
                      <span className="text-3xl font-bold text-white">1 500 €</span>
                    </div>

                    <div>
                      <button 
                        onClick={() => {
                          setIsProcessingPayment(true);
                          setTimeout(() => {
                            setIsProcessingPayment(false);
                            setCheckoutStep(4);
                          }, 2000);
                        }}
                        disabled={isProcessingPayment}
                        className="w-full py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                      >
                        {isProcessingPayment && <Loader2 className="w-5 h-5 animate-spin mr-3" />}
                        PAYER MAINTENANT
                      </button>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 4 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full items-center justify-center text-center">
                    <CheckCircle className="w-24 h-24 text-green-500 mb-8" />
                    <h3 className="text-4xl font-black text-white tracking-wide mb-4 uppercase">Réservation Confirmée</h3>
                    <p className="text-silver text-lg mb-12">
                      Félicitations, votre {selectedCar.name} est réservée. Un email de confirmation vous a été envoyé.
                    </p>
                    <button 
                      onClick={closeCarModal}
                      className="px-10 py-4 bg-white text-black font-bold rounded-full tracking-widest hover:bg-silver transition-all duration-300"
                    >
                      FERMER
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
