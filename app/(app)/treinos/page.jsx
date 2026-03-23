'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { TREINOS, SEMANAS } from '@/modules/treinos/data/treinos';
import LockedFeature from '@/components/locked/LockedFeature';

const NIVEL_COR = {
  'Leve': '#8CB369',
  'Iniciante': '#8CB369',
  'Moderado': '#E8A838',
  'Moderado-Alto': '#E8A838',
  'Alto': '#E85538',
  'Muito Alto': '#E85538',
};

export default function TreinosPage() {
  const { profile } = useAuth();
  const [treino, setTreino] = useState(null);

  const plano = profile?.plano ?? 'basic';
  const temAcesso = ['premium', 'vip'].includes(plano);

  if (!temAcesso) {
    return (
      <div>
        <div className="px-5 pt-10 pb-4">
          <h1 className="text-2xl font-bold text-white">Treinos em Casa</h1>
          <p className="text-sm text-[#9CA88E] mt-1">21 dias · Programa completo</p>
        </div>
        <LockedFeature feature="treinos-caseiros" />
      </div>
    );
  }

  if (treino) {
    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-10 pb-4 flex items-center gap-3">
          <button
            onClick={() => setTreino(null)}
            className="w-8 h-8 rounded-full bg-[#1A2010] flex items-center justify-center flex-shrink-0"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="#F2F0E8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="min-w-0">
            <p className="text-xs text-[#9CA88E]">Dia {treino.dia} · Semana {treino.semana}</p>
            <h1 className="text-base font-bold text-white leading-tight truncate">{treino.emoji} {treino.titulo}</h1>
          </div>
        </div>

        <div className="px-5">
          {/* Info rápida */}
          <div className="flex gap-2 mb-5">
            {[
              { label: `${treino.tempo} min`, icon: '⏱️' },
              { label: treino.nivel, icon: '📊' },
              { label: `${treino.exercicios.length} exerc.`, icon: '🏋️' },
            ].map((item, i) => (
              <div key={i} className="flex-1 bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-xl p-2 text-center">
                <div className="text-sm">{item.icon}</div>
                <div className="text-[10px] text-[#9CA88E] mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Dica */}
          <div className="bg-[#1A2010] border border-[#8CB369]/20 rounded-2xl p-4 mb-5">
            <p className="text-xs font-semibold text-[#8CB369] mb-1">💡 DICA DO DIA</p>
            <p className="text-sm text-[#9CA88E] leading-relaxed">{treino.dica}</p>
          </div>

          {/* Exercícios */}
          <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">EXERCÍCIOS</p>
          <div className="space-y-3 pb-8">
            {treino.exercicios.map((ex, i) => (
              <div key={i} className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#E8A838]/10 border border-[#E8A838]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[11px] font-bold text-[#E8A838]">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{ex.nome}</p>
                    {(ex.series || ex.repeticoes || ex.duracao) && (
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {ex.series && ex.series > 1 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8A838]/10 text-[#E8A838]">
                            {ex.series} séries
                          </span>
                        )}
                        {ex.repeticoes && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8CB369]/10 text-[#8CB369]">
                            {ex.repeticoes} reps
                          </span>
                        )}
                        {ex.duracao && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-400">
                            {ex.duracao}
                          </span>
                        )}
                      </div>
                    )}
                    {ex.descricao && (
                      <p className="text-xs text-[#5C6652] mt-1.5 leading-relaxed">{ex.descricao}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-white">Treinos em Casa</h1>
        <p className="text-sm text-[#9CA88E] mt-1">21 dias · Sem academia · Para qualquer nível</p>
      </div>

      {/* Instruções */}
      <div className="px-5 mb-5">
        <div className="bg-[#1A2010] border border-[#8CB369]/20 rounded-2xl p-4">
          <p className="text-xs font-semibold text-[#8CB369] mb-2">🌿 ANTES DE COMEÇAR</p>
          <div className="space-y-1.5">
            {[
              'Aqueça 5 min antes de cada treino',
              'Descanse 30-60 seg entre exercícios',
              'Hidrate-se bem antes, durante e após',
              'Respeite os dias de descanso ativo',
            ].map((tip, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#8CB369] flex-shrink-0" />
                <span className="text-xs text-[#9CA88E]">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semanas */}
      {SEMANAS.map((semana) => {
        const diasDaSemana = TREINOS.filter(t => t.semana === semana.numero);
        return (
          <div key={semana.numero} className="px-5 mb-5">
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: semana.cor }}>
                {semana.titulo}
              </p>
              <p className="text-[11px] text-[#5C6652]">{semana.descricao}</p>
            </div>
            <div className="space-y-2">
              {diasDaSemana.map((t) => {
                const corNivel = NIVEL_COR[t.nivel] ?? '#9CA88E';
                return (
                  <button
                    key={t.dia}
                    onClick={() => setTreino(t)}
                    className="w-full bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
                  >
                    <div className="w-11 h-11 bg-[#1A2010] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{t.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-[#5C6652]">DIA {t.dia}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${corNivel}15`, color: corNivel }}>
                          {t.nivel}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white leading-tight truncate">{t.titulo.split('—')[1]?.trim() ?? t.titulo}</p>
                      <p className="text-xs text-[#9CA88E] mt-0.5">⏱️ {t.tempo} min · {t.exercicios.length} exercícios</p>
                    </div>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" stroke="#5C6652" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="pb-6" />
    </div>
  );
}
