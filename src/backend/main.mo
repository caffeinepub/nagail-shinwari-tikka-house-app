import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Restaurant Data Types
  type Address = {
    street : Text;
    city : Text;
    region : Text;
    country : Text;
    postalCode : Text;
  };

  type RestaurantProfile = {
    name : Text;
    description : Text;
    owner : Text;
    phoneNumber : Text;
    address : Address;
    googleMapsLink : Text;
  };

  type MenuCategory = {
    id : Text;
    name : Text;
  };

  type MenuItem = {
    id : Text;
    categoryId : Text;
    name : Text;
    description : Text;
    price : Float;
  };

  type GalleryImage = {
    id : Text;
    filename : Text;
    altText : Text;
  };

  // Restaurant Data Storage
  let menuCategories = Map.empty<Text, MenuCategory>();
  let menuItems = Map.empty<Text, MenuItem>();
  let galleryImages = Map.empty<Text, GalleryImage>();

  let defaultAddress : Address = {
    street = "Near main bazaar, Gujar Khan";
    city = "Gujar Khan";
    region = "Punjab";
    country = "Pakistan";
    postalCode = "N/A";
  };

  var restaurantProfile : RestaurantProfile = {
    name = "Gujar Khan Restaurant";
    description = "Traditional Pakistani cuisine and modern favorites";
    owner = "Mr. Ahmed";
    phoneNumber = "+92 300 1234567";
    address = defaultAddress;
    googleMapsLink = "https://maps.google.com/?q=gujar+khan+restaurant";
  };

  // Public Query Functions (No authentication required - anyone can view)
  public query func getRestaurantProfile() : async RestaurantProfile {
    restaurantProfile;
  };

  public query func getAllMenuCategories() : async [MenuCategory] {
    menuCategories.values().toArray();
  };

  public query func getMenuItemsByCategory(categoryId : Text) : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item : MenuItem) : Bool {
        item.categoryId == categoryId;
      }
    );
  };

  public query func getAllGalleryImages() : async [GalleryImage] {
    galleryImages.values().toArray();
  };

  // Admin-Only Update Functions
  public shared ({ caller }) func updateRestaurantProfile(profile : RestaurantProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update restaurant profile");
    };
    restaurantProfile := profile;
  };

  public shared ({ caller }) func addMenuCategory(category : MenuCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add a category");
    };
    menuCategories.add(category.id, category);
  };

  public shared ({ caller }) func updateMenuCategory(category : MenuCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update a category");
    };
    menuCategories.add(category.id, category);
  };

  public shared ({ caller }) func deleteMenuCategory(categoryId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can delete a category");
    };
    menuCategories.remove(categoryId);
  };

  public shared ({ caller }) func addMenuItem(item : MenuItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add a menu item");
    };
    menuItems.add(item.id, item);
  };

  public shared ({ caller }) func updateMenuItem(item : MenuItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update a menu item");
    };
    menuItems.add(item.id, item);
  };

  public shared ({ caller }) func deleteMenuItem(itemId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can delete a menu item");
    };
    menuItems.remove(itemId);
  };

  public shared ({ caller }) func addGalleryImage(image : GalleryImage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add a gallery image");
    };
    galleryImages.add(image.id, image);
  };

  public shared ({ caller }) func updateGalleryImage(image : GalleryImage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update a gallery image");
    };
    galleryImages.add(image.id, image);
  };

  public shared ({ caller }) func deleteGalleryImage(imageId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can delete a gallery image");
    };
    galleryImages.remove(imageId);
  };
};
