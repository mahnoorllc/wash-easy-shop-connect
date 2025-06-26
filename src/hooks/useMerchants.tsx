
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Merchant = Database['public']['Tables']['merchants']['Row'];
type MerchantWithDistance = Merchant & {
  distance_km?: number;
  travel_time_minutes?: number;
};

export const useMerchants = () => {
  const [merchants, setMerchants] = useState<MerchantWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchants = async (customerLat?: number, customerLng?: number) => {
    try {
      setLoading(true);
      let query = supabase
        .from('merchants')
        .select('*')
        .eq('is_approved', true)
        .eq('is_active', true);

      const { data, error } = await query;

      if (error) throw error;

      let merchantsWithDistance = data || [];

      // Calculate distances if customer location is provided
      if (customerLat && customerLng) {
        merchantsWithDistance = merchantsWithDistance.map(merchant => {
          if (merchant.latitude && merchant.longitude) {
            const distance = calculateDistance(
              customerLat,
              customerLng,
              merchant.latitude,
              merchant.longitude
            );
            return {
              ...merchant,
              distance_km: distance,
              travel_time_minutes: Math.round(distance * 2.5) // Rough estimate: 2.5 min per km
            };
          }
          return merchant;
        });

        // Sort by distance
        merchantsWithDistance.sort((a, b) => (a.distance_km || 999) - (b.distance_km || 999));
      }

      setMerchants(merchantsWithDistance);
    } catch (err) {
      console.error('Error fetching merchants:', err);
      setError('Failed to load merchants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return { merchants, loading, error, refetchMerchants: fetchMerchants };
};
