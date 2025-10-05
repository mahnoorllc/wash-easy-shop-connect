import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      name: t('testimonials.customers.sarah.name'),
      role: t('testimonials.customers.sarah.role'),
      content: t('testimonials.customers.sarah.content'),
      rating: 5,
      location: t('testimonials.customers.sarah.location')
    },
    {
      name: t('testimonials.customers.michael.name'),
      role: t('testimonials.customers.michael.role'),
      content: t('testimonials.customers.michael.content'),
      rating: 5,
      location: t('testimonials.customers.michael.location')
    },
    {
      name: t('testimonials.customers.emma.name'),
      role: t('testimonials.customers.emma.role'),
      content: t('testimonials.customers.emma.content'),
      rating: 5,
      location: t('testimonials.customers.emma.location')
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('testimonials.subtitle')}
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
