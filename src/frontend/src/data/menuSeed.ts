import type { MenuCategory, MenuItem } from '../backend';

export const seedCategories: MenuCategory[] = [
  { id: '1', name: 'BREAKFAST' },
  { id: '2', name: 'DESI DISHES' },
  { id: '3', name: 'CHICKEN DISHES' },
  { id: '4', name: 'MUTTON DISHES' },
  { id: '5', name: 'FISH' },
  { id: '6', name: 'B.B.Q' },
  { id: '7', name: 'RICE' },
  { id: '10', name: 'BREADS' },
  { id: '11', name: 'VEGETABLES' },
  { id: '12', name: 'SWEETS' },
];

export const seedMenuItems: MenuItem[] = [
  // BREAKFAST
  { id: '1', categoryId: '1', name: 'Paratha', description: 'Traditional Pakistani flatbread fried in ghee', price: 50 },
  { id: '2', categoryId: '1', name: 'Halwa Puri', description: 'Sweet semolina with fried bread and potatoes', price: 150 },

  // DESI DISHES
  { id: '3', categoryId: '2', name: 'Daal Mash', description: 'Lentil curry served with roti', price: 180 },
  { id: '4', categoryId: '2', name: 'Chana Masala', description: 'Spicy chickpea curry', price: 200 },

  // CHICKEN DISHES
  { id: '5', categoryId: '3', name: 'Chicken Karahi', description: 'Spicy chicken cooked in tomato gravy', price: 600 },
  { id: '6', categoryId: '3', name: 'Chicken Handi', description: 'Boneless chicken cooked in creamy gravy', price: 650 },

  // MUTTON DISHES
  { id: '7', categoryId: '4', name: 'Mutton Karahi', description: 'Tender mutton pieces in rich gravy', price: 1200 },
  { id: '8', categoryId: '4', name: 'Mutton Handi', description: 'Boneless mutton cooked in creamy sauce', price: 1350 },
  { id: '9', categoryId: '4', name: 'Mutton Tawa', description: 'Spicy mutton cooked on flat pan', price: 1600 },

  // FISH
  { id: '10', categoryId: '5', name: 'Finger Fish', description: 'Battered and fried fish fillets', price: 500 },
  { id: '11', categoryId: '5', name: 'Fried Rohu', description: 'Pakistani style deep-fried rohu', price: 700 },

  // B.B.Q
  { id: '12', categoryId: '6', name: 'Chicken Tikka', description: 'Charcoal grilled chicken pieces', price: 150 },
  { id: '13', categoryId: '6', name: 'Chicken Malai Boti', description: 'Skewered chicken cubes with cream', price: 180 },
  { id: '14', categoryId: '6', name: 'Chicken Seekh Kebab', description: 'Chicken mince skewers', price: 100 },
  { id: '15', categoryId: '6', name: 'Chicken Cheese Boti', description: 'Grilled chicken with cheese', price: 200 },
  { id: '16', categoryId: '6', name: 'Chicken Kabab Roll', description: 'Grilled chicken kebab in naan', price: 80 },
  { id: '17', categoryId: '6', name: 'Beef Seekh Kebab', description: 'Beef mince kebab skewers', price: 120 },
  { id: '18', categoryId: '6', name: 'Beef Kabab Roll', description: 'Grilled beef kebab in naan', price: 100 },
  { id: '19', categoryId: '6', name: 'Beef Bihari Kebab', description: 'Spicy marinated beef kebab', price: 180 },
  { id: '20', categoryId: '6', name: 'Beef Ribs', description: 'Charcoal grilled beef ribs', price: 400 },
  { id: '21', categoryId: '6', name: 'Beef Chapli Kebab', description: 'Flattened spicy beef kebab', price: 120 },
  { id: '22', categoryId: '6', name: 'Lamb Chops', description: 'Charcoal grilled lamb chops', price: 420 },

  // RICE
  { id: '23', categoryId: '7', name: 'Chicken Pulao', description: 'Rice cooked with chicken and spices', price: 250 },

  // BREADS
  { id: '32', categoryId: '10', name: 'Plain Naan', description: 'Traditional Pakistani flatbread', price: 20 },
  { id: '33', categoryId: '10', name: 'Tandoori Roti', description: 'Whole wheat naan bread', price: 15 },
  { id: '34', categoryId: '10', name: 'Khameeri Roti', description: 'Traditional leavened naan bread', price: 30 },

  // VEGETABLES
  { id: '35', categoryId: '11', name: 'Mixed Vegetables', description: 'Vegetable mix curry', price: 200 },

  // SWEETS
  { id: '36', categoryId: '12', name: 'Halwa', description: 'Traditional Pakistani semolina sweet', price: 80 },
  { id: '37', categoryId: '12', name: 'Kheer', description: 'Rice pudding', price: 120 },
];
