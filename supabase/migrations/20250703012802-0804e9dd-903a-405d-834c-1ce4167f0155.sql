
-- Add sample merchant data with realistic locations around major cities
-- Update existing dummy merchant data to be properly distributed

-- First, let's add more realistic merchant data with proper coordinates
INSERT INTO public.merchants (
  user_id, business_name, business_address, phone, email, 
  latitude, longitude, rating, review_count,
  service_areas, services, is_approved, is_active
) VALUES 
-- Los Angeles Area
(
  '00000000-0000-0000-0000-000000000002',
  'LA Fresh Laundry',
  '1234 Sunset Blvd, Los Angeles, CA 90026',
  '(323) 555-0201',
  'info@lafresh.com',
  34.0928, -118.2787, 4.7, 142,
  ARRAY['Los Angeles', 'Hollywood', 'Silver Lake'],
  ARRAY['wash_fold', 'dry_cleaning', 'express']::service_type[],
  true, true
),
-- Chicago Area
(
  '00000000-0000-0000-0000-000000000003',
  'Windy City Cleaners',
  '567 N Michigan Ave, Chicago, IL 60611',
  '(312) 555-0301',
  'hello@windycitycleaners.com',
  41.8781, -87.6298, 4.8, 98,
  ARRAY['Chicago', 'Downtown', 'River North'],
  ARRAY['wash_fold', 'dry_cleaning', 'delicate']::service_type[],
  true, true
),
-- Miami Area
(
  '00000000-0000-0000-0000-000000000004',
  'Miami Beach Laundromat',
  '890 Ocean Drive, Miami Beach, FL 33139',
  '(305) 555-0401',
  'service@miamibeachlaundry.com',
  25.7617, -80.1918, 4.5, 167,
  ARRAY['Miami Beach', 'South Beach', 'Art Deco District'],
  ARRAY['wash_fold', 'express']::service_type[],
  true, true
),
-- San Francisco Area
(
  '00000000-0000-0000-0000-000000000005',
  'Golden Gate Wash & Fold',
  '321 Castro St, San Francisco, CA 94114',
  '(415) 555-0501',
  'orders@goldengatewash.com',
  37.7749, -122.4194, 4.9, 234,
  ARRAY['San Francisco', 'Castro', 'Mission'],
  ARRAY['wash_fold', 'dry_cleaning', 'delicate', 'express']::service_type[],
  true, true
),
-- Seattle Area
(
  '00000000-0000-0000-0000-000000000006',
  'Emerald City Laundry',
  '456 Pine St, Seattle, WA 98101',
  '(206) 555-0601',
  'contact@emeraldcitylaundry.com',
  47.6062, -122.3321, 4.6, 89,
  ARRAY['Seattle', 'Downtown', 'Capitol Hill'],
  ARRAY['wash_fold', 'dry_cleaning']::service_type[],
  true, true
);

-- Add residential service pricing data (currently missing)
INSERT INTO public.service_pricing (
  service_name, pricing_type, base_price, is_commercial, is_active,
  bulk_discount_threshold, bulk_discount_percentage
) VALUES 
-- Residential Wash & Fold
('Wash & Fold', 'per_pound', 2.50, false, true, 20, 10),
('Wash & Fold', 'per_bag', 25.00, false, true, null, null),

-- Residential Dry Cleaning
('Dry Cleaning', 'per_item', 8.99, false, true, 5, 15),
('Dry Cleaning', 'shirt', 4.99, false, true, null, null),
('Dry Cleaning', 'suit', 15.99, false, true, null, null),
('Dry Cleaning', 'dress', 12.99, false, true, null, null),

-- Express Service (same day)
('Express Service', 'per_pound', 4.50, false, true, null, null),
('Express Service', 'rush_fee', 10.00, false, true, null, null),

-- Delicate Care
('Delicate Care', 'per_item', 6.99, false, true, 10, 20),
('Delicate Care', 'per_pound', 3.75, false, true, null, null);
