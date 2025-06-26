
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BookingWithMerchant } from '@/types/database';

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
      // Since we can't access the bookings table through the types yet,
      // we'll use direct SQL queries for now
      const { data, error } = await supabase.rpc('get_user_bookings', {
        user_id: user.id
      });

      if (error) {
        // Fallback: try to query using regular method
        console.log('RPC failed, using fallback method');
        setBookings([]);
      } else {
        setBookings(data as BookingWithMerchant[]);
      }
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
      // Use RPC function to update booking status
      const { error } = await supabase.rpc('update_booking_status', {
        booking_id: bookingId,
        new_status: status
      });

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
