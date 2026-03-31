import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Flame, TrendingDown, Clock, ChevronRight, Tag, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import frizoLogo from '@/assets/frizo-logo.png';
import { todayOffers } from '@/lib/offers';
import RecipeDetail from '@/components/RecipeDetail';
import type { Meal } from '@/lib/data';

const Home = () => {
  const { budget, spent, streak, mealPlan } = useApp();
  const navigate = useNavigate();
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const today = mealPlan[todayIndex];
  const saved = budget - spent;
  const budgetPercent = Math.min((spent / budget) * 100, 100);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <motion.div variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item} className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={frizoLogo} alt="Frizo" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-muted-foreground text-sm font-semibold">Good Morning! 👋</p>
              <h1 className="text-2xl text-foreground">Frizo</h1>
            </div>
          </div>
          <div className="flex items-center gap-1 gradient-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold">
            <Flame size={16} /> {streak} days
          </div>
        </motion.div>

        {/* Budget Card */}
        <motion.div variants={item} className="gradient-primary rounded-2xl p-5 mb-5 shadow-elevated">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-primary-foreground/70 text-sm font-semibold">Monthly Budget</p>
              <p className="text-3xl font-bold text-primary-foreground">₹{budget.toLocaleString()}</p>
            </div>
            <div className="bg-primary-foreground/20 rounded-xl px-3 py-1.5">
              <p className="text-primary-foreground text-xs font-semibold">Spent</p>
              <p className="text-primary-foreground font-bold">₹{spent.toLocaleString()}</p>
            </div>
          </div>
          <div className="w-full bg-primary-foreground/20 rounded-full h-3 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${budgetPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-primary-foreground h-3 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-primary-foreground/70 font-semibold">
            <span>{Math.round(budgetPercent)}% used</span>
            <span>₹{saved.toLocaleString()} left</span>
          </div>
        </motion.div>

        {/* Savings Badge */}
        {saved > 0 && (
          <motion.div variants={item} className="bg-success/10 border border-success/20 rounded-2xl p-4 mb-5 flex items-center gap-3">
            <TrendingDown className="text-success" size={24} />
            <div>
              <p className="font-bold text-foreground">You saved ₹{saved.toLocaleString()} 🎉</p>
              <p className="text-sm text-muted-foreground">Keep going! You're doing great!</p>
            </div>
          </motion.div>
        )}

        {/* Today's Offers */}
        <motion.div variants={item}>
          <h2 className="text-lg text-foreground mb-3 flex items-center gap-2">
            <Tag size={18} className="text-primary" /> Today's Offers
          </h2>
        </motion.div>

        <motion.div variants={item} className="flex gap-3 overflow-x-auto pb-3 mb-5 scrollbar-hide">
          {todayOffers.map(offer => (
            <div
              key={offer.id}
              onClick={() => offer.meals.length === 1 && setSelectedMeal(offer.meals[0])}
              className="flex-shrink-0 w-56 bg-card rounded-2xl shadow-card p-4 cursor-pointer hover:shadow-elevated transition-shadow border border-border"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-3xl">{offer.emoji}</span>
                <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {offer.badge}
                </span>
              </div>
              <p className="font-bold text-foreground text-sm leading-tight mb-1">{offer.title}</p>
              <p className="text-xs text-muted-foreground mb-2">{offer.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">₹{offer.originalPrice}</span>
                <span className="text-sm font-bold text-primary">₹{offer.offerPrice}</span>
                <span className="bg-success/10 text-success text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {offer.discount}% OFF
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{offer.validTill}</p>
            </div>
          ))}
        </motion.div>

        {/* Today's Meals */}
        <motion.div variants={item}>
          <h2 className="text-lg text-foreground mb-3 flex items-center gap-2">
            Today's Meals <span className="text-sm font-normal text-muted-foreground">({today.day})</span>
          </h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 mb-6">
          {[
            { label: 'Breakfast', meal: today.breakfast, time: '8:00 AM' },
            { label: 'Lunch', meal: today.lunch, time: '1:00 PM' },
            { label: 'Dinner', meal: today.dinner, time: '8:00 PM' },
          ].map(({ label, meal, time }) => (
            <motion.div
              key={label}
              variants={item}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMeal(meal)}
              className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4 cursor-pointer hover:shadow-elevated transition-shadow"
            >
              <span className="text-3xl">{meal.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-foreground">{meal.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={12} /> {time} · ₹{meal.cost} · {meal.calories} cal
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/plan')}
            className="bg-secondary rounded-2xl p-4 text-left hover:shadow-card transition-shadow"
          >
            <span className="text-2xl mb-2 block">🤖</span>
            <p className="font-bold text-secondary-foreground text-sm flex items-center gap-1">
              <Sparkles size={14} /> AI Meal Plan
            </p>
            <p className="text-xs text-muted-foreground">Smart weekly meals</p>
          </button>
          <button
            onClick={() => navigate('/groceries')}
            className="bg-secondary rounded-2xl p-4 text-left hover:shadow-card transition-shadow"
          >
            <span className="text-2xl mb-2 block">🛒</span>
            <p className="font-bold text-secondary-foreground text-sm">Grocery List</p>
            <p className="text-xs text-muted-foreground">Auto-generated</p>
          </button>
        </motion.div>
      </motion.div>

      <RecipeDetail meal={selectedMeal} open={!!selectedMeal} onClose={() => setSelectedMeal(null)} />
    </div>
  );
};

export default Home;
