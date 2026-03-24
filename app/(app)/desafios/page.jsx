'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createBrowserClient } from '@/lib/supabase';

const TOTAL_DIAS = 21;

export default function DesafiosPage() {
  const { user } = useAuth();
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const hoje = new Date().toISOString().split('T')[0];
  const checkedToday = checkIns.includes(hoje);
  const diaAtual = checkIns.length + 1;

  useEffect(() => {
    if (!user) return;
    const supabase = createBrowserClient();
    supabase
      .from('progresso')
      .select('data')
      .eq('user_id', user.id)
      .eq('completou', true)
      .order('data', { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error('[desafios]', error);
        setCheckIns((data ?? []).map(r => r.data));
        setLoading(false);
      })
      .catch(err => {
        console.error('[desafios]', err);
        setLoading(false);
      });
  }, [user]);

  async function handleCheckIn() {
    if (checkedToday || salvando || !user) return;
    setSalvando(true);
    const supabase = createBrowserClient();
    const { error } = await supabase.from('progresso').upsert({
      user_id: user.id,
      data: hoje,
      dia_protocolo: diaAtual,
      completou: true,
    }, { onConflict: 'user_id,data' });
    if (!error) setCheckIns(prev => [...prev, hoje]);
    setSalvando(false);
  }

  const progresso = Math.round((checkIns.length / TOTAL_DIAS) * 100);

  const sequencia = (() => {
    let s = 0;
    const d = new Date();
    while (s < checkIns.length) {
      const dateStr = d.toISOString().split('T')[0];
      if (checkIns.includes(dateStr)) { s++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return s;
  })();

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-[#9CA88E] text-sm">Carregando...</div></div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-white">Desafio 21 Dias</h1>
        <p className="text-sm text-[#9CA88E] mt-1">Sem falhar · Protocolo Dieta da Selva</p>
      </div>

      <div className="px-5 mb-5">
        <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-white">{progresso}%</p>
              <p className="text-xs text-[#9CA88E]">do desafio concluído</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[#E8A838]">🔥 {sequencia}</p>
              <p className="text-xs text-[#9CA88E]">dias seguidos</p>
            </div>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
            <div className="h-full rounded-full bg-[#E8A838] transition-all duration-500" style={{ width: `${progresso}%` }} />
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: TOTAL_DIAS }, (_, i) => {
              const dia = i + 1;
              const dataCheck = (() => {
                if (!user) return null;
                const profile_inicio = new Date();
                profile_inicio.setDate(profile_inicio.getDate() - checkIns.length);
                const d = new Date(profile_inicio);
                d.setDate(d.getDate() + i);
                return d.toISOString().split('T')[0];
              })();
              const concluido = checkIns.length >= dia;
              const isHoje = dia === Math.min(diaAtual, TOTAL_DIAS);
              return (
                <div key={dia} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  concluido ? 'bg-[#E8A838] text-black' : isHoje ? 'bg-[#1A2010] border border-[#E8A838]/50 text-white' : 'bg-[#1A2010] text-zinc-600'
                }`}>
                  {concluido ? '✓' : dia}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Check-in */}
      <div className="px-5 mb-5">
        <div className={`rounded-2xl p-5 border ${checkedToday ? 'bg-[#8CB369]/5 border-[#8CB369]/20' : 'bg-[#111608] border-[rgba(140,179,105,0.12)]'}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{checkedToday ? '✅' : '📋'}</span>
            <div>
              <p className="text-sm font-semibold text-white">Check-in — Dia {Math.min(diaAtual, TOTAL_DIAS)}</p>
              <p className="text-xs text-[#9CA88E]">{checkedToday ? 'Concluído hoje! Continue amanhã.' : 'Marque quando concluir o cardápio de hoje'}</p>
            </div>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={checkedToday || salvando}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
              checkedToday ? 'bg-[#8CB369]/10 text-[#8CB369] cursor-default' : 'bg-[#E8A838] text-black active:scale-95'
            }`}
          >
            {salvando ? 'Salvando...' : checkedToday ? '✓ Dia concluído!' : 'MARCAR DIA COMO CONCLUÍDO'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <p className="text-xs font-semibold text-[#5C6652] uppercase tracking-widest mb-3">SUAS CONQUISTAS</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: '📅', valor: checkIns.length, label: 'Dias feitos' },
            { emoji: '🔥', valor: sequencia, label: 'Sequência' },
            { emoji: '⏳', valor: Math.max(0, TOTAL_DIAS - checkIns.length), label: 'Restam' },
          ].map((s, i) => (
            <div key={i} className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-2xl p-3 text-center">
              <div className="text-xl mb-1">{s.emoji}</div>
              <p className="text-xl font-bold text-white">{s.valor}</p>
              <p className="text-[10px] text-[#9CA88E]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
