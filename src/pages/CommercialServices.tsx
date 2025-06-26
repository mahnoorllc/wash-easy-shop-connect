
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Building2, Users, Clock, Star, Truck, Calculator } from "lucide-react";
import { useServicePricing } from "@/hooks/useServicePricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CommercialServices = () => {
  const { pricing, loading: pricingLoading } = useServicePricing();
  const { toast } = useToast();
  
  const [quoteForm, setQuoteForm] = useState({
    business_name: '',
    contact_person: '',
    email: '',
    phone: '',
    business_type: '',
    service_type: '',
    estimated_volume: '',
    frequency: '',
    special_requirements: ''
  });

  const [calculatorForm, setCalculatorForm] = useState({
    service_type: 'laundry',
    category: 'weight_based',
    quantity: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('commercial_quotes')
        .insert([{
          ...quoteForm,
          estimated_volume: parseInt(quoteForm.estimated_volume) || 0,
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted",
        description: "We'll contact you within 24 hours with a detailed quote.",
      });

      // Reset form
      setQuoteForm({
        business_name: '',
        contact_person: '',
        email: '',
        phone: '',
        business_type: '',
        service_type: '',
        estimated_volume: '',
        frequency: '',
        special_requirements: ''
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const calculatePrice = () => {
    if (!calculatorForm.quantity || pricingLoading) return;

    const relevantPricing = pricing.find(p => 
      p.service_type === calculatorForm.service_type && 
      p.category === calculatorForm.category
    );

    if (relevantPricing) {
      const quantity = parseFloat(calculatorForm.quantity);
      const basePrice = quantity * relevantPricing.base_price;
      const discount = basePrice * (relevantPricing.bulk_discount_percent / 100);
      setEstimatedPrice(basePrice - discount);
    }
  };

  const commercialServices = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: "Hotels & Hospitality",
      description: "Complete linen service for hotels, motels, and bed & breakfasts",
      features: ["Daily pickup & delivery", "Express service", "Quality assurance"]
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Restaurants & Food Service",
      description: "Professional cleaning for uniforms, aprons, and kitchen textiles",
      features: ["Same-day service", "Stain removal", "Sanitization guaranteed"]
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Healthcare Facilities",
      description: "Specialized cleaning for medical uniforms and linens",
      features: ["Medical-grade cleaning", "OSHA compliant", "24/7 availability"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Commercial Laundry Services
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Professional laundry solutions for businesses of all sizes. 
            Reliable, efficient, and cost-effective services tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commercial Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We serve a wide range of industries with specialized cleaning solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {commercialServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Calculator</h2>
            <p className="text-gray-600">Get an instant estimate for your laundry needs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Calculate Your Quote</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="service_type">Service Type</Label>
                  <Select value={calculatorForm.service_type} onValueChange={(value) => 
                    setCalculatorForm(prev => ({ ...prev, service_type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laundry">Laundry Service</SelectItem>
                      <SelectItem value="dry_cleaning">Dry Cleaning</SelectItem>
                      <SelectItem value="specialty">Specialty Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Pricing Category</Label>
                  <Select value={calculatorForm.category} onValueChange={(value) => 
                    setCalculatorForm(prev => ({ ...prev, category: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_based">Weight Based (lbs)</SelectItem>
                      <SelectItem value="per_piece">Per Piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    placeholder={calculatorForm.category === 'weight_based' ? 'Weight in lbs' : 'Number of pieces'}
                    value={calculatorForm.quantity}
                    onChange={(e) => setCalculatorForm(prev => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button onClick={calculatePrice} disabled={!calculatorForm.quantity}>
                  Calculate Price
                </Button>
                {estimatedPrice && (
                  <div className="text-2xl font-bold text-green-600">
                    Estimated: ${estimatedPrice.toFixed(2)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request a Custom Quote</h2>
            <p className="text-gray-600">Tell us about your business needs and we'll provide a tailored solution</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>We'll use this information to prepare your custom quote</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business_name">Business Name *</Label>
                    <Input
                      required
                      value={quoteForm.business_name}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, business_name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_person">Contact Person *</Label>
                    <Input
                      required
                      value={quoteForm.contact_person}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, contact_person: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business_type">Business Type</Label>
                    <Select value={quoteForm.business_type} onValueChange={(value) => 
                      setQuoteForm(prev => ({ ...prev, business_type: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotel/Hospitality</SelectItem>
                        <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="office">Office/Corporate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="service_type">Service Needed</Label>
                    <Select value={quoteForm.service_type} onValueChange={(value) => 
                      setQuoteForm(prev => ({ ...prev, service_type: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laundry">Regular Laundry</SelectItem>
                        <SelectItem value="dry_cleaning">Dry Cleaning</SelectItem>
                        <SelectItem value="linens">Linen Service</SelectItem>
                        <SelectItem value="uniforms">Uniform Service</SelectItem>
                        <SelectItem value="specialty">Specialty Items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimated_volume">Estimated Weekly Volume (lbs)</Label>
                    <Input
                      type="number"
                      value={quoteForm.estimated_volume}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, estimated_volume: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Service Frequency</Label>
                    <Select value={quoteForm.frequency} onValueChange={(value) => 
                      setQuoteForm(prev => ({ ...prev, frequency: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="special_requirements">Special Requirements</Label>
                  <Textarea
                    placeholder="Tell us about any special requirements, timing constraints, or additional services needed..."
                    value={quoteForm.special_requirements}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, special_requirements: e.target.value }))}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialServices;
