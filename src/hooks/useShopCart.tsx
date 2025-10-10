
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useShopCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart",
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = (products: any[]) => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? Number(product.price) * count : 0);
    }, 0);
  };

  const submitOrder = async (products: any[], checkoutData: { deliveryAddress: string; phone: string; deliveryNotes?: string; paymentMethod: string }) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place an order",
        variant: "destructive",
      });
      return false;
    }

    if (Object.keys(cart).length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before ordering",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    try {
      const items = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return {
          product_id: productId,
          name: product?.name,
          price: Number(product?.price),
          quantity
        };
      });

      const { error } = await supabase
        .from('shop_orders')
        .insert({
          customer_id: user.id,
          items: items,
          total_amount: getTotalPrice(products),
          delivery_address: checkoutData.deliveryAddress,
          status: 'pending',
          phone: checkoutData.phone,
          delivery_notes: checkoutData.deliveryNotes || null,
          payment_method: checkoutData.paymentMethod
        });

      if (error) throw error;

      setCart({});
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been submitted and will be processed soon",
      });
      return true;
    } catch (err) {
      console.error('Error submitting order:', err);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    submitOrder,
    isSubmitting
  };
};
