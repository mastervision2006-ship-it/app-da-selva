'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

export default function CadastroPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', peso: '', altura: '', objetivo: 'Emagrecer' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleCadastro(e) {
    e.preventDefault();
    setErro('');
    if (form.senha.length < 6) { setErro('Senha deve ter pelo menos 6 caracteres.'); return; }
    setLoading(true);

    const supabase = createBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.senha,
      options: { data: { nome: form.nome } },
    });

    if (error) {
      setErro(error.message === 'User already registered' ? 'Este email já está cadastrado.' : 'Erro ao criar conta. Tente novamente.');
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from('profiles').insert({
        user_id: data.user.id,
        nome: form.nome,
        email: form.email,
        peso_inicial: parseFloat(form.peso),
        peso_atual: parseFloat(form.peso),
        altura: parseInt(form.altura),
        objetivo: form.objetivo,
        plano: 'basic',
        data_inicio: new Date().toISOString().split('T')[0],
      });
    }

    router.push('/inicio');
  }

  const inputClass = "w-full bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl px-4 py-3.5 text-sm text-white placeholder-[#5C6652] outline-none focus:border-[#E8A838]/40 transition-colors";

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-1">Criar conta</h2>
      <p className="text-sm text-[#9CA88E] mb-8">Comece seu protocolo hoje</p>

      <form onSubmit={handleCadastro} className="space-y-4">
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Nome completo</label>
          <input type="text" required value={form.nome} onChange={set('nome')} placeholder="Seu nome" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">E-mail</label>
          <input type="email" required value={form.email} onChange={set('email')} placeholder="seu@email.com" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Senha</label>
          <input type="password" required value={form.senha} onChange={set('senha')} placeholder="Mínimo 6 caracteres" className={inputClass} />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Peso atual (kg)</label>
            <input type="number" required value={form.peso} onChange={set('peso')} placeholder="70" step="0.1" className={inputClass} />
          </div>
          <div className="flex-1">
            <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Altura (cm)</label>
            <input type="number" required value={form.altura} onChange={set('altura')} placeholder="165" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Objetivo</label>
          <select value={form.objetivo} onChange={set('objetivo')} className={`${inputClass} appearance-none`}>
            <option value="Emagrecer">Emagrecer</option>
            <option value="Manter">Manter peso</option>
            <option value="Ganhar massa">Ganhar massa</option>
          </select>
        </div>

        {erro && <p className="text-xs text-red-400 text-center">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-sm disabled:opacity-50 active:scale-95 transition-all mt-2"
        >
          {loading ? 'Criando conta...' : 'CRIAR MINHA CONTA'}
        </button>
      </form>

      <p className="text-xs text-[#5C6652] text-center mt-6">
        Já tem conta?{' '}
        <Link href="/login" className="text-[#E8A838] font-semibold">Entrar</Link>
      </p>
    </div>
  );
}
