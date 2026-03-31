import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { User, Flame, TrendingDown, Target, IndianRupee, UtensilsCrossed, Heart, LogOut, MapPin } from 'lucide-react';

const Profile = () => {
  const { budget, spent, streak, preference, signOut } = useApp();
  const saved = budget - spent;

  const prefLabels: Record<string, string> = {
    veg: 'Vegetarian 🥬',
    nonveg: 'Non-Vegetarian 🍗',
    egg: 'Eggetarian 🥚',
    vegan: 'Vegan 🌱',
    jain: 'Jain 🙏',
  };

  const stats = [
    { icon: Target, label: 'Budget', value: `₹${budget.toLocaleString()}`, color: 'text-primary' },
    { icon: IndianRupee, label: 'Spent', value: `₹${spent.toLocaleString()}`, color: 'text-foreground' },
    { icon: TrendingDown, label: 'Saved', value: `₹${saved.toLocaleString()}`, color: 'text-success' },
    { icon: Flame, label: 'Streak', value: `${streak} days`, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="text-primary-foreground" size={32} />
        </div>
        <h1 className="text-2xl text-foreground">Student Chef 👨‍🍳</h1>
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
          <Heart size={12} className="text-primary" />
          {prefLabels[preference] || preference}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="gradient-primary rounded-2xl p-6 mb-6 text-center shadow-elevated"
      >
        <p className="text-primary-foreground/70 text-sm font-semibold mb-1">Total Saved This Month</p>
        <p className="text-4xl font-bold text-primary-foreground">₹{saved.toLocaleString()}</p>
        <p className="text-primary-foreground/70 text-sm mt-1">🎉 Amazing work!</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="bg-card rounded-2xl p-4 shadow-card"
          >
            <Icon size={20} className={color} />
            <p className="text-xs text-muted-foreground mt-2">{label}</p>
            <p className="font-bold text-foreground">{value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg text-foreground mb-3 flex items-center gap-2">
          <UtensilsCrossed size={18} className="text-primary" /> Achievements
        </h2>
        <div className="space-y-2 mb-6">
          {[
            { emoji: '🔥', title: '5 Day Streak!', desc: 'Planned meals for 5 days straight' },
            { emoji: '💰', title: 'Budget Pro', desc: 'Stayed under budget this week' },
            { emoji: '🥗', title: 'Healthy Eater', desc: 'Logged 10+ balanced meals' },
          ].map(ach => (
            <div key={ach.title} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3">
              <span className="text-2xl">{ach.emoji}</span>
              <div>
                <p className="font-bold text-sm text-foreground">{ach.title}</p>
                <p className="text-xs text-muted-foreground">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <button
        onClick={signOut}
        className="w-full bg-destructive/10 text-destructive font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default Profile;
