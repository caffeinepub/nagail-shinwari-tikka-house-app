import Map "mo:core/Map";
import Text "mo:core/Text";

module {
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

  type OldActor = {
    menuCategories : Map.Map<Text, MenuCategory>;
    menuItems : Map.Map<Text, MenuItem>;
    galleryImages : Map.Map<Text, GalleryImage>;
    restaurantProfile : RestaurantProfile;
  };

  type NewActor = {
    menuCategories : Map.Map<Text, MenuCategory>;
    menuItems : Map.Map<Text, MenuItem>;
    galleryImages : Map.Map<Text, GalleryImage>;
    restaurantProfile : RestaurantProfile;
  };

  public func run(old : OldActor) : NewActor {
    let newMenuCategories = Map.empty<Text, MenuCategory>();
    let newMenuItems = Map.empty<Text, MenuItem>();
    let newGalleryImages = Map.empty<Text, GalleryImage>();

    // Add new menu categories
    newMenuCategories.add(
      "1",
      {
        id = "1";
        name = "BREAKFAST";
      },
    );
    newMenuCategories.add(
      "2",
      {
        id = "2";
        name = "DESI DISHES";
      },
    );
    newMenuCategories.add(
      "3",
      {
        id = "3";
        name = "CHICKEN DISHES";
      },
    );
    newMenuCategories.add(
      "4",
      {
        id = "4";
        name = "MUTTON DISHES";
      },
    );
    newMenuCategories.add(
      "5",
      {
        id = "5";
        name = "FISH";
      },
    );
    newMenuCategories.add(
      "6",
      {
        id = "6";
        name = "B.B.Q";
      },
    );
    newMenuCategories.add(
      "7",
      {
        id = "7";
        name = "RICE";
      },
    );
    newMenuCategories.add(
      "8",
      {
        id = "8";
        name = "SOUPS";
      },
    );
    newMenuCategories.add(
      "9",
      {
        id = "9";
        name = "CHINESE";
      },
    );
    newMenuCategories.add(
      "10",
      {
        id = "10";
        name = "BREADS";
      },
    );
    newMenuCategories.add(
      "11",
      {
        id = "11";
        name = "VEGETABLES";
      },
    );
    newMenuCategories.add(
      "12",
      {
        id = "12";
        name = "SWEETS";
      },
    );

    // Add new menu items for BREAKFAST
    newMenuItems.add(
      "1",
      {
        id = "1";
        categoryId = "1";
        name = "Paratha";
        description = "Traditional Pakistani flatbread fried in ghee";
        price = 50.0;
      },
    );
    newMenuItems.add(
      "2",
      {
        id = "2";
        categoryId = "1";
        name = "Halwa Puri";
        description = "Sweet semolina with fried bread and potatoes";
        price = 150.0;
      },
    );

    // Add new menu items for DESI DISHES
    newMenuItems.add(
      "3",
      {
        id = "3";
        categoryId = "2";
        name = "Daal Mash";
        description = "Lentil curry served with roti";
        price = 180.0;
      },
    );
    newMenuItems.add(
      "4",
      {
        id = "4";
        categoryId = "2";
        name = "Chana Masala";
        description = "Spicy chickpea curry";
        price = 200.0;
      },
    );

    // Add new menu items for CHICKEN DISHES
    newMenuItems.add(
      "5",
      {
        id = "5";
        categoryId = "3";
        name = "Chicken Karahi";
        description = "Spicy chicken cooked in tomato gravy";
        price = 600.0;
      },
    );
    newMenuItems.add(
      "6",
      {
        id = "6";
        categoryId = "3";
        name = "Chicken Handi";
        description = "Boneless chicken cooked in creamy gravy";
        price = 650.0;
      },
    );

    // Add new menu items for MUTTON DISHES
    newMenuItems.add(
      "7",
      {
        id = "7";
        categoryId = "4";
        name = "Mutton Karahi";
        description = "Tender mutton pieces in rich gravy";
        price = 1200.0;
      },
    );
    newMenuItems.add(
      "8",
      {
        id = "8";
        categoryId = "4";
        name = "Mutton Handi";
        description = "Boneless mutton cooked in creamy sauce";
        price = 1350.0;
      },
    );
    newMenuItems.add(
      "9",
      {
        id = "9";
        categoryId = "4";
        name = "Mutton Tawa";
        description = "Spicy mutton cooked on flat pan";
        price = 1600.0;
      },
    );

    // Add new menu items for FISH
    newMenuItems.add(
      "10",
      {
        id = "10";
        categoryId = "5";
        name = "Finger Fish";
        description = "Battered and fried fish fillets";
        price = 500.0;
      },
    );
    newMenuItems.add(
      "11",
      {
        id = "11";
        categoryId = "5";
        name = "Fried Rohu";
        description = "Pakistani style deep-fried rohu";
        price = 700.0;
      },
    );

    // Add new menu items for B.B.Q
    newMenuItems.add(
      "12",
      {
        id = "12";
        categoryId = "6";
        name = "Chicken Tikka";
        description = "Charcoal grilled chicken pieces";
        price = 150.0;
      },
    );
    newMenuItems.add(
      "13",
      {
        id = "13";
        categoryId = "6";
        name = "Chicken Malai Boti";
        description = "Skewered chicken cubes with cream";
        price = 180.0;
      },
    );
    newMenuItems.add(
      "14",
      {
        id = "14";
        categoryId = "6";
        name = "Chicken Seekh Kebab";
        description = "Chicken mince skewers";
        price = 100.0;
      },
    );
    newMenuItems.add(
      "15",
      {
        id = "15";
        categoryId = "6";
        name = "Chicken Cheese Boti";
        description = "Grilled chicken with cheese";
        price = 200.0;
      },
    );
    newMenuItems.add(
      "16",
      {
        id = "16";
        categoryId = "6";
        name = "Chicken Kabab Roll";
        description = "Grilled chicken kebab in naan";
        price = 80.0;
      },
    );
    newMenuItems.add(
      "17",
      {
        id = "17";
        categoryId = "6";
        name = "Beef Seekh Kebab";
        description = "Beef mince kebab skewers";
        price = 120.0;
      },
    );
    newMenuItems.add(
      "18",
      {
        id = "18";
        categoryId = "6";
        name = "Beef Kabab Roll";
        description = "Grilled beef kebab in naan";
        price = 100.0;
      },
    );
    newMenuItems.add(
      "19",
      {
        id = "19";
        categoryId = "6";
        name = "Beef Bihari Kebab";
        description = "Spicy marinated beef kebab";
        price = 180.0;
      },
    );
    newMenuItems.add(
      "20",
      {
        id = "20";
        categoryId = "6";
        name = "Beef Ribs";
        description = "Charcoal grilled beef ribs";
        price = 400.0;
      },
    );
    newMenuItems.add(
      "21",
      {
        id = "21";
        categoryId = "6";
        name = "Beef Chapli Kebab";
        description = "Flattened spicy beef kebab";
        price = 120.0;
      },
    );
    newMenuItems.add(
      "22",
      {
        id = "22";
        categoryId = "6";
        name = "Lamb Chops";
        description = "Charcoal grilled lamb chops";
        price = 420.0;
      },
    );

    // Add new menu items for RICE
    newMenuItems.add(
      "23",
      {
        id = "23";
        categoryId = "7";
        name = "Chicken Pulao";
        description = "Rice cooked with chicken and spices";
        price = 250.0;
      },
    );

    // Add new menu items for SOUPS
    newMenuItems.add(
      "24",
      {
        id = "24";
        categoryId = "8";
        name = "Hot & Sour Soup";
        description = "Spicy Asian-style soup";
        price = 110.0;
      },
    );
    newMenuItems.add(
      "25",
      {
        id = "25";
        categoryId = "8";
        name = "Chicken Corn Soup";
        description = "Soup with chicken and corn kernels";
        price = 110.0;
      },
    );
    newMenuItems.add(
      "26",
      {
        id = "26";
        categoryId = "8";
        name = "Egg Drop Soup";
        description = "Egg ribbons in clear broth";
        price = 110.0;
      },
    );
    newMenuItems.add(
      "27",
      {
        id = "27";
        categoryId = "8";
        name = "Regular Soup";
        description = "Classic homemade vegetable soup";
        price = 110.0;
      },
    );

    // Add new menu items for CHINESE
    newMenuItems.add(
      "28",
      {
        id = "28";
        categoryId = "9";
        name = "Chicken Chow Mein";
        description = "Stir-fried noodles with chicken";
        price = 250.0;
      },
    );
    newMenuItems.add(
      "29",
      {
        id = "29";
        categoryId = "9";
        name = "Egg Fried Rice";
        description = "Stir-fried rice with egg";
        price = 200.0;
      },
    );
    newMenuItems.add(
      "30",
      {
        id = "30";
        categoryId = "9";
        name = "Chicken Fried Rice";
        description = "Stir-fried rice with chicken";
        price = 250.0;
      },
    );
    newMenuItems.add(
      "31",
      {
        id = "31";
        categoryId = "9";
        name = "Vegetable Chow Mein";
        description = "Stir-fried noodles with vegetables";
        price = 200.0;
      },
    );

    // Add new menu items for BREADS
    newMenuItems.add(
      "32",
      {
        id = "32";
        categoryId = "10";
        name = "Plain Naan";
        description = "Traditional Pakistani flatbread";
        price = 20.0;
      },
    );
    newMenuItems.add(
      "33",
      {
        id = "33";
        categoryId = "10";
        name = "Tandoori Roti";
        description = "Whole wheat naan bread";
        price = 15.0;
      },
    );
    newMenuItems.add(
      "34",
      {
        id = "34";
        categoryId = "10";
        name = "Khameeri Roti";
        description = "Traditional leavened naan bread";
        price = 30.0;
      },
    );

    // Add new menu items for VEGETABLES
    newMenuItems.add(
      "35",
      {
        id = "35";
        categoryId = "11";
        name = "Mixed Vegetables";
        description = "Vegetable mix curry";
        price = 200.0;
      },
    );

    // Add new menu items for SWEETS
    newMenuItems.add(
      "36",
      {
        id = "36";
        categoryId = "12";
        name = "Halwa";
        description = "Traditional Pakistani semolina sweet";
        price = 80.0;
      },
    );
    newMenuItems.add(
      "37",
      {
        id = "37";
        categoryId = "12";
        name = "Kheer";
        description = "Rice pudding";
        price = 120.0;
      },
    );

    {
      old with
      menuCategories = newMenuCategories;
      menuItems = newMenuItems;
      galleryImages = newGalleryImages;
    };
  };
};
