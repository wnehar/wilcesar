export type CatalogCar = {
  id: number;
  name: string;
  category: string;
  image: string;
  badges: string[];
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  description: string;
};

export const CARS: CatalogCar[] = [
  {
    id: 1,
    name: "BMW M4 Competition",
    category: "Sportive",
    image: "/cars/bmw_m4.jpg",
    badges: ["NOUVEAUTÉ", "510 CH"],
    specs: {
      engine: "6 en ligne 3.0L Bi-Turbo",
      power: "510 CH",
      acceleration: "3.9s",
      topSpeed: "290 km/h",
    },
    description:
      "La quintessence de la sportivité allemande. Un coupé racé offrant un compromis parfait entre confort au quotidien et performances redoutables.",
  },
  {
    id: 2,
    name: "Audi RS6 Avant",
    category: "Sportive",
    image: "/cars/audi_rs6.avif",
    badges: ["V8", "QUATTRO"],
    specs: {
      engine: "V8 4.0L TFSI Bi-Turbo",
      power: "600 CH",
      acceleration: "3.6s",
      topSpeed: "305 km/h",
    },
    description:
      "Le break familial le plus brutal du marché. Une polyvalence exceptionnelle couplée à des accélérations foudroyantes grâce au système Quattro.",
  },
  {
    id: 3,
    name: "Mercedes AMG GT",
    category: "Sportive",
    image: "/cars/mercedes_amg_gt.jpg",
    badges: ["V8 BITURBO"],
    specs: {
      engine: "V8 4.0L Bi-Turbo",
      power: "585 CH",
      acceleration: "3.6s",
      topSpeed: "318 km/h",
    },
    description:
      "L'esprit de la course automobile encapsulé dans une silhouette d'une élégance rare. Un V8 tonitruant signé Affalterbach.",
  },
  {
    id: 5,
    name: "Ferrari F8 Tributo",
    category: "Supercar",
    image: "/cars/ferrari_f8.jpg",
    badges: ["V8", "720 CH"],
    specs: {
      engine: "V8 3.9L Bi-Turbo",
      power: "720 CH",
      acceleration: "2.9s",
      topSpeed: "340 km/h",
    },
    description:
      "Un hommage roulant au moteur V8 le plus primé de l'histoire de Maranello. Une agilité phénoménale sur piste comme sur route.",
  },
  {
    id: 6,
    name: "Lamborghini Huracán",
    category: "Supercar",
    image: "/cars/lamborghini_huracan.jpg",
    badges: ["V10"],
    specs: {
      engine: "V10 5.2L Atmosphérique",
      power: "640 CH",
      acceleration: "2.9s",
      topSpeed: "325 km/h",
    },
    description:
      "Le hurlement de son V10 atmosphérique est légendaire. Un taureau mécanique sculpté pour l'émotion pure et la précision chirurgicale.",
  },
  {
    id: 7,
    name: "McLaren 720S",
    category: "Supercar",
    image: "/cars/mclaren_720s.jpg",
    badges: ["AÉRO"],
    specs: {
      engine: "V8 4.0L Bi-Turbo",
      power: "720 CH",
      acceleration: "2.9s",
      topSpeed: "341 km/h",
    },
    description:
      "La supercar britannique qui redéfinit les lois de l'aérodynamisme. Légère, incisive et d'une vélocité diabolique.",
  },
  {
    id: 8,
    name: "Bugatti Chiron",
    category: "Hypercar",
    image: "/cars/bugatti_chiron.jpg",
    badges: ["W16", "1500 CH"],
    specs: {
      engine: "W16 8.0L Quadri-Turbo",
      power: "1500 CH",
      acceleration: "2.4s",
      topSpeed: "420 km/h",
    },
    description:
      "L'apogée absolue de l'ingénierie automobile. Une hypercar hors norme alliant luxe royal et vitesse de pointe vertigineuse.",
  },
  {
    id: 9,
    name: "Pagani Huayra",
    category: "Hypercar",
    image: "/cars/pagani_huayra.jpg",
    badges: ["V12", "ART"],
    specs: {
      engine: "V12 6.0L Bi-Turbo (AMG)",
      power: "730 CH",
      acceleration: "2.8s",
      topSpeed: "383 km/h",
    },
    description:
      "Une œuvre d'art sur roues forgée en titane et carbone. Chaque détail de la Huayra a été dessiné par le maître Horacio Pagani.",
  },
  {
    id: 10,
    name: "Koenigsegg Jesko",
    category: "Hypercar",
    image: "/cars/jesko.jpg",
    badges: ["V8", "PISTE"],
    specs: {
      engine: "V8 5.0L Bi-Turbo",
      power: "1600 CH",
      acceleration: "2.5s",
      topSpeed: "480 km/h",
    },
    description:
      "Un monstre taillé pour pulvériser les records. Équipée d'une transmission révolutionnaire LST et d'un appui aérodynamique colossal.",
  },
];
