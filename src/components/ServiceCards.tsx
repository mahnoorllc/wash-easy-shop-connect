
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, ShoppingBag, Users, Clock, Star, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ServiceCards = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Laundry Service",
      description: "Professional pickup, wash, and delivery service by trusted local partners",
      features: ["Same-day service", "Quality guarantee", "Eco-friendly products"],
      price: "From $15/load",
      badge: "Most Popular",
      action: () => navigate('/customer-dashboard')
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-green-600" />,
      title: "Accessory Shop",
      description: "Premium laundry accessories, detergents, and supplies delivered to your door",
      features: ["Premium brands", "Bulk discounts", "Fast delivery"],
      price: "Free shipping $50+",
      badge: "New",
      action: () => navigate('/shop')
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Partner Program",
      description: "Join our network of laundry service providers and grow your business",
      features: ["Flexible schedule", "Guaranteed income", "Business support"],
      price: "Earn up to $5k/month",
      badge: "Opportunity",
      action: () => navigate('/merchant-register')
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need for Perfect Laundry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From professional cleaning services to premium accessories, we've got your laundry needs covered
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
              {service.badge && (
                <Badge className="absolute top-4 right-4 z-10 bg-blue-600 hover:bg-blue-700">
                  {service.badge}
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>4.9</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform"
                    onClick={service.action}
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <Clock className="w-8 h-8 text-blue-600 mx-auto" />
            <h3 className="font-semibold text-gray-900">24hr Service</h3>
            <p className="text-sm text-gray-600">Quick turnaround</p>
          </div>
          <div className="space-y-2">
            <Shield className="w-8 h-8 text-green-600 mx-auto" />
            <h3 className="font-semibold text-gray-900">Insured</h3>
            <p className="text-sm text-gray-600">100% protected</p>
          </div>
          <div className="space-y-2">
            <Star className="w-8 h-8 text-yellow-600 mx-auto" />
            <h3 className="font-semibold text-gray-900">Top Rated</h3>
            <p className="text-sm text-gray-600">4.9/5 stars</p>
          </div>
          <div className="space-y-2">
            <Users className="w-8 h-8 text-purple-600 mx-auto" />
            <h3 className="font-semibold text-gray-900">Trusted</h3>
            <p className="text-sm text-gray-600">500+ partners</p>
          </div>
        </div>
      </div>
    </section>
  );
};
