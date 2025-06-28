
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
      // Store in localStorage for convenience
      localStorage.setItem('google_maps_api_key', apiKey.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Google Maps Configuration</span>
        </CardTitle>
        <CardDescription>
          Enter your Google Maps API key to enable the interactive map for merchant locations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="api-key">Google Maps API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google Maps API key"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Enable Google Maps
          </Button>
        </form>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>How to get your API key:</strong>
          </p>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Go to the Google Cloud Console</li>
            <li>Create or select a project</li>
            <li>Enable the Maps JavaScript API</li>
            <li>Create credentials (API key)</li>
            <li>Restrict the key to your domain for security</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
