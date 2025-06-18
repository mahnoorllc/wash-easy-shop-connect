
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Working Mom",
      content: "WashEasy has been a lifesaver! As a working mom of two, I was drowning in laundry. Now I have my weekends back and my clothes come back perfectly folded.",
      rating: 5,
      location: "Downtown"
    },
    {
      name: "Michael Chen",
      role: "Business Professional",
      content: "The dry cleaning service is exceptional. My suits have never looked better, and the pickup/delivery fits perfectly into my busy schedule.",
      rating: 5,
      location: "Financial District"
    },
    {
      name: "Emma Rodriguez",
      role: "College Student",
      content: "Affordable, reliable, and they even handle my delicate vintage pieces with care. The student discount is a huge bonus!",
      rating: 5,
      location: "University Area"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied customers who trust WashEasy
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
