import suv from "@/assets/car-suv.jpg";
import sedan from "@/assets/car-sedan.jpg";
import hatch from "@/assets/car-hatch.jpg";
import sport from "@/assets/car-sport.jpg";
import pickup from "@/assets/car-pickup.jpg";
import electric from "@/assets/car-electric.jpg";

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  year: number;
  category: "SUV" | "Sedan" | "Hatch" | "Esportivo" | "Picape" | "Elétrico";
  transmission: "Automático" | "Manual";
  fuel: "Gasolina" | "Flex" | "Diesel" | "Elétrico";
  seats: number;
  pricePerDay: number;
  rating: number;
  trips: number;
  city: string;
  image: string;
  owner: string;
  features: string[];
};

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Volvo XC40",
    brand: "Volvo",
    year: 2023,
    category: "SUV",
    transmission: "Automático",
    fuel: "Flex",
    seats: 5,
    pricePerDay: 389,
    rating: 4.9,
    trips: 142,
    city: "São Paulo, SP",
    image: suv,
    owner: "Ricardo M.",
    features: ["Ar-condicionado", "GPS", "Bluetooth", "Câmera de ré", "Cadeirinha"],
  },
  {
    id: "v2",
    name: "BMW Série 5",
    brand: "BMW",
    year: 2024,
    category: "Sedan",
    transmission: "Automático",
    fuel: "Gasolina",
    seats: 5,
    pricePerDay: 720,
    rating: 5.0,
    trips: 87,
    city: "Rio de Janeiro, RJ",
    image: sedan,
    owner: "Camila R.",
    features: ["Couro", "Teto solar", "GPS", "Bluetooth", "Som premium"],
  },
  {
    id: "v3",
    name: "VW Polo Track",
    brand: "Volkswagen",
    year: 2023,
    category: "Hatch",
    transmission: "Manual",
    fuel: "Flex",
    seats: 5,
    pricePerDay: 159,
    rating: 4.7,
    trips: 231,
    city: "Belo Horizonte, MG",
    image: hatch,
    owner: "Lucas P.",
    features: ["Ar-condicionado", "Bluetooth", "USB", "Direção elétrica"],
  },
  {
    id: "v4",
    name: "Mazda MX-5",
    brand: "Mazda",
    year: 2022,
    category: "Esportivo",
    transmission: "Manual",
    fuel: "Gasolina",
    seats: 2,
    pricePerDay: 549,
    rating: 4.8,
    trips: 64,
    city: "Curitiba, PR",
    image: sport,
    owner: "Marina S.",
    features: ["Conversível", "Couro", "Bluetooth", "Som premium"],
  },
  {
    id: "v5",
    name: "Chevrolet S10",
    brand: "Chevrolet",
    year: 2023,
    category: "Picape",
    transmission: "Automático",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 429,
    rating: 4.9,
    trips: 118,
    city: "Brasília, DF",
    image: pickup,
    owner: "André F.",
    features: ["4x4", "Ar-condicionado", "GPS", "Engate", "Capota marítima"],
  },
  {
    id: "v6",
    name: "BYD Yuan Plus",
    brand: "BYD",
    year: 2024,
    category: "Elétrico",
    transmission: "Automático",
    fuel: "Elétrico",
    seats: 5,
    pricePerDay: 459,
    rating: 4.9,
    trips: 73,
    city: "Florianópolis, SC",
    image: electric,
    owner: "Beatriz L.",
    features: ["100% elétrico", "Carregador", "Teto solar", "GPS", "Câmera 360°"],
  },
];

export const categories = ["Todos", "SUV", "Sedan", "Hatch", "Esportivo", "Picape", "Elétrico"] as const;

export const reservations = [
  { id: "r1", vehicleId: "v1", start: "12 mai 2026", end: "15 mai 2026", status: "Confirmada", total: 1167 },
  { id: "r2", vehicleId: "v6", start: "02 jun 2026", end: "05 jun 2026", status: "Aguardando", total: 1377 },
  { id: "r3", vehicleId: "v3", start: "20 abr 2026", end: "22 abr 2026", status: "Concluída", total: 318 },
  { id: "r4", vehicleId: "v4", start: "10 mar 2026", end: "12 mar 2026", status: "Concluída", total: 1098 },
];

export const earnings = [
  { month: "Nov", value: 2400 },
  { month: "Dez", value: 3200 },
  { month: "Jan", value: 2800 },
  { month: "Fev", value: 4100 },
  { month: "Mar", value: 3700 },
  { month: "Abr", value: 5200 },
];
