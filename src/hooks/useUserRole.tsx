import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'merchant' | 'customer';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setRole(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .order('role', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user role:', error);
      } else {
        setRole(data?.role as AppRole || 'customer');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (checkRole: AppRole): boolean => {
    return role === checkRole;
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isMerchant = (): boolean => hasRole('merchant');
  const isCustomer = (): boolean => hasRole('customer');

  return { role, loading, hasRole, isAdmin, isMerchant, isCustomer };
};
