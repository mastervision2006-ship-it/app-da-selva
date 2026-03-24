'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useUpgrades } from '@/context/UpgradesContext';
import PaywallScreen from '@/components/upgrades/PaywallScreen';
import { processarNutriCoach } from '@/modules/nutri-coach/knowledge/base';

const SUGESTOES = [
  'Quantas calorias devo comer?',
  'Quanto de proteína preciso?',
  'Como treinar durante a TPM?',
  'Por que travei o resultado?',
  'Quais suplementos tomar?',
  'Como desinchar rápido?',
];

const RE_BOLD = /\*\*(.*?)\*\*/g;
const RE_NEWLINE = /\n/g;

function renderTexto(texto) {
  return texto
    .replace(RE_BOLD, '<strong>$1</strong>')
    .replace(RE_NEWLINE, '<br/>');
}

export default function NutriCoachPage() {
  const { temAcesso, hydrated } = useUpgrades();
  if (!hydrated) return null;
  if (!temAcesso('nutri_coach')) return <PaywallScreen upgradeId="nutri_coach" />;
  return <NutriCoachContent />;
}

function NutriCoachContent() {
  const { profile } = useAuth();
  const nome = profile?.nome?.split(' ')[0] ?? 'você';

  const MSG_BOAS_VINDAS = {
    id: 0,
    role: 'bot',
    texto: `Olá, **${nome}**! Sou o **Nutri Coach da Selva** 🥗

Especializado em nutrição e exercícios para mulheres 30+. Minhas respostas são baseadas em ciência e personalizadas para o seu perfil.

Como posso te ajudar hoje?`,
  };

  const [msgs, setMsgs] = useState([MSG_BOAS_VINDAS]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  async function enviar(texto) {
    const t = texto.trim();
    if (!t || loading) return;
    setInput('');
    setMsgs(prev => [...prev, { id: Date.now(), role: 'user', texto: t }]);
    setLoading(true);

    const delay = 800 + Math.random() * 600;
    await new Promise(r => setTimeout(r, delay));

    const resposta = processarNutriCoach(t, profile);
    setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'bot', texto: resposta }]);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    enviar(input);
  }

  return (
    <div className="flex flex-col h-screen bg-[#0A0F07]" style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-10 pb-4 border-b border-[rgba(140,179,105,0.12)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1A2010] border border-[rgba(140,179,105,0.12)] flex items-center justify-center text-xl flex-shrink-0">
            🥗
          </div>
          <div>
            <p className="text-sm font-bold text-white">Nutri Coach da Selva</p>
            <p className="text-xs text-[#8CB369]">● Online — nutrição e exercícios para mulheres 30+</p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {msgs.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-[#8CB369]/10 border border-[#8CB369]/20 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-1">
                🥗
              </div>
            )}
            <div
              className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#E8A838] text-black rounded-br-sm'
                  : 'bg-[#111608] border border-[rgba(140,179,105,0.12)] text-[#9CA88E] rounded-bl-sm'
              }`}
              dangerouslySetInnerHTML={{ __html: renderTexto(msg.texto) }}
            />
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-[#8CB369]/10 border border-[#8CB369]/20 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-1">
              🥗
            </div>
            <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#5C6652]"
                    style={{ animation: `pulse-dot 1.2s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sugestões */}
      {msgs.length <= 1 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0 scrollbar-hide">
          {SUGESTOES.map((s, i) => (
            <button
              key={i}
              onClick={() => enviar(s)}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-[#1A2010] border border-[rgba(140,179,105,0.12)] text-xs text-[#9CA88E] active:scale-95 transition-transform"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 bg-[#0A0F07] border-t border-[rgba(140,179,105,0.12)] flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Pergunte sobre nutrição, treino, suplementos..."
            className="flex-1 bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl px-4 py-3 text-sm text-white placeholder-[#5C6652] outline-none focus:border-[#8CB369]/40 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-2xl bg-[#8CB369] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all flex-shrink-0"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
