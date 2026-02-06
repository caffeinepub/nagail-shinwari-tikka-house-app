import { useState } from 'react';
import {
  useGetAllMenuCategories,
  useGetAllMenuItems,
  useAddMenuCategory,
  useUpdateMenuCategory,
  useDeleteMenuCategory,
  useAddMenuItem,
  useUpdateMenuItem,
  useDeleteMenuItem,
} from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import type { MenuCategory, MenuItem } from '../../backend';

export default function MenuEditor() {
  const { data: categories = [], isLoading: categoriesLoading } = useGetAllMenuCategories();
  const { data: allItems = [], isLoading: itemsLoading } = useGetAllMenuItems();

  const [categoryDialog, setCategoryDialog] = useState<{ open: boolean; category?: MenuCategory }>({
    open: false,
  });
  const [itemDialog, setItemDialog] = useState<{ open: boolean; item?: MenuItem; categoryId?: string }>({
    open: false,
  });

  const isLoading = categoriesLoading || itemsLoading;

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
          <CardTitle>Menu Categories</CardTitle>
          <Button onClick={() => setCategoryDialog({ open: true })} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No categories yet. Add your first category!</p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => {
                const categoryItems = allItems.filter((item) => item.categoryId === category.id);
                return (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    items={categoryItems}
                    onEditCategory={() => setCategoryDialog({ open: true, category })}
                    onAddItem={() => setItemDialog({ open: true, categoryId: category.id })}
                    onEditItem={(item) => setItemDialog({ open: true, item })}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <CategoryDialog
        open={categoryDialog.open}
        category={categoryDialog.category}
        onClose={() => setCategoryDialog({ open: false })}
      />

      <ItemDialog
        open={itemDialog.open}
        item={itemDialog.item}
        categoryId={itemDialog.categoryId}
        categories={categories}
        onClose={() => setItemDialog({ open: false })}
      />
    </div>
  );
}

function CategoryCard({
  category,
  items,
  onEditCategory,
  onAddItem,
  onEditItem,
}: {
  category: MenuCategory;
  items: MenuItem[];
  onEditCategory: () => void;
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
}) {
  const deleteCategory = useDeleteMenuCategory();

  return (
    <Card className="border-2">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{category.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onEditCategory}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Delete this category? All items in it will also be deleted.')) {
                  deleteCategory.mutate(category.id);
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3 mb-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items in this category</p>
          ) : (
            items.map((item) => (
              <ItemRow key={item.id} item={item} onEdit={() => onEditItem(item)} />
            ))
          )}
        </div>
        <Button variant="outline" size="sm" onClick={onAddItem} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </CardContent>
    </Card>
  );
}

function ItemRow({ item, onEdit }: { item: MenuItem; onEdit: () => void }) {
  const deleteItem = useDeleteMenuItem();

  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-lg border bg-card">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h4 className="font-semibold">{item.name}</h4>
          {item.price > 0 && <span className="text-sm font-medium text-primary">Rs. {item.price}</span>}
        </div>
        {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm('Delete this item?')) {
              deleteItem.mutate(item.id);
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function CategoryDialog({
  open,
  category,
  onClose,
}: {
  open: boolean;
  category?: MenuCategory;
  onClose: () => void;
}) {
  const [name, setName] = useState(category?.name || '');
  const addCategory = useAddMenuCategory();
  const updateCategory = useUpdateMenuCategory();

  const isEdit = !!category;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateCategory.mutateAsync({ ...category, name });
    } else {
      await addCategory.mutateAsync({ id: Date.now().toString(), name });
    }
    onClose();
    setName('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
            <DialogDescription>
              {isEdit ? 'Update the category name' : 'Create a new menu category'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Appetizers, Main Course"
              required
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addCategory.isPending || updateCategory.isPending}>
              {(addCategory.isPending || updateCategory.isPending) && (
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

function ItemDialog({
  open,
  item,
  categoryId,
  categories,
  onClose,
}: {
  open: boolean;
  item?: MenuItem;
  categoryId?: string;
  categories: MenuCategory[];
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price?.toString() || '',
    categoryId: item?.categoryId || categoryId || '',
  });

  const addItem = useAddMenuItem();
  const updateItem = useUpdateMenuItem();

  const isEdit = !!item;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = {
      id: item?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      categoryId: formData.categoryId,
    };

    if (isEdit) {
      await updateItem.mutateAsync(itemData);
    } else {
      await addItem.mutateAsync(itemData);
    }
    onClose();
    setFormData({ name: '', description: '', price: '', categoryId: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
            <DialogDescription>
              {isEdit ? 'Update the menu item details' : 'Add a new item to your menu'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Chicken Tikka"
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemCategory">Category</Label>
              <select
                id="itemCategory"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemDescription">Description (optional)</Label>
              <Textarea
                id="itemDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the dish..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemPrice">Price (Rs.)</Label>
              <Input
                id="itemPrice"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addItem.isPending || updateItem.isPending}>
              {(addItem.isPending || updateItem.isPending) && (
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
