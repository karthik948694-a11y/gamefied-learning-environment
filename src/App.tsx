import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CostumeProvider } from "@/contexts/CostumeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import SubjectQuest from "./pages/SubjectQuest";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import ChooseMode from "./pages/ChooseMode";
import KidsHome from "./pages/KidsHome";
import KidsActivity from "./pages/KidsActivity";
import KidsLesson from "./pages/KidsLesson";

import KidsForest from "./pages/KidsForest";
import KidsMontessori from "./pages/KidsMontessori";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CostumeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/choose"
                element={
                  <ProtectedRoute>
                    <ChooseMode />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kids"
                element={
                  <ProtectedRoute>
                    <KidsHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kids/montessori"
                element={
                  <ProtectedRoute>
                    <KidsMontessori />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kids/forest"
                element={
                  <ProtectedRoute>
                    <KidsForest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kids/:topicId"
                element={
                  <ProtectedRoute>
                    <KidsLesson />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kids/:topicId/play"
                element={
                  <ProtectedRoute>
                    <KidsActivity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/quest/:subjectId" element={<SubjectQuest />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
        </CostumeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
