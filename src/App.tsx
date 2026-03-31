import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import MealPlan from "@/pages/MealPlan";
import Groceries from "@/pages/Groceries";
import Profile from "@/pages/Profile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isOnboarded } = useApp();

  if (!isOnboarded) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<MealPlan />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
