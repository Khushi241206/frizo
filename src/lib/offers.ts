import { meals } from './data';
import type { Meal } from './data';

export interface Offer {
  id: string;
  type: 'discount' | 'combo';
  title: string;
  description: string;
  emoji: string;
  originalPrice: number;
  offerPrice: number;
  discount: number;
  meals: Meal[];
  badge: string;
  validTill: string;
}

// Rotate offers daily based on the date
const getDailyOffers = (): Offer[] => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

  const breakfasts = meals.filter(m => m.type === 'breakfast');
  const lunches = meals.filter(m => m.type === 'lunch');
  const dinners = meals.filter(m => m.type === 'dinner');
  const snacks = meals.filter(m => m.type === 'snack');

  const b1 = breakfasts[dayOfYear % breakfasts.length];
  const b2 = breakfasts[(dayOfYear + 3) % breakfasts.length];
  const l1 = lunches[dayOfYear % lunches.length];
  const l2 = lunches[(dayOfYear + 2) % lunches.length];
  const d1 = dinners[dayOfYear % dinners.length];
  const s1 = snacks[dayOfYear % snacks.length];

  return [
    {
      id: 'disc-1',
      type: 'discount',
      title: `${b1.name} – Flat 30% Off!`,
      description: `Start your morning with ${b1.name} at a steal`,
      emoji: b1.emoji,
      originalPrice: b1.cost,
      offerPrice: Math.round(b1.cost * 0.7),
      discount: 30,
      meals: [b1],
      badge: '🔥 HOT DEAL',
      validTill: 'Today only',
    },
    {
      id: 'disc-2',
      type: 'discount',
      title: `${l1.name} – ₹${Math.round(l1.cost * 0.75)} only!`,
      description: 'Lunch special – limited time',
      emoji: l1.emoji,
      originalPrice: l1.cost,
      offerPrice: Math.round(l1.cost * 0.75),
      discount: 25,
      meals: [l1],
      badge: '⚡ FLASH SALE',
      validTill: 'Till 3 PM',
    },
    {
      id: 'combo-1',
      type: 'combo',
      title: 'Breakfast + Lunch Combo',
      description: `${b2.name} + ${l2.name} at 20% off`,
      emoji: '🎁',
      originalPrice: b2.cost + l2.cost,
      offerPrice: Math.round((b2.cost + l2.cost) * 0.8),
      discount: 20,
      meals: [b2, l2],
      badge: '🎉 COMBO',
      validTill: 'Today only',
    },
    {
      id: 'combo-2',
      type: 'combo',
      title: 'Full Day Meal Deal',
      description: `${b1.name} + ${l1.name} + ${d1.name} – Save big!`,
      emoji: '💰',
      originalPrice: b1.cost + l1.cost + d1.cost,
      offerPrice: Math.round((b1.cost + l1.cost + d1.cost) * 0.75),
      discount: 25,
      meals: [b1, l1, d1],
      badge: '👑 BEST VALUE',
      validTill: 'Today only',
    },
    {
      id: 'disc-3',
      type: 'discount',
      title: `${s1.name} – Just ₹${Math.round(s1.cost * 0.6)}!`,
      description: 'Snack time savings',
      emoji: s1.emoji,
      originalPrice: s1.cost,
      offerPrice: Math.round(s1.cost * 0.6),
      discount: 40,
      meals: [s1],
      badge: '🤑 40% OFF',
      validTill: 'Till 6 PM',
    },
  ];
};

export const todayOffers = getDailyOffers();
