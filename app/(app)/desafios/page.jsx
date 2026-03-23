'use client';

import { useState } from 'react';

const DIA_ATUAL = 4;
const TOTAL_DIAS = 21;

const CHECK_INS_MOCK = [1, 2, 3]; // dias concluídos

export default function DesafiosPage() {
  const [checkIns, setCheckIns] = useState(CHECK_INS_MOCK);
  const [checkedToday, setCheckedToday] = useState(checkIns.includes(DIA_ATUAL));

  function handleCheckIn() {
    if (checkedToday) return;
    setCheckIns(prev => [...prev, DIA_ATUAL]);
    setCheckedToday(true);
  }

  const progresso = Math.round((checkIns.length / TOTAL_DIAS) * 100);
  const sequencia = (() => {
    let s = 0;
    for (let i = DIA_ATUAL; i >= 1; i--) {
      if (checkIns.includes(i)) s++;
      else break;
    }
    return s;
  })();

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-white">Desafio 21 Dias</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Sem falhar · Protocolo Dieta da Selva</p>
      </div>

      {/* Card principal */}
      <div className="px-5 mb-5">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-white">{progresso}%</p>
              <p className="text-xs text-[var(--text-muted)]">do desafio concluído</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--amber)]">🔥 {sequencia}</p>
              <p className="text-xs text-[var(--text-muted)]">dias seguidos</p>
            </div>
          </div>

          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
            <div
              className="h-full rounded-full bg-[var(--amber)] transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>

          {/* Grid de dias */}
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: TOTAL_DIAS }, (_, i) => {
              const dia = i + 1;
              const concluido = checkIns.includes(dia);
              const isHoje = dia === DIA_ATUAL;
              const futuro = dia > DIA_ATUAL;
              return (
                <div
                  key={dia}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    concluido
                      ? 'bg-[var(--amber)] text-black'
                      : isHoje
                      ? 'bg-[var(--bg-surface)] border border-[var(--amber)]/50 text-white'
                      : futuro
                      ? 'bg-[var(--bg-surface)] text-zinc-600'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {concluido ? '✓' : dia}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Check-in do dia */}
      <div className="px-5 mb-5">
        <div className={`rounded-2xl p-5 border ${checkedToday ? 'bg-[var(--green)]/5 border-[var(--green)]/20' : 'bg-[var(--bg-card)] border-[var(--border)]'}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{checkedToday ? '✅' : '📋'}</span>
            <div>
              <p className="text-sm font-semibold text-white">Check-in — Dia {DIA_ATUAL}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {checkedToday ? 'Concluído hoje! Continue amanhã.' : 'Marque quando concluir o cardápio de hoje'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={checkedToday}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
              checkedToday
                ? 'bg-[var(--green)]/10 text-[var(--green)] cursor-default'
                : 'bg-[var(--amber)] text-black active:scale-95'
            }`}
          >
            {checkedToday ? '✓ Dia concluído!' : 'MARCAR DIA COMO CONCLUÍDO'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">SUAS CONQUISTAS</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: '📅', valor: checkIns.length, label: 'Dias feitos' },
            { emoji: '🔥', valor: sequencia, label: 'Sequência' },
            { emoji: '⏳', valor: TOTAL_DIAS - checkIns.length, label: 'Restam' },
          ].map((s, i) => (
            <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3 text-center">
              <div className="text-xl mb-1">{s.emoji}</div>
              <p className="text-xl font-bold text-white">{s.valor}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
