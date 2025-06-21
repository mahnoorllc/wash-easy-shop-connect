
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, Clock, MapPin, Star, ShoppingBag, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { getStatusColor, getStatusDisplay, getServiceTypeDisplay, formatDate, formatTime } from "@/utils/orderUtils";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, loading, error } = useOrders();

  // Filter orders by status
  const activeOrders = orders.filter(order => 
    order.status && !['delivered', 'cancelled'].includes(order.status)
  );
  const completedOrders = orders.filter(order => 
    order.status === 'delivered'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!
          </h1>
          <p className="text-gray-600">Manage your laundry orders and shop for accessories</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/')}>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">New Order</h3>
                <p className="text-sm text-gray-600">Schedule laundry pickup</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/shop')}>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Shop</h3>
                <p className="text-sm text-gray-600">Browse accessories</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Orders</h3>
                <p className="text-sm text-gray-600">Monitor delivery status</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="history">Order History ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {activeOrders.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center space-y-4">
                    <Package className="w-16 h-16 text-gray-300 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Orders</h3>
                      <p className="text-gray-600 mb-6">You don't have any active laundry orders</p>
                      <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                        Create New Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                activeOrders.map((order) => (
                  <Card key={order.id} className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{getServiceTypeDisplay(order.service_type)}</CardTitle>
                          <CardDescription className="text-gray-600">
                            Order #{order.id.slice(0, 8)} {order.estimated_weight && `• ${order.estimated_weight}lbs`}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusDisplay(order.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Pickup:</span>
                            <span className="font-medium">{order.pickup_address.slice(0, 30)}...</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{formatDate(order.pickup_date)} at {formatTime(order.pickup_time)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.delivery_address && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Truck className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">Delivery:</span>
                              <span className="font-medium">{order.delivery_address.slice(0, 30)}...</span>
                            </div>
                          )}
                          {order.total_amount && (
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-semibold text-blue-600">${Number(order.total_amount).toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {order.special_instructions && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-gray-600">
                            <strong>Instructions:</strong> {order.special_instructions}
                          </p>
                        </div>
                      )}
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid gap-6">
              {completedOrders.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center space-y-4">
                    <Star className="w-16 h-16 text-gray-300 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Order History</h3>
                      <p className="text-gray-600 mb-6">You haven't completed any orders yet</p>
                      <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                        Place Your First Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                completedOrders.map((order) => (
                  <Card key={order.id} className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{getServiceTypeDisplay(order.service_type)}</CardTitle>
                          <CardDescription className="text-gray-600">
                            Order #{order.id.slice(0, 8)} {order.estimated_weight && `• ${order.estimated_weight}lbs`}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Completed:</span>
                            <span className="font-medium">{formatDate(order.updated_at || order.created_at || '')}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.total_amount && (
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-semibold text-blue-600">${Number(order.total_amount).toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Receipt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
