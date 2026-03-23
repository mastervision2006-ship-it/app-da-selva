'use client';

import { useState } from 'react';
import { UPGRADES } from '@/lib/upgradesData';
import { useUpgrades } from '@/context/UpgradesContext';
import UpgradeModal from '@/components/upgrades/UpgradeModal';

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'mensal', label: 'Mensal' },
  { id: 'unico', label: 'Pagamento único' },
  { id: 'vitalicio', label: 'Vitalício' },
];

export default function UpgradesPage() {
  const { temAcesso } = useUpgrades();
  const [filtro, setFiltro] = useState('todos');
  const [selected, setSelected] = useState(null);

  const premiumTotal = UPGRADES.find(u => u.id === 'premium_total');
  const outros = UPGRADES.filter(u => u.id !== 'premium_total').filter(u =>
    filtro === 'todos' || u.tipo === filtro
  );

  return (
    <>
      <div className="px-5 pt-10 pb-6 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-[#9CA88E] mb-0.5">Evolua sua jornada</p>
          <h1 className="text-2xl font-bold text-white">🌿 Upgrades Premium</h1>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {FILTROS.map(f => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filtro === f.id
                  ? 'bg-[#E8A838] text-black'
                  : 'bg-[#111608] text-[#9CA88E] border border-[rgba(140,179,105,0.12)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Card grande — Premium Total (só na aba "todos") */}
        {filtro === 'todos' && premiumTotal && (
          <UpgradeCardGrande
            upgrade={premiumTotal}
            ativo={temAcesso('premium_total')}
            onPress={() => setSelected(premiumTotal)}
          />
        )}

        {/* Grid 2 colunas */}
        <div className="grid grid-cols-2 gap-3">
          {outros.map(upgrade => (
            <UpgradeCardMedio
              key={upgrade.id}
              upgrade={upgrade}
              ativo={temAcesso(upgrade.id)}
              onPress={() => setSelected(upgrade)}
            />
          ))}
        </div>

        {/* Card vitalício como faixa larga (se filtro !== todos) */}
        {filtro !== 'todos' && premiumTotal && (filtro === 'vitalicio') && (
          <div className="mt-3">
            <UpgradeCardGrande
              upgrade={premiumTotal}
              ativo={temAcesso('premium_total')}
              onPress={() => setSelected(premiumTotal)}
            />
          </div>
        )}
      </div>

      {selected && (
        <UpgradeModal upgrade={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

/* ── Card grande destaque ── */
function UpgradeCardGrande({ upgrade, ativo, onPress }) {
  return (
    <button
      onClick={onPress}
      className="w-full rounded-2xl p-5 text-left mb-3 relative overflow-hidden active:scale-[0.98] transition-transform"
      style={{
        background: 'linear-gradient(135deg, #1A1200 0%, #0A0A08 60%)',
        border: '1px solid rgba(245,158,11,0.2)',
      }}
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: upgrade.tagColor }} />

      <div className="relative">
        {ativo ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 inline-block bg-[#8CB369]/20 text-[#8CB369]">
            ✓ ATIVO
          </span>
        ) : (
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 inline-block"
            style={{ background: upgrade.tagColor + '25', color: upgrade.tagColor }}
          >
            {upgrade.tag}
          </span>
        )}

        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <p className="text-3xl mb-2">{upgrade.emoji}</p>
            <h3 className="text-lg font-bold text-white mb-1">{upgrade.nome}</h3>
            <p className="text-xs text-[#9CA88E] leading-relaxed mb-3">{upgrade.descricaoBreve}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {upgrade.beneficios.slice(0, 4).map((b, i) => (
                <span key={i} className="text-[10px] text-[#8CB369] bg-[#8CB369]/10 px-2 py-0.5 rounded-full">
                  {b.startsWith('✅') ? b.slice(3) : b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#F59E0B]">{upgrade.precoFormatado}</span>
          <span className="px-4 py-2 rounded-xl bg-[#F59E0B] text-black font-bold text-xs">
            {ativo ? 'Ver detalhes' : 'Assinar →'}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Card médio 2 colunas ── */
function UpgradeCardMedio({ upgrade, ativo, onPress }) {
  return (
    <button
      onClick={onPress}
      className="rounded-2xl p-4 text-left relative overflow-hidden active:scale-[0.97] transition-transform"
      style={{ background: upgrade.cor, border: '1px solid rgba(140,179,105,0.1)' }}
    >
      {ativo ? (
        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full mb-2 inline-block bg-[#8CB369]/20 text-[#8CB369]">
          ✓ ATIVO
        </span>
      ) : (
        <span
          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full mb-2 inline-block"
          style={{ background: upgrade.tagColor + '25', color: upgrade.tagColor }}
        >
          {upgrade.tag}
        </span>
      )}

      <p className="text-2xl mb-1">{upgrade.emoji}</p>
      <p className="text-sm font-bold text-white leading-tight mb-1">{upgrade.nome}</p>
      <p className="text-[11px] text-[#9CA88E] leading-snug mb-3 line-clamp-2">{upgrade.descricaoBreve}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#E8A838]">{upgrade.precoFormatado}</span>
        <span className="text-[10px] text-[#5C6652]">→</span>
      </div>
    </button>
  );
}
