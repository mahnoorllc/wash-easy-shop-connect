
-- Create the missing bookings table with proper relationships
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  merchant_id UUID REFERENCES public.merchants(id) NOT NULL,
  laundry_order_id UUID REFERENCES public.laundry_orders(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending',
  customer_latitude DECIMAL(10,8),
  customer_longitude DECIMAL(11,8),
  customer_address TEXT,
  estimated_distance_km DECIMAL(5,2),
  estimated_travel_time_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for bookings
CREATE POLICY "Customers can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Merchants can view their bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.merchants 
      WHERE id = bookings.merchant_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = customer_id);

CREATE POLICY "Merchants can update their bookings" ON public.bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.merchants 
      WHERE id = bookings.merchant_id 
      AND user_id = auth.uid()
    )
  );

-- Add missing columns to merchants table for location functionality
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,8);
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS longitude DECIMAL(11,8);
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 4.5;
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Update existing merchants with proper location data and ensure they're approved
UPDATE public.merchants 
SET 
  latitude = 40.7505, 
  longitude = -73.9934, 
  rating = 4.8, 
  review_count = 127,
  is_approved = true,
  is_active = true
WHERE business_name = 'Clean Express Laundromat';

-- Add more realistic merchant data across different locations
INSERT INTO public.merchants (
  user_id, business_name, business_address, phone, email, 
  latitude, longitude, rating, review_count,
  service_areas, services, is_approved, is_active
) VALUES 
-- Brooklyn
(
  '00000000-0000-0000-0000-000000000002',
  'Brooklyn Fresh Cleaners',
  '456 Atlantic Ave, Brooklyn, NY 11217',
  '(718) 555-0102',
  'hello@brooklynfresh.com',
  40.6892, -73.9442, 4.6, 89,
  ARRAY['Brooklyn', 'Fort Greene', 'Downtown Brooklyn'],
  ARRAY['wash_fold', 'dry_cleaning', 'delicate']::service_type[],
  true, true
),
-- Queens
(
  '00000000-0000-0000-0000-000000000003',
  'Queens Laundry Pro',
  '789 Northern Blvd, Queens, NY 11372',
  '(718) 555-0103',
  'service@queenslaundrypro.com',
  40.7539, -73.8803, 4.7, 156,
  ARRAY['Queens', 'Jackson Heights', 'Elmhurst'],
  ARRAY['wash_fold', 'express']::service_type[],
  true, true
),
-- Upper Manhattan
(
  '00000000-0000-0000-0000-000000000004',
  'Upper East Side Cleaners',
  '321 Lexington Ave, New York, NY 10016',
  '(212) 555-0104',
  'info@uescleaners.com',
  40.7614, -73.9776, 4.9, 203,
  ARRAY['Manhattan', 'Upper East Side', 'Midtown East'],
  ARRAY['dry_cleaning', 'delicate', 'express']::service_type[],
  true, true
),
-- Downtown Manhattan
(
  '00000000-0000-0000-0000-000000000005',
  'Downtown Wash & Fold',
  '654 Canal St, New York, NY 10013',
  '(212) 555-0105',
  'orders@downtownwash.com',
  40.7209, -74.0007, 4.5, 74,
  ARRAY['Manhattan', 'SoHo', 'Chinatown'],
  ARRAY['wash_fold', 'express']::service_type[],
  true, true
);
