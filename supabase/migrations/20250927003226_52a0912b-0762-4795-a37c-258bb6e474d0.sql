-- Create update timestamp function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
  laundry_order_id UUID REFERENCES public.laundry_orders(id) ON DELETE SET NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  customer_latitude DECIMAL(10, 8),
  customer_longitude DECIMAL(11, 8),
  customer_address TEXT,
  estimated_distance_km DECIMAL(5, 2),
  estimated_travel_time_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for customers to view their own bookings
CREATE POLICY "Customers can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = customer_id);

-- Create policies for customers to create their own bookings
CREATE POLICY "Customers can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = customer_id);

-- Create policies for customers to update their own bookings (limited actions)
CREATE POLICY "Customers can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = customer_id)
WITH CHECK (auth.uid() = customer_id AND status IN ('pending', 'cancelled'));

-- Create policies for merchants to view their assigned bookings
CREATE POLICY "Merchants can view their assigned bookings" 
ON public.bookings 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.merchants 
  WHERE merchants.id = bookings.merchant_id 
  AND merchants.user_id = auth.uid()
));

-- Create policies for merchants to update their assigned bookings
CREATE POLICY "Merchants can update their assigned bookings" 
ON public.bookings 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.merchants 
  WHERE merchants.id = bookings.merchant_id 
  AND merchants.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.merchants 
  WHERE merchants.id = bookings.merchant_id 
  AND merchants.user_id = auth.uid()
));

-- Create updated_at trigger
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX idx_bookings_merchant_id ON public.bookings(merchant_id);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);