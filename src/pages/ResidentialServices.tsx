
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Truck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResidentialServices = () => {
  const services = [
    {
      name: "Wash & Fold",
      description: "Professional washing, drying, and folding service for your everyday clothes",
      price: "From $2.50/lb",
      features: ["Free pickup & delivery", "Same-day service available", "Eco-friendly detergents", "Satisfaction guarantee"]
    },
    {
      name: "Dry Cleaning",
      description: "Expert dry cleaning for delicate fabrics and special garments",
      price: "From $8.99/item",
      features: ["Professional pressing", "Stain removal", "Garment inspection", "Protective packaging"]
    },
    {
      name: "Express Service",
      description: "Rush service for when you need your clothes cleaned quickly",
      price: "From $4.50/lb",
      features: ["4-hour turnaround", "Priority processing", "Quality guarantee", "Real-time updates"]
    },
    {
      name: "Delicate Care",
      description: "Specialized care for designer clothes, silk, wool, and other delicate items",
      price: "From $12.99/item",
      features: ["Hand washing", "Air drying", "Special handling", "Premium packaging"]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Time Saving",
      description: "Get your time back for what matters most"
    },
    {
      icon: Truck,
      title: "Convenient Pickup",
      description: "Free pickup and delivery at your doorstep"
    },
    {
      icon: Star,
      title: "Professional Quality",
      description: "Expert cleaning with premium equipment"
    },
    {
      icon: CheckCircle,
      title: "100% Guarantee",
      description: "We guarantee your satisfaction or redo for free"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Residential Laundry Services
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Professional laundry and dry cleaning services for your home. 
            Save time and get perfectly clean clothes delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/#book-service">Book Service Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Residential Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional laundry services designed for busy households
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <Badge className="w-fit bg-blue-100 text-blue-800">{service.price}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Residential Services?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the convenience of professional laundry service. Book your first pickup today!
          </p>
          <Button asChild size="lg">
            <Link to="/#book-service">Schedule Pickup</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialServices;
