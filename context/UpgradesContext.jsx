'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UpgradesContext = createContext(null);
const STORAGE_KEY = 'selva_upgrades';
const TODOS_IDS = ['grupo_exclusivo', 'ia_selva', 'lista_compras', 'nutri_coach', 'vitalicio'];

export function UpgradesProvider({ children }) {
  const [upgrades, setUpgrades] = useState({});
  const [hydrated, setHydrated] = useState(false);

  // Persiste no localStorage sempre que mudar
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(upgrades)); } catch { /* ignore */ }
  }, [upgrades, hydrated]);

  // Na montagem: carrega localStorage (rápido) e depois sincroniza com Supabase (verdade)
  useEffect(() => {
    let cache = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) cache = JSON.parse(saved);
    } catch { /* ignore */ }
    setUpgrades(cache);
    setHydrated(true);

    // Sincroniza com servidor (upgrades reais confirmados)
    fetch('/api/upgrades/minhas')
      .then(r => r.json())
      .then(({ upgrades: lista }) => {
        if (!Array.isArray(lista) || lista.length === 0) return;
        const mapa = {};
        lista.forEach(({ upgrade_id, comprado_em }) => {
          mapa[upgrade_id] = { ativo: true, compradoEm: comprado_em };
        });
        setUpgrades(prev => ({ ...prev, ...mapa }));
      })
      .catch(() => { /* sem rede — usa cache */ });
  }, []);

  // Atualiza estado local imediatamente após pagamento confirmado via polling
  const confirmarCompra = useCallback((upgradeId) => {
    const agora = new Date().toISOString();
    const novos = { [upgradeId]: { ativo: true, compradoEm: agora } };
    if (upgradeId === 'premium_total') {
      TODOS_IDS.forEach(id => { novos[id] = { ativo: true, compradoEm: agora }; });
    }
    setUpgrades(prev => ({ ...prev, ...novos }));
  }, []);

  function temAcesso(upgradeId) {
    if (upgrades['premium_total']?.ativo) return true;
    return !!upgrades[upgradeId]?.ativo;
  }

  // Recarrega do servidor (usado após confirmação de pagamento)
  async function recarregar() {
    try {
      const r = await fetch('/api/upgrades/minhas');
      const { upgrades: lista } = await r.json();
      if (!Array.isArray(lista)) return;
      const mapa = {};
      lista.forEach(({ upgrade_id, comprado_em }) => {
        mapa[upgrade_id] = { ativo: true, compradoEm: comprado_em };
      });
      setUpgrades(prev => ({ ...prev, ...mapa }));
    } catch { /* ignore */ }
  }

  return (
    <UpgradesContext.Provider value={{ upgrades, temAcesso, confirmarCompra, recarregar, hydrated }}>
      {children}
    </UpgradesContext.Provider>
  );
}

export function useUpgrades() {
  const ctx = useContext(UpgradesContext);
  if (!ctx) throw new Error('useUpgrades must be used inside UpgradesProvider');
  return ctx;
}
