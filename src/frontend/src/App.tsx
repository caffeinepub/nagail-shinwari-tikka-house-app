import { useEffect, useState } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import OverviewSection from './components/sections/OverviewSection';
import MenuSection from './components/sections/MenuSection';
import GallerySection from './components/sections/GallerySection';
import LocationSection from './components/sections/LocationSection';
import ContactSection from './components/sections/ContactSection';
import AdminPanel from './components/admin/AdminPanel';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { registerServiceWorker } from './pwa/registerServiceWorker';

type Section = 'overview' | 'menu' | 'gallery' | 'location' | 'contact' | 'admin';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Register service worker for PWA functionality
  useEffect(() => {
    registerServiceWorker();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'menu':
        return <MenuSection />;
      case 'gallery':
        return <GallerySection />;
      case 'location':
        return <LocationSection />;
      case 'contact':
        return <ContactSection />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1">
        {renderSection()}
      </main>

      <Footer />

      {showProfileSetup && <ProfileSetupDialog />}
    </div>
  );
}
