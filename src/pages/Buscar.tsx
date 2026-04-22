import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles, categories } from "@/data/vehicles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const transmissions = ["Automático", "Manual"] as const;
const fuels = ["Flex", "Gasolina", "Diesel", "Elétrico"] as const;

const Buscar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const [price, setPrice] = useState<[number]>([800]);
  const [trans, setTrans] = useState<string[]>([]);
  const [fuel, setFuel] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState(false);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (category !== "Todos" && v.category !== category) return false;
      if (v.pricePerDay > price[0]) return false;
      if (trans.length && !trans.includes(v.transmission)) return false;
      if (fuel.length && !fuel.includes(v.fuel)) return false;
      if (query) {
        const q = query.toLowerCase();
        if (![v.name, v.brand, v.city].some((s) => s.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [category, price, trans, fuel, query]);

  const toggle = (arr: string[], v: string, set: (s: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <SiteLayout>
      {/* Search bar */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-8">
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Encontre seu próximo veículo</h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} veículos disponíveis</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cidade, marca ou modelo"
                className="h-12 rounded-xl border-border bg-card pl-11"
              />
            </div>
            <Button variant="hero" size="lg" className="h-12">
              <Search className="h-4 w-4" /> Buscar
            </Button>
            <Button variant="outline" size="lg" className="h-12 lg:hidden" onClick={() => setOpenFilter(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Filtros
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        {/* Filters - desktop */}
        <aside className="hidden lg:block">
          <FilterPanel
            price={price}
            setPrice={setPrice}
            trans={trans}
            fuel={fuel}
            toggle={toggle}
            setTrans={setTrans}
            setFuel={setFuel}
          />
        </aside>

        {/* Filters - mobile drawer */}
        {openFilter && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpenFilter(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-background p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Filtros</h3>
                <button onClick={() => setOpenFilter(false)} className="rounded-lg p-2"><X className="h-5 w-5" /></button>
              </div>
              <FilterPanel
                price={price}
                setPrice={setPrice}
                trans={trans}
                fuel={fuel}
                toggle={toggle}
                setTrans={setTrans}
                setFuel={setFuel}
              />
            </div>
          </div>
        )}

        {/* Grid */}
        <div>
          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
              <h3 className="font-display text-xl font-bold">Nenhum veículo encontrado</h3>
              <p className="mt-2 text-muted-foreground">Tente ajustar os filtros para ver mais opções.</p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

const FilterPanel = ({
  price,
  setPrice,
  trans,
  fuel,
  toggle,
  setTrans,
  setFuel,
}: {
  price: [number];
  setPrice: (v: [number]) => void;
  trans: string[];
  fuel: string[];
  toggle: (arr: string[], v: string, set: (s: string[]) => void) => void;
  setTrans: (s: string[]) => void;
  setFuel: (s: string[]) => void;
}) => (
  <div className="space-y-7 rounded-3xl border border-border bg-card p-6 shadow-soft">
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider">Preço por dia</h4>
      <div className="mt-4">
        <Slider value={price} max={1000} step={50} onValueChange={(v) => setPrice([v[0]] as [number])} />
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Até</span>
          <span className="font-display font-bold">R${price[0]}</span>
        </div>
      </div>
    </div>

    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider">Transmissão</h4>
      <div className="mt-4 space-y-3">
        {transmissions.map((t) => (
          <div key={t} className="flex items-center gap-3">
            <Checkbox
              id={`t-${t}`}
              checked={trans.includes(t)}
              onCheckedChange={() => toggle(trans, t, setTrans)}
            />
            <Label htmlFor={`t-${t}`} className="cursor-pointer text-sm">{t}</Label>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider">Combustível</h4>
      <div className="mt-4 space-y-3">
        {fuels.map((f) => (
          <div key={f} className="flex items-center gap-3">
            <Checkbox
              id={`f-${f}`}
              checked={fuel.includes(f)}
              onCheckedChange={() => toggle(fuel, f, setFuel)}
            />
            <Label htmlFor={`f-${f}`} className="cursor-pointer text-sm">{f}</Label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Buscar;
