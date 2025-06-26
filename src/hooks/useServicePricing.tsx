
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type ServicePricing = Database['public']['Tables']['service_pricing']['Row'];

export const useServicePricing = () => {
  const [pricing, setPricing] = useState<ServicePricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('service_pricing')
          .select('*')
          .eq('is_active', true)
          .order('service_name, pricing_type');

        if (error) {
          console.error('Error fetching service pricing:', error);
          throw error;
        }
        setPricing(data || []);
      } catch (err) {
        console.error('Error fetching service pricing:', err);
        setError('Failed to load pricing information');
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  return { pricing, loading, error };
};
