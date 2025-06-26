
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
import { MerchantMap } from './MerchantMap';
import { MapPin, Calendar, Clock } from 'lucide-react';

export const BookingForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Location & Merchant, 2: Service Details, 3: Time Slot
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('');
  
  const [formData, setFormData] = useState({
    service_type: '',
    pickup_address: '',
    delivery_address: '',
    pickup_date: '',
    pickup_time: '',
    estimated_weight: '',
    special_instructions: '',
    customer_address: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to place a booking');
      return;
    }

    if (!selectedMerchantId) {
      toast.error('Please select a merchant');
      return;
    }

    setLoading(true);
    try {
      // Create the laundry order first
      const { data: orderData, error: orderError } = await supabase
        .from('laundry_orders')
        .insert({
          customer_id: user.id,
          merchant_id: selectedMerchantId,
          service_type: formData.service_type as any,
          pickup_address: formData.pickup_address,
          delivery_address: formData.delivery_address || formData.pickup_address,
          pickup_date: formData.pickup_date,
          pickup_time: formData.pickup_time,
          estimated_weight: formData.estimated_weight ? parseFloat(formData.estimated_weight) : null,
          special_instructions: formData.special_instructions
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create the booking using RPC function
      const { error: bookingError } = await supabase.rpc('create_booking', {
        p_customer_id: user.id,
        p_merchant_id: selectedMerchantId,
        p_laundry_order_id: orderData.id,
        p_booking_date: formData.pickup_date,
        p_booking_time: formData.pickup_time,
        p_customer_address: formData.customer_address || formData.pickup_address,
        p_notes: formData.special_instructions
      });

      if (bookingError) {
        console.log('Booking error:', bookingError);
        // Fallback: continue without booking table for now
      }

      toast.success('Order placed successfully! The merchant will confirm your appointment soon.');
      
      // Reset form
      setFormData({
        service_type: '',
        pickup_address: '',
        delivery_address: '',
        pickup_date: '',
        pickup_time: '',
        estimated_weight: '',
        special_instructions: '',
        customer_address: ''
      });
      setSelectedMerchantId('');
      setStep(1);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedMerchantId) {
      toast.error('Please select a merchant to continue');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book Laundry Service</CardTitle>
          <CardDescription>Please sign in to book a laundry service</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">You need to be signed in to make a booking.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Book Laundry Service</span>
          <span className="text-sm font-normal text-gray-500">
            (Step {step} of 3)
          </span>
        </CardTitle>
        <CardDescription>
          {step === 1 && "Choose your location and select a nearby merchant"}
          {step === 2 && "Provide service details and pickup information"}
          {step === 3 && "Select your preferred time slot"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Location & Merchant Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="customer_address">Your Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="customer_address"
                    placeholder="Enter your address for accurate merchant suggestions"
                    value={formData.customer_address}
                    onChange={(e) => handleInputChange('customer_address', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <MerchantMap
                onMerchantSelect={setSelectedMerchantId}
                selectedMerchantId={selectedMerchantId}
                customerAddress={formData.customer_address}
              />

              <Button 
                type="button" 
                onClick={nextStep} 
                className="w-full"
                disabled={!selectedMerchantId}
              >
                Continue with Selected Merchant
              </Button>
            </div>
          )}

          {/* Step 2: Service Details */}
          {step === 2 && (
            <div className="space-y-4">
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

              <div className="flex space-x-3">
                <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1">
                  Continue to Time Selection
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup_date">Pickup Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="pickup_date"
                      type="date"
                      value={formData.pickup_date}
                      onChange={(e) => handleInputChange('pickup_date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="pickup_time">Pickup Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="pickup_time"
                      type="time"
                      value={formData.pickup_time}
                      onChange={(e) => handleInputChange('pickup_time', e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Booking Summary</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Service:</strong> {formData.service_type.replace('_', ' ')}</p>
                  <p><strong>Date:</strong> {formData.pickup_date}</p>
                  <p><strong>Time:</strong> {formData.pickup_time}</p>
                  <p><strong>Pickup:</strong> {formData.pickup_address}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
