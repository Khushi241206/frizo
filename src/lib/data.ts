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
  // ===== BREAKFAST (15 items) =====
  { id: 'b1', name: 'Poha', emoji: '🍛', calories: 230, cost: 15, prepTime: '15 min', type: 'breakfast', tags: ['Quick', 'Light'], region: 'Maharashtra', ingredients: ['Flattened rice', 'Onion', 'Peanuts', 'Turmeric', 'Green chili', 'Curry leaves', 'Lemon'], steps: ['Wash and soak poha', 'Fry peanuts and onion', 'Add turmeric, chili, poha', 'Garnish with lemon and coriander'] },
  { id: 'b2', name: 'Upma', emoji: '🥣', calories: 210, cost: 12, prepTime: '15 min', type: 'breakfast', tags: ['Quick', 'Filling'], region: 'South India', ingredients: ['Semolina', 'Onion', 'Mustard seeds', 'Green chili', 'Curry leaves', 'Ghee'], steps: ['Roast semolina', 'Temper mustard, curry leaves, onion', 'Add water and semolina', 'Cook till fluffy'] },
  { id: 'b3', name: 'Aloo Paratha + Curd', emoji: '🫓', calories: 320, cost: 20, prepTime: '20 min', type: 'breakfast', tags: ['Filling', 'Protein'], region: 'Punjab', ingredients: ['Wheat flour', 'Potato', 'Curd', 'Ghee', 'Green chili', 'Salt'], steps: ['Knead dough', 'Make potato filling', 'Roll and cook with ghee', 'Serve with curd'] },
  { id: 'b4', name: 'Idli Sambhar', emoji: '🫕', calories: 180, cost: 15, prepTime: '20 min', type: 'breakfast', tags: ['South Indian', 'Light'], region: 'Tamil Nadu', ingredients: ['Idli batter', 'Toor dal', 'Vegetables', 'Sambhar powder', 'Coconut chutney'], steps: ['Steam idli batter', 'Cook dal with veggies', 'Add sambhar masala', 'Serve with chutney'] },
  { id: 'b5', name: 'Moong Dal Chilla', emoji: '🥞', calories: 160, cost: 12, prepTime: '15 min', type: 'breakfast', tags: ['Protein', 'Quick'], region: 'North India', ingredients: ['Moong dal (soaked)', 'Onion', 'Green chili', 'Ginger', 'Coriander', 'Salt'], steps: ['Grind soaked moong dal', 'Add chopped veggies', 'Spread on tawa like dosa', 'Cook both sides golden'] },
  { id: 'b6', name: 'Bread Omelette', emoji: '🍞', calories: 270, cost: 18, prepTime: '10 min', type: 'breakfast', tags: ['Quick', 'Protein'], region: 'Street Food', ingredients: ['Bread', 'Eggs', 'Onion', 'Tomato', 'Green chili', 'Butter'], steps: ['Beat eggs with veggies', 'Dip bread in egg mix', 'Toast on tawa with butter', 'Serve hot'] },
  { id: 'b7', name: 'Dosa + Chutney', emoji: '🥘', calories: 210, cost: 15, prepTime: '20 min', type: 'breakfast', tags: ['South Indian', 'Crispy'], region: 'Karnataka', ingredients: ['Dosa batter', 'Oil', 'Coconut chutney', 'Green chili'], steps: ['Heat tawa', 'Spread batter thin', 'Cook till crispy', 'Serve with chutney'] },
  { id: 'b8', name: 'Puri Bhaji', emoji: '🍽️', calories: 360, cost: 25, prepTime: '25 min', type: 'breakfast', tags: ['Heavy', 'Classic'], region: 'Maharashtra', ingredients: ['Wheat flour', 'Oil', 'Potato', 'Onion', 'Turmeric', 'Mustard'], steps: ['Knead dough', 'Roll small puris', 'Deep fry', 'Make potato bhaji', 'Serve together'] },
  { id: 'b9', name: 'Besan Chilla', emoji: '🥞', calories: 170, cost: 10, prepTime: '10 min', type: 'breakfast', tags: ['Quick', 'Vegan'], region: 'North India', ingredients: ['Besan', 'Onion', 'Tomato', 'Green chili', 'Coriander', 'Salt'], steps: ['Mix besan with water and veggies', 'Spread on hot tawa', 'Cook both sides', 'Serve with chutney'] },
  { id: 'b10', name: 'Sabudana Khichdi', emoji: '🍚', calories: 260, cost: 18, prepTime: '20 min', type: 'breakfast', tags: ['Fasting', 'Light'], region: 'Maharashtra', ingredients: ['Sabudana', 'Peanuts', 'Potato', 'Cumin', 'Green chili', 'Lemon'], steps: ['Soak sabudana overnight', 'Fry peanuts and potato', 'Add sabudana and cook', 'Garnish with lemon'] },
  { id: 'b11', name: 'Misal Pav', emoji: '🌶️', calories: 330, cost: 25, prepTime: '30 min', type: 'breakfast', tags: ['Spicy', 'Street Food'], region: 'Maharashtra', ingredients: ['Sprouted moth beans', 'Onion', 'Farsan', 'Pav', 'Misal masala', 'Lemon'], steps: ['Cook sprouts in spicy gravy', 'Top with onion and farsan', 'Squeeze lemon', 'Serve with pav'] },
  { id: 'b12', name: 'Rava Dosa', emoji: '🥘', calories: 190, cost: 14, prepTime: '15 min', type: 'breakfast', tags: ['Instant', 'Crispy'], region: 'South India', ingredients: ['Semolina', 'Rice flour', 'Maida', 'Cumin', 'Pepper', 'Curry leaves'], steps: ['Mix all flours with water', 'Add cumin and pepper', 'Pour on hot tawa', 'Cook crispy and serve'] },
  { id: 'b13', name: 'Stuffed Ragi Roti', emoji: '🫓', calories: 200, cost: 15, prepTime: '20 min', type: 'breakfast', tags: ['Healthy', 'Millet'], region: 'Karnataka', ingredients: ['Ragi flour', 'Onion', 'Carrot', 'Coriander', 'Green chili'], steps: ['Knead ragi dough', 'Make veggie stuffing', 'Roll and cook on tawa', 'Serve with curd'] },
  { id: 'b14', name: 'Kanda Poha', emoji: '🧅', calories: 220, cost: 14, prepTime: '12 min', type: 'breakfast', tags: ['Quick', 'Onion-rich'], region: 'Maharashtra', ingredients: ['Thin poha', 'Lots of onions', 'Peanuts', 'Turmeric', 'Curry leaves', 'Lemon'], steps: ['Soak thin poha', 'Fry onions till golden', 'Mix everything', 'Top with sev and lemon'] },
  { id: 'b15', name: 'Chole Bhature', emoji: '🍛', calories: 450, cost: 30, prepTime: '35 min', type: 'breakfast', tags: ['Heavy', 'North Indian'], region: 'Delhi', ingredients: ['Chickpeas', 'Maida', 'Yogurt', 'Chole masala', 'Onion', 'Oil'], steps: ['Soak and cook chickpeas', 'Make spicy chole gravy', 'Knead and fry bhature', 'Serve together'] },
  { id: 'b16', name: 'Vegetable Uttapam', emoji: '🥞', calories: 220, cost: 16, prepTime: '15 min', type: 'breakfast', tags: ['South Indian', 'Veggie'], region: 'Tamil Nadu', ingredients: ['Dosa batter', 'Onion', 'Tomato', 'Capsicum', 'Coriander', 'Oil'], steps: ['Pour thick batter on tawa', 'Top with chopped veggies', 'Cook both sides', 'Serve with chutney'] },
  { id: 'b17', name: 'Oats Idli', emoji: '🍘', calories: 170, cost: 14, prepTime: '20 min', type: 'breakfast', tags: ['Healthy', 'Low-cal'], region: 'Modern', ingredients: ['Oats', 'Curd', 'Eno', 'Carrot', 'Mustard', 'Curry leaves'], steps: ['Roast and grind oats', 'Mix with curd and eno', 'Steam in idli mould', 'Serve with sambhar'] },
  { id: 'b18', name: 'Sprouts Salad', emoji: '🌱', calories: 150, cost: 12, prepTime: '10 min', type: 'breakfast', tags: ['Healthy', 'Protein'], region: 'All India', ingredients: ['Mixed sprouts', 'Onion', 'Tomato', 'Cucumber', 'Lemon', 'Chaat masala'], steps: ['Boil sprouts lightly', 'Chop all veggies', 'Mix with lemon and masala', 'Serve fresh'] },

  // ===== LUNCH (18 items) =====
  { id: 'l1', name: 'Dal Rice', emoji: '🍚', calories: 360, cost: 25, prepTime: '30 min', type: 'lunch', tags: ['Classic', 'Protein'], region: 'All India', ingredients: ['Toor dal', 'Rice', 'Onion', 'Tomato', 'Turmeric', 'Ghee', 'Cumin'], steps: ['Cook dal with turmeric', 'Cook rice separately', 'Temper dal with cumin, ghee', 'Serve together'] },
  { id: 'l2', name: 'Rajma Chawal', emoji: '🫘', calories: 410, cost: 30, prepTime: '40 min', type: 'lunch', tags: ['Filling', 'Protein'], region: 'Punjab', ingredients: ['Kidney beans', 'Rice', 'Onion', 'Tomato', 'Ginger-garlic paste', 'Spices'], steps: ['Soak and pressure cook rajma', 'Make onion-tomato gravy', 'Add rajma to gravy', 'Serve with rice'] },
  { id: 'l3', name: 'Chole Roti', emoji: '🍛', calories: 390, cost: 28, prepTime: '35 min', type: 'lunch', tags: ['Classic', 'Spicy'], region: 'North India', ingredients: ['Chickpeas', 'Wheat flour', 'Onion', 'Tomato', 'Chole masala', 'Tea bag'], steps: ['Soak and cook chickpeas', 'Make spicy gravy', 'Simmer chole in gravy', 'Serve with fresh roti'] },
  { id: 'l4', name: 'Jeera Rice + Kadhi', emoji: '🍚', calories: 350, cost: 22, prepTime: '30 min', type: 'lunch', tags: ['Comfort', 'Light'], region: 'Gujarat', ingredients: ['Rice', 'Cumin', 'Ghee', 'Besan', 'Curd', 'Curry leaves', 'Turmeric'], steps: ['Cook rice with cumin and ghee', 'Make besan-curd kadhi', 'Temper with curry leaves', 'Serve together'] },
  { id: 'l5', name: 'Sambar Rice', emoji: '🍲', calories: 330, cost: 25, prepTime: '35 min', type: 'lunch', tags: ['South Indian', 'Healthy'], region: 'Tamil Nadu', ingredients: ['Rice', 'Toor dal', 'Drumstick', 'Brinjal', 'Sambar powder', 'Tamarind'], steps: ['Cook rice and dal', 'Boil veggies with tamarind', 'Add sambar powder', 'Mix dal and serve'] },
  { id: 'l6', name: 'Egg Curry + Rice', emoji: '🥚', calories: 380, cost: 28, prepTime: '25 min', type: 'lunch', tags: ['Protein', 'Spicy'], region: 'Bengal', ingredients: ['Eggs', 'Rice', 'Onion', 'Tomato', 'Ginger-garlic', 'Garam masala', 'Turmeric'], steps: ['Boil and halve eggs', 'Make onion-tomato gravy', 'Add spices and eggs', 'Simmer and serve with rice'] },
  { id: 'l7', name: 'Aloo Gobi + Roti', emoji: '🥦', calories: 320, cost: 22, prepTime: '30 min', type: 'lunch', tags: ['Veg', 'Classic'], region: 'North India', ingredients: ['Potato', 'Cauliflower', 'Wheat flour', 'Onion', 'Tomato', 'Turmeric', 'Cumin'], steps: ['Cut veggies', 'Cook with spices', 'Make roti', 'Serve together'] },
  { id: 'l8', name: 'Pav Bhaji', emoji: '🍔', calories: 410, cost: 30, prepTime: '30 min', type: 'lunch', tags: ['Street Food', 'Fun'], region: 'Mumbai', ingredients: ['Mixed veggies', 'Pav bread', 'Butter', 'Pav bhaji masala', 'Onion', 'Lemon'], steps: ['Boil and mash veggies', 'Cook with masala and butter', 'Toast pav with butter', 'Garnish and serve'] },
  { id: 'l9', name: 'Veg Biryani', emoji: '🍚', calories: 430, cost: 35, prepTime: '45 min', type: 'lunch', tags: ['Special', 'Aromatic'], region: 'Hyderabad', ingredients: ['Basmati rice', 'Mixed veggies', 'Biryani masala', 'Saffron', 'Onion', 'Mint', 'Ghee'], steps: ['Soak rice', 'Fry onions golden', 'Layer rice and veggie masala', 'Dum cook for 20 mins'] },
  { id: 'l10', name: 'Palak Paneer + Roti', emoji: '🥬', calories: 370, cost: 35, prepTime: '30 min', type: 'lunch', tags: ['Healthy', 'Protein'], region: 'North India', ingredients: ['Spinach', 'Paneer', 'Onion', 'Garlic', 'Cream', 'Wheat flour'], steps: ['Blanch and puree spinach', 'Sauté onion and garlic', 'Add paneer cubes', 'Serve with roti'] },
  { id: 'l11', name: 'Matar Pulao', emoji: '🍚', calories: 320, cost: 20, prepTime: '25 min', type: 'lunch', tags: ['One-pot', 'Quick'], region: 'All India', ingredients: ['Rice', 'Green peas', 'Ghee', 'Bay leaf', 'Cumin', 'Onion'], steps: ['Sauté onion with whole spices', 'Add peas and rice', 'Cook with water', 'Serve with raita'] },
  { id: 'l12', name: 'Bhindi Masala + Roti', emoji: '🌿', calories: 290, cost: 22, prepTime: '25 min', type: 'lunch', tags: ['Dry Sabji', 'Veg'], region: 'North India', ingredients: ['Okra', 'Onion', 'Tomato', 'Turmeric', 'Red chili', 'Wheat flour'], steps: ['Slice bhindi', 'Fry till crispy', 'Add spices', 'Serve with roti'] },
  { id: 'l13', name: 'Lemon Rice', emoji: '🍋', calories: 280, cost: 15, prepTime: '15 min', type: 'lunch', tags: ['Quick', 'South Indian'], region: 'Andhra Pradesh', ingredients: ['Rice (leftover)', 'Lemon juice', 'Peanuts', 'Mustard', 'Curry leaves', 'Turmeric'], steps: ['Temper mustard and peanuts', 'Add turmeric and curry leaves', 'Mix with rice and lemon juice', 'Serve'] },
  { id: 'l14', name: 'Paneer Butter Masala + Naan', emoji: '🧈', calories: 470, cost: 40, prepTime: '35 min', type: 'lunch', tags: ['Rich', 'Special'], region: 'Punjab', ingredients: ['Paneer', 'Butter', 'Cream', 'Tomato', 'Cashews', 'Naan'], steps: ['Make cashew-tomato gravy', 'Add butter and cream', 'Add paneer cubes', 'Serve with naan'] },
  { id: 'l15', name: 'Varan Bhaat', emoji: '🍛', calories: 340, cost: 20, prepTime: '25 min', type: 'lunch', tags: ['Simple', 'Marathi'], region: 'Maharashtra', ingredients: ['Toor dal', 'Rice', 'Ghee', 'Salt', 'Lemon'], steps: ['Cook plain dal', 'Cook rice', 'Pour dal over rice', 'Top with ghee'] },
  { id: 'l16', name: 'Fish Curry + Rice', emoji: '🐟', calories: 390, cost: 45, prepTime: '30 min', type: 'lunch', tags: ['Non-Veg', 'Coastal'], region: 'Goa', ingredients: ['Fish', 'Coconut milk', 'Tamarind', 'Red chili', 'Rice', 'Kokum'], steps: ['Marinate fish', 'Make coconut gravy', 'Cook fish in gravy', 'Serve with rice'] },
  { id: 'l17', name: 'Kadai Paneer + Roti', emoji: '🧀', calories: 380, cost: 35, prepTime: '25 min', type: 'lunch', tags: ['Spicy', 'Rich'], region: 'North India', ingredients: ['Paneer', 'Capsicum', 'Onion', 'Tomato', 'Kadai masala', 'Wheat flour'], steps: ['Roast and grind spices', 'Sauté veggies', 'Add paneer', 'Serve with roti'] },
  { id: 'l18', name: 'Thali (Mini)', emoji: '🍽️', calories: 460, cost: 40, prepTime: '45 min', type: 'lunch', tags: ['Complete', 'Balanced'], region: 'Gujarat', ingredients: ['Rice', 'Dal', 'Sabji', 'Roti', 'Pickle', 'Papad', 'Sweet'], steps: ['Cook dal and sabji', 'Make roti and rice', 'Add pickle, papad', 'Arrange on plate'] },
  { id: 'l19', name: 'Curd Rice Bowl', emoji: '🥗', calories: 270, cost: 18, prepTime: '15 min', type: 'lunch', tags: ['Cooling', 'Light'], region: 'South India', ingredients: ['Rice', 'Curd', 'Pomegranate', 'Mustard', 'Curry leaves', 'Ginger'], steps: ['Mix rice with curd', 'Temper mustard, curry leaves', 'Top with pomegranate', 'Serve chilled'] },
  { id: 'l20', name: 'Chana Masala + Rice', emoji: '🫛', calories: 360, cost: 25, prepTime: '30 min', type: 'lunch', tags: ['Protein', 'Veg'], region: 'North India', ingredients: ['White chana', 'Rice', 'Onion', 'Tomato', 'Chana masala', 'Ginger-garlic'], steps: ['Soak and cook chana', 'Make spicy gravy', 'Simmer chana', 'Serve with rice'] },
  { id: 'l21', name: 'Mix Veg + Roti', emoji: '🥗', calories: 310, cost: 22, prepTime: '25 min', type: 'lunch', tags: ['Healthy', 'Veg'], region: 'All India', ingredients: ['Mixed vegetables', 'Onion', 'Tomato', 'Wheat flour', 'Cumin', 'Garam masala'], steps: ['Chop all veggies', 'Sauté with onion-tomato', 'Add spices and simmer', 'Serve with roti'] },
  { id: 'l22', name: 'Dal Khichdi', emoji: '🍲', calories: 320, cost: 18, prepTime: '25 min', type: 'lunch', tags: ['One-pot', 'Comfort'], region: 'All India', ingredients: ['Rice', 'Moong dal', 'Vegetables', 'Ghee', 'Cumin', 'Turmeric'], steps: ['Wash rice and dal', 'Pressure cook with veggies', 'Temper with ghee', 'Serve hot'] },

  // ===== DINNER (15 items) =====
  { id: 'd1', name: 'Khichdi', emoji: '🍲', calories: 280, cost: 18, prepTime: '25 min', type: 'dinner', tags: ['Light', 'Comfort'], region: 'All India', ingredients: ['Rice', 'Moong dal', 'Ghee', 'Cumin', 'Turmeric', 'Vegetables'], steps: ['Wash rice and dal', 'Pressure cook with veggies and spices', 'Temper with ghee and cumin', 'Serve hot'] },
  { id: 'd2', name: 'Egg Bhurji + Roti', emoji: '🥚', calories: 340, cost: 22, prepTime: '15 min', type: 'dinner', tags: ['Quick', 'Protein'], region: 'Street Food', ingredients: ['Eggs', 'Onion', 'Tomato', 'Green chili', 'Wheat flour', 'Oil'], steps: ['Scramble eggs with onion, tomato', 'Add spices', 'Make roti', 'Serve together'] },
  { id: 'd3', name: 'Maggi Masala', emoji: '🍜', calories: 260, cost: 15, prepTime: '10 min', type: 'dinner', tags: ['Quick', 'Comfort'], region: 'Hostel Special', ingredients: ['Maggi noodles', 'Vegetables', 'Maggi masala', 'Water'], steps: ['Boil water', 'Add veggies and masala', 'Add noodles', 'Cook for 2 minutes'] },
  { id: 'd4', name: 'Paneer Bhurji + Roti', emoji: '🧀', calories: 370, cost: 35, prepTime: '20 min', type: 'dinner', tags: ['Protein', 'Quick'], region: 'North India', ingredients: ['Paneer', 'Onion', 'Tomato', 'Green chili', 'Wheat flour', 'Spices'], steps: ['Crumble paneer', 'Sauté onion, tomato, spices', 'Add paneer and cook', 'Serve with roti'] },
  { id: 'd5', name: 'Daliya (Broken Wheat)', emoji: '🥣', calories: 230, cost: 15, prepTime: '20 min', type: 'dinner', tags: ['Healthy', 'Light'], region: 'North India', ingredients: ['Broken wheat', 'Onion', 'Peas', 'Carrot', 'Cumin', 'Ghee'], steps: ['Roast daliya', 'Sauté veggies', 'Add water and cook', 'Temper with ghee'] },
  { id: 'd6', name: 'Curd Rice', emoji: '🍚', calories: 250, cost: 12, prepTime: '10 min', type: 'dinner', tags: ['Cooling', 'Quick'], region: 'South India', ingredients: ['Rice (leftover)', 'Curd', 'Mustard seeds', 'Curry leaves', 'Green chili', 'Salt'], steps: ['Mix rice with curd', 'Temper mustard, curry leaves', 'Add salt and mix', 'Serve cool'] },
  { id: 'd7', name: 'Chapati + Dal Fry', emoji: '🍛', calories: 340, cost: 20, prepTime: '30 min', type: 'dinner', tags: ['Classic', 'Balanced'], region: 'All India', ingredients: ['Wheat flour', 'Toor dal', 'Onion', 'Tomato', 'Garlic', 'Red chili', 'Ghee'], steps: ['Cook dal', 'Make tadka with garlic, onion', 'Add to dal', 'Make chapati and serve'] },
  { id: 'd8', name: 'Masala Oats', emoji: '🥣', calories: 200, cost: 18, prepTime: '10 min', type: 'dinner', tags: ['Healthy', 'Quick'], region: 'Modern', ingredients: ['Oats', 'Onion', 'Tomato', 'Peas', 'Cumin', 'Turmeric'], steps: ['Sauté veggies', 'Add oats and water', 'Add spices', 'Cook 5 minutes'] },
  { id: 'd9', name: 'Tomato Soup + Toast', emoji: '🍅', calories: 180, cost: 15, prepTime: '15 min', type: 'dinner', tags: ['Light', 'Comfort'], region: 'Modern', ingredients: ['Tomatoes', 'Onion', 'Butter', 'Bread', 'Cream', 'Pepper'], steps: ['Cook tomatoes and onion', 'Blend smooth', 'Add butter and cream', 'Toast bread and serve'] },
  { id: 'd10', name: 'Aloo Tikki', emoji: '🥔', calories: 270, cost: 15, prepTime: '20 min', type: 'dinner', tags: ['Street Food', 'Filling'], region: 'North India', ingredients: ['Potato', 'Peas', 'Bread crumbs', 'Chaat masala', 'Green chutney', 'Oil'], steps: ['Boil and mash potatoes', 'Mix with peas and spices', 'Shape and shallow fry', 'Serve with chutney'] },
  { id: 'd11', name: 'Vegetable Soup', emoji: '🥕', calories: 130, cost: 12, prepTime: '20 min', type: 'dinner', tags: ['Healthy', 'Light'], region: 'All India', ingredients: ['Carrot', 'Beans', 'Corn', 'Onion', 'Pepper', 'Butter'], steps: ['Chop all veggies', 'Boil with seasoning', 'Add butter and pepper', 'Serve hot'] },
  { id: 'd12', name: 'Masala Dosa', emoji: '🥘', calories: 310, cost: 20, prepTime: '25 min', type: 'dinner', tags: ['South Indian', 'Filling'], region: 'Karnataka', ingredients: ['Dosa batter', 'Potato masala', 'Mustard', 'Onion', 'Coconut chutney'], steps: ['Make potato masala', 'Spread dosa batter', 'Add filling', 'Serve with chutney'] },
  { id: 'd13', name: 'Methi Thepla', emoji: '🫓', calories: 240, cost: 14, prepTime: '20 min', type: 'dinner', tags: ['Gujarati', 'Travel-friendly'], region: 'Gujarat', ingredients: ['Wheat flour', 'Fresh methi', 'Curd', 'Turmeric', 'Oil', 'Salt'], steps: ['Mix flour with methi and curd', 'Knead dough', 'Roll thin and cook', 'Serve with pickle'] },
  { id: 'd14', name: 'Poha Chivda (Dry)', emoji: '🍿', calories: 180, cost: 10, prepTime: '15 min', type: 'dinner', tags: ['Snack-dinner', 'Quick'], region: 'Maharashtra', ingredients: ['Thin poha', 'Peanuts', 'Curry leaves', 'Turmeric', 'Sugar', 'Salt'], steps: ['Roast poha', 'Fry peanuts separately', 'Mix with spices', 'Cool and serve'] },
  { id: 'd15', name: 'Chicken Curry + Rice', emoji: '🍗', calories: 430, cost: 50, prepTime: '40 min', type: 'dinner', tags: ['Non-Veg', 'Heavy'], region: 'All India', ingredients: ['Chicken', 'Onion', 'Tomato', 'Ginger-garlic', 'Garam masala', 'Rice'], steps: ['Marinate chicken', 'Make onion-tomato gravy', 'Cook chicken in gravy', 'Serve with rice'] },
  { id: 'd16', name: 'Veg Pulao', emoji: '🍚', calories: 320, cost: 22, prepTime: '25 min', type: 'dinner', tags: ['One-pot', 'Aromatic'], region: 'All India', ingredients: ['Basmati rice', 'Mixed veggies', 'Whole spices', 'Ghee', 'Onion', 'Mint'], steps: ['Sauté whole spices', 'Add veggies and rice', 'Cook with water', 'Garnish with mint'] },
  { id: 'd17', name: 'Mushroom Masala + Roti', emoji: '🍄', calories: 290, cost: 32, prepTime: '25 min', type: 'dinner', tags: ['Protein', 'Veg'], region: 'North India', ingredients: ['Mushrooms', 'Onion', 'Tomato', 'Ginger-garlic', 'Garam masala', 'Wheat flour'], steps: ['Slice mushrooms', 'Make onion-tomato gravy', 'Add mushrooms', 'Serve with roti'] },
  { id: 'd18', name: 'Stuffed Capsicum', emoji: '🫑', calories: 240, cost: 24, prepTime: '30 min', type: 'dinner', tags: ['Healthy', 'Filling'], region: 'North India', ingredients: ['Capsicum', 'Potato', 'Paneer', 'Onion', 'Garam masala', 'Oil'], steps: ['Hollow out capsicum', 'Make potato-paneer filling', 'Stuff and pan cook', 'Serve hot'] },
  { id: 'd19', name: 'Mixed Veg Soup Bowl', emoji: '🥣', calories: 160, cost: 18, prepTime: '20 min', type: 'dinner', tags: ['Light', 'Healthy'], region: 'Modern', ingredients: ['Mixed veggies', 'Sweet corn', 'Pepper', 'Cornflour', 'Salt', 'Coriander'], steps: ['Chop and boil veggies', 'Add corn and seasoning', 'Thicken with cornflour', 'Serve hot'] },
  { id: 'd20', name: 'Grilled Paneer Tikka', emoji: '🔥', calories: 280, cost: 38, prepTime: '25 min', type: 'dinner', tags: ['High-protein', 'Tandoor'], region: 'Punjab', ingredients: ['Paneer', 'Curd', 'Capsicum', 'Onion', 'Tandoori masala', 'Lemon'], steps: ['Marinate paneer in curd-masala', 'Skewer with veggies', 'Grill till charred', 'Serve with mint chutney'] },

  // ===== SNACKS (7 items) =====
  { id: 's1', name: 'Samosa', emoji: '🔺', calories: 250, cost: 10, prepTime: '30 min', type: 'snack', tags: ['Street Food', 'Classic'], region: 'All India', ingredients: ['Maida', 'Potato', 'Peas', 'Cumin', 'Garam masala', 'Oil'], steps: ['Make dough', 'Prepare potato filling', 'Shape samosas', 'Deep fry golden'] },
  { id: 's2', name: 'Bhel Puri', emoji: '🥗', calories: 180, cost: 10, prepTime: '10 min', type: 'snack', tags: ['Chaat', 'Quick'], region: 'Mumbai', ingredients: ['Puffed rice', 'Sev', 'Onion', 'Tomato', 'Tamarind chutney', 'Green chutney'], steps: ['Mix puffed rice with veggies', 'Add chutneys', 'Top with sev', 'Serve immediately'] },
  { id: 's3', name: 'Vada Pav', emoji: '🍔', calories: 300, cost: 12, prepTime: '25 min', type: 'snack', tags: ['Mumbai', 'Spicy'], region: 'Maharashtra', ingredients: ['Potato', 'Besan', 'Garlic chutney', 'Pav', 'Green chili', 'Oil'], steps: ['Make batata vada', 'Dip in besan batter', 'Deep fry', 'Serve in pav with chutney'] },
  { id: 's4', name: 'Masala Chai + Biscuit', emoji: '☕', calories: 120, cost: 8, prepTime: '5 min', type: 'snack', tags: ['Classic', 'Daily'], region: 'All India', ingredients: ['Tea leaves', 'Milk', 'Sugar', 'Ginger', 'Cardamom', 'Biscuits'], steps: ['Boil water with ginger', 'Add tea leaves', 'Add milk and sugar', 'Strain and serve'] },
  { id: 's5', name: 'Banana Shake', emoji: '🍌', calories: 200, cost: 15, prepTime: '5 min', type: 'snack', tags: ['Healthy', 'Quick'], region: 'All India', ingredients: ['Banana', 'Milk', 'Sugar', 'Cardamom'], steps: ['Peel and chop banana', 'Blend with milk', 'Add sugar and cardamom', 'Serve chilled'] },
  { id: 's6', name: 'Pani Puri', emoji: '💧', calories: 150, cost: 10, prepTime: '20 min', type: 'snack', tags: ['Chaat', 'Fun'], region: 'All India', ingredients: ['Puri', 'Potato', 'Chickpeas', 'Mint water', 'Tamarind water', 'Spices'], steps: ['Make mint and tamarind water', 'Boil potato and chickpeas', 'Crack puri', 'Fill and eat!'] },
  { id: 's7', name: 'Dhokla', emoji: '🟡', calories: 170, cost: 12, prepTime: '25 min', type: 'snack', tags: ['Gujarati', 'Steamed'], region: 'Gujarat', ingredients: ['Besan', 'Curd', 'Eno', 'Mustard', 'Curry leaves', 'Sugar'], steps: ['Mix besan batter', 'Add eno and steam', 'Make tadka', 'Pour over dhokla'] },
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
  { id: '5', name: 'Kidney Beans', quantity: '500g', price: 65, checked: false, category: 'Pulses' },
  { id: '6', name: 'Onions', quantity: '1 kg', price: 30, checked: false, category: 'Vegetables' },
  { id: '7', name: 'Tomatoes', quantity: '500g', price: 25, checked: false, category: 'Vegetables' },
  { id: '8', name: 'Potatoes', quantity: '1 kg', price: 30, checked: false, category: 'Vegetables' },
  { id: '9', name: 'Cauliflower', quantity: '1 pc', price: 30, checked: false, category: 'Vegetables' },
  { id: '10', name: 'Green Chili', quantity: '100g', price: 10, checked: false, category: 'Vegetables' },
  { id: '11', name: 'Spinach', quantity: '1 bunch', price: 15, checked: false, category: 'Vegetables' },
  { id: '12', name: 'Capsicum', quantity: '250g', price: 20, checked: false, category: 'Vegetables' },
  { id: '13', name: 'Carrots', quantity: '500g', price: 25, checked: false, category: 'Vegetables' },
  { id: '14', name: 'Okra (Bhindi)', quantity: '250g', price: 20, checked: false, category: 'Vegetables' },
  { id: '15', name: 'Green Peas', quantity: '250g', price: 25, checked: false, category: 'Vegetables' },
  { id: '16', name: 'Drumstick', quantity: '2 pcs', price: 15, checked: false, category: 'Vegetables' },
  { id: '17', name: 'Eggs (12)', quantity: '12 pcs', price: 84, checked: false, category: 'Dairy & Eggs' },
  { id: '18', name: 'Curd', quantity: '500g', price: 30, checked: false, category: 'Dairy & Eggs' },
  { id: '19', name: 'Paneer', quantity: '200g', price: 60, checked: false, category: 'Dairy & Eggs' },
  { id: '20', name: 'Milk', quantity: '1L', price: 28, checked: false, category: 'Dairy & Eggs' },
  { id: '21', name: 'Butter', quantity: '100g', price: 50, checked: false, category: 'Dairy & Eggs' },
  { id: '22', name: 'Wheat Flour', quantity: '1 kg', price: 45, checked: false, category: 'Grains' },
  { id: '23', name: 'Semolina (Rava)', quantity: '500g', price: 35, checked: false, category: 'Grains' },
  { id: '24', name: 'Flattened Rice (Poha)', quantity: '500g', price: 35, checked: false, category: 'Grains' },
  { id: '25', name: 'Oats', quantity: '500g', price: 50, checked: false, category: 'Grains' },
  { id: '26', name: 'Besan (Gram Flour)', quantity: '500g', price: 40, checked: false, category: 'Grains' },
  { id: '27', name: 'Ragi Flour', quantity: '500g', price: 45, checked: false, category: 'Grains' },
  { id: '28', name: 'Broken Wheat (Daliya)', quantity: '500g', price: 35, checked: false, category: 'Grains' },
  { id: '29', name: 'Maggi (4-pack)', quantity: '4 pcs', price: 56, checked: false, category: 'Instant' },
  { id: '30', name: 'Cooking Oil', quantity: '1L', price: 130, checked: false, category: 'Essentials' },
  { id: '31', name: 'Ghee', quantity: '200ml', price: 90, checked: false, category: 'Essentials' },
  { id: '32', name: 'Peanuts', quantity: '250g', price: 40, checked: false, category: 'Dry Fruits' },
  { id: '33', name: 'Cashews', quantity: '100g', price: 80, checked: false, category: 'Dry Fruits' },
  { id: '34', name: 'Bread', quantity: '1 pack', price: 35, checked: false, category: 'Bakery' },
  { id: '35', name: 'Pav', quantity: '8 pcs', price: 20, checked: false, category: 'Bakery' },
  { id: '36', name: 'Ginger-Garlic Paste', quantity: '200g', price: 35, checked: false, category: 'Essentials' },
  { id: '37', name: 'Spice Box Refill', quantity: '1 set', price: 120, checked: false, category: 'Essentials' },
  { id: '38', name: 'Tea Leaves', quantity: '250g', price: 60, checked: false, category: 'Essentials' },
  { id: '39', name: 'Sugar', quantity: '1 kg', price: 45, checked: false, category: 'Essentials' },
  { id: '40', name: 'Salt', quantity: '1 kg', price: 20, checked: false, category: 'Essentials' },
  { id: '41', name: 'Tamarind', quantity: '100g', price: 15, checked: false, category: 'Essentials' },
  { id: '42', name: 'Coconut (Fresh)', quantity: '1 pc', price: 25, checked: false, category: 'Essentials' },
  { id: '43', name: 'Lemon', quantity: '6 pcs', price: 15, checked: false, category: 'Vegetables' },
  { id: '44', name: 'Coriander Bunch', quantity: '1 bunch', price: 10, checked: false, category: 'Vegetables' },
  { id: '45', name: 'Mint Leaves', quantity: '1 bunch', price: 10, checked: false, category: 'Vegetables' },
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
