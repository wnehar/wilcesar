"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const CARS = [
  { id: 1, name: "BMW M4 Competition", category: "Sportive", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800", badges: ["NOUVEAUTÉ", "510 CH"] },
  { id: 2, name: "Audi RS6 Avant", category: "Sportive", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800", badges: ["V8", "QUATTRO"] },
  { id: 3, name: "Mercedes AMG GT", category: "Sportive", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=800", badges: ["V8 BITURBO"] },
  { id: 5, name: "Ferrari F8 Tributo", category: "Supercar", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800", badges: ["V8", "720 CH"] },
  { id: 6, name: "Lamborghini Huracán", category: "Supercar", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800", badges: ["V10"] },
  { id: 7, name: "McLaren 720S", category: "Supercar", image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800", badges: ["AÉRO"] },
  { id: 8, name: "Bugatti Chiron", category: "Hypercar", image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800", badges: ["W16", "1500 CH"] },
  { id: 9, name: "Pagani Huayra", category: "Hypercar", image: "https://images.unsplash.com/photo-1545642412-1cd925187af7?q=80&w=800", badges: ["V12", "ART"] },
  { id: 10, name: "Koenigsegg Jesko", category: "Hypercar", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800", badges: ["V8", "PISTE"] }
];

const SUBSCRIPTIONS = [
  { title: "SPORTIVE", desc: "4 véhicules d'exception. Idéal pour s'initier aux sensations fortes sur notre circuit.", price: "499€", cars: 4 },
  { title: "SUPERCAR", desc: "3 monstres de puissance. Accédez à l'élite de l'ingénierie automobile.", price: "1 299€", cars: 3 },
  { title: "HYPERCAR", desc: "3 légendes absolues. L'expérience ultime, réservée à une poignée de passionnés.", price: "3 499€", cars: 3 },
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

              <div className="relative z-10 flex items-end justify-between mt-auto pt-8 border-t border-border-subtle">
                <div>
                  <span className="text-5xl font-bold text-white tracking-tighter">{sub.price}</span>
                  <span className="text-silver text-sm ml-2 tracking-widest uppercase">/ mois</span>
                </div>
                <span className="text-xs font-bold px-4 py-2 bg-obsidian border border-border-subtle rounded-full text-white tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {sub.cars} MODÈLES
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STAGES DE CONDUITE (ONE-OFF) */}
      <section className="relative py-32 px-6 bg-surface/30 border-y border-border-subtle overflow-hidden">
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
            <button className="group px-10 py-4 border border-white/30 text-white font-bold rounded-full tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              RÉSERVER UN STAGE
            </button>
          </motion.div>
        </div>
      </section>

      {/* CATALOGUE SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto mb-40">
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
                <div key={car.id} className="group cursor-pointer">
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
          <button className="bg-white text-black px-8 py-3.5 rounded-full font-bold tracking-widest text-xs hover:bg-silver hover:scale-105 transition-all ml-4 flex items-center gap-2">
            RÉSERVER
          </button>
        </div>
      </motion.div>
    </div>
  );
}
