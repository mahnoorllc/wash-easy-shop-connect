-- Add language column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN language text DEFAULT 'en';