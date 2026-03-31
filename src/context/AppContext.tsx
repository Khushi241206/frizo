import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GroceryItem, groceryItems as defaultGroceryItems, defaultBudget } from '@/lib/data';

interface AppState {
  isOnboarded: boolean;
  budget: number;
  spent: number;
  preference: string;
  streak: number;
  groceryList: GroceryItem[];
  setOnboarded: (v: boolean) => void;
  setBudget: (v: number) => void;
  setSpent: (v: number) => void;
  setPreference: (v: string) => void;
  toggleGroceryItem: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isOnboarded, setOnboarded] = useState(false);
  const [budget, setBudget] = useState(defaultBudget);
  const [spent, setSpent] = useState(1240);
  const [preference, setPreference] = useState('veg');
  const [streak] = useState(5);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(defaultGroceryItems);

  const toggleGroceryItem = (id: string) => {
    setGroceryList(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <AppContext.Provider value={{
      isOnboarded, budget, spent, preference, streak, groceryList,
      setOnboarded, setBudget, setSpent, setPreference, toggleGroceryItem,
    }}>
      {children}
    </AppContext.Provider>
  );
};
