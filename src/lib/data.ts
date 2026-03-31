export interface Meal {
  id: string;
  name: string;
  emoji: string;
  calories: number;
  cost: number;
  prepTime: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  tags: string[];
  ingredients: string[];
  steps: string[];
  region?: string;
}

export interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
  checked: boolean;
  category: string;
}

export const meals: Meal[] = [
  // BREAKFAST
  {
    id: '1', name: 'Poha', emoji: '🍛', calories: 250, cost: 15, prepTime: '15 min',
    type: 'breakfast', tags: ['Quick', 'Light'], region: 'Maharashtra',
    ingredients: ['Flattened rice', 'Onion', 'Peanuts', 'Turmeric', 'Green chili', 'Curry leaves', 'Lemon'],
    steps: ['Wash and soak poha', 'Fry peanuts and onion', 'Add turmeric, chili, poha', 'Garnish with lemon and coriander']
  },
  {
    id: '2', name: 'Upma', emoji: '🥣', calories: 220, cost: 12, prepTime: '15 min',
    type: 'breakfast', tags: ['Quick', 'Filling'], region: 'South India',
    ingredients: ['Semolina', 'Onion', 'Mustard seeds', 'Green chili', 'Curry leaves', 'Ghee'],
    steps: ['Roast semolina', 'Temper mustard, curry leaves, onion', 'Add water and semolina', 'Cook till fluffy']
  },
  {
    id: '3', name: 'Aloo Paratha + Curd', emoji: '🫓', calories: 350, cost: 20, prepTime: '20 min',
    type: 'breakfast', tags: ['Filling', 'Protein'], region: 'Punjab',
    ingredients: ['Wheat flour', 'Potato', 'Curd', 'Ghee', 'Green chili', 'Salt'],
    steps: ['Knead dough', 'Make potato filling', 'Roll and cook with ghee', 'Serve with curd']
  },
  {
    id: '10', name: 'Idli Sambhar', emoji: '🫕', calories: 200, cost: 15, prepTime: '20 min',
    type: 'breakfast', tags: ['South Indian', 'Light'], region: 'Tamil Nadu',
    ingredients: ['Idli batter', 'Toor dal', 'Vegetables', 'Sambhar powder', 'Coconut chutney'],
    steps: ['Steam idli batter', 'Cook dal with veggies', 'Add sambhar masala', 'Serve with chutney']
  },
  {
    id: '11', name: 'Moong Dal Chilla', emoji: '🥞', calories: 180, cost: 12, prepTime: '15 min',
    type: 'breakfast', tags: ['Protein', 'Quick'], region: 'North India',
    ingredients: ['Moong dal (soaked)', 'Onion', 'Green chili', 'Ginger', 'Coriander', 'Salt'],
    steps: ['Grind soaked moong dal', 'Add chopped veggies', 'Spread on tawa like dosa', 'Cook both sides golden']
  },
  {
    id: '12', name: 'Bread Omelette', emoji: '🍞', calories: 300, cost: 18, prepTime: '10 min',
    type: 'breakfast', tags: ['Quick', 'Protein'], region: 'Street Food',
    ingredients: ['Bread', 'Eggs', 'Onion', 'Tomato', 'Green chili', 'Butter'],
    steps: ['Beat eggs with veggies', 'Dip bread in egg mix', 'Toast on tawa with butter', 'Serve hot']
  },
  {
    id: '13', name: 'Dosa + Chutney', emoji: '🥘', calories: 230, cost: 15, prepTime: '20 min',
    type: 'breakfast', tags: ['South Indian', 'Crispy'], region: 'Karnataka',
    ingredients: ['Dosa batter', 'Oil', 'Coconut chutney', 'Green chili'],
    steps: ['Heat tawa', 'Spread batter thin', 'Cook till crispy', 'Serve with chutney']
  },
  {
    id: '14', name: 'Puri Bhaji', emoji: '🍽️', calories: 400, cost: 25, prepTime: '25 min',
    type: 'breakfast', tags: ['Heavy', 'Classic'], region: 'Maharashtra',
    ingredients: ['Wheat flour', 'Oil', 'Potato', 'Onion', 'Turmeric', 'Mustard'],
    steps: ['Knead dough', 'Roll small puris', 'Deep fry', 'Make potato bhaji', 'Serve together']
  },

  // LUNCH
  {
    id: '4', name: 'Dal Rice', emoji: '🍚', calories: 400, cost: 25, prepTime: '30 min',
    type: 'lunch', tags: ['Classic', 'Protein'], region: 'All India',
    ingredients: ['Toor dal', 'Rice', 'Onion', 'Tomato', 'Turmeric', 'Ghee', 'Cumin'],
    steps: ['Cook dal with turmeric', 'Cook rice separately', 'Temper dal with cumin, ghee', 'Serve together']
  },
  {
    id: '5', name: 'Rajma Chawal', emoji: '🫘', calories: 450, cost: 30, prepTime: '40 min',
    type: 'lunch', tags: ['Filling', 'Protein'], region: 'Punjab',
    ingredients: ['Kidney beans', 'Rice', 'Onion', 'Tomato', 'Ginger-garlic paste', 'Spices'],
    steps: ['Soak and pressure cook rajma', 'Make onion-tomato gravy', 'Add rajma to gravy', 'Serve with rice']
  },
  {
    id: '6', name: 'Chole Roti', emoji: '🍛', calories: 420, cost: 28, prepTime: '35 min',
    type: 'lunch', tags: ['Classic', 'Spicy'], region: 'North India',
    ingredients: ['Chickpeas', 'Wheat flour', 'Onion', 'Tomato', 'Chole masala', 'Tea bag'],
    steps: ['Soak and cook chickpeas', 'Make spicy gravy', 'Simmer chole in gravy', 'Serve with fresh roti']
  },
  {
    id: '15', name: 'Jeera Rice + Kadhi', emoji: '🍚', calories: 380, cost: 22, prepTime: '30 min',
    type: 'lunch', tags: ['Comfort', 'Light'], region: 'Gujarat',
    ingredients: ['Rice', 'Cumin', 'Ghee', 'Besan', 'Curd', 'Curry leaves', 'Turmeric'],
    steps: ['Cook rice with cumin and ghee', 'Make besan-curd kadhi', 'Temper with curry leaves', 'Serve together']
  },
  {
    id: '16', name: 'Sambar Rice', emoji: '🍲', calories: 360, cost: 25, prepTime: '35 min',
    type: 'lunch', tags: ['South Indian', 'Healthy'], region: 'Tamil Nadu',
    ingredients: ['Rice', 'Toor dal', 'Drumstick', 'Brinjal', 'Sambar powder', 'Tamarind'],
    steps: ['Cook rice and dal', 'Boil veggies with tamarind', 'Add sambar powder', 'Mix dal and serve']
  },
  {
    id: '17', name: 'Egg Curry + Rice', emoji: '🥚', calories: 420, cost: 28, prepTime: '25 min',
    type: 'lunch', tags: ['Protein', 'Spicy'], region: 'Bengal',
    ingredients: ['Eggs', 'Rice', 'Onion', 'Tomato', 'Ginger-garlic', 'Garam masala', 'Turmeric'],
    steps: ['Boil and halve eggs', 'Make onion-tomato gravy', 'Add spices and eggs', 'Simmer and serve with rice']
  },
  {
    id: '18', name: 'Aloo Gobi + Roti', emoji: '🥦', calories: 350, cost: 22, prepTime: '30 min',
    type: 'lunch', tags: ['Veg', 'Classic'], region: 'North India',
    ingredients: ['Potato', 'Cauliflower', 'Wheat flour', 'Onion', 'Tomato', 'Turmeric', 'Cumin'],
    steps: ['Cut veggies', 'Cook with spices', 'Make roti', 'Serve together']
  },
  {
    id: '19', name: 'Pav Bhaji', emoji: '🍔', calories: 450, cost: 30, prepTime: '30 min',
    type: 'lunch', tags: ['Street Food', 'Fun'], region: 'Mumbai',
    ingredients: ['Mixed veggies', 'Pav bread', 'Butter', 'Pav bhaji masala', 'Onion', 'Lemon'],
    steps: ['Boil and mash veggies', 'Cook with masala and butter', 'Toast pav with butter', 'Garnish and serve']
  },
  {
    id: '20', name: 'Biryani (Veg)', emoji: '🍚', calories: 480, cost: 35, prepTime: '45 min',
    type: 'lunch', tags: ['Special', 'Aromatic'], region: 'Hyderabad',
    ingredients: ['Basmati rice', 'Mixed veggies', 'Biryani masala', 'Saffron', 'Onion', 'Mint', 'Ghee'],
    steps: ['Soak rice', 'Fry onions golden', 'Layer rice and veggie masala', 'Dum cook for 20 mins']
  },

  // DINNER
  {
    id: '7', name: 'Khichdi', emoji: '🍲', calories: 300, cost: 18, prepTime: '25 min',
    type: 'dinner', tags: ['Light', 'Comfort'], region: 'All India',
    ingredients: ['Rice', 'Moong dal', 'Ghee', 'Cumin', 'Turmeric', 'Vegetables'],
    steps: ['Wash rice and dal', 'Pressure cook with veggies and spices', 'Temper with ghee and cumin', 'Serve hot']
  },
  {
    id: '8', name: 'Egg Bhurji + Roti', emoji: '🥚', calories: 380, cost: 22, prepTime: '15 min',
    type: 'dinner', tags: ['Quick', 'Protein'], region: 'Street Food',
    ingredients: ['Eggs', 'Onion', 'Tomato', 'Green chili', 'Wheat flour', 'Oil'],
    steps: ['Scramble eggs with onion, tomato', 'Add spices', 'Make roti', 'Serve together']
  },
  {
    id: '9', name: 'Maggi Masala', emoji: '🍜', calories: 280, cost: 15, prepTime: '10 min',
    type: 'dinner', tags: ['Quick', 'Comfort'], region: 'Hostel Special',
    ingredients: ['Maggi noodles', 'Vegetables', 'Maggi masala', 'Water'],
    steps: ['Boil water', 'Add veggies and masala', 'Add noodles', 'Cook for 2 minutes']
  },
  {
    id: '21', name: 'Paneer Bhurji + Roti', emoji: '🧀', calories: 400, cost: 35, prepTime: '20 min',
    type: 'dinner', tags: ['Protein', 'Quick'], region: 'North India',
    ingredients: ['Paneer', 'Onion', 'Tomato', 'Green chili', 'Wheat flour', 'Spices'],
    steps: ['Crumble paneer', 'Sauté onion, tomato, spices', 'Add paneer and cook', 'Serve with roti']
  },
  {
    id: '22', name: 'Daliya (Broken Wheat)', emoji: '🥣', calories: 250, cost: 15, prepTime: '20 min',
    type: 'dinner', tags: ['Healthy', 'Light'], region: 'North India',
    ingredients: ['Broken wheat', 'Onion', 'Peas', 'Carrot', 'Cumin', 'Ghee'],
    steps: ['Roast daliya', 'Sauté veggies', 'Add water and cook', 'Temper with ghee']
  },
  {
    id: '23', name: 'Curd Rice', emoji: '🍚', calories: 280, cost: 12, prepTime: '10 min',
    type: 'dinner', tags: ['Cooling', 'Quick'], region: 'South India',
    ingredients: ['Rice (leftover)', 'Curd', 'Mustard seeds', 'Curry leaves', 'Green chili', 'Salt'],
    steps: ['Mix rice with curd', 'Temper mustard, curry leaves', 'Add salt and mix', 'Serve cool']
  },
  {
    id: '24', name: 'Chapati + Dal Fry', emoji: '🍛', calories: 370, cost: 20, prepTime: '30 min',
    type: 'dinner', tags: ['Classic', 'Balanced'], region: 'All India',
    ingredients: ['Wheat flour', 'Toor dal', 'Onion', 'Tomato', 'Garlic', 'Red chili', 'Ghee'],
    steps: ['Cook dal', 'Make tadka with garlic, onion', 'Add to dal', 'Make chapati and serve']
  },
  {
    id: '25', name: 'Masala Oats', emoji: '🥣', calories: 220, cost: 18, prepTime: '10 min',
    type: 'dinner', tags: ['Healthy', 'Quick'], region: 'Modern',
    ingredients: ['Oats', 'Onion', 'Tomato', 'Peas', 'Cumin', 'Turmeric'],
    steps: ['Sauté veggies', 'Add oats and water', 'Add spices', 'Cook 5 minutes']
  },
];

