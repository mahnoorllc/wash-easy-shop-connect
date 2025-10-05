import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useServicePricing } from '@/hooks/useServicePricing';
import { Loader2, DollarSign } from 'lucide-react';

interface ServicePricingProps {
  selectedServiceType?: string;
  compact?: boolean;
}

export const ServicePricing: React.FC<ServicePricingProps> = ({ 
  selectedServiceType,
  compact = false 
}) => {
  const { t } = useTranslation();
  const { pricing, loading, error } = useServicePricing();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600 p-4">
        {t('servicePricing.unableToLoad')}
      </div>
    );
  }

  // Filter pricing based on selected service type
  const relevantPricing = pricing.filter(price => {
    if (!selectedServiceType) return !price.is_commercial;
    
    const serviceMap: { [key: string]: string } = {
      'wash_fold': 'Wash & Fold',
      'dry_cleaning': 'Dry Cleaning',
      'express': 'Express Service',
      'delicate': 'Delicate Care'
    };
    
    return price.service_name === serviceMap[selectedServiceType] && !price.is_commercial;
  });

  if (relevantPricing.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800">{t('servicePricing.pricing')}</span>
        </div>
        <div className="space-y-1">
          {relevantPricing.slice(0, 2).map((price) => (
            <div key={price.id} className="flex justify-between text-sm">
              <span className="text-green-700">
                {price.pricing_type.replace('_', ' ')}
              </span>
              <span className="font-medium text-green-800">
                ${price.base_price}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span>{t('servicePricing.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(
            relevantPricing.reduce((acc, price) => {
              if (!acc[price.service_name]) {
                acc[price.service_name] = [];
              }
              acc[price.service_name].push(price);
              return acc;
            }, {} as { [key: string]: typeof relevantPricing })
          ).map(([serviceName, prices]) => (
            <div key={serviceName}>
              <h4 className="font-medium text-gray-900 mb-2">{serviceName}</h4>
              <div className="space-y-2">
                {prices.map((price) => (
                  <div key={price.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">
                        {price.pricing_type.replace('_', ' ')}
                      </span>
                      {price.bulk_discount_threshold && (
                        <div className="text-xs text-green-600 mt-1">
                          {price.bulk_discount_percentage}% off for {price.bulk_discount_threshold}+ items
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ${price.base_price}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
