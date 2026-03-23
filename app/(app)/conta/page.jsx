'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { PLANS, UPGRADES } from '@/lib/plans';
import LockedFeature from '@/components/locked/LockedFeature';

export default function ContaPage() {
  const { user, profile, signOut } = useAuth();
  const [upgradeFeature, setUpgradeFeature] = useState(null);

  const plano = profile?.plano ?? 'basic';
  const planInfo = PLANS[plano];
  const altura = profile?.altura;
  const peso = profile?.peso_atual;
  const imc = altura && peso ? (peso / ((altura / 100) ** 2)).toFixed(1) : '—';

  if (upgradeFeature) {
    return (
      <div>
        <div className="px-5 pt-10 flex items-center gap-3">
          <button onClick={() => setUpgradeFeature(null)} className="w-8 h-8 rounded-full bg-[#1A2010] flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#F2F0E8" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <span className="text-sm text-[#9CA88E]">Upgrade</span>
        </div>
        <LockedFeature feature={upgradeFeature} onUpgrade={() => {}} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#E8A838]/10 border border-[#E8A838]/30 flex items-center justify-center text-2xl font-bold text-[#E8A838]">
            {(profile?.nome ?? user?.email ?? 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{profile?.nome ?? 'Usuário'}</h1>
            <p className="text-xs text-[#9CA88E]">{profile?.email ?? user?.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8A838]/10 text-[#E8A838] border border-[#E8A838]/20 mt-1 inline-block">
              {planInfo?.name ?? 'Básico'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Peso atual', valor: peso ? `${peso}kg` : '—', cor: 'text-white' },
            { label: 'Objetivo', valor: profile?.objetivo ?? '—', cor: 'text-[#8CB369]' },
            { label: 'IMC', valor: imc, cor: 'text-[#E8A838]' },
          ].map((s, i) => (
            <div key={i} className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-3 text-center">
              <p className={`text-lg font-bold ${s.cor}`}>{s.valor}</p>
              <p className="text-[10px] text-[#9CA88E] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrades */}
      <div className="px-5 mb-6">
        <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">ADICIONAR AO MEU PLANO</p>
        <div className="space-y-2">
          {Object.entries(UPGRADES).map(([key, upgrade]) => (
            <button key={key} onClick={() => setUpgradeFeature(key)} className="w-full bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform text-left">
              <div className="w-10 h-10 bg-[#1A2010] rounded-xl flex items-center justify-center text-xl flex-shrink-0">{upgrade.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{upgrade.title}</p>
                <p className="text-xs text-[#9CA88E]">{upgrade.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[#E8A838]">R${upgrade.price}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8A838]/10 text-[#E8A838]">Novo</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Minha conta */}
      <div className="px-5 mb-8">
        <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">MINHA CONTA</p>
        <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl overflow-hidden">
          {[
            { label: 'Objetivo', icon: '🎯', info: profile?.objetivo ?? '—' },
            { label: 'Peso inicial', icon: '⚖️', info: profile?.peso_inicial ? `${profile.peso_inicial}kg` : '—' },
            { label: 'Altura', icon: '📏', info: profile?.altura ? `${profile.altura}cm` : '—' },
            { label: 'Início do protocolo', icon: '📅', info: profile?.data_inicio ?? '—' },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-[rgba(140,179,105,0.08)]' : ''}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm text-[#9CA88E]">{item.label}</span>
              <span className="text-sm text-white font-medium">{item.info}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6">
        <button
          onClick={signOut}
          className="w-full py-3 rounded-2xl border border-zinc-700 text-zinc-500 text-sm font-medium active:scale-95 transition-transform"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}
