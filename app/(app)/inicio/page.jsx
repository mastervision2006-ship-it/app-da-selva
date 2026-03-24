'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { createBrowserClient } from '@/lib/supabase';
import UpgradeHighlights from '@/components/upgrades/UpgradeHighlights';
import { PLANO_21_DIAS, REFEICOES_LABEL } from '@/modules/plano-alimentar/data/plano';

const DICAS = [
  { emoji: '💧', texto: 'Beba pelo menos 2,5L de água hoje. A hidratação acelera a queima de gordura e reduz a fome.' },
  { emoji: '🥩', texto: 'Sempre coma proteína + gordura animal primeiro. Só depois adicione complementos se sentir necessidade.' },
  { emoji: '🧂', texto: 'Sal é seu aliado na dieta carnívora. Sem carboidratos, o corpo excreta mais sódio — tempere sem culpa.' },
  { emoji: '😴', texto: 'Durma pelo menos 7h esta noite. É durante o sono que o corpo queima mais gordura e regula o apetite.' },
  { emoji: '⏰', texto: 'Não force horários de refeição. Coma quando sentir fome real — seu corpo vai aprender a se regular.' },
  { emoji: '🚶', texto: 'Uma caminhada leve de 20 minutos hoje potencializa a queima de gordura sem aumentar o apetite.' },
  { emoji: '🍳', texto: 'Ovos são seu melhor amigo. Baratos, nutritivos e saciantes — podem ser consumidos em qualquer quantidade.' },
  { emoji: '🧠', texto: 'Nos primeiros dias pode sentir cansaço ou dor de cabeça — é o corpo trocando o combustível. Persista!' },
  { emoji: '🔥', texto: 'Adicione manteiga a tudo. A gordura de qualidade ativa o GLP-1 e mantém a saciedade por horas.' },
  { emoji: '📏', texto: 'O peso pode oscilar até 2kg por dia por retenção de água. Confie no processo e meça resultados semanalmente.' },
  { emoji: '🥛', texto: 'Laticínios integrais são liberados com moderação. Se o resultado travar, reduza queijos e iogurte por 3 dias.' },
  { emoji: '💪', texto: 'Na semana 2 a energia costuma disparar. É o sinal de que seu corpo virou a chave para queimar gordura!' },
  { emoji: '🌿', texto: 'Dúvidas? A Selva IA está disponível 24h para te ajudar com receitas, adaptações e motivação.' },
  { emoji: '🎯', texto: 'Foque no processo, não só no número da balança. Medidas, disposição e sono melhoram antes do peso.' },
  { emoji: '🥑', texto: 'Abacate é uma excelente fonte de gordura boa para complementar suas refeições com moderação.' },
  { emoji: '☕', texto: 'Café preto ou com manteiga é permitido e aliado. Evite com leite em grande quantidade ou adoçantes.' },
  { emoji: '🐟', texto: 'Sardinha em conserva é uma das fontes de proteína + ômega-3 mais baratas e nutritivas da dieta.' },
  { emoji: '⚡', texto: 'Se sentir fraqueza, aumente o sal e a gordura antes de pensar que errou. Eletrólitos são essenciais.' },
  { emoji: '🧘', texto: 'Estresse elevado libera cortisol, que dificulta a perda de gordura. Cuide da mente tanto quanto da dieta.' },
  { emoji: '🏆', texto: 'Você está quase lá! Cada dia concluído no desafio é uma vitória — marque seu check-in hoje.' },
  { emoji: '🌙', texto: 'Jantar proteico e leve melhora o sono e a recuperação muscular. Evite comer nas 2h antes de dormir.' },
];

// Retorna a próxima refeição com base no dia do protocolo e horário atual
function getProximaRefeicao(diaAtual) {
  const dia = PLANO_21_DIAS[Math.min(diaAtual, 21) - 1];
  if (!dia) return null;
  const hora = new Date().getHours();
  let chave;
  if (hora < 10) chave = 'cafe';
  else if (hora < 13) chave = 'almoco';
  else if (hora < 17) chave = 'lanche';
  else chave = 'jantar';
  const refeicao = dia[chave];
  const meta = REFEICOES_LABEL[chave];
  return refeicao ? { tipo: meta.label, emoji: meta.emoji, titulo: refeicao.titulo, descricao: refeicao.descricao } : null;
}

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
  const dica = DICAS[(diaAtual - 1) % DICAS.length];
  const refeicao = getProximaRefeicao(diaAtual);

  return (
    <div className="px-5 pt-10 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[#9CA88E]">Bem-vinda,</p>
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

      {/* Upgrades em destaque */}
      <UpgradeHighlights />

      {/* Refeição de hoje */}
      <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">PRÓXIMA REFEIÇÃO</p>
      <Link href="/plano">
        <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-5 mb-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 bg-[#1A2010] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{refeicao?.emoji ?? '🥩'}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#E8A838] font-semibold mb-0.5">{refeicao?.tipo ?? 'Refeição'}</p>
            <p className="text-sm font-semibold text-white truncate">{refeicao?.titulo ?? '—'}</p>
            <p className="text-xs text-[#9CA88E] truncate">{refeicao?.descricao ?? ''}</p>
          </div>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#E8A838" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </Link>

      {/* Dica */}
      <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">DICA DO DIA</p>
      <div className="bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl p-5 mb-4">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">{dica.emoji}</span>
          <p className="text-sm text-[#9CA88E] leading-relaxed">{dica.texto}</p>
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
