import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { vehicles, reservations, earnings } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar, Car, DollarSign, Heart, Settings, Star, TrendingUp,
  Users, MapPin, ArrowUpRight, Wallet, MessageSquare, BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid,
} from "recharts";

type Tab = "renter" | "owner";

const Painel = () => {
  const [tab, setTab] = useState<Tab>("renter");

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Painel</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">Olá, Carolina 👋</h1>
              <p className="mt-2 text-muted-foreground">Acompanhe suas reservas, ganhos e atividades em um só lugar.</p>
            </div>
            <div className="inline-flex rounded-2xl border border-border bg-card p-1 shadow-soft">
              {([
                { k: "renter", label: "Como locatário", icon: Users },
                { k: "owner", label: "Como locador", icon: Car },
              ] as const).map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                    tab === t.k ? "bg-foreground text-background shadow-soft" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        {tab === "renter" ? <RenterPanel /> : <OwnerPanel />}
      </section>
    </SiteLayout>
  );
};

const Stat = ({ icon: Icon, label, value, hint, accent }: { icon: any; label: string; value: string; hint?: string; accent?: boolean }) => (
  <div className={cn("rounded-3xl border p-6 shadow-soft", accent ? "border-transparent bg-gradient-primary text-primary-foreground" : "border-border bg-card")}>
    <div className="flex items-center justify-between">
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", accent ? "bg-primary-foreground/20" : "bg-secondary")}>
        <Icon className={cn("h-5 w-5", accent ? "text-primary-foreground" : "text-primary")} />
      </div>
      {hint && (
        <span className={cn("flex items-center gap-1 text-xs font-semibold", accent ? "text-primary-foreground/90" : "text-success")}>
          <TrendingUp className="h-3 w-3" /> {hint}
        </span>
      )}
    </div>
    <div className="mt-5 font-display text-3xl font-extrabold">{value}</div>
    <div className={cn("mt-1 text-xs uppercase tracking-wider", accent ? "text-primary-foreground/80" : "text-muted-foreground")}>{label}</div>
  </div>
);

const RenterPanel = () => {
  const upcoming = reservations.filter((r) => r.status !== "Concluída");
  const past = reservations.filter((r) => r.status === "Concluída");

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
        <Stat icon={Calendar} label="Próximas reservas" value={String(upcoming.length)} hint="ativas" />
        <Stat icon={Car} label="Viagens concluídas" value="12" hint="+3 este mês" />
        <Stat icon={Heart} label="Favoritos" value="8" />
        <Stat icon={Wallet} label="Gasto este mês" value="R$1.485" hint="-12%" accent />
      </div>

      {/* Upcoming reservations */}
      <div className="lg:col-span-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">Próximas reservas</h3>
            <Button variant="ghost" size="sm">Ver todas <ArrowUpRight className="h-4 w-4" /></Button>
          </div>
          <div className="mt-5 space-y-4">
            {upcoming.map((r) => {
              const v = vehicles.find((x) => x.id === r.vehicleId)!;
              return (
                <Link
                  key={r.id}
                  to={`/veiculo/${v.id}`}
                  className="group flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-soft"
                >
                  <img src={v.image} alt={v.name} className="h-20 w-28 rounded-xl object-cover" />
                  <div className="flex-1 min-w-[180px]">
                    <div className="font-display font-bold">{v.brand} {v.name}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{r.start} → {r.end}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{v.city}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={r.status === "Confirmada" ? "default" : "secondary"}>{r.status}</Badge>
                    <div className="mt-1 font-display text-lg font-extrabold">R${r.total}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-xl font-bold">Histórico</h3>
          <div className="mt-5 divide-y divide-border">
            {past.map((r) => {
              const v = vehicles.find((x) => x.id === r.vehicleId)!;
              return (
                <div key={r.id} className="flex items-center gap-4 py-4">
                  <img src={v.image} alt={v.name} className="h-12 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold">{v.brand} {v.name}</div>
                    <div className="text-xs text-muted-foreground">{r.start} → {r.end}</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-accent text-accent" /> {v.rating}
                  </div>
                  <div className="font-display font-bold">R${r.total}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side */}
      <div className="space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-xl font-bold">Favoritos</h3>
          <div className="mt-4 space-y-3">
            {vehicles.slice(0, 3).map((v) => (
              <Link key={v.id} to={`/veiculo/${v.id}`} className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-secondary">
                <img src={v.image} alt={v.name} className="h-14 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-semibold leading-tight">{v.brand} {v.name}</div>
                  <div className="text-xs text-muted-foreground">R${v.pricePerDay}/dia</div>
                </div>
                <Heart className="h-4 w-4 fill-accent text-accent" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-transparent bg-gradient-primary p-6 text-primary-foreground shadow-glow">
          <Settings className="h-6 w-6" />
          <h3 className="mt-3 font-display text-xl font-bold">Pronto para anunciar?</h3>
          <p className="mt-2 text-sm text-primary-foreground/85">Transforme seu carro em renda extra. Cadastre em minutos.</p>
          <Button variant="accent" className="mt-5 w-full" asChild>
            <Link to="/anunciar">Começar agora</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const OwnerPanel = () => {
  const totalEarn = earnings.reduce((a, b) => a + b.value, 0);
  const myCars = vehicles.slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
        <Stat icon={DollarSign} label="Ganhos totais" value={`R$${totalEarn.toLocaleString("pt-BR")}`} hint="+24%" accent />
        <Stat icon={Car} label="Veículos ativos" value={String(myCars.length)} />
        <Stat icon={Calendar} label="Reservas no mês" value="14" hint="+5" />
        <Stat icon={Star} label="Avaliação média" value="4.9" hint="excelente" />
      </div>

      {/* Earnings chart */}
      <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold">Ganhos mensais</h3>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </div>
          <Badge variant="secondary"><BarChart3 className="mr-1 h-3 w-3" /> Crescente</Badge>
        </div>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earnings}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
                formatter={(v: number) => [`R$${v}`, "Ganhos"]}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mini stats */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-xl font-bold">Performance por veículo</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={myCars.map((c) => ({ name: c.name.split(" ")[0], trips: c.trips }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="trips" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* My cars */}
      <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">Meus veículos</h3>
          <Button variant="hero" size="sm" asChild><Link to="/anunciar">+ Adicionar</Link></Button>
        </div>
        <div className="mt-5 space-y-3">
          {myCars.map((v) => (
            <div key={v.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-4">
              <img src={v.image} alt={v.name} className="h-16 w-24 rounded-xl object-cover" />
              <div className="flex-1 min-w-[160px]">
                <div className="font-display font-bold">{v.brand} {v.name}</div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{v.rating}</span>
                  <span>{v.trips} viagens</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{v.city}</span>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground hover:bg-success">Ativo</Badge>
              <div className="text-right">
                <div className="font-display font-extrabold">R${v.pricePerDay}</div>
                <div className="text-xs text-muted-foreground">/dia</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-xl font-bold">Mensagens recentes</h3>
        <div className="mt-4 space-y-3">
          {[
            { name: "Pedro L.", msg: "Posso retirar mais cedo?", time: "10min" },
            { name: "Ana B.", msg: "O carro tem cadeirinha?", time: "1h" },
            { name: "João S.", msg: "Obrigado pela viagem!", time: "ontem" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                {m.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{m.name}</span>
                  <span className="text-xs text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Painel;
