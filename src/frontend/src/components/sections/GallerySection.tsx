import { useState } from 'react';
import { useGetAllGalleryImages } from '../../hooks/useQueries';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

const DEFAULT_GALLERY = [
  {
    id: 'default-1',
    filename: 'nagail-food-1.dim_1200x800.png',
    altText: 'Delicious tikka platter with fresh naan and sides'
  },
  {
    id: 'default-2',
    filename: 'nagail-food-2.dim_1200x800.png',
    altText: 'Traditional karahi with tikka and fresh naan bread'
  },
  {
    id: 'default-3',
    filename: 'nagail-restaurant.dim_1200x800.png',
    altText: 'Warm and inviting restaurant interior'
  }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const { data: galleryImages = [], isLoading } = useGetAllGalleryImages();

  const images = galleryImages.length > 0 ? galleryImages : DEFAULT_GALLERY;

  if (isLoading) {
    return (
      <div className="container px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Gallery</h1>
          <p className="text-muted-foreground text-lg">
            A glimpse into our culinary delights
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => {
            const src = `/assets/generated/${image.filename}`;
            return (
              <button
                key={image.id}
                onClick={() => setSelectedImage({ src, alt: image.altText })}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <img
                  src={src}
                  alt={image.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{selectedImage?.alt}</DialogTitle>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
