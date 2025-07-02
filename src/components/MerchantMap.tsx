
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
            <span className="font-medium">Your Location</span>
          </div>
        </div>
        {customerLocation ? (
          <p className="text-sm text-gray-600 mt-2">
            Location detected • Showing {merchants.length} nearby merchants
          </p>
        ) : locationError ? (
          <div className="mt-2">
            <p className="text-sm text-red-600 mb-2">{locationError}</p>
            <Button size="sm" onClick={getCurrentLocation} variant="outline">
              Try Again
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

      {/* Google Map - Show directly without API key check */}
      {merchants.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No merchants available in your area.</p>
          </CardContent>
        </Card>
      ) : (
        <GoogleMap
          merchants={merchants}
          onMerchantSelect={onMerchantSelect}
          selectedMerchantId={selectedMerchantId}
          customerLocation={customerLocation}
          apiKey="temporary-placeholder"
        />
      )}
    </div>
  );
};
