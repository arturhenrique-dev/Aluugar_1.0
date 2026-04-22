import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Car, Shield, Star, Headphones, ArrowRight } from "lucide-react";

const ComoFunciona = () => {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-br from-secondary/60 via-background to-background">
        <div className="container py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold">
            Tudo que você precisa saber
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-black leading-tight md:text-6xl">
            Simples como pegar as <span className="gradient-text">chaves</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Em 4 passos você reserva o carro perfeito. E em mais 4 você pode anunciar o seu.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="font-display text-3xl font-extrabold">Para quem aluga</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, title: "Busque", desc: "Filtre por cidade, datas, categoria e mais." },
            { icon: Car, title: "Escolha", desc: "Veja fotos, recursos e avaliações reais." },
            { icon: Calendar, title: "Reserve", desc: "Confirmação rápida com pagamento seguro." },
            { icon: Shield, title: "Dirija", desc: "Seguro incluso e suporte 24/7." },
          ].map((s, i) => (
            <div key={s.title} className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft">
              <span className="absolute right-5 top-4 font-display text-7xl font-black text-secondary">0{i + 1}</span>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="relative mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-extrabold">Para proprietários</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Car, title: "Cadastre" },
              { icon: Calendar, title: "Disponibilize" },
              { icon: Star, title: "Receba reservas" },
              { icon: Headphones, title: "Lucre todo mês" },
            ].map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent shadow-accent-glow">
                  <s.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Passo 0{i + 1}</div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div>
              <h3 className="font-display text-2xl font-bold">Pronto para começar?</h3>
              <p className="mt-1 text-muted-foreground">Cadastre-se em menos de 5 minutos.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="hero" size="lg" asChild><Link to="/buscar">Buscar veículos <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button variant="accent" size="lg" asChild><Link to="/anunciar">Anunciar agora</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ComoFunciona;
