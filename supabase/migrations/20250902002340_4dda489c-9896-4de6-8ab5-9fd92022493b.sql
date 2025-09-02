-- Create user_role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_status enum
DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'pending', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update profiles table to include role and status
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status user_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS business_name text,
ADD COLUMN IF NOT EXISTS business_address text,
ADD COLUMN IF NOT EXISTS service_areas text[],
ADD COLUMN IF NOT EXISTS bio text;

-- Update the existing role column to use the enum if it's still text
DO $$ 
BEGIN
    -- First check if role column exists and is text type
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'role' 
        AND data_type = 'text'
    ) THEN
        -- Update existing text role values to match enum
        UPDATE public.profiles SET role = 'customer' WHERE role NOT IN ('customer', 'provider', 'admin');
        
        -- Drop the old column and recreate with enum
        ALTER TABLE public.profiles DROP COLUMN role;
        ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'customer';
    ELSIF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'role'
    ) THEN
        -- Add role column if it doesn't exist
        ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'customer';
    END IF;
END $$;

-- Update the handle_new_user function to set default role and status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'customer'),
    CASE 
      WHEN COALESCE((new.raw_user_meta_data->>'role')::user_role, 'customer') = 'provider' THEN 'pending'::user_status
      ELSE 'active'::user_status
    END
  );
  RETURN new;
END;
$function$;

-- Create a function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Create a function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, check_role user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = check_role
  );
$$;

-- Create a function to check if provider is approved
CREATE OR REPLACE FUNCTION public.is_provider_approved(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id 
    AND role = 'provider' 
    AND status = 'active'
  );
$$;

-- Update RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile" ON public.profiles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Update merchants table policies to use new role system
DROP POLICY IF EXISTS "Users can view their own merchant profile" ON public.merchants;
DROP POLICY IF EXISTS "Users can create merchant profile" ON public.merchants;
DROP POLICY IF EXISTS "Users can update their own merchant profile" ON public.merchants;

CREATE POLICY "Providers can view their own merchant profile" ON public.merchants
FOR SELECT
USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'provider'));

CREATE POLICY "Admins can view all merchant profiles" ON public.merchants
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Approved providers can create merchant profile" ON public.merchants
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND public.has_role(auth.uid(), 'provider')
  AND public.is_provider_approved(auth.uid())
);

CREATE POLICY "Providers can update their own merchant profile" ON public.merchants
FOR UPDATE
USING (
  auth.uid() = user_id 
  AND public.has_role(auth.uid(), 'provider')
  AND public.is_provider_approved(auth.uid())
);

CREATE POLICY "Admins can update any merchant profile" ON public.merchants
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Update laundry_orders policies for role-based access
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Customers can create orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Customers can update their own orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Merchants can view their assigned orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Merchants can update assigned orders" ON public.laundry_orders;

CREATE POLICY "Customers can view their own orders" ON public.laundry_orders
FOR SELECT
USING (
  auth.uid() = customer_id 
  AND public.has_role(auth.uid(), 'customer')
);

CREATE POLICY "Customers can create orders" ON public.laundry_orders
FOR INSERT
WITH CHECK (
  auth.uid() = customer_id 
  AND public.has_role(auth.uid(), 'customer')
);

CREATE POLICY "Customers can update their own orders" ON public.laundry_orders
FOR UPDATE
USING (
  auth.uid() = customer_id 
  AND public.has_role(auth.uid(), 'customer')
);

CREATE POLICY "Providers can view assigned orders" ON public.laundry_orders
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.merchants 
    WHERE merchants.id = laundry_orders.merchant_id 
    AND merchants.user_id = auth.uid()
    AND public.is_provider_approved(auth.uid())
  )
);

CREATE POLICY "Providers can update assigned orders" ON public.laundry_orders
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.merchants 
    WHERE merchants.id = laundry_orders.merchant_id 
    AND merchants.user_id = auth.uid()
    AND public.is_provider_approved(auth.uid())
  )
);

CREATE POLICY "Admins can view all orders" ON public.laundry_orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any order" ON public.laundry_orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));