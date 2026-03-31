import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { weeklyPlan } from '@/lib/data';
import { Flame, TrendingDown, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { budget, spent, streak } = useApp();
  const navigate = useNavigate();
  const today = weeklyPlan[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const saved = budget - spent;
  const budgetPercent = Math.min((spent / budget) * 100, 100);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <motion.div variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item} className="flex justify-between items-center mb-6">
          <div>
            <p className="text-muted-foreground text-sm font-semibold">Good Morning! 👋</p>
            <h1 className="text-2xl text-foreground">Frizo</h1>
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
              onClick={() => navigate('/plan')}
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
            <span className="text-2xl mb-2 block">📅</span>
            <p className="font-bold text-secondary-foreground text-sm">Weekly Plan</p>
            <p className="text-xs text-muted-foreground">7 days of meals</p>
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
    </div>
  );
};

export default Home;
