
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const OrderForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_type: '',
    pickup_address: '',
    delivery_address: '',
    pickup_date: '',
    pickup_time: '',
    estimated_weight: '',
    special_instructions: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to place an order');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('laundry_orders')
        .insert({
          customer_id: user.id,
          service_type: formData.service_type as any,
          pickup_address: formData.pickup_address,
          delivery_address: formData.delivery_address || formData.pickup_address,
          pickup_date: formData.pickup_date,
          pickup_time: formData.pickup_time,
          estimated_weight: formData.estimated_weight ? parseFloat(formData.estimated_weight) : null,
          special_instructions: formData.special_instructions
        });

      if (error) throw error;

      toast.success('Order placed successfully!');
      setFormData({
        service_type: '',
        pickup_address: '',
        delivery_address: '',
        pickup_date: '',
        pickup_time: '',
        estimated_weight: '',
        special_instructions: ''
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Place an Order</CardTitle>
          <CardDescription>Please sign in to place a laundry order</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">You need to be signed in to place an order.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Your Laundry Order</CardTitle>
        <CardDescription>Fill out the details for your pickup and delivery</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="service_type">Service Type</Label>
            <Select value={formData.service_type} onValueChange={(value) => handleInputChange('service_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wash_fold">Wash & Fold</SelectItem>
                <SelectItem value="dry_cleaning">Dry Cleaning</SelectItem>
                <SelectItem value="express">Express Service</SelectItem>
                <SelectItem value="delicate">Delicate Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pickup_address">Pickup Address</Label>
            <Textarea
              id="pickup_address"
              value={formData.pickup_address}
              onChange={(e) => handleInputChange('pickup_address', e.target.value)}
              placeholder="Enter your pickup address"
              required
            />
          </div>

          <div>
            <Label htmlFor="delivery_address">Delivery Address (optional)</Label>
            <Textarea
              id="delivery_address"
              value={formData.delivery_address}
              onChange={(e) => handleInputChange('delivery_address', e.target.value)}
              placeholder="Leave blank to use pickup address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickup_date">Pickup Date</Label>
              <Input
                id="pickup_date"
                type="date"
                value={formData.pickup_date}
                onChange={(e) => handleInputChange('pickup_date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="pickup_time">Pickup Time</Label>
              <Input
                id="pickup_time"
                type="time"
                value={formData.pickup_time}
                onChange={(e) => handleInputChange('pickup_time', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="estimated_weight">Estimated Weight (lbs)</Label>
            <Input
              id="estimated_weight"
              type="number"
              step="0.1"
              value={formData.estimated_weight}
              onChange={(e) => handleInputChange('estimated_weight', e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="special_instructions">Special Instructions</Label>
            <Textarea
              id="special_instructions"
              value={formData.special_instructions}
              onChange={(e) => handleInputChange('special_instructions', e.target.value)}
              placeholder="Any special care instructions or notes"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
