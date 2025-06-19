import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import generated pages
import Homepage from "./pages/Homepage";
import GameSearchPage from "./pages/GameSearchPage";
import GameDetailPage from "./pages/GameDetailPage";
import ImpactGuidePage from "./pages/ImpactGuidePage";
import UserAuthPage from "./pages/UserAuthPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<GameSearchPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/guides" element={<ImpactGuidePage />} />
          {/* Example of a more specific guide route, can be handled within ImpactGuidePage or as separate routes */}
          <Route path="/guides/:guideId" element={<ImpactGuidePage />} /> 
          <Route path="/auth" element={<UserAuthPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;