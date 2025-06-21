
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { HowItWorks } from "@/components/HowItWorks";
import { LaundryBenefits } from "@/components/LaundryBenefits";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Footer } from "@/components/Footer";
import { OrderForm } from "@/components/OrderForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      <Hero />
      <LaundryBenefits />
      <ServiceCards />
      <HowItWorks />
      
      {/* Order Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600">Place your first order and experience the convenience</p>
          </div>
          <OrderForm />
        </div>
      </section>

      <ServiceAreas />
      <TestimonialsSection />
      
      {/* Enhanced Stats Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by the Community</h2>
            <p className="text-blue-100">Real numbers from real customers who love our service</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">2,500+</div>
              <div className="text-blue-100">Happy Customers</div>
              <div className="text-xs text-blue-200">and growing daily</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">85+</div>
              <div className="text-blue-100">Partner Merchants</div>
              <div className="text-xs text-blue-200">local businesses</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">15,000+</div>
              <div className="text-blue-100">Orders Completed</div>
              <div className="text-xs text-blue-200">this month alone</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">99.2%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
              <div className="text-xs text-blue-200">verified reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              🚀 Special Launch Offer
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Ready to Transform Your Laundry Experience?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers and local partners. Get your first order with 20% off - limited time offer!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg shadow-lg">
              Start Your First Order - 20% Off
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg">
              Partner With Us Today
            </Button>
          </div>
          
          <div className="pt-8 text-sm text-gray-500">
            <p>✓ No setup fees ✓ Cancel anytime ✓ 100% satisfaction guarantee</p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Index;
