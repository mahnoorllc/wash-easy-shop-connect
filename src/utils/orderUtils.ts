
import { Database } from '@/integrations/supabase/types';

type OrderStatus = Database['public']['Enums']['order_status'];
type ServiceType = Database['public']['Enums']['service_type'];

export const getStatusColor = (status: OrderStatus | null): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'picked_up':
      return 'bg-purple-100 text-purple-800';
    case 'in_progress':
      return 'bg-orange-100 text-orange-800';
    case 'ready':
      return 'bg-green-100 text-green-800';
    case 'delivered':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusDisplay = (status: OrderStatus | null): string => {
  if (!status) return 'Pending';
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const getServiceTypeDisplay = (serviceType: ServiceType): string => {
  switch (serviceType) {
    case 'wash_fold':
      return 'Wash & Fold';
    case 'dry_cleaning':
      return 'Dry Cleaning';
    case 'express':
      return 'Express Service';
    case 'delicate':
      return 'Delicate Care';
    default:
      return serviceType;
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const formatTime = (timeString: string): string => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
