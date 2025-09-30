-- Update RLS policies for shop_products to allow admin management
DROP POLICY IF EXISTS "Anyone can view active products" ON public.shop_products;

-- Create new policies for shop_products
CREATE POLICY "Anyone can view active products" 
ON public.shop_products 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage all products" 
ON public.shop_products 
FOR ALL
USING (get_current_user_role() = 'admin'::user_role)
WITH CHECK (get_current_user_role() = 'admin'::user_role);

-- Update RLS policies for shop_orders to allow admin management
CREATE POLICY "Admins can view all shop orders" 
ON public.shop_orders 
FOR SELECT 
USING (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Admins can update shop orders" 
ON public.shop_orders 
FOR UPDATE 
USING (get_current_user_role() = 'admin'::user_role);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shop_products_category ON public.shop_products(category);
CREATE INDEX IF NOT EXISTS idx_shop_products_created_at ON public.shop_products(created_at);
CREATE INDEX IF NOT EXISTS idx_shop_orders_created_at ON public.shop_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_shop_orders_status ON public.shop_orders(status);