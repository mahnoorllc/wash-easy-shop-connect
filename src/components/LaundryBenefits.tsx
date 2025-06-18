
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Star, Users, MapPin, Heart } from "lucide-react";

export const LaundryBenefits = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Save 3+ Hours Weekly",
      description: "Spend time with family while we handle your laundry professionally"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Eco-Friendly Process",
      description: "Biodegradable detergents and energy-efficient machines for a greener planet"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Premium Fabric Care",
      description: "Specialized treatments for delicate fabrics, ensuring longevity"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Local Partner Network",
      description: "Supporting local businesses while getting the best service in your area"
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-600" />,
      title: "Smart Pickup & Delivery",
      description: "GPS tracking, flexible scheduling, and contactless service options"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "Family-Safe Solutions",
      description: "Hypoallergenic options and child-safe detergents for sensitive skin"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose WashEasy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            More than just laundry - we're your partners in convenience, quality, and sustainability
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
