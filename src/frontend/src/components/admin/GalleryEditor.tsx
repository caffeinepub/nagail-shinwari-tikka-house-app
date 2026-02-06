import { useState } from 'react';
import {
  useGetAllGalleryImages,
  useAddGalleryImage,
  useUpdateGalleryImage,
  useDeleteGalleryImage,
} from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import type { GalleryImage } from '../../backend';

export default function GalleryEditor() {
  const { data: images = [], isLoading } = useGetAllGalleryImages();
  const [dialog, setDialog] = useState<{ open: boolean; image?: GalleryImage }>({ open: false });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gallery Images</CardTitle>
          <Button onClick={() => setDialog({ open: true })} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Image
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage image metadata. Images should be placed in <code className="bg-muted px-1 py-0.5 rounded">frontend/public/assets/generated/</code>
          </p>
          {images.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No custom images configured. Default gallery images are being used.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onEdit={() => setDialog({ open: true, image })}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ImageDialog
        open={dialog.open}
        image={dialog.image}
        onClose={() => setDialog({ open: false })}
      />
    </div>
  );
}

function ImageCard({ image, onEdit }: { image: GalleryImage; onEdit: () => void }) {
  const deleteImage = useDeleteGalleryImage();
  const src = `/assets/generated/${image.filename}`;

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img src={src} alt={image.altText} className="w-full h-full object-cover" />
      </div>
      <CardContent className="pt-4">
        <p className="text-sm font-medium mb-1">{image.filename}</p>
        <p className="text-xs text-muted-foreground mb-3">{image.altText}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm('Delete this image metadata?')) {
                deleteImage.mutate(image.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ImageDialog({
  open,
  image,
  onClose,
}: {
  open: boolean;
  image?: GalleryImage;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    filename: image?.filename || '',
    altText: image?.altText || '',
  });

  const addImage = useAddGalleryImage();
  const updateImage = useUpdateGalleryImage();

  const isEdit = !!image;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageData = {
      id: image?.id || Date.now().toString(),
      filename: formData.filename,
      altText: formData.altText,
    };

    if (isEdit) {
      await updateImage.mutateAsync(imageData);
    } else {
      await addImage.mutateAsync(imageData);
    }
    onClose();
    setFormData({ filename: '', altText: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Image Metadata' : 'Add Image Metadata'}</DialogTitle>
            <DialogDescription>
              Configure the filename and alt text for a gallery image
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <Input
                id="filename"
                value={formData.filename}
                onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                placeholder="e.g., nagail-food-1.dim_1200x800.png"
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                File should exist in <code>frontend/public/assets/generated/</code>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="altText">Alt Text</Label>
              <Input
                id="altText"
                value={formData.altText}
                onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                placeholder="Describe the image for accessibility"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addImage.isPending || updateImage.isPending}>
              {(addImage.isPending || updateImage.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEdit ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
