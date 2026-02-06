import { useGetRestaurantProfile } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, UtensilsCrossed, MapPin, Phone } from 'lucide-react';

export default function OverviewSection() {
  const { data: profile, isLoading } = useGetRestaurantProfile();

  if (isLoading) {
    return (
      <div className="container px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/assets/generated/nagail-hero.dim_1600x600.png"
          alt="Nagail Shinwari Tikka House"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container px-4 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-3">
            {profile?.name || 'Nagail Shinwari Tikka House'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            {profile?.description || 'Authentic Pakistani BBQ & Tikka'}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Authentic Flavors</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional Pakistani BBQ and tikka prepared with authentic spices and techniques
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Prime Location</h3>
                <p className="text-sm text-muted-foreground">
                  Conveniently located in Gujar Khan near Rawalpindi, Punjab
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Easy Ordering</h3>
                <p className="text-sm text-muted-foreground">
                  Call us to place your order or visit us for dine-in experience
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Nagail Shinwari Tikka House</h2>
          <p className="text-muted-foreground leading-relaxed">
            Experience the rich flavors of traditional Pakistani cuisine at Nagail Shinwari Tikka House. 
            Located in the heart of Gujar Khan, we specialize in authentic Shinwari tikka, succulent kebabs, 
            and a variety of traditional dishes prepared with the finest ingredients and time-honored recipes. 
            Our commitment to quality and authentic taste has made us a favorite destination for food lovers 
            in the region.
          </p>
        </div>
      </div>
    </div>
  );
}
