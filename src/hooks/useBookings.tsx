
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface BookingWithMerchant {
  id: string;
  customer_id: string;
  merchant_id: string;
  laundry_order_id?: string;
  booking_date: string;
  booking_time: string;
  duration_minutes?: number;
  status: string;
  customer_latitude?: number;
  customer_longitude?: number;
  customer_address?: string;
  estimated_distance_km?: number;
  estimated_travel_time_minutes?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  merchant?: {
    business_name: string;
    business_address: string;
    phone: string;
    rating: number;
  };
}

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithMerchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          merchant:merchants(
            business_name,
            business_address,
            phone,
            rating
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data as BookingWithMerchant[]);
      console.log(`Loaded ${data?.length || 0} bookings for user`);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', bookingId);

      if (error) throw error;
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status }
            : booking
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error updating booking status:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return { 
    bookings, 
    loading, 
    error, 
    refetchBookings: fetchBookings,
    updateBookingStatus
  };
};
