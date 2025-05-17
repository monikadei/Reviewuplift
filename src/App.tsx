import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Navbar from "./components/Navbar";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Demo from "./components/demo";

import PaymentPage from "./components/Paymentpage";
import ContactWidget from "./components/ContactWidget";
import BusinessDashboard from "./components/business/dashboard/page";
import BusinessReviews from "./components/business/reviews/page";
import ReviewLinkPage from "./components/business/review-link/page";
import AdminDashboard from "./components/admin/dashboard/page";
import BusinessesPage from "./components/admin/businesses/page";
import UsersPage from "./components/admin/users/page";
import Sidebar from "./components/sidebar";


// Custom hook to scroll to hash section on route change
function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // Delay scroll to make sure elements are rendered
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
}

const queryClient = new QueryClient();

function AppRoutes() {
  useScrollToHash();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contact" element={<ContactWidget />} />
        <Route path="/pricing" element={<Index />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/components/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/components/business/reviews" element={<BusinessReviews />} />
        <Route path="/components/business/review-link" element={<ReviewLinkPage />} />
        <Route path="/components/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/components/admin/businesses" element={<BusinessesPage />} />
        <Route path="/components/admin/users" element={<UsersPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
    
        {/* <Route path="/admin" element={<Sidebar />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
