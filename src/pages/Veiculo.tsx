import { useParams, Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star, MapPin, Users, Cog, Fuel, ShieldCheck, Calendar,
  ArrowLeft, Heart, Share2, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Veiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === id);
  const [days, setDays] = useState(3);

  if (!vehicle) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Veículo não encontrado</h1>
          <Button asChild className="mt-6"><Link to="/buscar">Voltar à busca</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  const subtotal = vehicle.pricePerDay * days;
  const fee = Math.round(subtotal * 0.12);
  const insurance = Math.round(subtotal * 0.08);
  const total = subtotal + fee + insurance;

  return (
    <SiteLayout>
      <section className="container py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* GALLERY + INFO */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img
                src={vehicle.image}
                alt={`${vehicle.brand} ${vehicle.name}`}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card opacity-90 hover:opacity-100">
                  <img src={vehicle.image} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge variant="secondary">{vehicle.category}</Badge>
                <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
                  {vehicle.brand} {vehicle.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /> {vehicle.rating} · {vehicle.trips} viagens</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {vehicle.city}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Users, label: "Lugares", value: vehicle.seats },
                { icon: Cog, label: "Câmbio", value: vehicle.transmission },
                { icon: Fuel, label: "Combustível", value: vehicle.fuel },
                { icon: Calendar, label: "Ano", value: vehicle.year },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                  <s.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="font-display text-lg font-bold">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold">Sobre o veículo</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Veículo impecável, revisado em concessionária e com seguro completo. Ideal para viagens em família,
                trabalho ou aquele passeio especial. O proprietário é parceiro Aluugar verificado e responde rápido.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold">Recursos</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {vehicle.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-display text-xl font-bold text-primary-foreground">
                  {vehicle.owner.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-bold">Anunciado por {vehicle.owner}</div>
                  <div className="text-sm text-muted-foreground">Membro desde 2023 · Resposta em ~1h</div>
                </div>
              </div>
            </div>
          </div>

          {/* RESERVATION PANEL */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-elevated">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-display text-4xl font-extrabold">R${vehicle.pricePerDay}</span>
                  <span className="text-sm text-muted-foreground">/dia</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {vehicle.rating}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retirada</label>
                  <input type="date" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Devolução</label>
                  <input type="date" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dias</label>
                <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-border bg-background p-1">
                  <button onClick={() => setDays(Math.max(1, days - 1))} className="h-9 w-9 rounded-lg bg-secondary font-bold">–</button>
                  <span className="flex-1 text-center font-display text-lg font-bold">{days}</span>
                  <button onClick={() => setDays(days + 1)} className="h-9 w-9 rounded-lg bg-secondary font-bold">+</button>
                </div>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>R${vehicle.pricePerDay} × {days} dias</span><span>R${subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxa de serviço</span><span>R${fee}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Seguro</span><span>R${insurance}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-extrabold">
                  <span>Total</span><span>R${total}</span>
                </div>
              </div>

              <Button variant="accent" size="xl" className="mt-6 w-full" onClick={() => toast.success("Reserva solicitada! Verifique seu painel.")}>
                Reservar agora
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Cancelamento grátis até 24h antes
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Veiculo;
