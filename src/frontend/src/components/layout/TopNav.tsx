import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';

type Section = 'overview' | 'menu' | 'gallery' | 'location' | 'contact' | 'admin';

interface TopNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function TopNav({ activeSection, onSectionChange }: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const navItems: { id: Section; label: string; adminOnly?: boolean }[] = [
    { id: 'overview', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Location' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin', adminOnly: true },
  ];

  const handleNavClick = (section: Section) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };

  const visibleNavItems = navItems.filter(item => !item.adminOnly || (identity && isAdmin));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/assets/generated/nagail-logo.dim_512x512.png"
            alt="Nagail Shinwari Tikka House"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-bold text-lg hidden sm:inline-block text-foreground">
            Nagail Shinwari Tikka House
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {visibleNavItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              onClick={() => handleNavClick(item.id)}
              className="font-medium"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Desktop Login */}
        <div className="hidden md:block">
          <LoginButton />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container px-4 py-4 flex flex-col gap-2">
            {visibleNavItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                onClick={() => handleNavClick(item.id)}
                className="w-full justify-start font-medium"
              >
                {item.label}
              </Button>
            ))}
            <div className="pt-2 border-t border-border/40 mt-2">
              <LoginButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
