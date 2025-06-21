
-- Create enum types for better data consistency
CREATE TYPE user_role AS ENUM ('customer', 'merchant', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'picked_up', 'in_progress', 'ready', 'delivered', 'cancelled');
CREATE TYPE service_type AS ENUM ('wash_fold', 'dry_cleaning', 'express', 'delicate');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  role user_role DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create merchants table
CREATE TABLE public.merchants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_areas TEXT[], -- Array of areas they serve
  services service_type[] DEFAULT '{wash_fold}', -- Services they offer
  is_approved BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create laundry_orders table
CREATE TABLE public.laundry_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  merchant_id UUID REFERENCES public.merchants(id),
  service_type service_type NOT NULL,
  pickup_address TEXT NOT NULL,
  delivery_address TEXT,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  special_instructions TEXT,
  estimated_weight DECIMAL(5,2),
  total_amount DECIMAL(10,2),
  status order_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shop_products table for additional services/products
CREATE TABLE public.shop_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shop_orders table for product purchases
CREATE TABLE public.shop_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  items JSONB NOT NULL, -- Store cart items as JSON
  total_amount DECIMAL(10,2) NOT NULL,
  delivery_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laundry_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for merchants
CREATE POLICY "Anyone can view approved merchants" ON public.merchants
  FOR SELECT USING (is_approved = true AND is_active = true);

CREATE POLICY "Users can view their own merchant profile" ON public.merchants
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create merchant profile" ON public.merchants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own merchant profile" ON public.merchants
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for laundry_orders
CREATE POLICY "Customers can view their own orders" ON public.laundry_orders
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Merchants can view their assigned orders" ON public.laundry_orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.merchants 
      WHERE id = laundry_orders.merchant_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can create orders" ON public.laundry_orders
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update their own orders" ON public.laundry_orders
  FOR UPDATE USING (auth.uid() = customer_id);

CREATE POLICY "Merchants can update assigned orders" ON public.laundry_orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.merchants 
      WHERE id = laundry_orders.merchant_id 
      AND user_id = auth.uid()
    )
  );

-- Create RLS policies for shop_products
CREATE POLICY "Anyone can view active products" ON public.shop_products
  FOR SELECT USING (is_active = true);

-- Create RLS policies for shop_orders
CREATE POLICY "Customers can view their own shop orders" ON public.shop_orders
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create shop orders" ON public.shop_orders
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  RETURN new;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample shop products
INSERT INTO public.shop_products (name, description, price, category, image_url) VALUES
('Fabric Softener', 'Premium fabric softener for extra softness', 12.99, 'Care Products', '/placeholder.svg'),
('Stain Remover', 'Professional grade stain remover', 15.99, 'Care Products', '/placeholder.svg'),
('Garment Bags', 'Protective garment bags for delicate items', 8.99, 'Accessories', '/placeholder.svg'),
('Laundry Detergent', 'Eco-friendly laundry detergent', 18.99, 'Care Products', '/placeholder.svg');
