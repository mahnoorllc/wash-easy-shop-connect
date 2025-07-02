
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useGoogleMapsConfig = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApiKey = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First try to get from localStorage as fallback
        const storedApiKey = localStorage.getItem('google_maps_api_key');
        if (storedApiKey) {
          setApiKey(storedApiKey);
          setLoading(false);
          return;
        }

        // Try to fetch from edge function
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          setError('No valid session');
          setLoading(false);
          return;
        }

        const response = await fetch('https://chodvuvoaudgfmbovpkk.supabase.co/functions/v1/google-maps-config', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.apiKey) {
            setApiKey(data.apiKey);
            setError(null);
          } else {
            setError('No API key configured in Supabase secrets');
          }
        } else {
          setError('Failed to fetch API key from server');
        }
      } catch (err) {
        console.error('Error fetching Google Maps config:', err);
        setError('Error loading Google Maps configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, [user]);

  const setManualApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('google_maps_api_key', key);
    setError(null);
  };

  return { apiKey, loading, error, setManualApiKey };
};
