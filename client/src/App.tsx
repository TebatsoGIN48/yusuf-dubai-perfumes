import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import AppRoutes from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext"; // Import the new router configuration

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <Navigation />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
              <WhatsAppButton />
              <Toaster />
            </div>
          </TooltipProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
