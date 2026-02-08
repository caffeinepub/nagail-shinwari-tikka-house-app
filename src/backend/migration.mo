import Map "mo:core/Map";

module {
  type OldAddress = {
    street : Text;
    city : Text;
    region : Text;
    country : Text;
    postalCode : Text;
  };

  type OldRestaurantProfile = {
    name : Text;
    description : Text;
    owner : Text;
    phoneNumber : Text;
    address : OldAddress;
    googleMapsLink : Text;
  };

  type OldActor = {
    restaurantProfile : OldRestaurantProfile;
    menuCategories : Map.Map<Text, { id : Text; name : Text }>;
    menuItems : Map.Map<Text, { id : Text; categoryId : Text; name : Text; description : Text; price : Float }>;
    galleryImages : Map.Map<Text, { id : Text; filename : Text; altText : Text }>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  type NewAddress = {
    street : Text;
    city : Text;
    region : Text;
    country : Text;
    postalCode : Text;
  };

  type NewRestaurantProfile = {
    name : Text;
    description : Text;
    owner : Text;
    phoneNumber : Text;
    address : NewAddress;
    googleMapsLink : Text;
  };

  type NewActor = {
    restaurantProfile : NewRestaurantProfile;
    menuCategories : Map.Map<Text, { id : Text; name : Text }>;
    menuItems : Map.Map<Text, { id : Text; categoryId : Text; name : Text; description : Text; price : Float }>;
    galleryImages : Map.Map<Text, { id : Text; filename : Text; altText : Text }>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    let updatedAddress : NewAddress = {
      street = "Jandi Mor, GT road";
      city = "Gujar Khan";
      region = "Punjab";
      country = "Pakistan";
      postalCode = "N/A";
    };
    let updatedRestaurantProfile : NewRestaurantProfile = {
      old.restaurantProfile with address = updatedAddress
    };
    {
      old with
      restaurantProfile = updatedRestaurantProfile;
    };
  };
};