const breakfasts = meals.filter(m => m.type === 'breakfast');
const lunches = meals.filter(m => m.type === 'lunch');
const dinners = meals.filter(m => m.type === 'dinner');

export const weeklyPlan: DayPlan[] = [
  { day: 'Monday', breakfast: breakfasts[0], lunch: lunches[0], dinner: dinners[0] },
  { day: 'Tuesday', breakfast: breakfasts[1], lunch: lunches[1], dinner: dinners[1] },
  { day: 'Wednesday', breakfast: breakfasts[2], lunch: lunches[2], dinner: dinners[2] },
  { day: 'Thursday', breakfast: breakfasts[3], lunch: lunches[3], dinner: dinners[3] },
  { day: 'Friday', breakfast: breakfasts[4], lunch: lunches[4], dinner: dinners[4] },
  { day: 'Saturday', breakfast: breakfasts[5], lunch: lunches[5], dinner: dinners[5] },
  { day: 'Sunday', breakfast: breakfasts[6], lunch: lunches[6], dinner: dinners[6] },
];

export const groceryItems: GroceryItem[] = [
  { id: '1', name: 'Basmati Rice (1kg)', quantity: '1 kg', price: 80, checked: false, category: 'Grains' },
  { id: '2', name: 'Toor Dal', quantity: '500g', price: 75, checked: false, category: 'Pulses' },
  { id: '3', name: 'Moong Dal', quantity: '500g', price: 70, checked: false, category: 'Pulses' },
  { id: '4', name: 'Chickpeas', quantity: '500g', price: 60, checked: false, category: 'Pulses' },
  { id: '5', name: 'Onions', quantity: '1 kg', price: 30, checked: false, category: 'Vegetables' },
  { id: '6', name: 'Tomatoes', quantity: '500g', price: 25, checked: false, category: 'Vegetables' },
  { id: '7', name: 'Potatoes', quantity: '1 kg', price: 30, checked: false, category: 'Vegetables' },
  { id: '8', name: 'Cauliflower', quantity: '1 pc', price: 30, checked: false, category: 'Vegetables' },
  { id: '9', name: 'Green Chili', quantity: '100g', price: 10, checked: false, category: 'Vegetables' },
  { id: '10', name: 'Eggs (12)', quantity: '12 pcs', price: 84, checked: false, category: 'Dairy & Eggs' },
  { id: '11', name: 'Curd', quantity: '500g', price: 30, checked: false, category: 'Dairy & Eggs' },
  { id: '12', name: 'Paneer', quantity: '200g', price: 60, checked: false, category: 'Dairy & Eggs' },
  { id: '13', name: 'Wheat Flour', quantity: '1 kg', price: 45, checked: false, category: 'Grains' },
  { id: '14', name: 'Semolina (Rava)', quantity: '500g', price: 35, checked: false, category: 'Grains' },
  { id: '15', name: 'Flattened Rice (Poha)', quantity: '500g', price: 35, checked: false, category: 'Grains' },
  { id: '16', name: 'Oats', quantity: '500g', price: 50, checked: false, category: 'Grains' },
  { id: '17', name: 'Maggi (4-pack)', quantity: '4 pcs', price: 56, checked: false, category: 'Instant' },
  { id: '18', name: 'Cooking Oil', quantity: '1L', price: 130, checked: false, category: 'Essentials' },
  { id: '19', name: 'Ghee', quantity: '200ml', price: 90, checked: false, category: 'Essentials' },
  { id: '20', name: 'Peanuts', quantity: '250g', price: 40, checked: false, category: 'Dry Fruits' },
  { id: '21', name: 'Bread', quantity: '1 pack', price: 35, checked: false, category: 'Bakery' },
  { id: '22', name: 'Pav', quantity: '8 pcs', price: 20, checked: false, category: 'Bakery' },
  { id: '23', name: 'Ginger-Garlic Paste', quantity: '200g', price: 35, checked: false, category: 'Essentials' },
  { id: '24', name: 'Spice Box Refill', quantity: '1 set', price: 120, checked: false, category: 'Essentials' },
];

export const defaultBudget = 3000;

export const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal', 'Indore',
  'Kochi', 'Coimbatore', 'Nagpur', 'Patna', 'Ranchi', 'Guwahati', 'Other'
];

export const foodPreferences = [
  { id: 'veg', label: 'Pure Vegetarian', emoji: '🥬', desc: 'No eggs, no meat' },
  { id: 'egg', label: 'Eggetarian', emoji: '🥚', desc: 'Veg + eggs' },
  { id: 'nonveg', label: 'Non-Vegetarian', emoji: '🍗', desc: 'Everything goes!' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱', desc: 'No dairy, no eggs, no meat' },
  { id: 'jain', label: 'Jain', emoji: '🙏', desc: 'No onion, no garlic' },
];

export const cuisinePreferences = [
  { id: 'north', label: 'North Indian', emoji: '🫓' },
  { id: 'south', label: 'South Indian', emoji: '🫕' },
  { id: 'street', label: 'Street Food', emoji: '🍔' },
  { id: 'bengali', label: 'Bengali', emoji: '🐟' },
  { id: 'gujarati', label: 'Gujarati', emoji: '🥘' },
  { id: 'all', label: 'All Cuisines', emoji: '🌍' },
];
