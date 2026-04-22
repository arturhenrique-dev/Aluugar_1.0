import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Search, ShieldCheck, Sparkles, Star, Zap, Users, Car } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import heroCar from "@/assets/hero-car.jpg";

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroCar} alt="Carro esportivo na cidade" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container grid gap-12 py-20 md:grid-cols-2 md:py-28 lg:py-36">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              A nova forma de alugar veículos
            </span>

            <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Liberdade<br />
              para explorar<br />
              <span className="gradient-text">seu caminho</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Conectamos você aos melhores veículos da sua região com segurança, conforto e praticidade incomparáveis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="accent" size="xl" asChild>
                <Link to="/buscar">Encontrar veículo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/anunciar">Anunciar meu carro</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { value: "12k+", label: "Veículos" },
                { value: "230+", label: "Cidades" },
                { value: "4.9", label: "Avaliação" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-extrabold">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search panel */}
          <div className="md:pl-8">
            <div className="glass-panel animate-fade-up rounded-3xl p-7" style={{ animationDelay: "150ms" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold">Busca Rápida</h3>
                <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                  Disponível agora
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Localização</label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Cidade ou endereço" className="h-12 rounded-xl pl-11" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retirada</label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="date" className="h-12 rounded-xl pl-11" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Devolução</label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="date" className="h-12 rounded-xl pl-11" />
                    </div>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/buscar"><Search className="h-4 w-4" /> Buscar Agora</Link>
                </Button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Reserva 100% segura · Cancelamento grátis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Destaques</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">Veículos em destaque</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Nossa seleção criteriosa dos carros mais bem avaliados da plataforma para sua próxima aventura.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/buscar">Ver todos <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.slice(0, 6).map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Como funciona</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">Experiência sem fricção</h2>
            <p className="mt-3 text-muted-foreground">
              Desenhamos um processo intuitivo para que você foque apenas na sua viagem.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, n: "01", title: "Encontre o ideal", desc: "Use nossos filtros avançados para achar o veículo que se encaixa perfeitamente na sua necessidade." },
              { icon: Zap, n: "02", title: "Reserve fácil", desc: "Processo de aprovação rápido, pagamento seguro e confirmação instantânea da sua reserva." },
              { icon: ShieldCheck, n: "03", title: "Dirija seguro", desc: "Todos os veículos possuem seguro, e você conta com suporte 24/7 durante toda a locação." },
            ].map((s, i) => (
              <div
                key={s.n}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="absolute right-6 top-6 font-display text-6xl font-black text-secondary">{s.n}</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Depoimentos</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">O que dizem sobre nós</h2>
          <p className="mt-3 text-muted-foreground">Milhares de viagens inesquecíveis começaram aqui.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "Lucia Torres", role: "Cliente frequente", initial: "L", text: "A interface é linda e super fácil de usar. Consegui um SUV incrível para minha viagem em família com apenas alguns cliques. Recomendo muito!" },
            { name: "Kwame Asante", role: "Locador parceiro", initial: "K", text: "A Aluugar transformou meu carro que ficava na garagem em uma fonte de renda extra fantástica. O suporte é rápido e eficiente." },
            { name: "Maya Chen", role: "Viajante", initial: "M", text: "Alugar direto com o proprietário torna tudo mais humano e flexível. O carro estava impecável e a comunicação foi nota mil." },
          ].map((t) => (
            <div key={t.name} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-5 text-foreground/90">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-bold text-primary-foreground">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 shadow-glow md:p-16">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-primary-foreground md:text-5xl">
                Pronto para colocar o pé na estrada?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Junte-se a milhares de usuários que já descobriram uma forma mais inteligente de alugar veículos.
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <Button variant="accent" size="xl" asChild>
                <Link to="/buscar"><Car className="h-4 w-4" /> Alugar agora</Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/anunciar"><Users className="h-4 w-4" /> Sou proprietário</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
