'use client';

import { useState } from 'react';
import { PLANO_21_DIAS, REFEICOES_LABEL } from '@/modules/plano-alimentar/data/plano';

const DIA_ATUAL = 4; // TODO: buscar do Supabase

export default function PlanoPage() {
  const [diaSelected, setDiaSelected] = useState(DIA_ATUAL);
  const [semana, setSemana] = useState(1);

  const diaData = PLANO_21_DIAS[diaSelected - 1];
  const diasDaSemana = PLANO_21_DIAS.filter(d => d.semana === semana);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-white">Plano Alimentar</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Protocolo 21 dias · Dieta da Selva</p>
      </div>

      {/* Selector de semana */}
      <div className="px-5 mb-4">
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => { setSemana(s); setDiaSelected(PLANO_21_DIAS.find(d => d.semana === s)?.dia ?? 1); }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                semana === s
                  ? 'bg-[var(--amber)] text-black'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
              }`}
            >
              Semana {s}
            </button>
          ))}
        </div>
      </div>

      {/* Dias da semana */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {diasDaSemana.map(d => {
            const isAtual = d.dia === DIA_ATUAL;
            const isSelected = d.dia === diaSelected;
            const concluido = d.dia < DIA_ATUAL;
            return (
              <button
                key={d.dia}
                onClick={() => setDiaSelected(d.dia)}
                className={`flex-shrink-0 w-12 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border ${
                  isSelected
                    ? 'bg-[var(--amber)] border-[var(--amber)] text-black'
                    : isAtual
                    ? 'bg-[var(--bg-surface)] border-[var(--amber)]/50 text-white'
                    : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                <span className="text-[10px] font-medium">Dia</span>
                <span className="text-base font-bold">{d.dia}</span>
                {concluido && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Header do dia */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{diaData.titulo}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/20">
              {diaData.subtitulo}
            </span>
          </div>
          {diaSelected === DIA_ATUAL && (
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20 animate-pulse-dot">
              ● Hoje
            </span>
          )}
        </div>
      </div>

      {/* Refeições */}
      <div className="px-5 space-y-3 pb-6">
        {Object.entries(REFEICOES_LABEL).map(([key, meta]) => {
          const ref = diaData[key];
          if (!ref) return null;
          return (
            <div key={key} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{meta.emoji}</span>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{meta.label}</span>
                <span className="ml-auto text-xs text-[var(--text-dim)]">{meta.hora}</span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">{ref.titulo}</p>
              <p className="text-xs text-[var(--text-muted)] mb-3">{ref.descricao}</p>
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[var(--text-dim)]">Kcal</span>
                  <span className="text-xs font-semibold text-[var(--amber)]">{ref.calorias}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[var(--text-dim)]">Proteína</span>
                  <span className="text-xs font-semibold text-[var(--green)]">{ref.proteinas}g</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
