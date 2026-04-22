import { Link, NavLink, useLocation } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/buscar", label: "Buscar" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/painel", label: "Meu painel" },
  { to: "/anunciar", label: "Anunciar" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onLanding = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-xl",
        onLanding ? "bg-background/70" : "bg-background/90"
      )}
    >
      <div className="container flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Car className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Alu<span className="text-primary">u</span>gar
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/painel">Entrar</Link>
          </Button>
          <Button variant="accent" asChild>
            <Link to="/anunciar">Cadastrar</Link>
          </Button>
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="ghost" className="flex-1" asChild>
                <Link to="/painel" onClick={() => setOpen(false)}>Entrar</Link>
              </Button>
              <Button variant="accent" className="flex-1" asChild>
                <Link to="/anunciar" onClick={() => setOpen(false)}>Cadastrar</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
