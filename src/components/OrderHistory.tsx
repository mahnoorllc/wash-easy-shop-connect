import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBookings } from '@/hooks/useBookings';
import { Calendar, MapPin, Clock, Package, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export const OrderHistory = () => {
  const { bookings, loading } = useBookings();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No orders found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Your completed orders will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order History ({bookings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {format(new Date(booking.booking_date), 'PPP')}
                    </span>
                    <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                    <span className="text-sm">
                      {booking.booking_time}
                    </span>
                  </div>
                  
                  {booking.customer_address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {booking.customer_address}
                      </span>
                    </div>
                  )}
                  
                  {booking.merchant && (
                    <div className="text-sm">
                      <span className="font-medium">Service Provider: </span>
                      <span className="text-muted-foreground">
                        {booking.merchant.business_name}
                      </span>
                    </div>
                  )}
                </div>
                
                <Badge 
                  variant="outline" 
                  className={getStatusColor(booking.status)}
                >
                  {formatStatus(booking.status)}
                </Badge>
              </div>
              
              {booking.notes && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Notes: </span>
                    {booking.notes}
                  </p>
                </div>
              )}
              
              {booking.duration_minutes && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Duration: </span>
                  {booking.duration_minutes} minutes
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};