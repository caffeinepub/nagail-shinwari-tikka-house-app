import { useState } from 'react';
import AdminGate from './AdminGate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RestaurantProfileEditor from './RestaurantProfileEditor';
import MenuEditor from './MenuEditor';
import GalleryEditor from './GalleryEditor';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <AdminGate>
      <div className="container px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage your restaurant content
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <RestaurantProfileEditor />
            </TabsContent>

            <TabsContent value="menu">
              <MenuEditor />
            </TabsContent>

            <TabsContent value="gallery">
              <GalleryEditor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGate>
  );
}
