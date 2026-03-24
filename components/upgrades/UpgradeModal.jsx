'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useUpgrades } from '@/context/UpgradesContext';

// Mapa de upgrade → rota de destino após compra
const UPGRADE_ROUTES = {
  ia_selva: '/chat',
  nutri_coach: '/nutri-coach',
  lista_compras: '/lista-compras',
};

export default function UpgradeModal({ upgrade, onClose }) {
  const { temAcesso } = useUpgrades();
  const [step, setStep] = useState('details'); // details | form | qr | success

  const jaTemAcesso = temAcesso(upgrade.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={e => { if (e.target === e.currentTarget && step !== 'qr') onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-[#0D110A] border border-[rgba(140,179,105,0.15)] rounded-t-3xl max-h-[92vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>

        <div className="px-6 pb-8 pt-2">
          {step === 'details' && (
            <DetailsStep
              upgrade={upgrade}
              jaTemAcesso={jaTemAcesso}
              onClose={onClose}
              onAssinar={() => setStep('form')}
            />
          )}
          {step === 'form' && (
            <FormStep
              upgrade={upgrade}
              onBack={() => setStep('details')}
              onSuccess={(tid, qr, codigo) => setStep({ name: 'qr', tid, qr, codigo })}
              setStep={setStep}
            />
          )}
          {step?.name === 'qr' && (
            <QrStep
              upgrade={upgrade}
              tid={step.tid}
              qrCodeSrc={step.qr}
              pixPayload={step.codigo}
              onSuccess={() => setStep('success')}
            />
          )}
          {step === 'success' && (
            <SuccessStep upgrade={upgrade} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Passo 1: Detalhes ── */
function DetailsStep({ upgrade, jaTemAcesso, onClose, onAssinar }) {
  return (
    <>
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
        <button onClick={onClose} className="text-zinc-500 text-xl leading-none mt-1">✕</button>
      </div>

      <p className="text-sm text-[#9CA88E] leading-relaxed mb-5">{upgrade.descricaoCompleta}</p>

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

      <p className="text-xs text-[#5C6652] text-center mb-4">
        {upgrade.tipo === 'mensal' ? '🔄 Assinatura mensal — cancele quando quiser' :
         upgrade.tipo === 'vitalicio' ? '♾️ Pagamento único — acesso vitalício' :
         '💳 Pagamento único'}
      </p>

      {jaTemAcesso ? (
        <div className="w-full py-4 rounded-2xl bg-[#1A2010] border border-[#8CB369]/20 text-center">
          <span className="text-[#8CB369] font-bold text-sm">✅ Você já tem acesso a este upgrade</span>
        </div>
      ) : (
        <>
          <button
            onClick={onAssinar}
            className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-base active:scale-95 transition-all"
          >
            ASSINAR AGORA — {upgrade.precoFormatado}
          </button>
          <p className="text-xs text-[#5C6652] text-center mt-3">
            🔒 Pagamento via PIX · Garantia de 7 dias
          </p>
        </>
      )}
    </>
  );
}

/* ── Passo 2: Formulário ── */
function FormStep({ upgrade, onBack, setStep }) {
  const { profile } = useAuth();
  const [nome, setNome] = useState(profile?.nome ?? '');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  function formatCpf(v) {
    return v.replace(/\D/g, '').slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function formatTel(v) {
    return v.replace(/\D/g, '').slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const res = await fetch('/api/pix/upgrade/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upgradeId: upgrade.id, nome, cpf, telefone }),
      });
      const data = await res.json();
      if (!res.ok) { setErro(data.error || 'Erro ao gerar PIX'); setLoading(false); return; }
      setStep({ name: 'qr', tid: data.transactionId, qr: data.qrCodeSrc, codigo: data.pixPayload });
    } catch {
      setErro('Erro de conexão. Tente novamente.');
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-[#1A2010] border border-[rgba(140,179,105,0.12)] rounded-2xl px-4 py-3.5 text-sm text-white placeholder-[#5C6652] outline-none focus:border-[#E8A838]/40 transition-colors";

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="text-[#9CA88E] text-sm">← voltar</button>
        <div>
          <h2 className="text-base font-bold text-white">{upgrade.emoji} {upgrade.nome}</h2>
          <p className="text-xs text-[#5C6652]">{upgrade.precoFormatado} via PIX</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Nome completo</label>
          <input
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Seu nome"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">CPF</label>
          <input
            required
            value={cpf}
            onChange={e => setCpf(formatCpf(e.target.value))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-[#9CA88E] font-medium mb-1.5 block">Telefone / WhatsApp</label>
          <input
            required
            value={telefone}
            onChange={e => setTelefone(formatTel(e.target.value))}
            placeholder="(11) 99999-9999"
            inputMode="tel"
            className={inputClass}
          />
        </div>

        {erro && <p className="text-xs text-red-400 text-center">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-base active:scale-95 transition-all disabled:opacity-60 mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Gerando PIX...
            </span>
          ) : `GERAR PIX — ${upgrade.precoFormatado}`}
        </button>
      </form>
    </>
  );
}

/* ── Passo 3: QR Code + polling ── */
function QrStep({ upgrade, tid, qrCodeSrc, pixPayload, onSuccess }) {
  const { confirmarCompra } = useUpgrades();
  const [copiado, setCopiado] = useState(false);
  const [segundos, setSegundos] = useState(300); // 5 min timeout
  const intervalRef = useRef(null);
  const pollRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    intervalRef.current = setInterval(() => setSegundos(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Polling a cada 4s
  useEffect(() => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/pix/upgrade/status?tid=${tid}`);
        const data = await res.json();
        if (data.paid) {
          clearInterval(pollRef.current);
          clearInterval(intervalRef.current);
          confirmarCompra(upgrade.id);
          onSuccess();
        }
      } catch { /* ignore */ }
    }, 4000);
    return () => clearInterval(pollRef.current);
  }, [tid, upgrade.id, confirmarCompra, onSuccess]);

  function copiar() {
    navigator.clipboard.writeText(pixPayload).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const sec = String(segundos % 60).padStart(2, '0');
  const expirou = segundos === 0;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{upgrade.emoji}</span>
        <h2 className="text-base font-bold text-white">{upgrade.nome}</h2>
      </div>
      <p className="text-2xl font-bold text-[#E8A838] mb-4">{upgrade.precoFormatado}</p>

      {/* QR Code */}
      {qrCodeSrc && (
        <div className="w-48 h-48 bg-white rounded-2xl p-2 mb-4 flex items-center justify-center">
          <img src={qrCodeSrc} alt="QR Code PIX" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Status */}
      {!expirou ? (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#8CB369] animate-pulse" />
          <span className="text-xs text-[#9CA88E]">Aguardando pagamento... {min}:{sec}</span>
        </div>
      ) : (
        <p className="text-xs text-red-400 mb-4">PIX expirado. Feche e tente novamente.</p>
      )}

      {/* Copia e cola */}
      <div className="w-full mb-4">
        <p className="text-xs text-[#5C6652] mb-2">Ou copie o código PIX:</p>
        <div className="bg-[#111608] border border-[rgba(140,179,105,0.12)] rounded-xl p-3 flex items-center gap-2">
          <p className="flex-1 text-xs text-[#9CA88E] truncate font-mono">{pixPayload}</p>
          <button
            onClick={copiar}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copiado ? 'bg-[#8CB369] text-black' : 'bg-[#E8A838] text-black'
            }`}
          >
            {copiado ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      </div>

      <p className="text-xs text-[#5C6652] leading-relaxed">
        Abra o app do seu banco, escolha <strong className="text-[#9CA88E]">Pix → Copia e Cola</strong> e cole o código acima. O acesso é liberado automaticamente em segundos.
      </p>
    </div>
  );
}

/* ── Passo 4: Sucesso ── */
function SuccessStep({ upgrade, onClose }) {
  const router = useRouter();
  const destino = UPGRADE_ROUTES[upgrade.id];

  function handleIr() {
    onClose();
    if (destino) router.push(destino);
  }

  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="text-5xl mb-3">{upgrade.emoji}</div>
      <div className="w-16 h-16 rounded-full bg-[#8CB369]/15 border border-[#8CB369]/20 flex items-center justify-center text-3xl mb-4">
        ✅
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Acesso liberado!</h3>
      <p className="text-sm font-semibold text-[#E8A838] mb-1">{upgrade.nome}</p>
      <p className="text-xs text-[#5C6652] mb-8">Seu upgrade foi ativado com sucesso.</p>
      <button
        onClick={handleIr}
        className="w-full py-4 rounded-2xl bg-[#E8A838] text-black font-bold text-base active:scale-95 transition-transform"
      >
        {destino ? `ACESSAR ${upgrade.nome.toUpperCase()} →` : 'COMEÇAR AGORA →'}
      </button>
    </div>
  );
}
