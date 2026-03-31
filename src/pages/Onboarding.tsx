import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Leaf, Drumstick, Wheat } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [budgetInput, setBudgetInput] = useState('3000');
  const { setOnboarded, setBudget, setPreference } = useApp();
  const navigate = useNavigate();

  const preferences = [
    { id: 'veg', label: 'Vegetarian', emoji: '🥬', icon: Leaf },
    { id: 'nonveg', label: 'Non-Veg', emoji: '🍗', icon: Drumstick },
    { id: 'egg', label: 'Eggetarian', emoji: '🥚', icon: Wheat },
  ];

  const handleFinish = () => {
    setBudget(Number(budgetInput) || 3000);
    setOnboarded(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gradient-primary">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-7xl mb-6"
            >
              🍳
            </motion.div>
            <h1 className="text-4xl text-primary-foreground mb-3">Frizo</h1>
            <p className="text-primary-foreground/80 text-lg mb-8 font-semibold">
              Your Daily Meal Partner
            </p>
            <p className="text-primary-foreground/70 mb-10 max-w-xs mx-auto">
              Plan meals, save money, eat better. Made for students like you! 🎓
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-card text-primary font-bold px-8 py-4 rounded-2xl shadow-elevated flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
            >
              Let's Go <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-3xl text-primary-foreground text-center mb-2">
              Monthly Budget 💰
            </h2>
            <p className="text-primary-foreground/70 text-center mb-8">
              How much do you spend on food monthly?
            </p>
            <div className="bg-card rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-2 text-3xl font-bold text-foreground mb-4">
                <span className="text-primary">₹</span>
                <input
                  type="number"
                  value={budgetInput}
                  onChange={e => setBudgetInput(e.target.value)}
                  className="bg-transparent w-full outline-none text-foreground"
                  placeholder="3000"
                />
              </div>
              <div className="flex gap-2">
                {[2000, 3000, 5000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setBudgetInput(String(amt))}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                      budgetInput === String(amt)
                        ? 'gradient-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-card text-primary font-bold py-4 rounded-2xl shadow-elevated mt-6 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Next <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="preference"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-3xl text-primary-foreground text-center mb-2">
              Food Preference 🍽️
            </h2>
            <p className="text-primary-foreground/70 text-center mb-8">
              We'll customize meals just for you
            </p>
            <div className="space-y-3">
              {preferences.map(pref => (
                <motion.button
                  key={pref.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPreference(pref.id)}
                  className="w-full bg-card rounded-2xl p-5 shadow-card flex items-center gap-4 hover:shadow-elevated transition-shadow"
                >
                  <span className="text-3xl">{pref.emoji}</span>
                  <span className="font-bold text-lg text-foreground">{pref.label}</span>
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleFinish}
              className="w-full bg-card text-primary font-bold py-4 rounded-2xl shadow-elevated mt-6 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Start Cooking! 🚀
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 mt-10">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-card' : 'w-2 bg-primary-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
