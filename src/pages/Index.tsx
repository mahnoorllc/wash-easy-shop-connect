
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      <Hero />
      <ServiceCards />
      <HowItWorks />
      
      {/* Stats Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-blue-100">Partner Merchants</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">2000+</div>
              <div className="text-blue-100">Orders Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-100">Service Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600">Join thousands of satisfied customers and partners</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              Order Laundry Service
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
