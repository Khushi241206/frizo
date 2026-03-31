import { Home, CalendarDays, ShoppingCart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: CalendarDays, label: 'Plan', path: '/plan' },
  { icon: ShoppingCart, label: 'Groceries', path: '/groceries' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/onboarding') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 relative px-4 py-1"
            >
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -top-0.5 w-8 h-1 rounded-full gradient-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                className={active ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className={`text-[10px] font-semibold ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
