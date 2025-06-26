
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Phone } from 'lucide-react';
import { useMerchants } from '@/hooks/useMerchants';

interface MerchantMapProps {
  onMerchantSelect: (merchantId: string) => void;
  selectedMerchantId?: string;
  customerAddress?: string;
}

export const MerchantMap: React.FC<MerchantMapProps> = ({
  onMerchantSelect,
  selectedMerchantId,
  customerAddress
}) => {
  const [customerLocation, setCustomerLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { merchants, loading, refetchMerchants } = useMerchants();

  // Get customer's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCustomerLocation(location);
          refetchMerchants(location.lat, location.lng);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Geocode customer address if provided
  const geocodeAddress = async (address: string) => {
    // For now, we'll just use the current location
    // In a real implementation, you'd use Google Geocoding API here
    getCurrentLocation();
  };

  useEffect(() => {
    if (customerAddress) {
      geocodeAddress(customerAddress);
    }
  }, [customerAddress]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading nearby merchants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Location Status */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Your Location</span>
        </div>
        {customerLocation ? (
          <p className="text-sm text-gray-600">
            Location detected • Showing merchants sorted by distance
          </p>
        ) : locationError ? (
          <div>
            <p className="text-sm text-red-600 mb-2">{locationError}</p>
            <Button size="sm" onClick={getCurrentLocation} variant="outline">
              Try Again
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={getCurrentLocation} variant="outline">
            Use My Location
          </Button>
        )}
      </div>

      {/* Merchant List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Available Merchants</h3>
        
        {merchants.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No merchants available in your area.</p>
            </CardContent>
          </Card>
        ) : (
          merchants.map((merchant) => {
            // Use type assertion to access potentially undefined properties
            const merchantData = merchant as any;
            
            return (
              <Card 
                key={merchant.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMerchantId === merchant.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => onMerchantSelect(merchant.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{merchant.business_name}</CardTitle>
                      <CardDescription className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{merchant.business_address}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{merchantData.rating || 0}</span>
                        <span className="text-gray-500 text-sm">({merchantData.review_count || 0})</span>
                      </div>
                      {merchant.distance_km && (
                        <p className="text-sm text-gray-600">
                          {merchant.distance_km.toFixed(1)} km away
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{merchant.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {merchant.travel_time_minutes 
                            ? `~${merchant.travel_time_minutes} min pickup` 
                            : 'Contact for timing'
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {merchant.services?.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedMerchantId === merchant.id && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        ✓ Selected for your booking
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
