-- Fix security vulnerability in commercial_quotes table
-- Add user_id column to link quotes to authenticated users
ALTER TABLE public.commercial_quotes 
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Drop the insecure public read policy
DROP POLICY "Users can view quotes by email" ON public.commercial_quotes;

-- Create secure policies
CREATE POLICY "Users can view their own quotes" 
ON public.commercial_quotes 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow admins to view all quotes (using existing security definer function)
CREATE POLICY "Admins can view all quotes" 
ON public.commercial_quotes 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- Update insert policy to set user_id for authenticated users
DROP POLICY "Anyone can submit commercial quotes" ON public.commercial_quotes;

CREATE POLICY "Authenticated users can create quotes" 
ON public.commercial_quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow unauthenticated quote submissions (user_id will be null)
CREATE POLICY "Anonymous users can create quotes" 
ON public.commercial_quotes 
FOR INSERT 
WITH CHECK (auth.uid() IS NULL AND user_id IS NULL);

-- Allow users to view quotes they submitted anonymously by email
CREATE POLICY "Users can view quotes by their email" 
ON public.commercial_quotes 
FOR SELECT 
USING (
  user_id IS NULL AND 
  email = (SELECT raw_user_meta_data->>'email' FROM auth.users WHERE id = auth.uid())
);