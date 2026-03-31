import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weeklyPlan, Meal } from '@/lib/data';
import { Clock, Flame, IndianRupee, ChevronDown, ChevronUp } from 'lucide-react';

const MealCard = ({ meal, label }: { meal: Meal; label: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-card rounded-2xl shadow-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center gap-3 text-left"
      >
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
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className="flex gap-1 mb-3">
              {meal.tags.map(tag => (
                <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
            <p className="text-xs font-bold text-foreground mb-1">Ingredients:</p>
            <p className="text-xs text-muted-foreground mb-3">{meal.ingredients.join(', ')}</p>
            <p className="text-xs font-bold text-foreground mb-1">Steps:</p>
            <ol className="text-xs text-muted-foreground space-y-1">
              {meal.steps.map((s, i) => (
                <li key={i}>{i + 1}. {s}</li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MealPlan = () => {
  const [activeDay, setActiveDay] = useState(
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  );

  const dayPlan = weeklyPlan[activeDay];
  const dayTotal = dayPlan.breakfast.cost + dayPlan.lunch.cost + dayPlan.dinner.cost;

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-2xl text-foreground mb-1">Weekly Plan 📅</h1>
      <p className="text-sm text-muted-foreground mb-4">7 days of tasty, budget meals</p>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {weeklyPlan.map((dp, i) => (
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
      <motion.div
        key={activeDay}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-3"
      >
        <MealCard meal={dayPlan.breakfast} label="Breakfast" />
        <MealCard meal={dayPlan.lunch} label="Lunch" />
        <MealCard meal={dayPlan.dinner} label="Dinner" />
      </motion.div>
    </div>
  );
};

export default MealPlan;
