import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SiteHealthChecker } from '@/components/SiteHealthChecker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, ShoppingBag, Settings, Monitor, Store, Package } from 'lucide-react';
import { ProductManagement } from '@/components/ProductManagement';
import { SaleNotifications } from '@/components/SaleNotifications';
import { MerchantManagement } from '@/components/MerchantManagement';

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your WashEasy platform</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="merchants" className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                Merchants
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Sales
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Site Health
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
...
            </TabsContent>

            <TabsContent value="merchants" className="space-y-6">
              <MerchantManagement />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <SaleNotifications />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Manage customer accounts, merchant registrations, and user permissions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Total Customers</h3>
                        <p className="text-2xl font-bold text-blue-600">1,145</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Active Merchants</h3>
                        <p className="text-2xl font-bold text-green-600">89</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Pending Approvals</h3>
                        <p className="text-2xl font-bold text-yellow-600">12</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Monitor order status, track deliveries, and manage customer requests.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Pending</h3>
                        <p className="text-2xl font-bold text-yellow-600">45</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Processing</h3>
                        <p className="text-2xl font-bold text-blue-600">123</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Completed</h3>
                        <p className="text-2xl font-bold text-green-600">2,456</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Issues</h3>
                        <p className="text-2xl font-bold text-red-600">3</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <SiteHealthChecker />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Platform Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Service Areas</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Manage available service locations
                            </p>
                            <Button size="sm">Configure Areas</Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Pricing Rules</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Set base pricing and commission rates
                            </p>
                            <Button size="sm">Update Pricing</Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Security & Compliance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Data Protection</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              GDPR compliance and data retention policies
                            </p>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Security Monitoring</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Real-time security threat detection
                            </p>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;