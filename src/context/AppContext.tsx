import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GroceryItem, groceryItems as defaultGroceryItems, defaultBudget } from '@/lib/data';
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
  loading: boolean;
  setOnboarded: (v: boolean) => void;
  setBudget: (v: number) => void;
  setSpent: (v: number) => void;
  setPreference: (v: string) => void;
  toggleGroceryItem: (id: string) => void;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setOnboarded] = useState(false);
  const [budget, setBudget] = useState(defaultBudget);
  const [spent, setSpent] = useState(1240);
  const [preference, setPreference] = useState('veg');
  const [streak] = useState(5);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(defaultGroceryItems);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Load profile data
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

  const signOut = async () => {
    await supabase.auth.signOut();
    setOnboarded(false);
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      user, isOnboarded, budget, spent, preference, streak, groceryList, loading,
      setOnboarded, setBudget, setSpent, setPreference, toggleGroceryItem, signOut,
    }}>
      {children}
    </AppContext.Provider>
  );
};
