import { useGetRestaurantProfile } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  const { data: profile, isLoading } = useGetRestaurantProfile();

  if (isLoading) {
    return (
      <div className="container px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const address = profile?.address;
  const fullAddress = address
    ? `${address.street}, ${address.city}, ${address.region}, ${address.country}`
    : 'Gujar Khan, Punjab, Pakistan';

  return (
    <div className="container px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Location</h1>
          <p className="text-muted-foreground text-lg">
            Visit us at our restaurant
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <img
                src="/assets/generated/map-pin.dim_128x128.png"
                alt="Location"
                className="h-10 w-10"
              />
            </div>
            <CardTitle className="text-2xl">Find Us Here</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="flex items-start justify-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg leading-relaxed">{fullAddress}</p>
              </div>
            </div>

            {profile?.googleMapsLink && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={() => window.open(profile.googleMapsLink, '_blank', 'noopener,noreferrer')}
                  className="gap-2"
                >
                  <MapPin className="h-5 w-5" />
                  Open in Google Maps
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
              <p>Near main bazaar, Gujar Khan</p>
              <p className="mt-1">Easily accessible from Rawalpindi</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
