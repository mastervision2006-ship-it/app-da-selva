'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UpgradesContext = createContext(null);

const STORAGE_KEY = 'selva_upgrades';

// IDs que o premium_total desbloqueia
const TODOS_IDS = ['grupo_exclusivo', 'ia_selva', 'lista_compras', 'nutri_coach', 'vitalicio'];

export function UpgradesProvider({ children }) {
  const [upgrades, setUpgrades] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUpgrades(JSON.parse(saved));
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(upgrades));
    } catch { /* ignore */ }
  }, [upgrades, hydrated]);

  function temAcesso(upgradeId) {
    if (upgrades['premium_total']?.ativo) return true;
    return !!upgrades[upgradeId]?.ativo;
  }

  function comprar(upgradeId) {
    const novos = { [upgradeId]: { ativo: true, compradoEm: new Date().toISOString() } };
    // premium_total libera tudo
    if (upgradeId === 'premium_total') {
      TODOS_IDS.forEach(id => { novos[id] = { ativo: true, compradoEm: new Date().toISOString() }; });
    }
    setUpgrades(prev => ({ ...prev, ...novos }));
  }

  function revogar(upgradeId) {
    setUpgrades(prev => {
      const copia = { ...prev };
      delete copia[upgradeId];
      return copia;
    });
  }

  function resetarTudo() {
    setUpgrades({});
  }

  return (
    <UpgradesContext.Provider value={{ upgrades, temAcesso, comprar, revogar, resetarTudo, hydrated }}>
      {children}
    </UpgradesContext.Provider>
  );
}

export function useUpgrades() {
  const ctx = useContext(UpgradesContext);
  if (!ctx) throw new Error('useUpgrades must be used inside UpgradesProvider');
  return ctx;
}
