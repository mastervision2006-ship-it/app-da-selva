'use client';

import { useState } from 'react';
import { RECEITAS, CATEGORIAS } from '@/modules/receitas/data/receitas';

export default function ReceitasPage() {
  const [categoria, setCategoria] = useState('todos');
  const [receita, setReceita] = useState(null);

  const filtradas = categoria === 'todos' ? RECEITAS : RECEITAS.filter(r => r.categoria === categoria);

  if (receita) {
    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-10 pb-4 flex items-center gap-3">
          <button onClick={() => setReceita(null)} className="w-8 h-8 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#F2F0E8" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <h1 className="text-lg font-bold text-white">{receita.nome}</h1>
        </div>

        <div className="px-5">
          <div className="text-6xl text-center py-6">{receita.emoji}</div>

          <div className="flex gap-2 mb-6">
            {[
              { label: `${receita.tempo}min`, icon: '⏱️' },
              { label: `${receita.calorias}kcal`, icon: '🔥' },
              { label: `${receita.proteinas}g prot`, icon: '💪' },
              { label: receita.dificuldade, icon: '📊' },
            ].map((item, i) => (
              <div key={i} className="flex-1 bg-[var(--bg-surface)] rounded-xl p-2 text-center">
                <div className="text-sm">{item.icon}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">INGREDIENTES</h3>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 space-y-2">
              {receita.ingredientes.map((ing, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] flex-shrink-0" />
                  <span className="text-sm text-[var(--text-muted)]">{ing}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">MODO DE PREPARO</h3>
            <div className="space-y-3">
              {receita.preparo.map((passo, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--amber)]/10 border border-[var(--amber)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[var(--amber)]">{i + 1}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{passo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-white">Receitas</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{RECEITAS.length} receitas carnívoras</p>
      </div>

      {/* Filtro */}
      <div className="px-5 mb-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategoria(cat.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoria === cat.key
                  ? 'bg-[var(--amber)] text-black'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="px-5 space-y-3 pb-6">
        {filtradas.map(r => (
          <button
            key={r.id}
            onClick={() => setReceita(r)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
          >
            <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {r.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{r.nome}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-[var(--text-dim)]">⏱️ {r.tempo}min</span>
                <span className="text-xs text-[var(--amber)]">🔥 {r.calorias}kcal</span>
                <span className="text-xs text-[var(--green)]">💪 {r.proteinas}g</span>
              </div>
            </div>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="#5C6652" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
