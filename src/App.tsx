
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { useLanguageSync } from '@/hooks/useLanguageSync';

import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import AuthPage from '@/pages/AuthPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CustomerDashboard from '@/pages/CustomerDashboard';
import MerchantDashboard from '@/pages/MerchantDashboard';
import ProviderDashboard from '@/pages/ProviderDashboard';
import MerchantRegister from '@/pages/MerchantRegister';
import Shop from '@/pages/Shop';
import CommercialServices from '@/pages/CommercialServices';
import ResidentialServices from '@/pages/ResidentialServices';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import RefundPolicy from '@/pages/RefundPolicy';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function AppContent() {
  useLanguageSync();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/merchant-register" element={<MerchantRegister />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/commercial" element={<CommercialServices />} />
        <Route path="/residential" element={<ResidentialServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
