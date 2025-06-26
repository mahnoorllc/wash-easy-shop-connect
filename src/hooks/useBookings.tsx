
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingWithMerchant = Booking & {
  merchant: {
    business_name: string;
    business_address: string;
    phone: string;
    rating: number;
  } | null;
};

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
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;
      
      // Refresh bookings
      fetchBookings();
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
