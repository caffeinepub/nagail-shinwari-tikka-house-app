import { useState, useEffect } from 'react';
import { useGetRestaurantProfile, useUpdateRestaurantProfile } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import type { RestaurantProfile } from '../../backend';

export default function RestaurantProfileEditor() {
  const { data: profile, isLoading } = useGetRestaurantProfile();
  const updateProfile = useUpdateRestaurantProfile();

  const [formData, setFormData] = useState<RestaurantProfile | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await updateProfile.mutateAsync(formData);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Owner Name</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+92 300 1234567"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Address</Label>
            <div className="grid gap-4">
              <Input
                placeholder="Street"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })}
                required
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                  required
                />
                <Input
                  placeholder="Region/Province"
                  value={formData.address.region}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, region: e.target.value }
                  })}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, country: e.target.value }
                  })}
                  required
                />
                <Input
                  placeholder="Postal Code"
                  value={formData.address.postalCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, postalCode: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapsLink">Google Maps Link</Label>
            <Input
              id="mapsLink"
              type="url"
              value={formData.googleMapsLink}
              onChange={(e) => setFormData({ ...formData, googleMapsLink: e.target.value })}
              placeholder="https://maps.google.com/?q=..."
              required
            />
          </div>

          <Button type="submit" disabled={updateProfile.isPending} className="w-full gap-2">
            {updateProfile.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
