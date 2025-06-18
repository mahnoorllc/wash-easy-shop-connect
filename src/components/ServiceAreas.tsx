
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Truck } from "lucide-react";

export const ServiceAreas = () => {
  const areas = [
    {
      name: "Downtown Core",
      coverage: "Full Service",
      timeSlots: "7 AM - 10 PM",
      specialties: ["Same-day service", "Business district priority"]
    },
    {
      name: "Residential Districts",
      coverage: "Full Service", 
      timeSlots: "8 AM - 8 PM",
      specialties: ["Family packages", "Bulk discounts"]
    },
    {
      name: "University Area",
      coverage: "Student Special",
      timeSlots: "10 AM - 6 PM", 
      specialties: ["Student discounts", "Dorm pickup"]
    },
    {
      name: "Suburbs & Outskirts",
      coverage: "Express Routes",
      timeSlots: "9 AM - 7 PM",
      specialties: ["Weekly schedules", "Large capacity"]
    }
  ];

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Service Areas & Coverage
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Professional laundry service across the city with specialized coverage
          </p>
          <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
            Expanding to 5 new areas this month!
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{area.name}</CardTitle>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {area.coverage}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{area.timeSlots}</span>
                </div>
                <div className="space-y-1">
                  {area.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <Truck className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
