
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MerchantBooking {
  id: string;
  customer_id: string;
  booking_date: string;
  booking_time: string;
  status: string;
  customer_address: string;
  notes: string;
  created_at: string;
  customer_profile?: {
    full_name: string;
    phone: string;
  };
}

export const MerchantDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<MerchantBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [merchant, setMerchant] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchMerchantData();
      fetchBookings();
    }
  }, [user]);

  const fetchMerchantData = async () => {
    try {
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setMerchant(data);
    } catch (error) {
      console.error('Error fetching merchant data:', error);
      toast.error('Failed to load merchant profile');
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // Get merchant profile first
      const { data: merchantData, error: merchantError } = await supabase
        .from('merchants')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (merchantError || !merchantData) {
        console.error('Error getting merchant profile:', merchantError);
        setBookings([]);
        return;
      }

      // Fetch bookings for this merchant
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('merchant_id', merchantData.id)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        toast.error('Failed to load bookings');
        setBookings([]);
        return;
      }

      // Get customer profiles separately
      const customerIds = bookingsData?.map(b => b.customer_id) || [];
      const { data: customerProfiles } = await supabase
        .from('profiles')
        .select('id, full_name, phone')
        .in('id', customerIds);

      // Create a map for quick lookup
      const customerMap = new Map();
      customerProfiles?.forEach(profile => {
        customerMap.set(profile.id, profile);
      });

      const formattedBookings: MerchantBooking[] = bookingsData?.map(booking => ({
        id: booking.id,
        customer_id: booking.customer_id,
        booking_date: booking.booking_date,
        booking_time: booking.booking_time,
        status: booking.status,
        customer_address: booking.customer_address || 'No address provided',
        notes: booking.notes || '',
        created_at: booking.created_at,
        customer_profile: customerMap.has(booking.customer_id) ? {
          full_name: customerMap.get(booking.customer_id).full_name || 'Unknown Customer',
          phone: customerMap.get(booking.customer_id).phone || 'No phone provided'
        } : {
          full_name: 'Unknown Customer',
          phone: 'No phone provided'
        }
      })) || [];

      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      // Use the database function for updating status
      const { error } = await supabase.rpc('update_booking_status', {
        booking_id: bookingId,
        new_status: newStatus
      });

      if (error) throw error;
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus }
            : booking
        )
      );
      
      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterBookings = (status?: string) => {
    if (!status) return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  if (!merchant) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">You don't have a merchant profile set up yet.</p>
          <p className="text-sm text-gray-400 mt-2">Contact support to get your merchant account approved.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
        <Badge className={merchant.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
          {merchant.is_approved ? 'Approved' : 'Pending Approval'}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{merchant.business_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">{merchant.business_address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{merchant.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{merchant.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="font-medium">★ 4.5 (12 reviews)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterBookings('pending').length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({filterBookings('confirmed').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterBookings('completed').length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({filterBookings('cancelled').length})</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {(tab === 'all' ? bookings : filterBookings(tab)).length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No {tab === 'all' ? '' : tab} bookings found.</p>
                </CardContent>
              </Card>
            ) : (
              (tab === 'all' ? bookings : filterBookings(tab)).map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {booking.customer_profile?.full_name || 'Customer'}
                        </span>
                        {booking.customer_profile?.phone && (
                          <span className="text-gray-500">• {booking.customer_profile.phone}</span>
                        )}
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">{booking.booking_date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">{booking.booking_time}</span>
                      </div>
                    </div>

                    {booking.customer_address && (
                      <div className="mb-4">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                          <span className="text-sm">{booking.customer_address}</span>
                        </div>
                      </div>
                    )}

                    {booking.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
