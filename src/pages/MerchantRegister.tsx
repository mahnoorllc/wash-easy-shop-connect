
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MerchantRegistrationForm {
  businessName: string;
  businessAddress: string;
  phone: string;
  email: string;
  description: string;
}

const MerchantRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<MerchantRegistrationForm>();

  const onSubmit = async (data: MerchantRegistrationForm) => {
    if (!user) {
      toast.error('Please login to register as a merchant');
      return;
    }

    try {
      const { error } = await supabase
        .from('merchants')
        .insert({
          user_id: user.id,
          business_name: data.businessName,
          business_address: data.businessAddress,
          phone: data.phone,
          email: data.email,
          is_approved: false,
          is_active: true
        });

      if (error) throw error;

      toast.success('Merchant registration submitted! We will review and contact you soon.');
      navigate('/');
    } catch (error) {
      console.error('Error registering merchant:', error);
      toast.error('Failed to submit registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Become a Partner</CardTitle>
              <p className="text-gray-600 text-center">
                Join our network of trusted laundry service providers
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    {...register('businessName', { required: 'Business name is required' })}
                    placeholder="Enter your business name"
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input
                    id="businessAddress"
                    {...register('businessAddress', { required: 'Business address is required' })}
                    placeholder="Enter your business address"
                  />
                  {errors.businessAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessAddress.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Tell us about your business</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your services, experience, and what makes you unique"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MerchantRegister;
