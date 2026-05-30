import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface VerifyEmailProps {
  email: string;
  onBack: () => void;
}

const RESEND_SECONDS = 45;

const mailApps = [
  {
    name: 'Gmail',
    color: 'bg-red-500',
    url: 'https://mail.google.com/mail/u/0/#inbox',
  },
  {
    name: 'Outlook',
    color: 'bg-blue-600',
    url: 'https://outlook.live.com/mail/0/inbox',
  },
  {
    name: 'Yahoo',
    color: 'bg-purple-600',
    url: 'https://mail.yahoo.com',
  },
  {
    name: 'Mail App',
    color: 'bg-gray-700',
    url: 'mailto:',
  },
];

const VerifyEmail = ({ email, onBack }: VerifyEmailProps) => {
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const { toast } = useToast();
  const submittedRef = useRef(false);

  // Resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Auto-detect verification via auth state (works if user clicks email link)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user?.email_confirmed_at) {
        setVerified(true);
      }
    });

    // Poll session every 3s as backup
    const interval = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email_confirmed_at) {
        setVerified(true);
      }
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleVerify = async (token: string) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setVerifying(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
      });
      if (error) throw error;
      setVerified(true);
    } catch (err: any) {
      toast({
        title: 'Invalid code',
        description: err.message || 'Please check the code and try again.',
        variant: 'destructive',
      });
      setCode('');
      submittedRef.current = false;
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      toast({ title: 'Email sent! 📬', description: 'Check your inbox for a fresh code.' });
      setCooldown(RESEND_SECONDS);
    } catch (err: any) {
      toast({
        title: 'Could not resend',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

  if (verified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-8 shadow-elevated text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </motion.div>
        <h2 className="font-display text-2xl text-foreground mb-2">You're in! 🎉</h2>
        <p className="text-sm text-muted-foreground mb-1">Email verified successfully.</p>
        <p className="text-xs text-muted-foreground">Setting up your kitchen...</p>
        <Loader2 className="w-5 h-5 text-primary mx-auto mt-4 animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-elevated"
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex-1 h-1.5 rounded-full bg-primary" />
        <div className="flex-1 h-1.5 rounded-full bg-primary animate-pulse" />
        <div className="flex-1 h-1.5 rounded-full bg-muted" />
      </div>
      <p className="text-xs text-muted-foreground mb-4 font-semibold tracking-wide">
        STEP 2 OF 3 · VERIFY EMAIL
      </p>

      {/* Header */}
      <div className="text-center mb-5">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl gradient-primary flex items-center justify-center shadow-card">
          <Mail className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="font-display text-xl text-foreground mb-1">Check your inbox</h2>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to
        </p>
        <p className="text-sm font-bold text-foreground break-all">{email}</p>
      </div>

      {/* OTP */}
      <div className="flex justify-center mb-2">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(v) => {
            setCode(v);
            if (v.length === 6) handleVerify(v);
          }}
          disabled={verifying}
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
        {verifying && (
          <span className="flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin" /> Verifying...
          </span>
        )}
        {!verifying && <span>Auto-verifies when you finish typing</span>}
      </div>

      {/* Mail app deep links */}
      <div className="mt-4">
        <p className="text-xs text-muted-foreground text-center mb-2">Open your mail app</p>
        <div className="grid grid-cols-4 gap-2">
          {mailApps.map(app => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted hover:bg-muted/70 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center`}>
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-foreground">{app.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Resend */}
      <div className="mt-5 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground mb-2">Didn't get the email?</p>
        <button
          onClick={handleResend}
          disabled={cooldown > 0 || resending}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          {resending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
        </button>
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Use a different email
      </button>

      <p className="mt-3 text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
        <ExternalLink className="w-2.5 h-2.5" />
        Check spam if you don't see it within a minute
      </p>
    </motion.div>
  );
};

export default VerifyEmail;
