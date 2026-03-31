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
  {
    id: '1', name: 'Poha', emoji: '🍛', calories: 250, cost: 15, prepTime: '15 min',
    type: 'breakfast', tags: ['Quick', 'Light'],
    ingredients: ['Flattened rice', 'Onion', 'Peanuts', 'Turmeric', 'Green chili', 'Curry leaves', 'Lemon'],
    steps: ['Wash and soak poha', 'Fry peanuts and onion', 'Add turmeric, chili, poha', 'Garnish with lemon and coriander']
  },
  {
    id: '2', name: 'Upma', emoji: '🥣', calories: 220, cost: 12, prepTime: '15 min',
    type: 'breakfast', tags: ['Quick', 'Filling'],
    ingredients: ['Semolina', 'Onion', 'Mustard seeds', 'Green chili', 'Curry leaves', 'Ghee'],
    steps: ['Roast semolina', 'Temper mustard, curry leaves, onion', 'Add water and semolina', 'Cook till fluffy']
  },
  {
    id: '3', name: 'Paratha + Curd', emoji: '🫓', calories: 350, cost: 20, prepTime: '20 min',
    type: 'breakfast', tags: ['Filling', 'Protein'],
    ingredients: ['Wheat flour', 'Potato', 'Curd', 'Ghee', 'Green chili', 'Salt'],
    steps: ['Knead dough', 'Make potato filling', 'Roll and cook with ghee', 'Serve with curd']
  },
  {
    id: '4', name: 'Dal Rice', emoji: '🍚', calories: 400, cost: 25, prepTime: '30 min',
    type: 'lunch', tags: ['Classic', 'Protein'],
    ingredients: ['Toor dal', 'Rice', 'Onion', 'Tomato', 'Turmeric', 'Ghee', 'Cumin'],
    steps: ['Cook dal with turmeric', 'Cook rice separately', 'Temper dal with cumin, ghee', 'Serve together']
  },
  {
    id: '5', name: 'Rajma Chawal', emoji: '🫘', calories: 450, cost: 30, prepTime: '40 min',
    type: 'lunch', tags: ['Filling', 'Protein'],
    ingredients: ['Kidney beans', 'Rice', 'Onion', 'Tomato', 'Ginger-garlic paste', 'Spices'],
    steps: ['Soak and pressure cook rajma', 'Make onion-tomato gravy', 'Add rajma to gravy', 'Serve with rice']
  },
  {
    id: '6', name: 'Chole Roti', emoji: '🍛', calories: 420, cost: 28, prepTime: '35 min',
    type: 'lunch', tags: ['Classic', 'Spicy'],
    ingredients: ['Chickpeas', 'Wheat flour', 'Onion', 'Tomato', 'Chole masala', 'Tea bag'],
    steps: ['Soak and cook chickpeas', 'Make spicy gravy', 'Simmer chole in gravy', 'Serve with fresh roti']
  },
  {
    id: '7', name: 'Khichdi', emoji: '🍲', calories: 300, cost: 18, prepTime: '25 min',
    type: 'dinner', tags: ['Light', 'Comfort'],
    ingredients: ['Rice', 'Moong dal', 'Ghee', 'Cumin', 'Turmeric', 'Vegetables'],
    steps: ['Wash rice and dal', 'Pressure cook with veggies and spices', 'Temper with ghee and cumin', 'Serve hot']
  },
  {
    id: '8', name: 'Egg Bhurji + Roti', emoji: '🥚', calories: 380, cost: 22, prepTime: '15 min',
    type: 'dinner', tags: ['Quick', 'Protein'],
    ingredients: ['Eggs', 'Onion', 'Tomato', 'Green chili', 'Wheat flour', 'Oil'],
    steps: ['Scramble eggs with onion, tomato', 'Add spices', 'Make roti', 'Serve together']
  },
  {
    id: '9', name: 'Maggi Masala', emoji: '🍜', calories: 280, cost: 15, prepTime: '10 min',
    type: 'dinner', tags: ['Quick', 'Comfort'],
    ingredients: ['Maggi noodles', 'Vegetables', 'Maggi masala', 'Water'],
    steps: ['Boil water', 'Add veggies and masala', 'Add noodles', 'Cook for 2 minutes']
  },
  {
    id: '10', name: 'Idli Sambhar', emoji: '🫕', calories: 200, cost: 15, prepTime: '20 min',
    type: 'breakfast', tags: ['South Indian', 'Light'],
    ingredients: ['Idli batter', 'Toor dal', 'Vegetables', 'Sambhar powder', 'Coconut chutney'],
    steps: ['Steam idli batter', 'Cook dal with veggies', 'Add sambhar masala', 'Serve with chutney']
  },
];

export const weeklyPlan: DayPlan[] = [
  { day: 'Monday', breakfast: meals[0], lunch: meals[3], dinner: meals[6] },
  { day: 'Tuesday', breakfast: meals[1], lunch: meals[4], dinner: meals[7] },
  { day: 'Wednesday', breakfast: meals[2], lunch: meals[5], dinner: meals[8] },
  { day: 'Thursday', breakfast: meals[9], lunch: meals[3], dinner: meals[7] },
  { day: 'Friday', breakfast: meals[0], lunch: meals[4], dinner: meals[6] },
  { day: 'Saturday', breakfast: meals[2], lunch: meals[5], dinner: meals[8] },
  { day: 'Sunday', breakfast: meals[1], lunch: meals[3], dinner: meals[7] },
];

export const groceryItems: GroceryItem[] = [
  { id: '1', name: 'Rice (1kg)', quantity: '1 kg', price: 60, checked: false, category: 'Grains' },
  { id: '2', name: 'Toor Dal', quantity: '500g', price: 75, checked: false, category: 'Pulses' },
  { id: '3', name: 'Onions', quantity: '1 kg', price: 30, checked: false, category: 'Vegetables' },
  { id: '4', name: 'Tomatoes', quantity: '500g', price: 25, checked: false, category: 'Vegetables' },
  { id: '5', name: 'Potatoes', quantity: '1 kg', price: 30, checked: false, category: 'Vegetables' },
  { id: '6', name: 'Eggs (6)', quantity: '6 pcs', price: 42, checked: false, category: 'Dairy' },
  { id: '7', name: 'Curd', quantity: '500g', price: 30, checked: false, category: 'Dairy' },
  { id: '8', name: 'Wheat Flour', quantity: '1 kg', price: 45, checked: false, category: 'Grains' },
  { id: '9', name: 'Maggi (4-pack)', quantity: '4 pcs', price: 56, checked: false, category: 'Instant' },
  { id: '10', name: 'Cooking Oil', quantity: '500ml', price: 70, checked: false, category: 'Essentials' },
  { id: '11', name: 'Flattened Rice', quantity: '500g', price: 35, checked: false, category: 'Grains' },
  { id: '12', name: 'Peanuts', quantity: '250g', price: 40, checked: false, category: 'Dry Fruits' },
];

export const defaultBudget = 3000;
