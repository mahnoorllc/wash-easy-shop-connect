
-- Optimize RLS policies for better performance by using (select auth.uid())

-- Drop and recreate profiles table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- Drop and recreate merchants table policies
DROP POLICY IF EXISTS "Users can view their own merchant profile" ON public.merchants;
DROP POLICY IF EXISTS "Users can create merchant profile" ON public.merchants;
DROP POLICY IF EXISTS "Users can update their own merchant profile" ON public.merchants;

CREATE POLICY "Users can view their own merchant profile" ON public.merchants
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create merchant profile" ON public.merchants
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own merchant profile" ON public.merchants
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- Drop and recreate laundry_orders table policies
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Merchants can view their assigned orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Customers can create orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Customers can update their own orders" ON public.laundry_orders;
DROP POLICY IF EXISTS "Merchants can update assigned orders" ON public.laundry_orders;

CREATE POLICY "Customers can view their own orders" ON public.laundry_orders
  FOR SELECT USING ((select auth.uid()) = customer_id);

CREATE POLICY "Merchants can view their assigned orders" ON public.laundry_orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.merchants 
      WHERE id = laundry_orders.merchant_id 
      AND user_id = (select auth.uid())
    )
  );

CREATE POLICY "Customers can create orders" ON public.laundry_orders
  FOR INSERT WITH CHECK ((select auth.uid()) = customer_id);

CREATE POLICY "Customers can update their own orders" ON public.laundry_orders
  FOR UPDATE USING ((select auth.uid()) = customer_id);

CREATE POLICY "Merchants can update assigned orders" ON public.laundry_orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.merchants 
      WHERE id = laundry_orders.merchant_id 
      AND user_id = (select auth.uid())
    )
  );

-- Drop and recreate shop_orders table policies
DROP POLICY IF EXISTS "Customers can view their own shop orders" ON public.shop_orders;
DROP POLICY IF EXISTS "Customers can create shop orders" ON public.shop_orders;

CREATE POLICY "Customers can view their own shop orders" ON public.shop_orders
  FOR SELECT USING ((select auth.uid()) = customer_id);

CREATE POLICY "Customers can create shop orders" ON public.shop_orders
  FOR INSERT WITH CHECK ((select auth.uid()) = customer_id);
