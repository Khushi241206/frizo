import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { meals, Meal } from '@/lib/data';
import { Clock, Flame, IndianRupee, ChevronDown, ChevronUp, Sparkles, RefreshCw, ArrowRightLeft, Loader2 } from 'lucide-react';
import RecipeDetail from '@/components/RecipeDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const MealCard = ({ meal, label, onTap, onSwap }: { meal: Meal; label: string; onTap: () => void; onSwap: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center">
        <button onClick={onTap} className="flex-1 p-4 flex items-center gap-3 text-left">
          <span className="text-3xl">{meal.emoji}</span>
          <div className="flex-1">
            <p className="text-xs text-primary font-bold uppercase">{label}</p>
            <p className="font-bold text-foreground">{meal.name}</p>
            <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-0.5"><Clock size={10} />{meal.prepTime}</span>
              <span className="flex items-center gap-0.5"><IndianRupee size={10} />{meal.cost}</span>
              <span className="flex items-center gap-0.5"><Flame size={10} />{meal.calories} cal</span>
            </div>
          </div>
        </button>
        <div className="flex gap-1 pr-2">
          <button onClick={onSwap} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <ArrowRightLeft size={14} className="text-muted-foreground" />
          </button>
          <button onClick={() => setOpen(!open)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            {open ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4">
            <div className="flex gap-1 mb-3 flex-wrap">
              {meal.tags.map(tag => (
                <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
            <p className="text-xs font-bold text-foreground mb-1">Ingredients:</p>
            <p className="text-xs text-muted-foreground mb-3">{meal.ingredients.join(', ')}</p>
            <p className="text-xs font-bold text-foreground mb-1">Steps:</p>
            <ol className="text-xs text-muted-foreground space-y-1">
              {meal.steps.map((s, i) => <li key={i}>{i + 1}. {s}</li>)}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SwapDialog = ({ open, onClose, slot, onSelect }: { open: boolean; onClose: () => void; slot: string; onSelect: (m: Meal) => void }) => {
  const type = slot === 'breakfast' ? 'breakfast' : slot === 'lunch' ? 'lunch' : 'dinner';
  const options = meals.filter(m => m.type === type);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Swap {slot}</DialogTitle>
          <DialogDescription>Pick a new {slot} meal</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {options.map(m => (
            <button key={m.id} onClick={() => { onSelect(m); onClose(); }}
              className="w-full bg-secondary rounded-xl p-3 flex items-center gap-3 text-left hover:bg-secondary/80 transition-colors">
              <span className="text-2xl">{m.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">₹{m.cost} · {m.calories} cal · {m.prepTime}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MealPlan = () => {
  const { mealPlan, generateAIMealPlan, aiLoading, swapMeal, generateGroceryFromPlan } = useApp();
  const [activeDay, setActiveDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const [swapSlot, setSwapSlot] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');

  const dayPlan = mealPlan[activeDay];
  const dayTotal = dayPlan.breakfast.cost + dayPlan.lunch.cost + dayPlan.dinner.cost;
  const weeklyTotal = mealPlan.reduce((s, d) => s + d.breakfast.cost + d.lunch.cost + d.dinner.cost, 0);

  const handleSwap = (slot: 'breakfast' | 'lunch' | 'dinner') => {
    setSwapSlot(slot);
    setSwapOpen(true);
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h1 className="text-2xl text-foreground">Meal Plan 📅</h1>
          <p className="text-sm text-muted-foreground mb-4">AI-powered, customizable</p>
        </div>
        <button
          onClick={generateAIMealPlan}
          disabled={aiLoading}
          className="gradient-primary text-primary-foreground px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-card disabled:opacity-60"
        >
          {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {aiLoading ? 'Generating...' : 'AI Generate'}
        </button>
      </div>

      {/* Weekly total */}
      <div className="bg-primary/10 rounded-xl p-3 mb-4 flex justify-between items-center">
        <span className="text-sm font-bold text-foreground">Weekly Total</span>
        <span className="font-bold text-primary">₹{weeklyTotal}/week</span>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {mealPlan.map((dp, i) => (
          <button
            key={dp.day}
            onClick={() => setActiveDay(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              i === activeDay
                ? 'gradient-primary text-primary-foreground shadow-card'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {dp.day.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Day Summary */}
      <div className="bg-secondary rounded-2xl p-3 mb-4 flex justify-between items-center">
        <span className="font-bold text-secondary-foreground">{dayPlan.day}</span>
        <span className="text-sm font-bold text-primary">₹{dayTotal}/day</span>
      </div>

      {/* Meals */}
      <motion.div key={activeDay} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 mb-4">
        <MealCard meal={dayPlan.breakfast} label="Breakfast" onTap={() => setSelectedMeal(dayPlan.breakfast)} onSwap={() => handleSwap('breakfast')} />
        <MealCard meal={dayPlan.lunch} label="Lunch" onTap={() => setSelectedMeal(dayPlan.lunch)} onSwap={() => handleSwap('lunch')} />
        <MealCard meal={dayPlan.dinner} label="Dinner" onTap={() => setSelectedMeal(dayPlan.dinner)} onSwap={() => handleSwap('dinner')} />
      </motion.div>

      {/* Generate Grocery Button */}
      <button
        onClick={generateGroceryFromPlan}
        className="w-full bg-secondary rounded-2xl p-4 text-center hover:shadow-card transition-shadow flex items-center justify-center gap-2"
      >
        <RefreshCw size={16} className="text-primary" />
        <span className="font-bold text-sm text-secondary-foreground">Update Grocery List from Plan</span>
      </button>

      <RecipeDetail meal={selectedMeal} open={!!selectedMeal} onClose={() => setSelectedMeal(null)} />
      <SwapDialog
        open={swapOpen}
        onClose={() => setSwapOpen(false)}
        slot={swapSlot}
        onSelect={(m) => swapMeal(activeDay, swapSlot, m)}
      />
    </div>
  );
};

export default MealPlan;
