import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, Flame, IndianRupee, MapPin } from 'lucide-react';
import type { Meal } from '@/lib/data';

interface RecipeDetailProps {
  meal: Meal | null;
  open: boolean;
  onClose: () => void;
}

const RecipeDetail = ({ meal, open, onClose }: RecipeDetailProps) => {
  if (!meal) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[85vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-5xl">{meal.emoji}</span>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">{meal.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-1 text-muted-foreground text-sm">
                {meal.region && <><MapPin size={12} /> {meal.region}</>}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="bg-secondary rounded-xl p-3 text-center">
            <Clock size={16} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-bold text-foreground">{meal.prepTime}</p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <IndianRupee size={16} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-bold text-foreground">₹{meal.cost}</p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <Flame size={16} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-bold text-foreground">{meal.calories} cal</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {meal.tags.map(tag => (
            <span key={tag} className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <h3 className="font-bold text-foreground text-sm mb-2">🧂 Ingredients</h3>
          <div className="bg-secondary rounded-xl p-3">
            <ul className="space-y-1.5">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="text-sm text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div>
          <h3 className="font-bold text-foreground text-sm mb-2">👩‍🍳 How to Cook</h3>
          <ol className="space-y-3">
            {meal.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
