import { AuthProvider } from '@/components/auth/AuthProvider';
import BottomNav from '@/components/layout/BottomNav';
import { createServerClient } from '@/lib/supabase';

export default async function AppLayout({ children }) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('nome, email, peso_inicial, peso_atual, altura, objetivo, plano, data_inicio')
      .eq('user_id', user.id)
      .single();
    profile = data;
  }

  return (
    <AuthProvider initialUser={user} initialProfile={profile}>
      <div className="min-h-screen bg-[#0A0F07] max-w-md mx-auto relative">
        <main className="pb-20">{children}</main>
        <BottomNav />
      </div>
    </AuthProvider>
  );
}
