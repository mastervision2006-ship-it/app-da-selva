'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';

export default function RecuperarPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRecuperar(e) {
    e.preventDefault();
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/conta/nova-senha`,
    });
    setEnviado(true);
    setLoading(false);
  }

  if (enviado) {
    return (
      <div className="text-center animate-fade-in">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="text-xl font-bold text-white mb-2">Email enviado!</h2>
        <p className="text-sm text-[#9CA88E] mb-8">Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
        <Link href="/login" className="text-sm text-[#E8A838] font-semibold">← Voltar ao login</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-1">Recuperar senha</h2>
      <p className="text-sm text-[#9CA88E] mb-8">Enviaremos um link para redefinir sua senha</p>

      <form onSubmit={handleRecuperar} className="space-y-4">
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl px-4 py-3.5 text-sm text-white placeholder-[#5C6652] outline-none focus:border-[#E8A838]/40 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-sm disabled:opacity-50 active:scale-95 transition-all"
        >
          {loading ? 'Enviando...' : 'ENVIAR LINK'}
        </button>
      </form>

      <p className="text-xs text-[#5C6652] text-center mt-6">
        <Link href="/login" className="text-[#E8A838] font-semibold">← Voltar ao login</Link>
      </p>
    </div>
  );
}
