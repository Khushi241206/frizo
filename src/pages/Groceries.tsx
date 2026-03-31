import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ShoppingCart, Check, CreditCard, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Groceries = () => {
  const { groceryList, toggleGroceryItem } = useApp();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const categories = [...new Set(groceryList.map(i => i.category))];
  const total = groceryList.filter(i => !i.checked).reduce((s, i) => s + i.price, 0);
  const checkedCount = groceryList.filter(i => i.checked).length;

  if (showPayment) {
    return (
      <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-20"
        >
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-2xl text-foreground mb-2">Order Summary</h1>
          <p className="text-muted-foreground mb-6">{groceryList.filter(i => !i.checked).length} items</p>

          <div className="bg-card rounded-2xl shadow-card p-5 mb-4 text-left">
            {groceryList.filter(i => !i.checked).map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-bold text-foreground">₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl shadow-card p-5 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-foreground">₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-bold text-success">FREE</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-primary text-lg">₹{total}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowPayment(false);
              alert('Order placed! 🎉');
            }}
            className="w-full gradient-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-elevated hover:scale-[1.02] transition-transform"
          >
            Pay ₹{total} 💳
          </button>
          <button
            onClick={() => setShowPayment(false)}
            className="w-full text-muted-foreground font-semibold py-3 mt-2"
          >
            Back to list
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl text-foreground">Groceries 🛒</h1>
          <p className="text-sm text-muted-foreground">{checkedCount}/{groceryList.length} items done</p>
        </div>
        <div className="gradient-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold">
          ₹{total}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-secondary rounded-full h-2 mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(checkedCount / groceryList.length) * 100}%` }}
          className="gradient-primary h-2 rounded-full"
        />
      </div>

      {categories.map(cat => (
        <div key={cat} className="mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1">
            <Package size={12} /> {cat}
          </h3>
          <div className="space-y-2">
            {groceryList.filter(i => i.category === cat).map(item => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleGroceryItem(item.id)}
                className={`w-full bg-card rounded-xl p-3 shadow-card flex items-center gap-3 transition-all ${
                  item.checked ? 'opacity-50' : ''
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  item.checked ? 'gradient-primary' : 'border-2 border-border'
                }`}>
                  {item.checked && <Check size={14} className="text-primary-foreground" />}
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-semibold text-sm ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.quantity}</p>
                </div>
                <span className="font-bold text-sm text-foreground">₹{item.price}</span>
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      {/* Order Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => setShowPayment(true)}
            className="w-full gradient-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-elevated hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} /> Order Groceries · ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Groceries;
