
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { useMerchants } from '@/hooks/useMerchants';
import { GoogleMap } from './GoogleMap';

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
          setLocationError('Unable to get your location. Showing all available merchants.');
          // Still load merchants even without location
          refetchMerchants();
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser. Showing all available merchants.');
      refetchMerchants();
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Geocode customer address if provided
  const geocodeAddress = async (address: string) => {
    // For now, we'll just use the current location
    // In a real implementation, you'd use Google Geocoding API here
    if (!customerLocation) {
      getCurrentLocation();
    }
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
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p>Loading nearby merchants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Location Status */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Merchant Selection</span>
          </div>
        </div>
        {customerLocation ? (
          <p className="text-sm text-gray-600 mt-2">
            Location detected • Showing {merchants.length} nearby merchants
          </p>
        ) : locationError ? (
          <div className="mt-2">
            <p className="text-sm text-orange-600 mb-2">{locationError}</p>
            <p className="text-sm text-gray-600">Showing {merchants.length} available merchants</p>
            <Button size="sm" onClick={getCurrentLocation} variant="outline" className="mt-2">
              Try Location Again
            </Button>
          </div>
        ) : (
          <div className="mt-2">
            <Button size="sm" onClick={getCurrentLocation} variant="outline">
              Use My Location
            </Button>
          </div>
        )}
      </div>

      {/* Merchant List */}
      {merchants.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No merchants available in your area.</p>
            <p className="text-sm text-gray-400">Please try expanding your search radius or contact support.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Google Map */}
          <GoogleMap
            merchants={merchants}
            onMerchantSelect={onMerchantSelect}
            selectedMerchantId={selectedMerchantId}
            customerLocation={customerLocation}
          />
          
          {/* Merchant List View */}
          <div className="grid gap-3">
            <h3 className="font-medium text-gray-900">Available Merchants ({merchants.length})</h3>
            {merchants.slice(0, 5).map((merchant) => (
              <Card 
                key={merchant.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMerchantId === merchant.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => onMerchantSelect(merchant.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{merchant.business_name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{merchant.business_address}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        {merchant.rating && (
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">
                              {merchant.rating} ({merchant.review_count} reviews)
                            </span>
                          </div>
                        )}
                        {merchant.distance_km && (
                          <span className="text-sm text-gray-500">
                            {merchant.distance_km.toFixed(1)} km away
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {merchant.services?.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {service.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedMerchantId === merchant.id && (
                      <div className="ml-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
