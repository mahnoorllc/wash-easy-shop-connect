
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { HowItWorks } from "@/components/HowItWorks";
import { LaundryBenefits } from "@/components/LaundryBenefits";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />
      <Hero />
      <ServiceCards />
      <HowItWorks />
      <LaundryBenefits />
      
      {/* Booking Section */}
      <section id="book-service" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find nearby merchants and book your laundry service with our easy 3-step process
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <TestimonialsSection />
      <ServiceAreas />

      {/* Blog Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Laundry Tips & Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Discover expert tips and guides to keep your clothes looking their best
            </p>
            
            {/* Blog Preview Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How to Care for Your Clothes
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Essential tips to keep your garments looking fresh and lasting longer
                </p>
                <Link 
                  to="/blog/care-for-your-clothes-guide" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Protect Your Hands During Laundry
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Safety tips for keeping your hands healthy while doing laundry
                </p>
                <Link 
                  to="/blog/protect-hands-during-laundry" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Eco-Friendly Laundry Tips
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Sustainable practices for cleaner clothes and a cleaner planet
                </p>
                <Link 
                  to="/blog/eco-friendly-laundry-tips" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>

            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/blog" className="flex items-center gap-2">
                Read All Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
