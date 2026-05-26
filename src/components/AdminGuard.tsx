import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, loginWithGoogle } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-cyber" />
      </div>
    );
  }

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      alert(`Login failed: ${err.message}. If you are on a custom domain, ensure it is added to Firebase Auth Authorized Domains.`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white px-6">
        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 max-w-sm w-full text-center">
          <h1 className="text-2xl font-syne font-bold mb-2">Admin Login</h1>
          <p className="text-white/50 text-sm mb-8">Please sign in to access the CMS</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-cyber text-black font-bold uppercase tracking-wider py-3 rounded-xl hover:bg-white transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
