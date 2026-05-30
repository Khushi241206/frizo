import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Users, ChefHat, ExternalLink, X } from 'lucide-react';
import data from '@/data/recipes.json';

type Recipe = (typeof data.recipes)[number];

const Recipes = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string>('All');
  const [category, setCategory] = useState<string>('All');
  const [selected, setSelected] = useState<Recipe | null>(null);

  const regions = ['All', ...data.meta.regions];
  const categories = ['All', ...data.meta.categories];

  const filtered = useMemo(() => {
    return data.recipes.filter(r => {
      if (region !== 'All' && r.region !== region) return false;
      if (category !== 'All' && r.category !== category) return false;
      if (query && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, region, category]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4 space-y-3">
        <div>
          <h1 className="font-display text-2xl text-foreground">Recipes 🍳</h1>
          <p className="text-xs text-muted-foreground">{data.recipes.length} authentic Indian dishes</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search dish..."
            className="w-full bg-muted rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                region === r ? 'gradient-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                category === c ? 'bg-primary/10 text-primary border border-primary' : 'bg-muted text-muted-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {filtered.map(r => (
          <motion.button
            key={r.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(r)}
            className="bg-card rounded-2xl p-3 text-left shadow-card"
          >
            <div className="text-4xl mb-2">{r.emoji}</div>
            <h3 className="font-bold text-sm text-foreground line-clamp-1">{r.name}</h3>
            <p className="text-[10px] text-muted-foreground mb-1">{r.region} · {r.category}</p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><Clock size={10} />{r.totalTime}m</span>
              <span>·</span>
              <span>{r.nutrition.calories} kcal</span>
            </div>
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-sm text-muted-foreground py-12">No recipes match.</p>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-5xl mb-1">{selected.emoji}</div>
                <h2 className="font-display text-2xl text-foreground">{selected.name}</h2>
                <p className="text-xs text-muted-foreground">{selected.region} · {selected.category} · {selected.diet}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-full bg-muted">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-foreground mb-4">{selected.description}</p>

            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
              <div className="bg-muted rounded-xl p-2">
                <Clock size={14} className="mx-auto text-primary" />
                <p className="text-[10px] text-muted-foreground mt-1">Total</p>
                <p className="text-xs font-bold">{selected.totalTime}m</p>
              </div>
              <div className="bg-muted rounded-xl p-2">
                <Users size={14} className="mx-auto text-primary" />
                <p className="text-[10px] text-muted-foreground mt-1">Serves</p>
                <p className="text-xs font-bold">{selected.servings}</p>
              </div>
              <div className="bg-muted rounded-xl p-2">
                <ChefHat size={14} className="mx-auto text-primary" />
                <p className="text-[10px] text-muted-foreground mt-1">Level</p>
                <p className="text-xs font-bold">{selected.difficulty}</p>
              </div>
              <div className="bg-muted rounded-xl p-2">
                <p className="text-[10px] text-muted-foreground mt-1">Kcal</p>
                <p className="text-xs font-bold">{selected.nutrition.calories}</p>
                <p className="text-[9px] text-muted-foreground">P {selected.nutrition.protein}g</p>
              </div>
            </div>

            <a
              href={selected.imageSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs text-primary font-semibold mb-4"
            >
              <ExternalLink size={12} /> View photos on Unsplash
            </a>

            <h3 className="font-bold text-sm mb-2">Ingredients</h3>
            <ul className="text-xs space-y-1 mb-4">
              {selected.ingredients.map((i, idx) => (
                <li key={idx} className="flex justify-between border-b border-border py-1">
                  <span>{i.item}</span>
                  <span className="text-muted-foreground">{i.quantity}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-sm mb-2">Instructions</h3>
            <ol className="text-xs space-y-2 mb-4 list-decimal list-inside">
              {selected.instructions.map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>

            {selected.tips.length > 0 && (
              <>
                <h3 className="font-bold text-sm mb-2">💡 Tips</h3>
                <ul className="text-xs space-y-1 mb-4 list-disc list-inside text-muted-foreground">
                  {selected.tips.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </>
            )}

            {selected.variations.length > 0 && (
              <>
                <h3 className="font-bold text-sm mb-2">🔄 Variations</h3>
                <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                  {selected.variations.map((v, idx) => <li key={idx}>{v}</li>)}
                </ul>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
