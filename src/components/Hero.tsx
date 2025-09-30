
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23dbeafe%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                🎉 Now Available in Your Area
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {t('hero.title')}
                <span className="text-blue-600"> Doorstep</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-500 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 md:w-5 h-4 md:h-5 text-blue-500" />
                <span>Same-day Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 md:w-5 h-4 md:h-5 text-green-500" />
                <span>24hr Turnaround</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 md:w-5 h-4 md:h-5 text-purple-500" />
                <span>Insured & Trusted</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg text-white"
                onClick={() => navigate('/customer-dashboard')}
              >
                {t('hero.bookNow')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/merchant-register')}
              >
                {t('nav.becomeProvider')}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-6 md:pt-8">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading companies</p>
              <div className="flex items-center justify-between md:justify-start md:space-x-8 opacity-60">
                <div className="text-sm md:text-lg font-semibold text-gray-400">TechCorp</div>
                <div className="text-sm md:text-lg font-semibold text-gray-400">CleanCo</div>
                <div className="text-sm md:text-lg font-semibold text-gray-400">FreshStart</div>
                <div className="hidden md:block text-lg font-semibold text-gray-400">LaundryPro</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="space-y-4 md:space-y-6">
                {/* Mock App Interface */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Quick Order</h3>
                    <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">Wash & Fold</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">5kg</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Pickup:</span>
                      <span className="font-medium">Today 2:00 PM</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-semibold text-sm md:text-base">
                        <span>Total:</span>
                        <span className="text-blue-600">$25.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Steps */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs md:text-sm">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">1</div>
                    <span className="text-gray-700">Schedule Pickup</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs md:text-sm">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">2</div>
                    <span className="text-gray-700">Professional Cleaning</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs md:text-sm">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xs md:text-sm">3</div>
                    <span className="text-gray-500">Fresh Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
