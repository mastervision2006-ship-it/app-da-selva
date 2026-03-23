'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { createBrowserClient } from '@/lib/supabase';

const DICA_DO_DIA = { texto: 'Beba pelo menos 2L de água hoje. A hidratação acelera a queima de gordura e reduz a fome.', emoji: '💧' };
const REFEICAO_HOJE = { tipo: 'Almoço', titulo: 'Picanha grelhada com manteiga', descricao: '200g de picanha + 20g de manteiga + sal grosso', emoji: '🥩' };

export default function InicioPage() {
  const { user, profile } = useAuth();
  const [diaAtual, setDiaAtual] = useState(1);
  const totalDias = 21;

  useEffect(() => {
    if (!user) return;
    const supabase = createBrowserClient();
    supabase
      .from('progresso')
      .select('id', { count: 'exact' })
      .eq('user_id', user.id)
      .eq('completou', true)
      .then(({ count }) => setDiaAtual((count ?? 0) + 1));
  }, [user]);

  const progresso = Math.round((Math.max(0, diaAtual - 1) / totalDias) * 100);
  const nome = profile?.nome?.split(' ')[0] ?? 'Você';
  const perdeu = profile ? (profile.peso_inicial - profile.peso_atual).toFixed(1) : '0.0';

  return (
    <div className="px-5 pt-10 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[#9CA88E]">Bom dia,</p>
          <h1 className="text-2xl font-bold text-white">{nome} 👋</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1A2010] border border-[rgba(140,179,105,0.12)] flex items-center justify-center text-lg">
          🌿
        </div>
      </div>

      {/* Progresso */}
      <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-5 mb-4">
        <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">MEU PROTOCOLO</p>
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-3xl font-bold text-white">{progresso}%</span>
            <span className="text-sm text-[#9CA88E] ml-2">concluído</span>
          </div>
          <span className="text-sm text-[#9CA88E]">Dia {Math.min(diaAtual, totalDias)}/{totalDias}</span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#E8A838] transition-all duration-500" style={{ width: `${progresso}%` }} />
        </div>
        <div className="mt-4 flex gap-3">
          <div className="flex-1 bg-[#1A2010] rounded-xl p-3 text-center">
            <p className="text-xs text-[#9CA88E] mb-1">Perdeu</p>
            <p className="text-lg font-bold text-[#E8A838]">-{perdeu}kg</p>
          </div>
          <div className="flex-1 bg-[#1A2010] rounded-xl p-3 text-center">
            <p className="text-xs text-[#9CA88E] mb-1">Meta</p>
            <p className="text-lg font-bold text-[#8CB369]">{profile?.objetivo ?? '—'}</p>
          </div>
          <div className="flex-1 bg-[#1A2010] rounded-xl p-3 text-center">
            <p className="text-xs text-[#9CA88E] mb-1">Dias</p>
            <p className="text-lg font-bold text-white">{Math.max(0, totalDias - (diaAtual - 1))}</p>
          </div>
        </div>
      </div>

      {/* Refeição de hoje */}
      <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">PRÓXIMA REFEIÇÃO</p>
      <Link href="/plano">
        <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-5 mb-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 bg-[#1A2010] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{REFEICAO_HOJE.emoji}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#E8A838] font-semibold mb-0.5">{REFEICAO_HOJE.tipo}</p>
            <p className="text-sm font-semibold text-white truncate">{REFEICAO_HOJE.titulo}</p>
            <p className="text-xs text-[#9CA88E] truncate">{REFEICAO_HOJE.descricao}</p>
          </div>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#E8A838" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </Link>

      {/* Dica */}
      <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">DICA DO DIA</p>
      <div className="bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl p-5 mb-4">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">{DICA_DO_DIA.emoji}</span>
          <p className="text-sm text-[#9CA88E] leading-relaxed">{DICA_DO_DIA.texto}</p>
        </div>
      </div>

      {/* Chat CTA */}
      <Link href="/chat">
        <div className="bg-gradient-to-r from-[#1A2010] to-[#111608] border border-[#E8A838]/20 rounded-2xl p-5 mb-6 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 bg-[#E8A838]/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🌿</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Selva IA</p>
            <p className="text-xs text-[#9CA88E]">Tire dúvidas sobre sua dieta agora</p>
          </div>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#E8A838" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </Link>
    </div>
  );
}
