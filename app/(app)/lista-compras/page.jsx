'use client';

import { useState } from 'react';
import { LISTA_COMPRAS } from '@/lib/upgradesData';
import { useUpgrades } from '@/context/UpgradesContext';
import PaywallScreen from '@/components/upgrades/PaywallScreen';

export default function ListaComprasPage() {
  const { temAcesso } = useUpgrades();

  if (!temAcesso('lista_compras')) {
    return <PaywallScreen upgradeId="lista_compras" />;
  }

  return <ListaComprasContent />;
}

function ListaComprasContent() {
  const [checados, setChecados] = useState({});
  const [catAtiva, setCatAtiva] = useState('todas');

  function toggle(key) {
    setChecados(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const categorias = catAtiva === 'todas'
    ? LISTA_COMPRAS.categorias
    : LISTA_COMPRAS.categorias.filter(c => c.nome === catAtiva);

  return (
    <div className="px-5 pt-10 pb-6 animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <p className="text-xs text-[#9CA88E] mb-0.5">Upgrade ativo</p>
        <h1 className="text-2xl font-bold text-white">🛒 Lista de Compras</h1>
        <p className="text-sm text-[#9CA88E] mt-1">
          Semana completa por <span className="text-[#8CB369] font-semibold">{LISTA_COMPRAS.totalEstimado}</span>
        </p>
      </div>

      {/* Progresso de itens */}
      <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest">NO CARRINHO</span>
          <span className="text-xs text-[#9CA88E]">
            {Object.values(checados).filter(Boolean).length} itens
          </span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#8CB369] transition-all duration-300"
            style={{
              width: `${Math.round(
                (Object.values(checados).filter(Boolean).length /
                  LISTA_COMPRAS.categorias.reduce((acc, c) => acc + c.itens.length, 0)) * 100
              )}%`
            }}
          />
        </div>
      </div>

      {/* Filtro de categorias */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
        <button
          onClick={() => setCatAtiva('todas')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
            catAtiva === 'todas' ? 'bg-[#E8A838] text-black' : 'bg-[#111608] text-[#9CA88E] border border-[rgba(140,179,105,0.12)]'
          }`}
        >
          Todas
        </button>
        {LISTA_COMPRAS.categorias.map(cat => (
          <button
            key={cat.nome}
            onClick={() => setCatAtiva(cat.nome)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              catAtiva === cat.nome ? 'bg-[#E8A838] text-black' : 'bg-[#111608] text-[#9CA88E] border border-[rgba(140,179,105,0.12)]'
            }`}
          >
            {cat.nome.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Categorias */}
      {categorias.map(cat => (
        <div key={cat.nome} className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: cat.cor }}>
            {cat.nome}
          </p>
          <div className="bg-[#111608] border border-[rgba(140,179,105,0.1)] rounded-2xl overflow-hidden">
            {cat.itens.map((item, i) => {
              const key = `${cat.nome}-${i}`;
              const checked = !!checados[key];
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`w-full flex items-start gap-3 p-3.5 text-left transition-colors ${
                    i > 0 ? 'border-t border-[rgba(140,179,105,0.07)]' : ''
                  } ${checked ? 'opacity-50' : ''}`}
                >
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center border transition-all ${
                    checked
                      ? 'bg-[#8CB369] border-[#8CB369]'
                      : 'border-[rgba(140,179,105,0.2)] bg-transparent'
                  }`}>
                    {checked && <span className="text-black text-[10px] font-bold">✓</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium ${checked ? 'line-through text-[#5C6652]' : 'text-white'}`}>
                        {item.item}
                      </p>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-[#9CA88E]">{item.quantidade}</p>
                        <p className="text-xs font-semibold text-[#E8A838]">{item.preco}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#5C6652] mt-0.5">{item.dica}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Dicas de economia */}
      <div className="mt-2">
        <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">💡 DICAS DE ECONOMIA</p>
        <div className="space-y-2">
          {LISTA_COMPRAS.dicas.map((dica, i) => (
            <div key={i} className="bg-[#111608] border border-[rgba(140,179,105,0.1)] rounded-xl px-4 py-3">
              <p className="text-xs text-[#9CA88E] leading-relaxed">{dica}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botão resetar */}
      <button
        onClick={() => setChecados({})}
        className="w-full mt-4 py-3 rounded-xl border border-[rgba(140,179,105,0.12)] text-xs text-[#5C6652] transition-colors active:bg-[#111608]"
      >
        Limpar seleção
      </button>
    </div>
  );
}
