-- Add new columns to shop_orders table for complete checkout information
ALTER TABLE shop_orders 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS delivery_notes TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cod';