'use client';

import { useState } from 'react';
import { useUpgrades } from '@/context/UpgradesContext';

export default function UpgradeModal({ upgrade, onClose }) {
  const { temAcesso, comprar } = useUpgrades();
  const [step, setStep] = useState('details'); // details | buying | success

  const jaTemAcesso = temAcesso(upgrade.id);

  async function handleComprar() {
    setStep('buying');
    await new Promise(r => setTimeout(r, 1500));
    comprar(upgrade.id);
    setStep('success');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-[#0D110A] border border-[rgba(140,179,105,0.15)] rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>

        <div className="px-6 pb-8 pt-2">
          {step === 'success' ? (
            <SuccessView upgrade={upgrade} onClose={onClose} />
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{upgrade.emoji}</span>
                  <div>
                    {upgrade.tag && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 inline-block"
                        style={{ background: upgrade.tagColor + '22', color: upgrade.tagColor }}
                      >
                        {upgrade.tag}
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-white leading-tight">{upgrade.nome}</h2>
                  </div>
                </div>
                <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors text-xl leading-none mt-1">✕</button>
              </div>

              {/* Descrição */}
              <p className="text-sm text-[#9CA88E] leading-relaxed mb-5">{upgrade.descricaoCompleta}</p>

              {/* Benefícios */}
              <div className="bg-[#111608] border border-[rgba(140,179,105,0.1)] rounded-2xl p-4 mb-5">
                <p className="text-[10px] font-bold text-[#5C6652] uppercase tracking-widest mb-3">O QUE ESTÁ INCLUSO</p>
                <ul className="space-y-2">
                  {upgrade.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#9CA88E]">
                      <span className="text-[#8CB369] mt-0.5 flex-shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tipo */}
              <p className="text-xs text-[#5C6652] text-center mb-4">
                {upgrade.tipo === 'mensal' ? '🔄 Assinatura mensal — cancele quando quiser' :
                 upgrade.tipo === 'vitalicio' ? '♾️ Pagamento único — acesso vitalício' :
                 '💳 Pagamento único'}
              </p>

              {/* CTA */}
              {jaTemAcesso ? (
                <div className="w-full py-4 rounded-2xl bg-[#1A2010] border border-[#8CB369]/20 text-center">
                  <span className="text-[#8CB369] font-bold text-sm">✅ Você já tem acesso a este upgrade</span>
                </div>
              ) : (
                <button
                  onClick={handleComprar}
                  disabled={step === 'buying'}
                  className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-base active:scale-95 transition-all disabled:opacity-60"
                >
                  {step === 'buying' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    `ASSINAR AGORA — ${upgrade.precoFormatado}`
                  )}
                </button>
              )}

              {!jaTemAcesso && (
                <p className="text-xs text-[#5C6652] text-center mt-3">
                  🔒 Pagamento seguro · Garantia de 7 dias
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessView({ upgrade, onClose }) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="text-5xl mb-3">{upgrade.emoji}</div>
      <div className="w-14 h-14 rounded-full bg-[#8CB369]/15 flex items-center justify-center text-3xl mb-4">✅</div>
      <h3 className="text-xl font-bold text-white mb-2">Upgrade ativado!</h3>
      <p className="text-sm text-[#9CA88E] mb-1">{upgrade.nome}</p>
      <p className="text-xs text-[#5C6652] mb-8">Seu acesso foi liberado com sucesso.</p>
      <button
        onClick={onClose}
        className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-sm active:scale-95 transition-transform"
      >
        COMEÇAR AGORA →
      </button>
    </div>
  );
}
