
import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MerchantDashboard as MerchantDashboardComponent } from '@/components/MerchantDashboard';

const MerchantDashboard = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <MerchantDashboardComponent />
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default MerchantDashboard;
