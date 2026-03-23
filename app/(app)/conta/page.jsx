'use client';

import { useState } from 'react';
import { PLANS, UPGRADES } from '@/lib/plans';
import LockedFeature from '@/components/locked/LockedFeature';

const MOCK_USER = {
  nome: 'Maria Silva',
  email: 'maria@email.com',
  plano: 'basic',
  pesoInicial: 78,
  pesoAtual: 76.2,
  objetivo: 65,
  altura: 165,
  diaInicio: '2025-03-01',
};

export default function ContaPage() {
  const [upgradeFeature, setUpgradeFeature] = useState(null);

  const planInfo = PLANS[MOCK_USER.plano];
  const imc = (MOCK_USER.pesoAtual / ((MOCK_USER.altura / 100) ** 2)).toFixed(1);

  if (upgradeFeature) {
    return (
      <div>
        <div className="px-5 pt-10 flex items-center gap-3">
          <button onClick={() => setUpgradeFeature(null)} className="w-8 h-8 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#F2F0E8" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <span className="text-sm text-[var(--text-muted)]">Upgrade</span>
        </div>
        <LockedFeature feature={upgradeFeature} onUpgrade={() => {}} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--amber)]/10 border border-[var(--amber)]/30 flex items-center justify-center text-2xl">
            {MOCK_USER.nome.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{MOCK_USER.nome}</h1>
            <p className="text-xs text-[var(--text-muted)]">{MOCK_USER.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/20 mt-1 inline-block">
              {planInfo.name}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Peso atual', valor: `${MOCK_USER.pesoAtual}kg`, cor: 'text-white' },
            { label: 'Objetivo', valor: `${MOCK_USER.objetivo}kg`, cor: 'text-[var(--green)]' },
            { label: 'IMC', valor: imc, cor: 'text-[var(--amber)]' },
          ].map((s, i) => (
            <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3 text-center">
              <p className={`text-lg font-bold ${s.cor}`}>{s.valor}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrades disponíveis */}
      <div className="px-5 mb-6">
        <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">ADICIONAR AO MEU PLANO</p>
        <div className="space-y-2">
          {Object.entries(UPGRADES).map(([key, upgrade]) => (
            <button
              key={key}
              onClick={() => setUpgradeFeature(key)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-10 h-10 bg-[var(--bg-surface)] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {upgrade.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{upgrade.title}</p>
                <p className="text-xs text-[var(--text-muted)]">{upgrade.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[var(--amber)]">R${upgrade.price}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--amber)]/10 text-[var(--amber)]">Novo</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Menu conta */}
      <div className="px-5 mb-8">
        <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-widest mb-3">MINHA CONTA</p>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {[
            { label: 'Meu objetivo', icon: '🎯', info: 'Emagrecer' },
            { label: 'Peso inicial', icon: '⚖️', info: `${MOCK_USER.pesoInicial}kg` },
            { label: 'Altura', icon: '📏', info: `${MOCK_USER.altura}cm` },
            { label: 'Suporte', icon: '💬', info: 'WhatsApp' },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm text-[var(--text-muted)]">{item.label}</span>
              <span className="text-sm text-white font-medium">{item.info}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sair */}
      <div className="px-5 pb-6">
        <button className="w-full py-3 rounded-2xl border border-zinc-700 text-zinc-500 text-sm font-medium active:scale-95 transition-transform">
          Sair da conta
        </button>
      </div>
    </div>
  );
}
