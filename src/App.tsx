import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatDashboard from "./pages/ChatDashboard";
import NotFound from "./pages/NotFound";
import { UserProvider } from "@/context/UserProvider"; // Import your UserProvider
import { useUser } from "./context/UserContext";
import { ChatProvider } from "@/context/ChatProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/chat" replace />;
  }
  
  return children;
};

const App = () => { 
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChatProvider>
          <ThemeProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </ThemeProvider>
        </ChatProvider>
      </UserProvider>
    </QueryClientProvider>
  )
};

export default App;