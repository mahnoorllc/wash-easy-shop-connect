
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';

import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import CustomerDashboard from '@/pages/CustomerDashboard';
import MerchantDashboard from '@/pages/MerchantDashboard';
import MerchantRegister from '@/pages/MerchantRegister';
import Shop from '@/pages/Shop';
import CommercialServices from '@/pages/CommercialServices';
import ResidentialServices from '@/pages/ResidentialServices';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
            <Route path="/merchant-register" element={<MerchantRegister />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/commercial" element={<CommercialServices />} />
            <Route path="/residential" element={<ResidentialServices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
