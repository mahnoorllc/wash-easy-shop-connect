
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { HowItWorks } from "@/components/HowItWorks";
import { LaundryBenefits } from "@/components/LaundryBenefits";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";

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
      <Footer />
    </div>
  );
};

export default Index;
