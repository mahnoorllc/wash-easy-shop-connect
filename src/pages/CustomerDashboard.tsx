
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useBookings } from '@/hooks/useBookings';
import { Calendar, MapPin, Clock, Star, Phone } from 'lucide-react';
import { format } from 'date-fns';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { bookings, loading: bookingsLoading, updateBookingStatus } = useBookings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const success = await updateBookingStatus(bookingId, 'cancelled');
    if (success) {
      // Handle success (toast notification would be nice)
      console.log('Booking cancelled successfully');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">Please sign in to view your dashboard.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Manage your laundry services and bookings</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Recent Bookings</h2>
              <Badge variant="secondary">{bookings.length} total</Badge>
            </div>

            {bookingsLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ) : bookings.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-4">Your bookings will appear here once you make them.</p>
                  <Button onClick={() => window.location.href = '/#book-service'}>
                    Book Your First Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <span>{booking.merchant?.business_name || 'Merchant'}</span>
                            {booking.merchant?.rating && (
                              <div className="flex items-center space-x-1 text-sm text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{booking.merchant.rating}</span>
                              </div>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.booking_date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.booking_time}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        {booking.customer_address && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.customer_address}</span>
                          </div>
                        )}
                        {booking.merchant?.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{booking.merchant.phone}</span>
                          </div>
                        )}
                        {booking.estimated_distance_km && (
                          <p>Distance: {booking.estimated_distance_km} km</p>
                        )}
                        {booking.notes && (
                          <p className="italic">Notes: {booking.notes}</p>
                        )}
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="mt-4 pt-4 border-t">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Booked on {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Previous Orders */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Previous Orders</h2>
              <Badge variant="secondary">{orders.length} total</Badge>
            </div>

            {ordersLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600">Your order history will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {order.service_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </CardTitle>
                        <Badge className={getStatusColor(order.status || 'pending')}>
                          {order.status || 'pending'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{order.pickup_date} at {order.pickup_time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{order.pickup_address}</span>
                        </div>
                        {order.estimated_weight && (
                          <p>Estimated weight: {order.estimated_weight} lbs</p>
                        )}
                        {order.total_amount && (
                          <p className="font-medium">Total: ${order.total_amount}</p>
                        )}
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Ordered on {format(new Date(order.created_at), 'MMM dd, yyyy')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
