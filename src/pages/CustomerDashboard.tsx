
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { CustomerBookings } from '@/components/CustomerBookings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Plus, User } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600">Manage your laundry services and bookings</p>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bookings" className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4" />
                <span>My Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="new-booking" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Booking</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-6">
              <CustomerBookings />
            </TabsContent>

            <TabsContent value="new-booking" className="mt-6">
              <BookingForm />
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CustomerDashboard;
