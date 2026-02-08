import { useState, useMemo } from 'react';
import { useGetAllMenuCategories, useGetAllMenuItems } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Clock } from 'lucide-react';
import type { MenuItem } from '../../backend';
import { seedCategories, seedMenuItems } from '../../data/menuSeed';

export default function MenuSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: backendCategories = [], isLoading: categoriesLoading } = useGetAllMenuCategories();
  const { data: backendItems = [], isLoading: itemsLoading } = useGetAllMenuItems();

  const isLoading = categoriesLoading || itemsLoading;

  // Filter out BREAKFAST category from backend data (case-insensitive)
  const filteredBackendCategories = useMemo(() => {
    return backendCategories.filter(cat => cat.name.toUpperCase() !== 'BREAKFAST');
  }, [backendCategories]);

  // Get excluded category IDs (BREAKFAST)
  const excludedCategoryIds = useMemo(() => {
    return new Set(
      backendCategories
        .filter(cat => cat.name.toUpperCase() === 'BREAKFAST')
        .map(cat => cat.id)
    );
  }, [backendCategories]);

  // Filter out items belonging to BREAKFAST category
  const filteredBackendItems = useMemo(() => {
    return backendItems.filter(item => !excludedCategoryIds.has(item.categoryId));
  }, [backendItems, excludedCategoryIds]);

  // Use seed data as fallback when backend is empty
  const categories = filteredBackendCategories.length > 0 ? filteredBackendCategories : seedCategories;
  const allItems = filteredBackendItems.length > 0 ? filteredBackendItems : seedMenuItems;

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const query = searchQuery.toLowerCase();
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }, [allItems, searchQuery]);

  const categoriesWithItems = useMemo(() => {
    return categories.map(category => ({
      ...category,
      items: filteredItems.filter(item => item.categoryId === category.id)
    })).filter(cat => cat.items.length > 0);
  }, [categories, filteredItems]);

  if (isLoading) {
    return (
      <div className="container px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Menu</h1>
          <p className="text-muted-foreground text-lg">
            Explore our selection of authentic Pakistani dishes
          </p>
        </div>

        {/* Informational Note */}
        <div className="mb-6 p-4 bg-accent/50 border border-accent rounded-lg flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Serving Hours</p>
            <p className="text-muted-foreground">Open daily from 12:00 PM to 12:00 AM. All items served fresh and hot.</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Menu Categories */}
        {categoriesWithItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? 'No items found matching your search.' : 'Menu coming soon!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {categoriesWithItems.map((category) => (
              <Card key={category.id} className="border-2">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-2xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <MenuItemComponent key={item.id} item={item} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItemComponent({ item }: { item: MenuItem }) {
  const hasPrice = item.price > 0;
  
  return (
    <div className="flex justify-between items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
      {hasPrice && (
        <div className="font-bold text-lg text-primary whitespace-nowrap">
          Rs. {item.price.toFixed(0)}
        </div>
      )}
    </div>
  );
}
