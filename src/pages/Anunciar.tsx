import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Camera, Car, DollarSign, Calendar, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = [
  { n: 1, title: "Veículo", icon: Car },
  { n: 2, title: "Fotos", icon: Camera },
  { n: 3, title: "Disponibilidade", icon: Calendar },
  { n: 4, title: "Preço", icon: DollarSign },
];

const Anunciar = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Comece a ganhar com seu carro
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Anuncie seu veículo</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Donos do Aluugar ganham em média R$2.800/mês. Configure seu anúncio em poucos minutos.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {/* Stepper */}
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map((s) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <div
                key={s.n}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-4 transition-all",
                  active && "border-primary bg-card shadow-glow",
                  done && "border-success/50 bg-success/5",
                  !active && !done && "border-border bg-card"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl font-bold",
                  active && "bg-gradient-primary text-primary-foreground",
                  done && "bg-success text-success-foreground",
                  !active && !done && "bg-secondary text-muted-foreground"
                )}>
                  {done ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Passo {s.n}</div>
                  <div className="font-display font-bold">{s.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form panel */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Sobre o veículo</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>Marca</Label><Input placeholder="Ex: Volkswagen" className="mt-1.5 h-12" /></div>
                  <div><Label>Modelo</Label><Input placeholder="Ex: Polo Track" className="mt-1.5 h-12" /></div>
                  <div><Label>Ano</Label><Input type="number" placeholder="2023" className="mt-1.5 h-12" /></div>
                  <div><Label>Placa</Label><Input placeholder="ABC-1D23" className="mt-1.5 h-12" /></div>
                </div>
                <div><Label>Descrição</Label>
                  <Textarea placeholder="Conte sobre o veículo, diferenciais e regras de uso." className="mt-1.5 min-h-32" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Fotos do veículo</h2>
                <p className="text-sm text-muted-foreground">Mínimo 4 fotos. Boas fotos aumentam suas reservas em até 3x.</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <button
                      key={i}
                      className="group flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      <Camera className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Quando seu carro fica disponível?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((d) => (
                    <label key={d} className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-background p-4 hover:border-primary/40">
                      <span className="font-medium">{d}</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                    </label>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>Disponível a partir</Label><Input type="date" className="mt-1.5 h-12" /></div>
                  <div><Label>Antecedência mínima (dias)</Label><Input type="number" defaultValue={1} className="mt-1.5 h-12" /></div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Defina seu preço</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>Diária base (R$)</Label><Input type="number" placeholder="259" className="mt-1.5 h-12" /></div>
                  <div><Label>Desconto semanal (%)</Label><Input type="number" placeholder="10" className="mt-1.5 h-12" /></div>
                </div>
                <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground">
                  <p className="text-sm uppercase tracking-wider opacity-80">Estimativa de ganhos</p>
                  <div className="mt-2 font-display text-4xl font-extrabold">R$2.840 <span className="text-base font-medium opacity-80">/mês</span></div>
                  <p className="mt-1 text-sm opacity-90">Com 12 dias de aluguel mensais.</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button variant="ghost" onClick={prev} disabled={step === 1}>
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
              {step < 4 ? (
                <Button variant="hero" onClick={next}>Próximo <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button variant="accent" onClick={() => toast.success("Anúncio publicado! Você já pode receber reservas.")}>
                  Publicar anúncio
                </Button>
              )}
            </div>
          </div>

          {/* Side benefits */}
          <aside className="space-y-4">
            {[
              { icon: DollarSign, title: "Ganhos extras", desc: "Em média R$2.800/mês com seu veículo." },
              { icon: Sparkles, title: "Sem mensalidade", desc: "Você só paga quando recebe uma reserva." },
              { icon: Check, title: "Seguro completo", desc: "Cobertura total durante todas as locações." },
              { icon: Car, title: "Você no controle", desc: "Defina disponibilidade, preço e regras." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-3 font-display font-bold">{b.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Anunciar;
