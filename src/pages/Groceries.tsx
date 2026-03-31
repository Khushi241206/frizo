import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ShoppingCart, Check, CreditCard, Package, ArrowLeft, Smartphone, Banknote, CheckCircle2 } from 'lucide-react';

type PaymentMethod = 'card' | 'upi' | 'cod' | null;

const Groceries = () => {
  const { groceryList, toggleGroceryItem } = useApp();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const categories = [...new Set(groceryList.map(i => i.category))];
  const total = groceryList.filter(i => !i.checked).reduce((s, i) => s + i.price, 0);
  const checkedCount = groceryList.filter(i => i.checked).length;
  const uncheckedItems = groceryList.filter(i => !i.checked);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const resetPayment = () => {
    setShowPayment(false);
    setPaymentMethod(null);
    setOrderPlaced(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setUpiId('');
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="text-success" size={48} />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed! 🎉</h1>
          <p className="text-muted-foreground mb-2">{uncheckedItems.length} items on their way</p>
          <p className="text-sm text-muted-foreground mb-6">
            Paid via {paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
          </p>
          <div className="gradient-primary text-primary-foreground text-2xl font-bold py-3 px-6 rounded-2xl inline-block mb-8">
            ₹{total}
          </div>
          <br />
          <button
            onClick={resetPayment}
            className="gradient-primary text-primary-foreground font-bold py-3 px-8 rounded-2xl shadow-elevated"
          >
            Back to Groceries
          </button>
        </motion.div>
      </div>
    );
  }

  // Payment Screen
  if (showPayment) {
    return (
      <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
        <button onClick={() => { setShowPayment(false); setPaymentMethod(null); }} className="flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-1">Payment 💳</h1>
        <p className="text-sm text-muted-foreground mb-5">{uncheckedItems.length} items · ₹{total}</p>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl shadow-card p-4 mb-5 max-h-40 overflow-y-auto">
          {uncheckedItems.map(item => (
            <div key={item.id} className="flex justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-sm text-foreground">{item.name}</span>
              <span className="text-sm font-bold text-foreground">₹{item.price}</span>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <h2 className="text-sm font-bold text-muted-foreground uppercase mb-3">Choose Payment Method</h2>
        <div className="space-y-3 mb-5">
          {[
            { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Rupay' },
            { id: 'upi' as const, label: 'UPI', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
            { id: 'cod' as const, label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
          ].map(method => (
            <motion.button
              key={method.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full bg-card rounded-xl p-4 shadow-card flex items-center gap-4 transition-all border-2 ${
                paymentMethod === method.id ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                paymentMethod === method.id ? 'gradient-primary' : 'bg-secondary'
              }`}>
                <method.icon size={20} className={paymentMethod === method.id ? 'text-primary-foreground' : 'text-muted-foreground'} />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-sm text-foreground">{method.label}</p>
                <p className="text-xs text-muted-foreground">{method.desc}</p>
              </div>
              {paymentMethod === method.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check size={20} className="text-primary" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Card Form */}
        <AnimatePresence>
          {paymentMethod === 'card' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/[^\d\s]/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-muted-foreground mb-1 block">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-muted-foreground mb-1 block">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* UPI Form */}
        <AnimatePresence>
          {paymentMethod === 'upi' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-card rounded-2xl shadow-card p-4">
                <label className="text-xs font-bold text-muted-foreground mb-1 block">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-2 mt-3">
                  {['GPay', 'PhonePe', 'Paytm'].map(app => (
                    <button
                      key={app}
                      onClick={() => setUpiId(`user@${app.toLowerCase()}`)}
                      className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full"
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COD Info */}
        <AnimatePresence>
          {paymentMethod === 'cod' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-success/10 border border-success/20 rounded-2xl p-4">
                <p className="text-sm text-foreground font-bold mb-1">💵 Pay at doorstep</p>
                <p className="text-xs text-muted-foreground">Keep ₹{total} ready. Our delivery partner will collect it.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total & Pay Button */}
        <div className="bg-card rounded-2xl shadow-card p-4 mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground text-sm">Subtotal</span>
            <span className="font-bold text-foreground">₹{total}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground text-sm">Delivery</span>
            <span className="font-bold text-success text-sm">FREE</span>
          </div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-primary text-lg">₹{total}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!paymentMethod}
          className={`w-full font-bold py-4 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 ${
            paymentMethod
              ? 'gradient-primary text-primary-foreground hover:scale-[1.02]'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {paymentMethod === 'cod' ? (
            <>
              <Banknote size={20} /> Place Order · ₹{total}
            </>
          ) : (
            <>
              <CreditCard size={20} /> Pay ₹{total}
            </>
          )}
        </button>
      </div>
    );
  }

  // Grocery List Screen
  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Groceries 🛒</h1>
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
