'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      setErro(error.message);
      setLoading(false);
      return;
    }
    router.push('/inicio');
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-1">Entrar</h2>
      <p className="text-sm text-[#9CA88E] mb-8">Acesse seu protocolo personalizado</p>

      <form onSubmit={handleLogin} className="space-y-4">
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
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Senha</label>
          <input
            type="password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl px-4 py-3.5 text-sm text-white placeholder-[#5C6652] outline-none focus:border-[#E8A838]/40 transition-colors"
          />
        </div>

        {erro && <p className="text-xs text-red-400 text-center">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-sm disabled:opacity-50 active:scale-95 transition-all mt-2"
        >
          {loading ? 'Entrando...' : 'ENTRAR'}
        </button>
      </form>

      <div className="text-center mt-6 space-y-3">
        <Link href="/recuperar" className="text-xs text-[#9CA88E] underline underline-offset-2">
          Esqueci minha senha
        </Link>
        <p className="text-xs text-[#5C6652]">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-[#E8A838] font-semibold">
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
