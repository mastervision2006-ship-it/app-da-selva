'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UPGRADES } from '@/lib/upgradesData';
import UpgradeModal from './UpgradeModal';

export default function PaywallScreen({ upgradeId }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const upgrade = UPGRADES.find(u => u.id === upgradeId) ?? UPGRADES[0];

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-fade-in">
        {/* Lock icon */}
        <div className="w-20 h-20 rounded-full bg-[#1A2010] border border-[rgba(140,179,105,0.12)] flex items-center justify-center text-4xl mb-4">
          🔒
        </div>

        <span
          className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
          style={{ background: upgrade.tagColor + '22', color: upgrade.tagColor }}
        >
          {upgrade.tag}
        </span>

        <h2 className="text-xl font-bold text-white mb-2">{upgrade.nome}</h2>
        <p className="text-sm text-[#9CA88E] leading-relaxed mb-6 max-w-xs">{upgrade.descricaoBreve}</p>

        {/* Benefícios (top 3) */}
        <div className="w-full max-w-xs bg-[#111608] border border-[rgba(140,179,105,0.1)] rounded-2xl p-4 mb-6 text-left">
          <p className="text-[10px] font-bold text-[#5C6652] uppercase tracking-widest mb-3">O que você vai ter</p>
          <ul className="space-y-2">
            {upgrade.beneficios.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#9CA88E]">
                <span className="text-[#8CB369] mt-0.5 flex-shrink-0">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full max-w-xs py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-base active:scale-95 transition-transform mb-3"
        >
          🔓 Desbloquear por {upgrade.precoFormatado}
        </button>

        <button
          onClick={() => router.back()}
          className="text-xs text-[#5C6652] underline underline-offset-2"
        >
          ← Voltar
        </button>
      </div>

      {showModal && (
        <UpgradeModal upgrade={upgrade} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
