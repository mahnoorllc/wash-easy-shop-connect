
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone } from 'lucide-react';
import { MerchantWithDistance } from '@/types/database';

interface GoogleMapProps {
  merchants: MerchantWithDistance[];
  onMerchantSelect: (merchantId: string) => void;
  selectedMerchantId?: string;
  customerLocation?: { lat: number; lng: number };
  apiKey?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  merchants,
  onMerchantSelect,
  selectedMerchantId,
  customerLocation,
  apiKey
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setMapError('Google Maps API key is required');
      return;
    }

    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        // Default to a central location if no customer location
        const center = customerLocation || { lat: 40.7128, lng: -74.0060 }; // NYC default

        const map = new google.maps.Map(mapRef.current!, {
          zoom: customerLocation ? 12 : 10,
          center: center,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow();

        // Add customer location marker if available
        if (customerLocation) {
          new google.maps.Marker({
            position: customerLocation,
            map: map,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
            }
          });
        }

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add merchant markers
        merchants.forEach((merchant) => {
          // For demo purposes, we'll generate random coordinates near the customer or center
          const lat = (customerLocation?.lat || center.lat) + (Math.random() - 0.5) * 0.02;
          const lng = (customerLocation?.lng || center.lng) + (Math.random() - 0.5) * 0.02;

          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: merchant.business_name,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${selectedMerchantId === merchant.id ? '#10B981' : '#EF4444'}" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="9" r="2.5" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
            }
          });

          markersRef.current.push(marker);

          // Add click listener to marker
          marker.addListener('click', () => {
            onMerchantSelect(merchant.id);
            
            const content = `
              <div style="max-width: 250px; font-family: system-ui, -apple-system, sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${merchant.business_name}</h3>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${merchant.business_address}</p>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="color: #FFA500;">★</span>
                  <span style="font-size: 14px;">${(merchant as any).rating || 0} (${(merchant as any).review_count || 0} reviews)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 14px;">📞 ${merchant.phone}</span>
                </div>
                ${merchant.distance_km ? `<p style="margin: 0; font-size: 12px; color: #888;">${merchant.distance_km.toFixed(1)} km away</p>` : ''}
                <button onclick="window.selectMerchant('${merchant.id}')" style="
                  margin-top: 8px; 
                  background: #3B82F6; 
                  color: white; 
                  border: none; 
                  padding: 6px 12px; 
                  border-radius: 4px; 
                  cursor: pointer;
                  font-size: 12px;
                ">Select This Merchant</button>
              </div>
            `;

            infoWindowRef.current?.setContent(content);
            infoWindowRef.current?.open(map, marker);
          });
        });

        // Global function for info window button
        (window as any).selectMerchant = (merchantId: string) => {
          onMerchantSelect(merchantId);
          infoWindowRef.current?.close();
        };

      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapError('Failed to load Google Maps. Please check your API key.');
      }
    };

    initMap();

    return () => {
      // Cleanup
      markersRef.current.forEach(marker => marker.setMap(null));
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [merchants, selectedMerchantId, customerLocation, apiKey, onMerchantSelect]);

  if (mapError) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600 mb-4">{mapError}</p>
          <p className="text-sm text-gray-600">
            Please add your Google Maps API key in the Supabase Edge Function Secrets.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg border border-gray-200 shadow-sm"
        style={{ minHeight: '400px' }}
      />
      
      {selectedMerchantId && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            {(() => {
              const selectedMerchant = merchants.find(m => m.id === selectedMerchantId);
              if (!selectedMerchant) return null;
              
              return (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-800">Selected Merchant</h4>
                    <p className="text-sm text-blue-700">{selectedMerchant.business_name}</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    ✓ Selected
                  </Badge>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
