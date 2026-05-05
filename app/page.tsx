import Image from "next/image";

const CARS = [
  { id: 1, name: "BMW M4 Competition", category: "Sportive", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800", badges: ["NOUVEAUTÉ", "510 CH"] },
  { id: 2, name: "Audi RS6 Avant", category: "Sportive", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800", badges: ["V8", "QUATTRO"] },
  { id: 3, name: "Mercedes AMG GT", category: "Sportive", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=800", badges: ["V8 BITURBO"] },
  { id: 4, name: "Porsche 718 Cayman", category: "Sportive", image: "https://images.unsplash.com/photo-1503376712341-0048238e9ee0?q=80&w=800", badges: ["CIRCUIT"] },
  { id: 5, name: "Ferrari F8 Tributo", category: "Supercar", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800", badges: ["V8", "720 CH"] },
  { id: 6, name: "Lamborghini Huracán", category: "Supercar", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800", badges: ["V10"] },
  { id: 7, name: "McLaren 720S", category: "Supercar", image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800", badges: ["AÉRO"] },
  { id: 8, name: "Bugatti Chiron", category: "Hypercar", image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800", badges: ["W16", "1500 CH"] },
  { id: 9, name: "Pagani Huayra", category: "Hypercar", image: "https://images.unsplash.com/photo-1545642412-1cd925187af7?q=80&w=800", badges: ["V12", "ART"] },
  { id: 10, name: "Koenigsegg Jesko", category: "Hypercar", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800", badges: ["V8", "PISTE"] } // Unsplash doesn't have a reliable Jesko, using a fallback exotic
];

const SUBSCRIPTIONS = [
  { title: "SPORTIVE", desc: "4 véhicules d'exception. Idéal pour s'initier aux sensations fortes sur notre circuit.", price: "499€", cars: 4 },
  { title: "SUPERCAR", desc: "3 monstres de puissance. Accédez à l'élite de l'ingénierie automobile.", price: "1 299€", cars: 3 },
  { title: "HYPERCAR", desc: "3 légendes absolues. L'expérience ultime, réservée à une poignée de passionnés.", price: "3 499€", cars: 3 },
];

export default function Home() {
  return (
    <div className="relative w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/80 to-obsidian z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2000" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-20">
          <h1 className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-white mb-6">
            OBSIDIAN GT
          </h1>
          <p className="text-xl md:text-2xl text-silver tracking-wide mb-12 max-w-2xl font-light">
            L'abonnement automobile ultime. Pilotez vos rêves une journée par mois sur notre circuit intégré.
          </p>
          <a href="#abonnements" className="px-8 py-4 bg-white text-black font-semibold rounded-full tracking-widest hover:bg-silver transition-colors duration-300">
            DÉCOUVRIR LES OFFRES
          </a>
        </div>
      </section>

      {/* SUBSCRIPTIONS SECTION */}
      <section id="abonnements" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.1em] text-white mb-4">ABONNEMENTS</h2>
          <p className="text-silver text-lg">Roulez une journée entière par mois avec la voiture de votre choix.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBSCRIPTIONS.map((sub, i) => (
            <div key={i} className="group relative bg-surface border border-border-subtle rounded-2xl p-8 hover:bg-surface-hover transition-all duration-500 overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-bold text-white tracking-[0.15em] mb-4">{sub.title}</h3>
              <p className="text-silver mb-8 flex-grow">{sub.desc}</p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <span className="text-3xl font-bold text-white">{sub.price}</span>
                  <span className="text-silver text-sm ml-1">/ mois</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-obsidian border border-border-subtle rounded-full text-silver">
                  {sub.cars} MODÈLES
             </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STAGES DE CONDUITE (ONE-OFF) */}
      <section className="py-24 px-6 bg-surface/50 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border-subtle">
              <Image 
                src="https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=1000" 
                alt="Circuit de course" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold tracking-[0.1em] text-white mb-6">STAGES À LA CARTE</h2>
            <p className="text-silver text-lg mb-8">
              Pas besoin d'abonnement pour ressentir l'adrénaline. Réservez une session ponctuelle sur notre circuit intégré et payez au nombre de tours. Une expérience brute, encadrée par nos pilotes professionnels.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-silver">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                Réservation au nombre de tours (ex: 5 tours)
              </li>
              <li className="flex items-center text-silver">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                Briefing de sécurité et coaching personnalisé
              </li>
              <li className="flex items-center text-silver">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                Paiement simple par carte ou Apple Pay
              </li>
            </ul>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-full tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
              RÉSERVER UN STAGE
            </button>
          </div>
        </div>
      </section>

      {/* CATALOGUE SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.1em] text-white mb-4">LE CATALOGUE</h2>
          <p className="text-silver text-lg">10 véhicules d'exception répartis dans nos 3 niveaux d'abonnement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARS.map((car) => (
            <div key={car.id} className="group relative bg-surface border border-border-subtle rounded-xl overflow-hidden cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill 
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-2.5 py-1 bg-[#1b1c1e]/90 backdrop-blur text-[10px] font-bold tracking-wider text-white rounded">
                    {car.category.toUpperCase()}
                  </span>
                  {car.badges.map(badge => (
                    <span key={badge} className="px-2.5 py-1 bg-white/10 backdrop-blur border border-white/10 text-[10px] font-bold tracking-wider text-white rounded">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white tracking-wide">{car.name}</h4>
                <div className="mt-4 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm text-silver">Découvrir</span>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLOATING DOCK */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[#101111]/80 backdrop-blur-xl border border-border-subtle p-2 rounded-full flex items-center shadow-2xl">
          <div className="px-6 py-2">
            <span className="text-white font-bold tracking-[0.1em]">OBSIDIAN</span>
            <span className="text-silver ml-2 hidden sm:inline">| Prêt à piloter ?</span>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-full font-bold tracking-widest text-sm hover:bg-silver transition-colors whitespace-nowrap ml-4">
            RÉSERVER
          </button>
        </div>
      </div>
    </div>
  );
}
