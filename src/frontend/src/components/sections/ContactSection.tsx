import { useGetRestaurantProfile } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Phone, User } from 'lucide-react';

export default function ContactSection() {
  const { data: profile, isLoading } = useGetRestaurantProfile();

  if (isLoading) {
    return (
      <div className="container px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const ownerName = 'Ch. Aamir Khurshid';
  const phoneNumber = profile?.phoneNumber;
  const hasPhone = phoneNumber && phoneNumber.trim() !== '' && phoneNumber !== '+92 300 1234567';

  return (
    <div className="container px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Get in touch with us
          </p>
        </div>

        <div className="space-y-6">
          {/* Owner Card */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Owner</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl font-semibold">{ownerName}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Proprietor, Nagail Shinwari Tikka House
              </p>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Phone</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {hasPhone ? (
                <>
                  <p className="text-xl font-semibold">{phoneNumber}</p>
                  <Button
                    size="lg"
                    onClick={() => window.location.href = `tel:${phoneNumber}`}
                    className="gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </Button>
                </>
              ) : (
                <div className="py-4">
                  <p className="text-muted-foreground">
                    Phone number will be available soon. Please visit us in person or check back later.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Admin: Please update the phone number in the admin panel)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="border-2 bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                For reservations, catering inquiries, or any questions, please feel free to contact us.
                We look forward to serving you!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
