'use client';

import Link from 'next/link';

// Dados mockados — serão substituídos por dados reais do Supabase
const MOCK_USER = {
  nome: 'Maria',
  plano: 'basic',
  diaAtual: 4,
  totalDias: 21,
  pesoInicial: 78,
  pesoAtual: 76.2,
  objetivo: 65,
};

const DICA_DO_DIA = {
  texto: 'Beba pelo menos 2L de água hoje. A hidratação acelera a queima de gordura e reduz a fome.',
  emoji: '💧',
};

const REFEICAO_HOJE = {
  tipo: 'Almoço',
  titulo: 'Picanha grelhada com manteiga',
  descricao: '200g de picanha + 20g de manteiga + sal grosso',
  emoji: '🥩',
};

export default function InicioPage() {
  const progresso = Math.round((MOCK_USER.diaAtual / MOCK_USER.totalDias) * 100);
  const perdeu = (MOCK_USER.pesoInicial - MOCK_USER.pesoAtual).toFixed(1);

  return (
    <div className="px-5 pt-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[var(--text-muted)]">Bom dia,</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_USER.nome} 👋</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-lg">
          🌿
        </div>
      </div>

      {/* Card Progresso */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-4">
        <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">MEU PROTOCOLO</p>
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-3xl font-bold text-white">{progresso}%</span>
            <span className="text-sm text-[var(--text-muted)] ml-2">concluído</span>
          </div>
          <span className="text-sm text-[var(--text-muted)]">Dia {MOCK_USER.diaAtual}/{MOCK_USER.totalDias}</span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--amber)] transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="mt-4 flex gap-3">
          <div className="flex-1 bg-[var(--bg-surface)] rounded-xl p-3 text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Perdeu</p>
            <p className="text-lg font-bold text-[var(--amber)]">-{perdeu}kg</p>
          </div>
          <div className="flex-1 bg-[var(--bg-surface)] rounded-xl p-3 text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Meta</p>
            <p className="text-lg font-bold text-[var(--green)]">{MOCK_USER.objetivo}kg</p>
          </div>
          <div className="flex-1 bg-[var(--bg-surface)] rounded-xl p-3 text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Dias</p>
            <p className="text-lg font-bold text-white">{MOCK_USER.totalDias - MOCK_USER.diaAtual}</p>
          </div>
        </div>
      </div>

      {/* Refeição de hoje */}
      <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">PRÓXIMA REFEIÇÃO</p>
      <Link href="/plano">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            {REFEICAO_HOJE.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--amber)] font-semibold mb-0.5">{REFEICAO_HOJE.tipo}</p>
            <p className="text-sm font-semibold text-white truncate">{REFEICAO_HOJE.titulo}</p>
            <p className="text-xs text-[var(--text-muted)] truncate">{REFEICAO_HOJE.descricao}</p>
          </div>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" stroke="#E8A838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>

      {/* Dica do dia */}
      <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">DICA DO DIA</p>
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-5 mb-4">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">{DICA_DO_DIA.emoji}</span>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{DICA_DO_DIA.texto}</p>
        </div>
      </div>

      {/* Chat Bot CTA */}
      <Link href="/chat">
        <div className="bg-gradient-to-r from-[#1A2010] to-[#111608] border border-[var(--amber)]/20 rounded-2xl p-5 mb-6 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 bg-[var(--amber)]/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
            🌿
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Selva IA</p>
            <p className="text-xs text-[var(--text-muted)]">Tire dúvidas sobre sua dieta agora</p>
          </div>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" stroke="#E8A838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </div>
  );
}
