'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UPGRADES } from '@/lib/upgradesData';
import { useUpgrades } from '@/context/UpgradesContext';
import UpgradeModal from './UpgradeModal';

export default function UpgradeHighlights() {
  const { temAcesso } = useUpgrades();
  const [selected, setSelected] = useState(null);

  // Mostra os 3 upgrades em destaque no carrossel
  const destaques = UPGRADES.filter(u => u.destaque || u.melhorValor);

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between px-5 mb-3">
          <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest">⚡ UPGRADES EXCLUSIVOS</p>
          <Link href="/upgrades" className="text-xs text-[#E8A838] font-medium">
            Ver todos →
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 px-5 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
          {destaques.map(upgrade => (
            <UpgradeCardMini
              key={upgrade.id}
              upgrade={upgrade}
              ativo={temAcesso(upgrade.id)}
              onPress={() => setSelected(upgrade)}
            />
          ))}
          {/* Card "Ver todos" */}
          <Link
            href="/upgrades"
            className="flex-shrink-0 w-[140px] flex flex-col items-center justify-center gap-2 bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-4"
            style={{ scrollSnapAlign: 'start' }}
          >
            <span className="text-2xl">🌿</span>
            <span className="text-xs text-[#9CA88E] text-center leading-tight">Ver todos os upgrades</span>
            <span className="text-xs text-[#E8A838] font-semibold">→</span>
          </Link>
        </div>
      </div>

      {selected && (
        <UpgradeModal upgrade={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function UpgradeCardMini({ upgrade, ativo, onPress }) {
  return (
    <button
      onClick={onPress}
      className="flex-shrink-0 w-[200px] rounded-2xl p-4 text-left relative overflow-hidden active:scale-[0.97] transition-transform"
      style={{ background: upgrade.cor, border: '1px solid rgba(140,179,105,0.1)', scrollSnapAlign: 'start' }}
    >
      {/* Tag */}
      {upgrade.tag && !ativo && (
        <span
          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block"
          style={{ background: upgrade.tagColor + '30', color: upgrade.tagColor }}
        >
          {upgrade.tag}
        </span>
      )}
      {ativo && (
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block bg-[#8CB369]/20 text-[#8CB369]">
          ✓ ATIVO
        </span>
      )}

      <p className="text-2xl mb-1">{upgrade.emoji}</p>
      <p className="text-sm font-bold text-white leading-tight mb-1">{upgrade.nome}</p>
      <p className="text-[11px] text-[#9CA88E] leading-snug mb-3 line-clamp-2">{upgrade.descricaoBreve}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#E8A838]">{upgrade.precoFormatado}</span>
        <span className="text-xs text-[#5C6652]">ver →</span>
      </div>
    </button>
  );
}
