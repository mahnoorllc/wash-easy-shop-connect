import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalCustomers: number;
  activeMerchants: number;
  pendingApprovals: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  issueOrders: number;
  totalRevenue: number;
  pendingQuotes: number;
  totalProducts: number;
  activeProducts: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalCustomers: 0,
    activeMerchants: 0,
    pendingApprovals: 0,
    pendingOrders: 0,
    processingOrders: 0,
    completedOrders: 0,
    issueOrders: 0,
    totalRevenue: 0,
    pendingQuotes: 0,
    totalProducts: 0,
    activeProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch customer count
      const { count: customerCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'customer');

      // Fetch merchant stats
      const { data: merchants } = await supabase
        .from('merchants')
        .select('is_approved, is_active');

      const activeMerchants = merchants?.filter(m => m.is_approved && m.is_active).length || 0;
      const pendingApprovals = merchants?.filter(m => !m.is_approved).length || 0;

      // Fetch order stats
      const { data: laundryOrders } = await supabase
        .from('laundry_orders')
        .select('status, total_amount');

      const pendingOrders = laundryOrders?.filter(o => o.status === 'pending').length || 0;
      const processingOrders = laundryOrders?.filter(o => o.status === 'in_progress' || o.status === 'picked_up').length || 0;
      const completedOrders = laundryOrders?.filter(o => o.status === 'delivered').length || 0;
      const issueOrders = laundryOrders?.filter(o => o.status === 'cancelled').length || 0;

      // Calculate revenue from completed/delivered orders
      const totalRevenue = laundryOrders
        ?.filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0) || 0;

      // Fetch commercial quotes
      const { count: pendingQuotes } = await supabase
        .from('commercial_quotes')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch product stats
      const { data: products } = await supabase
        .from('shop_products')
        .select('is_active');

      const totalProducts = products?.length || 0;
      const activeProducts = products?.filter(p => p.is_active).length || 0;

      setStats({
        totalCustomers: customerCount || 0,
        activeMerchants,
        pendingApprovals,
        pendingOrders,
        processingOrders,
        completedOrders,
        issueOrders,
        totalRevenue,
        pendingQuotes: pendingQuotes || 0,
        totalProducts,
        activeProducts,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
};
