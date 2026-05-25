import { useState } from 'react';
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import { subscribeEmail } from '@/lib/newsletter';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      await subscribeEmail(email);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-20 relative p-[1px] rounded-3xl overflow-hidden group fade-rise">
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber/30 via-transparent to-indigo/30 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative bg-[#050505] inset-0 rounded-3xl p-8 md:p-12 flex flex-col items-center text-center">
        <Mail className="w-8 h-8 text-cyber mb-4" />
        <h3 className="text-2xl font-syne font-bold text-white mb-2">Join the Inner Circle</h3>
        <p className="text-[#A0A0AB] mb-8 font-light text-sm max-w-md">
          Get exclusive insights on Trade Marketing, E-commerce operations, and practical sales strategies delivered straight to your inbox. No spam.
        </p>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dienan@example.com"
            disabled={status === 'loading' || status === 'success'}
            required
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-cyber text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
          >
            {status === 'idle' && 'Subscribe'}
            {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <><Check className="w-4 h-4 mr-2" /> Joined</>}
            {status === 'error' && <><AlertCircle className="w-4 h-4 mr-2" /> Error</>}
          </button>
        </form>
      </div>
    </div>
  );
}
