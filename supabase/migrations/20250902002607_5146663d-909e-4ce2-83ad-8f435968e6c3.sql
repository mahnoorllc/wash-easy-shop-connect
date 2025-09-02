-- Create user_status enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'pending', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status user_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS business_name text,
ADD COLUMN IF NOT EXISTS business_address text,
ADD COLUMN IF NOT EXISTS service_areas text[],
ADD COLUMN IF NOT EXISTS bio text;

-- Update the handle_new_user function to work with existing enum
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
    CASE 
      WHEN new.raw_user_meta_data->>'role' = 'provider' THEN 'merchant'::user_role
      WHEN new.raw_user_meta_data->>'role' = 'admin' THEN 'admin'::user_role
      ELSE 'customer'::user_role
    END,
    CASE 
      WHEN new.raw_user_meta_data->>'role' = 'provider' THEN 'pending'::user_status
      ELSE 'active'::user_status
    END
  );
  RETURN new;
END;
$function$;

-- Create helper functions
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.current_user_has_role(check_role user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = check_role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_current_user_approved_provider()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'merchant' 
    AND status = 'active'
  );
$$;