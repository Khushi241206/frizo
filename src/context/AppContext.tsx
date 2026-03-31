import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Meal, meals, GroceryItem, defaultBudget, DayPlan } from '@/lib/data';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AppState {
  user: User | null;
  isOnboarded: boolean;
  budget: number;
  spent: number;
  preference: string;
  streak: number;
  groceryList: GroceryItem[];
  mealPlan: DayPlan[];
  loading: boolean;
  aiLoading: boolean;
  setOnboarded: (v: boolean) => void;
  setBudget: (v: number) => void;
  setSpent: (v: number) => void;
  setPreference: (v: string) => void;
  toggleGroceryItem: (id: string) => void;
  signOut: () => Promise<void>;
  setMealPlan: (plan: DayPlan[]) => void;
  generateAIMealPlan: () => Promise<void>;
  swapMeal: (dayIndex: number, slot: 'breakfast' | 'lunch' | 'dinner', newMeal: Meal) => void;
  generateGroceryFromPlan: () => void;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

// Generate grocery list from meal plan ingredients
function buildGroceryList(plan: DayPlan[]): GroceryItem[] {
  const ingredientMap = new Map<string, { count: number; category: string }>();

  const categoryMap: Record<string, string> = {
    'rice': 'Grains', 'flour': 'Grains', 'wheat': 'Grains', 'rava': 'Grains', 'semolina': 'Grains',
    'poha': 'Grains', 'oats': 'Grains', 'besan': 'Grains', 'ragi': 'Grains', 'daliya': 'Grains',
    'maida': 'Grains', 'bread': 'Bakery', 'pav': 'Bakery', 'naan': 'Bakery',
    'dal': 'Pulses', 'chickpeas': 'Pulses', 'kidney': 'Pulses', 'rajma': 'Pulses', 'moong': 'Pulses',
    'toor': 'Pulses', 'chana': 'Pulses', 'sprout': 'Pulses',
    'onion': 'Vegetables', 'tomato': 'Vegetables', 'potato': 'Vegetables', 'spinach': 'Vegetables',
    'capsicum': 'Vegetables', 'carrot': 'Vegetables', 'peas': 'Vegetables', 'okra': 'Vegetables',
    'bhindi': 'Vegetables', 'cauliflower': 'Vegetables', 'drumstick': 'Vegetables', 'brinjal': 'Vegetables',
    'chili': 'Vegetables', 'ginger': 'Vegetables', 'garlic': 'Vegetables', 'coriander': 'Vegetables',
    'curry leaves': 'Vegetables', 'mint': 'Vegetables', 'lemon': 'Vegetables', 'methi': 'Vegetables',
    'egg': 'Dairy & Eggs', 'curd': 'Dairy & Eggs', 'paneer': 'Dairy & Eggs', 'milk': 'Dairy & Eggs',
    'butter': 'Dairy & Eggs', 'cream': 'Dairy & Eggs', 'yogurt': 'Dairy & Eggs', 'cheese': 'Dairy & Eggs',
    'chicken': 'Meat & Fish', 'fish': 'Meat & Fish', 'mutton': 'Meat & Fish',
    'oil': 'Essentials', 'ghee': 'Essentials', 'salt': 'Essentials', 'sugar': 'Essentials',
    'tea': 'Essentials', 'spice': 'Essentials', 'masala': 'Essentials', 'turmeric': 'Essentials',
    'cumin': 'Essentials', 'mustard': 'Essentials', 'pepper': 'Essentials', 'tamarind': 'Essentials',
    'coconut': 'Essentials', 'saffron': 'Essentials',
    'peanut': 'Dry Fruits', 'cashew': 'Dry Fruits', 'almond': 'Dry Fruits',
    'maggi': 'Instant', 'noodle': 'Instant', 'biscuit': 'Instant',
    'banana': 'Fruits', 'mango': 'Fruits',
  };

  function getCategory(ingredient: string): string {
    const lower = ingredient.toLowerCase();
    for (const [key, cat] of Object.entries(categoryMap)) {
      if (lower.includes(key)) return cat;
    }
    return 'Others';
  }

  const priceMap: Record<string, number> = {
    'Grains': 40, 'Pulses': 65, 'Vegetables': 20, 'Dairy & Eggs': 45,
    'Essentials': 30, 'Dry Fruits': 50, 'Bakery': 25, 'Instant': 40,
    'Meat & Fish': 80, 'Fruits': 30, 'Others': 25,
  };

  for (const day of plan) {
    for (const slot of [day.breakfast, day.lunch, day.dinner]) {
      for (const ing of slot.ingredients) {
        const key = ing.toLowerCase().trim();
        const existing = ingredientMap.get(key);
        if (existing) {
          existing.count++;
        } else {
          ingredientMap.set(key, { count: 1, category: getCategory(ing) });
        }
      }
    }
  }

  const items: GroceryItem[] = [];
  let idx = 0;
  ingredientMap.forEach((val, name) => {
    items.push({
      id: `gen-${idx++}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      quantity: val.count > 3 ? '500g' : '250g',
      price: priceMap[val.category] || 25,
      checked: false,
      category: val.category,
    });
  });

  return items.sort((a, b) => a.category.localeCompare(b.category));
}

// Build default plan from static data
function getDefaultPlan(): DayPlan[] {
  const breakfasts = meals.filter(m => m.type === 'breakfast');
  const lunches = meals.filter(m => m.type === 'lunch');
  const dinners = meals.filter(m => m.type === 'dinner');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map((day, i) => ({
    day,
    breakfast: breakfasts[i % breakfasts.length],
    lunch: lunches[i % lunches.length],
    dinner: dinners[i % dinners.length],
  }));
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [isOnboarded, setOnboarded] = useState(false);
  const [budget, setBudget] = useState(defaultBudget);
  const [spent, setSpent] = useState(1240);
  const [preference, setPreference] = useState('veg');
  const [streak] = useState(5);
  const [mealPlan, setMealPlan] = useState<DayPlan[]>(getDefaultPlan());
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => buildGroceryList(getDefaultPlan()));

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(async () => {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          if (data) {
            if (data.location && data.food_preference) {
              setOnboarded(true);
            }
            if (data.monthly_budget) setBudget(data.monthly_budget);
            if (data.food_preference) setPreference(data.food_preference);
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleGroceryItem = (id: string) => {
    setGroceryList(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const generateGroceryFromPlan = () => {
    setGroceryList(buildGroceryList(mealPlan));
  };

  const swapMeal = (dayIndex: number, slot: 'breakfast' | 'lunch' | 'dinner', newMeal: Meal) => {
    setMealPlan(prev => prev.map((day, i) => {
      if (i !== dayIndex) return day;
      return { ...day, [slot]: newMeal };
    }));
  };

  const generateAIMealPlan = async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-meal-plan', {
        body: { budget, preference, location: 'All India' },
      });
      if (error) throw error;
      if (data?.days) {
        const aiPlan: DayPlan[] = data.days.map((d: any) => ({
          day: d.day,
          breakfast: { id: `ai-b-${d.day}`, type: 'breakfast' as const, ...d.breakfast },
          lunch: { id: `ai-l-${d.day}`, type: 'lunch' as const, ...d.lunch },
          dinner: { id: `ai-d-${d.day}`, type: 'dinner' as const, ...d.dinner },
        }));
        setMealPlan(aiPlan);
        setGroceryList(buildGroceryList(aiPlan));
      }
    } catch (err) {
      console.error('AI meal plan error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setOnboarded(false);
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      user, isOnboarded, budget, spent, preference, streak, groceryList, mealPlan,
      loading, aiLoading,
      setOnboarded, setBudget, setSpent, setPreference, toggleGroceryItem, signOut,
      setMealPlan, generateAIMealPlan, swapMeal, generateGroceryFromPlan,
    }}>
      {children}
    </AppContext.Provider>
  );
};
