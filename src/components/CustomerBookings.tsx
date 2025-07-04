
import React from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const CustomerBookings = () => {
  const { bookings, loading, error, updateBookingStatus } = useBookings();

  const handleCancelBooking = async (bookingId: string) => {
    const success = await updateBookingStatus(bookingId, 'cancelled');
    if (success) {
      toast.success('Booking cancelled successfully');
    } else {
      toast.error('Failed to cancel booking');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
          <Button onClick={() => window.location.href = '/'}>
            Book Your First Service
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Bookings</h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {booking.merchant?.business_name || 'Unknown Merchant'}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{booking.merchant?.business_address}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm">{booking.booking_date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm">{booking.booking_time}</span>
                </div>
                {booking.merchant?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{booking.merchant.phone}</span>
                  </div>
                )}
              </div>

              {booking.customer_address && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Pickup Address:</strong> {booking.customer_address}
                  </p>
                </div>
              )}

              {booking.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                </div>
              )}

              {booking.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
