import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type {
  RestaurantProfile,
  MenuCategory,
  MenuItem,
  GalleryImage,
  UserProfile,
} from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

// Restaurant Profile Queries
export function useGetRestaurantProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<RestaurantProfile>({
    queryKey: ['restaurantProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getRestaurantProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateRestaurantProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: RestaurantProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateRestaurantProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantProfile'] });
    },
  });
}

// Menu Category Queries
export function useGetAllMenuCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<MenuCategory[]>({
    queryKey: ['menuCategories'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllMenuCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMenuCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: MenuCategory) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMenuCategory(category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });
}

export function useUpdateMenuCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: MenuCategory) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateMenuCategory(category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });
}

export function useDeleteMenuCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteMenuCategory(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
}

// Menu Item Queries
export function useGetAllMenuItems() {
  const { actor, isFetching } = useActor();
  const { data: categories = [] } = useGetAllMenuCategories();

  return useQuery<MenuItem[]>({
    queryKey: ['menuItems'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const allItems: MenuItem[] = [];
      for (const category of categories) {
        const items = await actor.getMenuItemsByCategory(category.id);
        allItems.push(...items);
      }
      return allItems;
    },
    enabled: !!actor && !isFetching && categories.length > 0,
  });
}

export function useAddMenuItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: MenuItem) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMenuItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
}

export function useUpdateMenuItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: MenuItem) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateMenuItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
}

export function useDeleteMenuItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteMenuItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
}

// Gallery Queries
export function useGetAllGalleryImages() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (image: GalleryImage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGalleryImage(image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useUpdateGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (image: GalleryImage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGalleryImage(image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useDeleteGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteGalleryImage(imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}
