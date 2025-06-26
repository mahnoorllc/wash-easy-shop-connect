
import { Database } from '@/integrations/supabase/types';

// Extended types for the new database schema
export type Merchant = Database['public']['Tables']['merchants']['Row'] & {
  latitude?: number;
  longitude?: number;
  service_radius?: number;
  operating_hours?: any;
  rating?: number;
  review_count?: number;
  capacity_per_hour?: number;
};

export type MerchantWithDistance = Merchant & {
  distance_km?: number;
  travel_time_minutes?: number;
};

export interface Booking {
  id: string;
  customer_id: string;
  merchant_id: string;
  laundry_order_id?: string;
  booking_date: string;
  booking_time: string;
  duration_minutes?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  customer_latitude?: number;
  customer_longitude?: number;
  customer_address?: string;
  estimated_distance_km?: number;
  estimated_travel_time_minutes?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type BookingWithMerchant = Booking & {
  merchant: {
    business_name: string;
    business_address: string;
    phone: string;
    rating: number;
  } | null;
};
