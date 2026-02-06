import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
}
export interface MenuCategory {
    id: string;
    name: string;
}
export interface GalleryImage {
    id: string;
    filename: string;
    altText: string;
}
export interface RestaurantProfile {
    owner: string;
    name: string;
    description: string;
    googleMapsLink: string;
    address: Address;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
}
export interface Address {
    region: string;
    street: string;
    country: string;
    city: string;
    postalCode: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryImage(image: GalleryImage): Promise<void>;
    addMenuCategory(category: MenuCategory): Promise<void>;
    addMenuItem(item: MenuItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGalleryImage(imageId: string): Promise<void>;
    deleteMenuCategory(categoryId: string): Promise<void>;
    deleteMenuItem(itemId: string): Promise<void>;
    getAllGalleryImages(): Promise<Array<GalleryImage>>;
    getAllMenuCategories(): Promise<Array<MenuCategory>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMenuItemsByCategory(categoryId: string): Promise<Array<MenuItem>>;
    getRestaurantProfile(): Promise<RestaurantProfile>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateGalleryImage(image: GalleryImage): Promise<void>;
    updateMenuCategory(category: MenuCategory): Promise<void>;
    updateMenuItem(item: MenuItem): Promise<void>;
    updateRestaurantProfile(profile: RestaurantProfile): Promise<void>;
}
