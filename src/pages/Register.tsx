
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck, User, Mail, Lock, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    agreeTerms: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = (userType: string) => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and accept terms",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Successful",
      description: `Welcome to WashEasy! Setting up your ${userType} account...`,
    });
    
    // Redirect based on user type
    setTimeout(() => {
      switch (userType) {
        case 'customer':
          navigate('/customer-dashboard');
          break;
        case 'merchant':
          navigate('/merchant-dashboard');
          break;
        default:
          navigate('/customer-dashboard');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="text-center mb-4">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center space-x-1 mx-auto"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">WashEasy</span>
          </div>
          <p className="text-gray-600">Create your account</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Join WashEasy</CardTitle>
            <CardDescription className="text-center">
              Choose your account type to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customer" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="merchant">Merchant</TabsTrigger>
              </TabsList>

              {['customer', 'merchant'].map((userType) => (
                <TabsContent key={userType} value={userType} className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="Enter your address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeTerms', !!checked)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleRegister(userType)}
                    >
                      Create {userType.charAt(0).toUpperCase() + userType.slice(1)} Account
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button 
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
