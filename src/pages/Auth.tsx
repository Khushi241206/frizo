import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, ArrowLeft, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import frizoLogo from '@/assets/frizo-logo.png';

const DEMO_OTP = '123456';
const RESEND_SECONDS = 30;

const Auth = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const submittedRef = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const sendOtp = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast({
        title: 'Invalid mobile number',
        description: 'Please enter a valid 10-digit Indian mobile number.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setCooldown(RESEND_SECONDS);
      toast({ title: 'OTP sent 📩', description: `Use demo code ${DEMO_OTP} to continue.` });
    }, 600);
  };

  const verifyOtp = (code: string) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setLoading(true);
    setTimeout(() => {
      if (code === DEMO_OTP) {
        const mockUser = { id: `mock-${phone}`, phone };
        localStorage.setItem('frizo_mock_user', JSON.stringify(mockUser));
        toast({ title: 'Welcome to Frizo! 🎉', description: 'Login successful.' });
        window.dispatchEvent(new Event('frizo:auth-changed'));
      } else {
        toast({
          title: 'Incorrect OTP',
          description: 'The code you entered is wrong. Try again.',
          variant: 'destructive',
        });
        setOtp('');
        submittedRef.current = false;
      }
      setLoading(false);
    }, 500);
  };

  const resend = () => {
    if (cooldown > 0) return;
    setCooldown(RESEND_SECONDS);
    toast({ title: 'OTP resent 📩', description: `Demo code: ${DEMO_OTP}` });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gradient-primary py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <motion.img
            src={frizoLogo}
            alt="Frizo - Plan. Shop. Eat!"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-40 h-40 object-contain mx-auto drop-shadow-lg"
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-card rounded-2xl p-6 shadow-elevated"
            >
              <h2 className="font-display text-xl text-foreground mb-1">Welcome to Frizo! 👋</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Login with your mobile number to continue
              </p>

              <form onSubmit={sendOtp} className="space-y-3">
                <div className="relative">
                  <div className="absolute left-3 top-3.5 flex items-center gap-1.5 text-muted-foreground">
                    <Phone size={18} />
                    <span className="text-sm font-semibold text-foreground">+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    className="w-full bg-muted rounded-xl pl-20 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length !== 10}
                  className="w-full gradient-primary text-primary-foreground font-bold py-3.5 rounded-xl shadow-card hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send OTP'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="text-[11px] text-center text-muted-foreground mt-4">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card rounded-2xl p-6 shadow-elevated"
            >
              <div className="text-center mb-5">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl gradient-primary flex items-center justify-center shadow-card">
                  <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl text-foreground mb-1">Verify your number</h2>
                <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to</p>
                <p className="text-sm font-bold text-foreground">+91 {phone}</p>
              </div>

              <div className="flex justify-center mb-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(v) => {
                    setOtp(v);
                    if (v.length === 6) verifyOtp(v);
                  }}
                  disabled={loading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="h-6 flex items-center justify-center text-xs text-muted-foreground">
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" /> Verifying...
                  </span>
                ) : (
                  <span>Demo OTP: <span className="font-bold text-foreground">{DEMO_OTP}</span></span>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground mb-2">Didn't receive the code?</p>
                <button
                  onClick={resend}
                  disabled={cooldown > 0}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  <RefreshCw className="w-4 h-4" />
                  {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                </button>
              </div>

              <button
                onClick={() => { setStep('phone'); setOtp(''); submittedRef.current = false; }}
                className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Change mobile number
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
