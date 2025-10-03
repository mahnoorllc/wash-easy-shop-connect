-- Phase 1: Security Fixes - Create proper role-based access system

-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'merchant', 'customer');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Only admins can manage roles (we'll use a different mechanism for first admin)
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 3. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- 4. Migrate existing role data from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 
  CASE 
    WHEN role = 'admin' THEN 'admin'::app_role
    WHEN role = 'merchant' THEN 'merchant'::app_role
    ELSE 'customer'::app_role
  END
FROM public.profiles
ON CONFLICT (user_id, role) DO NOTHING;

-- 5. Update RLS policies on all tables to use has_role()

-- Update bookings policies
DROP POLICY IF EXISTS "Customers can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Customers can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Customers can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Merchants can view their assigned bookings" ON public.bookings;
DROP POLICY IF EXISTS "Merchants can update their assigned bookings" ON public.bookings;

CREATE POLICY "Customers can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = customer_id);

CREATE POLICY "Customers can update their own bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() = customer_id)
WITH CHECK (auth.uid() = customer_id AND status IN ('pending', 'cancelled'));

CREATE POLICY "Merchants can view their assigned bookings"
ON public.bookings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM merchants
    WHERE merchants.id = bookings.merchant_id 
    AND merchants.user_id = auth.uid()
  )
);

CREATE POLICY "Merchants can update their assigned bookings"
ON public.bookings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM merchants
    WHERE merchants.id = bookings.merchant_id 
    AND merchants.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all bookings"
ON public.bookings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Update merchants policies
DROP POLICY IF EXISTS "Anyone can view approved merchants" ON public.merchants;
DROP POLICY IF EXISTS "Users can create merchant profile" ON public.merchants;
DROP POLICY IF EXISTS "Users can view their own merchant profile" ON public.merchants;
DROP POLICY IF EXISTS "Users can update their own merchant profile" ON public.merchants;

CREATE POLICY "Anyone can view approved merchants"
ON public.merchants
FOR SELECT
USING (is_approved = true AND is_active = true);

CREATE POLICY "Users can create merchant profile"
ON public.merchants
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own merchant profile"
ON public.merchants
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own merchant profile"
ON public.merchants
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all merchants"
ON public.merchants
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update commercial_quotes policies
DROP POLICY IF EXISTS "Admins can view all quotes" ON public.commercial_quotes;

CREATE POLICY "Admins can view all quotes"
ON public.commercial_quotes
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all quotes"
ON public.commercial_quotes
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Update shop_orders policies
DROP POLICY IF EXISTS "Admins can view all shop orders" ON public.shop_orders;
DROP POLICY IF EXISTS "Admins can update shop orders" ON public.shop_orders;

CREATE POLICY "Admins can view all shop orders"
ON public.shop_orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update shop orders"
ON public.shop_orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Update shop_products policies
DROP POLICY IF EXISTS "Admins can manage all products" ON public.shop_products;

CREATE POLICY "Admins can manage all products"
ON public.shop_products
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update laundry_orders policies - add admin access
CREATE POLICY "Admins can view all laundry orders"
ON public.laundry_orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all laundry orders"
ON public.laundry_orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Update get_current_user_role function to use user_roles table
DROP FUNCTION IF EXISTS public.get_current_user_role();

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles 
  WHERE user_id = auth.uid() 
  ORDER BY 
    CASE 
      WHEN role = 'admin' THEN 1
      WHEN role = 'merchant' THEN 2
      ELSE 3
    END
  LIMIT 1;
$$;

-- 7. Update current_user_has_role function to use user_roles table
DROP FUNCTION IF EXISTS public.current_user_has_role(user_role);

CREATE OR REPLACE FUNCTION public.current_user_has_role(check_role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), check_role);
$$;

-- 8. Update handle_new_user trigger to insert into user_roles
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Determine role from metadata
  user_role := CASE 
    WHEN new.raw_user_meta_data->>'role' = 'provider' THEN 'merchant'::app_role
    WHEN new.raw_user_meta_data->>'role' = 'admin' THEN 'admin'::app_role
    ELSE 'customer'::app_role
  END;

  -- Insert profile
  INSERT INTO public.profiles (id, full_name, status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    CASE 
      WHEN user_role = 'merchant' THEN 'pending'::user_status
      ELSE 'active'::user_status
    END
  );

  -- Insert role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, user_role);

  RETURN new;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();