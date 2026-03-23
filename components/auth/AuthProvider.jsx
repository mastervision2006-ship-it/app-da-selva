'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ initialUser, initialProfile, children }) {
  const [user, setUser] = useState(initialUser ?? null);
  const [profile, setProfile] = useState(initialProfile ?? null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        setProfile(data ?? null);
      } else {
        setProfile(null);
      }
      router.refresh();
    });
    return () => subscription.unsubscribe();
  }, [router]);

  async function signOut() {
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push('/login');
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
