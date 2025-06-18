
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, Clock, MapPin, Star, ShoppingBag, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeOrders] = useState([
    {
      id: "ORD-001",
      type: "Wash & Fold",
      weight: "5kg",
      status: "In Progress",
      merchant: "Clean Pro Laundry",
      pickupDate: "2024-01-15",
      estimatedDelivery: "2024-01-16",
      price: 25.00,
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "ORD-002",
      type: "Dry Cleaning",
      weight: "3 items",
      status: "Ready for Pickup",
      merchant: "Premium Clean",
      pickupDate: "2024-01-14",
      estimatedDelivery: "2024-01-15",
      price: 35.00,
      statusColor: "bg-green-100 text-green-800"
    }
  ]);

  const [orderHistory] = useState([
    {
      id: "ORD-003",
      type: "Wash & Fold",
      weight: "8kg",
      status: "Completed",
      merchant: "Quick Wash",
      completedDate: "2024-01-10",
      price: 32.00,
      rating: 5
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Manage your laundry orders and shop for accessories</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/new-order')}>
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
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
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
                      <Button onClick={() => navigate('/new-order')} className="bg-blue-600 hover:bg-blue-700">
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
                          <CardTitle className="text-lg">{order.type}</CardTitle>
                          <CardDescription className="text-gray-600">
                            Order #{order.id} • {order.weight}
                          </CardDescription>
                        </div>
                        <Badge className={order.statusColor}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Merchant:</span>
                            <span className="font-medium">{order.merchant}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Pickup:</span>
                            <span className="font-medium">{order.pickupDate}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Truck className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Delivery:</span>
                            <span className="font-medium">{order.estimatedDelivery}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-semibold text-blue-600">${order.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Merchant
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
              {orderHistory.map((order) => (
                <Card key={order.id} className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.type}</CardTitle>
                        <CardDescription className="text-gray-600">
                          Order #{order.id} • {order.weight}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Merchant:</span>
                          <span className="font-medium">{order.merchant}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium">{order.completedDate}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < order.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-semibold text-blue-600">${order.price.toFixed(2)}</span>
                        </div>
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
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
