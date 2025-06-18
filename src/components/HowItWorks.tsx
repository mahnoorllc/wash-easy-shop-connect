
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Truck, Sparkles } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Schedule Pickup",
      description: "Choose your service type, weight, and pickup time through our easy-to-use platform",
      details: ["Select wash & fold, dry cleaning, or premium care", "Choose convenient pickup time", "Add special instructions"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Partner Assignment",
      description: "Our system automatically finds and assigns the nearest trusted partner merchant",
      details: ["Location-based matching", "Real-time availability check", "Quality & rating verified"],
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "Professional Cleaning",
      description: "Your clothes are carefully cleaned using premium products and professional techniques",
      details: ["Eco-friendly detergents", "Professional equipment", "Quality control checks"],
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Fresh Delivery",
      description: "Clean, fresh clothes delivered back to your doorstep within 24-48 hours",
      details: ["Contactless delivery", "Real-time tracking", "100% satisfaction guarantee"],
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your laundry done in 4 simple steps - from pickup to delivery, we handle everything
          </p>
        </div>

        {/* Desktop View - Horizontal Steps */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 to-orange-200"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <Card key={index} className={`${step.color} border-2 hover:shadow-lg transition-all duration-300 relative`}>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-current flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <CardContent className="pt-8 pb-6 text-center space-y-4">
                    <div className="flex justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                          <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Vertical Steps */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center font-bold text-blue-600">
                  {index + 1}
                </div>
                {index < steps.length - 1 && <div className="w-0.5 h-16 bg-blue-200 mt-2"></div>}
              </div>
              
              <Card className={`flex-1 ${step.color} border-2`}>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center space-x-3">
                    {step.icon}
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                  
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                        <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Time Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border-2 border-blue-100">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-900">Average completion time: 24-48 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
};
