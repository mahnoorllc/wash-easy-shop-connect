import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, CheckCircle, Package, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ProviderDashboard = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isPending = profile?.status === 'pending';
  const isApproved = profile?.status === 'active';

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
            <div className="flex items-center gap-2">
              <span>Welcome back, {profile?.full_name}</span>
              <Badge variant={isApproved ? "default" : "secondary"}>
                {profile?.status === 'pending' ? 'Pending Approval' : 
                 profile?.status === 'active' ? 'Approved' : 'Inactive'}
              </Badge>
            </div>
          </div>

          {isPending && (
            <Alert className="mb-6 border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Your provider account is pending approval. You'll be able to accept and manage jobs once an admin approves your account.
              </AlertDescription>
            </Alert>
          )}

          {isApproved ? (
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  My Orders
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Business Profile
                </TabsTrigger>
                <TabsTrigger value="earnings" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Earnings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Orders awaiting pickup</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">Orders being processed</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">Orders completed</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Manage your assigned laundry orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Order #{order}001</p>
                            <p className="text-sm text-gray-600">Customer: John Doe</p>
                            <p className="text-sm text-gray-600">Service: Wash & Fold</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">Pending Pickup</Badge>
                            <div className="mt-2">
                              <Button size="sm">Update Status</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Profile</CardTitle>
                    <CardDescription>Manage your business information and service areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Business Name</label>
                        <p className="text-gray-600">{profile?.business_name || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Business Address</label>
                        <p className="text-gray-600">{profile?.business_address || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Service Areas</label>
                        <p className="text-gray-600">
                          {profile?.service_areas?.length ? 
                            profile.service_areas.join(', ') : 
                            'No service areas set'
                          }
                        </p>
                      </div>
                      <Button>Update Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$1,234</div>
                      <p className="text-sm text-gray-600">+15% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Total Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$8,567</div>
                      <p className="text-sm text-gray-600">Since joining</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Account Pending</CardTitle>
                <CardDescription>
                  Your provider account is waiting for admin approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Approval Required</h3>
                  <p className="text-gray-600 mb-4">
                    Our team is reviewing your application. You'll receive an email once your account is approved.
                  </p>
                  <Button variant="outline">Contact Support</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ProviderDashboard;