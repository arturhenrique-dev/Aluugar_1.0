import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Buscar from "./pages/Buscar.tsx";
import Veiculo from "./pages/Veiculo.tsx";
import Painel from "./pages/Painel.tsx";
import Anunciar from "./pages/Anunciar.tsx";
import ComoFunciona from "./pages/ComoFunciona.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/veiculo/:id" element={<Veiculo />} />
          <Route path="/painel" element={<Painel />} />
          <Route path="/anunciar" element={<Anunciar />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
