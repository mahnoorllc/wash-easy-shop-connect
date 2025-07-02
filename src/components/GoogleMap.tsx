
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  customerLocation
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // For now, show a placeholder map until API key is configured
  const renderPlaceholderMap = () => {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden">
        {/* Map background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>
        
        {/* Customer location marker */}
        {customerLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Your Location</div>
          </div>
        )}
        
        {/* Merchant markers */}
        {merchants.slice(0, 5).map((merchant, index) => {
          const positions = [
            { top: '30%', left: '60%' },
            { top: '40%', left: '40%' },
            { top: '60%', left: '70%' },
            { top: '25%', left: '30%' },
            { top: '70%', left: '50%' }
          ];
          const position = positions[index] || positions[0];
          
          return (
            <div
              key={merchant.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ top: position.top, left: position.left }}
              onClick={() => onMerchantSelect(merchant.id)}
            >
              <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white ${
                selectedMerchantId === merchant.id ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {index + 1}
              </div>
              <div className="text-xs text-gray-700 mt-1 whitespace-nowrap bg-white px-1 rounded shadow">
                {merchant.business_name}
              </div>
            </div>
          );
        })}
        
        {/* Map overlay text */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Interactive Map Preview</p>
          <p className="text-xs text-gray-500">Google Maps integration pending</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderPlaceholderMap()}
      
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
                    <p className="text-xs text-blue-600">{selectedMerchant.business_address}</p>
                    {selectedMerchant.distance_km && (
                      <p className="text-xs text-blue-600">{selectedMerchant.distance_km.toFixed(1)} km away</p>
                    )}
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
