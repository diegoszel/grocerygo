// server/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in .env");
  process.exit(1);
}

const products = [
  // === Fruit & Vegetables ===
  {
    name: "Bananas",
    description: "Fresh ripe bananas, perfect for smoothies or snacks.",
    imageUrl: "https://images.pexels.com/photos/41957/bananas-fruits-food-healthy-41957.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.29,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 120
  },
  {
    name: "Red Apples",
    description: "Crisp and juicy red apples, great for eating fresh.",
    imageUrl: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.99,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 80
  },
  {
    name: "Green Apples",
    description: "Tart green apples perfect for baking and salads.",
    imageUrl: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.19,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 60
  },
  {
    name: "Oranges",
    description: "Sweet and juicy oranges full of vitamin C.",
    imageUrl: "https://images.pexels.com/photos/42059/background-beverage-citrus-fruit-close-up-42059.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.49,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 90
  },
  {
    name: "Lemons",
    description: "Fresh lemons ideal for tea, cooking and baking.",
    imageUrl: "https://images.pexels.com/photos/952360/pexels-photo-952360.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.39,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 70
  },
  {
    name: "Seedless Grapes",
    description: "Sweet seedless grapes, a perfect snack.",
    imageUrl: "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 4.49,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 50
  },
  {
    name: "Strawberries Box",
    description: "Fresh strawberries in a 500g box.",
    imageUrl: "https://images.pexels.com/photos/104350/pexels-photo-104350.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 5.49,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 40
  },
  {
    name: "Blueberries Box",
    description: "Sweet blueberries perfect for breakfast bowls.",
    imageUrl: "https://images.pexels.com/photos/983833/pexels-photo-983833.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 4.99,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 40
  },
  {
    name: "Broccoli",
    description: "Fresh green broccoli, rich in nutrients.",
    imageUrl: "https://images.pexels.com/photos/1437587/pexels-photo-1437587.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.99,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 50
  },
  {
    name: "Carrots 1kg",
    description: "Crunchy carrots, great for cooking or snacking.",
    imageUrl: "https://images.pexels.com/photos/1431331/pexels-photo-1431331.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.59,
    category: "Fruit & Vegetables",
    inStock: true,
    stockQty: 100
  },

  // === Dairy & Eggs ===
  {
    name: "Whole Milk 1L",
    description: "Fresh whole milk, 1 litre carton.",
    imageUrl: "https://images.pexels.com/photos/3738092/pexels-photo-3738092.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.49,
    category: "Dairy & Eggs",
    inStock: true,
    stockQty: 80
  },
  {
    name: "Low-Fat Milk 1L",
    description: "Low-fat milk, ideal for everyday use.",
    imageUrl: "https://images.pexels.com/photos/5938240/pexels-photo-5938240.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.59,
    category: "Dairy & Eggs",
    inStock: true,
    stockQty: 70
  },
  {
    name: "Cheddar Cheese Block 200g",
    description: "Mild cheddar cheese block, perfect for sandwiches.",
    imageUrl: "https://images.pexels.com/photos/4109951/pexels-photo-4109951.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.49,
    category: "Dairy & Eggs",
    inStock: true,
    stockQty: 50
  },
  {
    name: "Mozzarella Cheese 200g",
    description: "Soft mozzarella cheese, great for pizza.",
    imageUrl: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.29,
    category: "Dairy & Eggs",
    inStock: true,
    stockQty: 45
  },
  {
    name: "Yogurt Natural 500g",
    description: "Creamy natural yogurt, no added sugar.",
    imageUrl: "https://images.pexels.com/photos/4022095/pexels-photo-4022095.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.29,
    category: "Dairy & Eggs",
    inStock: true,
    stockQty: 60
  },
  {
    name: "12 Large Eggs",
    description: "Free-range large eggs, pack of 12.",
    imageUrl: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.19,
    category: "Dairy & Eggs",
    inStock: true,
    stockQty: 90
  },

  // === Meat & Fish ===
  {
    name: "Chicken Breast Fillets 1kg",
    description: "Boneless skinless chicken breast fillets.",
    imageUrl: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 8.99,
    category: "Meat & Fish",
    inStock: true,
    stockQty: 40
  },
  {
    name: "Ground Beef 500g",
    description: "Fresh ground beef, ideal for burgers or bolognese.",
    imageUrl: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 5.99,
    category: "Meat & Fish",
    inStock: true,
    stockQty: 35
  },
  {
    name: "Salmon Fillet 400g",
    description: "Fresh salmon fillet rich in omega-3.",
    imageUrl: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 9.99,
    category: "Meat & Fish",
    inStock: true,
    stockQty: 25
  },
  {
    name: "Turkey Slices 150g",
    description: "Sliced turkey breast for sandwiches.",
    imageUrl: "https://images.pexels.com/photos/5946082/pexels-photo-5946082.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.79,
    category: "Meat & Fish",
    inStock: true,
    stockQty: 40
  },

  // === Bakery ===
  {
    name: "White Bread Loaf",
    description: "Soft white sandwich bread loaf.",
    imageUrl: "https://images.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg?auto=compress&cs=tinysrgb&w=800",
    price: 1.99,
    category: "Bakery",
    inStock: true,
    stockQty: 60
  },
  {
    name: "Whole Wheat Bread Loaf",
    description: "Healthy whole wheat bread loaf.",
    imageUrl: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.29,
    category: "Bakery",
    inStock: true,
    stockQty: 55
  },
  {
    name: "Croissants Pack of 4",
    description: "Buttery croissants, freshly baked.",
    imageUrl: "https://images.pexels.com/photos/2092061/pexels-photo-2092061.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.49,
    category: "Bakery",
    inStock: true,
    stockQty: 30
  },
  {
    name: "Bagels Pack of 4",
    description: "Plain bagels ideal for breakfast.",
    imageUrl: "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.19,
    category: "Bakery",
    inStock: true,
    stockQty: 30
  },

  // === Pantry ===
  {
    name: "Spaghetti 500g",
    description: "Classic dried spaghetti pasta.",
    imageUrl: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.49,
    category: "Pantry",
    inStock: true,
    stockQty: 100
  },
  {
    name: "Tomato Sauce Jar 400g",
    description: "Tomato pasta sauce with herbs.",
    imageUrl: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.49,
    category: "Pantry",
    inStock: true,
    stockQty: 80
  },
  {
    name: "Olive Oil 750ml",
    description: "Extra virgin olive oil, cold pressed.",
    imageUrl: "https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 8.99,
    category: "Pantry",
    inStock: true,
    stockQty: 40
  },
  {
    name: "Rice 1kg",
    description: "Long grain white rice, 1kg bag.",
    imageUrl: "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.49,
    category: "Pantry",
    inStock: true,
    stockQty: 90
  },
  {
    name: "Canned Chickpeas 400g",
    description: "Ready-to-use canned chickpeas.",
    imageUrl: "https://images.pexels.com/photos/4110254/pexels-photo-4110254.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.39,
    category: "Pantry",
    inStock: true,
    stockQty: 70
  },
  {
    name: "Canned Tuna 185g",
    description: "Tuna chunks in brine, ready to eat.",
    imageUrl: "https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.99,
    category: "Pantry",
    inStock: true,
    stockQty: 60
  },

  // === Snacks ===
  {
    name: "Potato Chips 200g",
    description: "Crispy salted potato chips.",
    imageUrl: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.49,
    category: "Snacks",
    inStock: true,
    stockQty: 80
  },
  {
    name: "Chocolate Bar 100g",
    description: "Milk chocolate bar, 100g.",
    imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.79,
    category: "Snacks",
    inStock: true,
    stockQty: 90
  },
  {
    name: "Salted Peanuts 200g",
    description: "Roasted salted peanuts.",
    imageUrl: "https://images.pexels.com/photos/4198025/pexels-photo-4198025.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.19,
    category: "Snacks",
    inStock: true,
    stockQty: 70
  },
  {
    name: "Granola Bars Pack of 6",
    description: "Mixed granola bars with nuts and chocolate.",
    imageUrl: "https://images.pexels.com/photos/4109992/pexels-photo-4109992.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.99,
    category: "Snacks",
    inStock: true,
    stockQty: 50
  },

  // === Drinks ===
  {
    name: "Orange Juice 1L",
    description: "100% orange juice, no added sugar.",
    imageUrl: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.99,
    category: "Drinks",
    inStock: true,
    stockQty: 60
  },
  {
    name: "Apple Juice 1L",
    description: "Cloudy apple juice, naturally sweet.",
    imageUrl: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.79,
    category: "Drinks",
    inStock: true,
    stockQty: 55
  },
  {
    name: "Sparkling Water 1.5L",
    description: "Carbonated mineral water.",
    imageUrl: "https://images.pexels.com/photos/5908305/pexels-photo-5908305.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.19,
    category: "Drinks",
    inStock: true,
    stockQty: 100
  },
  {
    name: "Cola 1.5L",
    description: "Carbonated soft drink cola.",
    imageUrl: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1.99,
    category: "Drinks",
    inStock: true,
    stockQty: 80
  },
  {
    name: "Still Water 1.5L",
    description: "Still mineral water, 1.5L bottle.",
    imageUrl: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 0.89,
    category: "Drinks",
    inStock: true,
    stockQty: 120
  },

  // === Frozen ===
  {
    name: "Frozen Pizza Margherita",
    description: "Frozen pizza with tomato and mozzarella.",
    imageUrl: "https://images.pexels.com/photos/4109120/pexels-photo-4109120.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 4.99,
    category: "Frozen",
    inStock: true,
    stockQty: 40
  },
  {
    name: "Frozen Mixed Vegetables 1kg",
    description: "Frozen mixed peas, carrots and corn.",
    imageUrl: "https://images.pexels.com/photos/1431331/pexels-photo-1431331.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.29,
    category: "Frozen",
    inStock: true,
    stockQty: 50
  },
  {
    name: "Vanilla Ice Cream 1L",
    description: "Classic vanilla ice cream tub.",
    imageUrl: "https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 4.49,
    category: "Frozen",
    inStock: true,
    stockQty: 35
  },
  {
    name: "Frozen French Fries 1kg",
    description: "Crispy frozen french fries, oven ready.",
    imageUrl: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.59,
    category: "Frozen",
    inStock: true,
    stockQty: 60
  },

  // === Household ===
  {
    name: "Paper Towels 4 Rolls",
    description: "Absorbent paper towels, pack of 4 rolls.",
    imageUrl: "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 3.99,
    category: "Household",
    inStock: true,
    stockQty: 50
  },
  {
    name: "Toilet Paper 8 Rolls",
    description: "Soft toilet paper, pack of 8 rolls.",
    imageUrl: "https://images.pexels.com/photos/3958185/pexels-photo-3958185.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 4.49,
    category: "Household",
    inStock: true,
    stockQty: 60
  },
  {
    name: "Dishwashing Liquid 500ml",
    description: "Lemon scented dishwashing liquid.",
    imageUrl: "https://images.pexels.com/photos/5217912/pexels-photo-5217912.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.19,
    category: "Household",
    inStock: true,
    stockQty: 45
  },
  {
    name: "Laundry Detergent 2L",
    description: "Liquid laundry detergent for all fabrics.",
    imageUrl: "https://images.pexels.com/photos/5217904/pexels-photo-5217904.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 7.99,
    category: "Household",
    inStock: true,
    stockQty: 35
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Optional: clear old products first
    await Product.deleteMany({});
    console.log("Old products cleared");

    await Product.insertMany(products);
    console.log(`${products.length} products inserted`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
