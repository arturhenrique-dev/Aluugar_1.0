import { Link } from "react-router-dom";
import { Car, Instagram, Twitter, Youtube } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Car className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-extrabold">Aluugar</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            A nova forma de alugar veículos: simples, segura e direta com proprietários verificados.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Plataforma", items: [["Buscar veículos", "/buscar"], ["Anunciar carro", "/anunciar"], ["Como funciona", "/como-funciona"], ["Meu painel", "/painel"]] },
          { title: "Suporte", items: [["Central de ajuda", "#"], ["Seguro", "#"], ["Contato", "#"], ["Status", "#"]] },
          { title: "Empresa", items: [["Sobre", "#"], ["Carreiras", "#"], ["Imprensa", "#"], ["Termos", "#"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.items.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 Aluugar. Todos os direitos reservados.</p>
          <p>Feito com ♥ no Brasil</p>
        </div>
      </div>
    </footer>
  );
};
