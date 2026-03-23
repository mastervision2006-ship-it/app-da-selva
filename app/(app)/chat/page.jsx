'use client';

import { useState, useRef, useEffect } from 'react';
import { processarMensagem, getDelay } from '@/modules/chat-bot/engine';
import { useUpgrades } from '@/context/UpgradesContext';
import PaywallScreen from '@/components/upgrades/PaywallScreen';

const SUGESTOES = [
  'O que posso comer?',
  'Estou com fome, e agora?',
  'Quando vou ver resultado?',
  'Posso tomar café?',
];

const MSG_BOAS_VINDAS = {
  id: 0,
  role: 'bot',
  texto: `Olá! Sou a **Selva IA** 🌿

Estou aqui para te ajudar com tudo sobre o Protocolo Dieta da Selva — dúvidas sobre alimentação, adaptação, resultados e motivação.

Como posso te ajudar hoje?`,
};

// Hoist RegExp fora da função — não recriar a cada render (js-hoist-regexp)
const RE_BOLD = /\*\*(.*?)\*\*/g;
const RE_NEWLINE = /\n/g;

function renderTexto(texto) {
  return texto
    .replace(RE_BOLD, '<strong>$1</strong>')
    .replace(RE_NEWLINE, '<br/>');
}

export default function ChatPage() {
  const { temAcesso, hydrated } = useUpgrades();

  if (!hydrated) return null;
  if (!temAcesso('ia_selva')) return <PaywallScreen upgradeId="ia_selva" />;

  return <ChatContent />;
}

function ChatContent() {
  const [msgs, setMsgs] = useState([MSG_BOAS_VINDAS]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  async function enviar(texto) {
    const msg = texto.trim();
    if (!msg || loading) return;

    setInput('');
    setMsgs(prev => [...prev, { id: Date.now(), role: 'user', texto: msg }]);
    setLoading(true);

    await new Promise(r => setTimeout(r, getDelay()));

    const resposta = processarMensagem(msg);
    setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'bot', texto: resposta }]);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    enviar(input);
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 bg-[var(--bg-primary)] border-b border-[var(--border)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--amber)]/10 border border-[var(--amber)]/30 flex items-center justify-center text-xl">
            🌿
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Selva IA</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-dot" />
              <span className="text-xs text-[var(--green)]">Online agora</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {msgs.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-[var(--amber)]/10 border border-[var(--amber)]/20 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-1">
                🌿
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[var(--amber)] text-black rounded-br-sm'
                  : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] rounded-bl-sm'
              }`}
              dangerouslySetInnerHTML={{ __html: renderTexto(msg.texto) }}
            />
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-[var(--amber)]/10 border border-[var(--amber)]/20 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-1">
              🌿
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--text-dim)]"
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
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0">
          {SUGESTOES.map((s, i) => (
            <button
              key={i}
              onClick={() => enviar(s)}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] active:scale-95 transition-transform"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 bg-[var(--bg-primary)] border-t border-[var(--border)] flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Pergunte sobre sua dieta..."
            className="flex-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl px-4 py-3 text-sm text-white placeholder-[var(--text-dim)] outline-none focus:border-[var(--amber)]/40 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-2xl bg-[var(--amber)] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all flex-shrink-0"
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
