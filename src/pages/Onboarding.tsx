import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { indianCities, foodPreferences, cuisinePreferences } from '@/lib/data';


const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [budgetInput, setBudgetInput] = useState('3000');
  const [location, setLocation] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [selectedPref, setSelectedPref] = useState('veg');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const { setOnboarded, setBudget, setPreference } = useApp();
  const navigate = useNavigate();

  const filteredCities = indianCities.filter(c =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const toggleCuisine = (id: string) => {
    if (id === 'all') {
      setSelectedCuisines(['all']);
      return;
    }
    setSelectedCuisines(prev => {
      const without = prev.filter(c => c !== 'all');
      return without.includes(id) ? without.filter(c => c !== id) : [...without, id];
    });
  };

  const handleFinish = async () => {
    const budget = Number(budgetInput) || 3000;
    setBudget(budget);
    setPreference(selectedPref);
    setOnboarded(true);
    localStorage.setItem('frizo_onboarded', 'true');
    localStorage.setItem('frizo_profile', JSON.stringify({
      location, food_preference: selectedPref, monthly_budget: budget, cuisines: selectedCuisines,
    }));

    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gradient-primary">
      <AnimatePresence mode="wait">
        {/* Step 0: Welcome */}
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

        {/* Step 1: Location */}
        {step === 1 && (
          <motion.div
            key="location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-3xl text-primary-foreground text-center mb-2">
              Where are you? 📍
            </h2>
            <p className="text-primary-foreground/70 text-center mb-6">
              We'll find local prices & recipes for you
            </p>
            <div className="bg-card rounded-2xl p-5 shadow-elevated">
              <div className="relative mb-3">
                <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your city..."
                  value={citySearch}
                  onChange={e => setCitySearch(e.target.value)}
                  className="w-full bg-muted rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredCities.map(city => (
                  <button
                    key={city}
                    onClick={() => { setLocation(city); setCitySearch(city); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                      location === city
                        ? 'gradient-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <MapPin size={14} /> {city}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!location}
              className="w-full bg-card text-primary font-bold py-4 rounded-2xl shadow-elevated mt-5 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Next <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 2: Food Preference */}
        {step === 2 && (
          <motion.div
            key="preference"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-3xl text-primary-foreground text-center mb-2">
              What do you eat? 🍽️
            </h2>
            <p className="text-primary-foreground/70 text-center mb-6">
              We'll customize meals just for you
            </p>
            <div className="space-y-2">
              {foodPreferences.map(pref => (
                <motion.button
                  key={pref.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPref(pref.id)}
                  className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-all ${
                    selectedPref === pref.id
                      ? 'bg-card shadow-elevated ring-2 ring-primary'
                      : 'bg-card/80 shadow-card'
                  }`}
                >
                  <span className="text-3xl">{pref.emoji}</span>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-card text-primary font-bold py-4 rounded-2xl shadow-elevated mt-5 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Next <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 3: Cuisine Preference */}
        {step === 3 && (
          <motion.div
            key="cuisine"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-3xl text-primary-foreground text-center mb-2">
              Fav Cuisine? 😋
            </h2>
            <p className="text-primary-foreground/70 text-center mb-6">
              Pick one or more
            </p>
            <div className="grid grid-cols-2 gap-2">
              {cuisinePreferences.map(c => (
                <motion.button
                  key={c.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleCuisine(c.id)}
                  className={`rounded-2xl p-4 text-center transition-all ${
                    selectedCuisines.includes(c.id)
                      ? 'bg-card shadow-elevated ring-2 ring-primary'
                      : 'bg-card/80 shadow-card'
                  }`}
                >
                  <span className="text-3xl block mb-1">{c.emoji}</span>
                  <p className="font-bold text-sm text-foreground">{c.label}</p>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              disabled={selectedCuisines.length === 0}
              className="w-full bg-card text-primary font-bold py-4 rounded-2xl shadow-elevated mt-5 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Next <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
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
            <p className="text-primary-foreground/70 text-center mb-6">
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
                {[1500, 2000, 3000, 5000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setBudgetInput(String(amt))}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
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
              onClick={handleFinish}
              className="w-full bg-card text-primary font-bold py-4 rounded-2xl shadow-elevated mt-5 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Start Cooking! 🚀
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mt-10">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-card' : i < step ? 'w-2 bg-primary-foreground/50' : 'w-2 bg-primary-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
