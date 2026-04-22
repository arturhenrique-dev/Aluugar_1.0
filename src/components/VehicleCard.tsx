import { Link } from "react-router-dom";
import { Star, Users, Fuel, Cog, MapPin } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { Badge } from "@/components/ui/badge";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <Link
      to={`/veiculo/${vehicle.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur-md hover:bg-card">
          {vehicle.category}
        </Badge>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-xs font-bold text-background backdrop-blur-md">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {vehicle.rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight">
              {vehicle.brand} {vehicle.name}
            </h3>
            <p className="text-xs text-muted-foreground">{vehicle.year} · {vehicle.trips} viagens</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {vehicle.city}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Cog className="h-3.5 w-3.5" />{vehicle.transmission}</span>
          <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{vehicle.fuel}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{vehicle.seats}</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <span className="font-display text-2xl font-extrabold">R${vehicle.pricePerDay}</span>
            <span className="text-xs text-muted-foreground">/dia</span>
          </div>
          <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Ver detalhes
          </span>
        </div>
      </div>
    </Link>
  );
};
