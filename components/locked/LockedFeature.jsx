'use client';

export default function LockedFeature({ feature, onUpgrade }) {
  const upgrades = {
    'treinos-caseiros': {
      emoji: '🏋️',
      title: 'Treinos Caseiros',
      description: 'Disponível no Protocolo Premium',
      price: 'R$27',
      bullets: ['30 treinos sem academia', 'Progressão semana a semana', 'Adaptado para iniciantes'],
    },
    'jejum-intermitente': {
      emoji: '⏱️',
      title: 'Protocolo de Jejum',
      description: 'Disponível no Protocolo Premium',
      price: 'R$17',
      bullets: ['Protocolos 16:8, 18:6 e 24h', 'Como combinar com a Dieta da Selva', 'O que quebra o jejum'],
    },
    'cardapio-personalizado': {
      emoji: '🥩',
      title: 'Cardápio Personalizado',
      description: 'Disponível no Protocolo VIP',
      price: 'R$47',
      bullets: ['Cardápio 100% personalizado', 'Calculado para sua meta', 'Atualizado a cada 30 dias'],
    },
  };

  const info = upgrades[feature] ?? {
    emoji: '🔒',
    title: 'Funcionalidade Premium',
    description: 'Disponível em planos superiores',
    price: null,
    bullets: [],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-5xl mb-4">{info.emoji}</div>
      <div className="text-3xl mb-1">🔒</div>
      <h2 className="text-xl font-bold text-white mb-1">{info.title}</h2>
      <p className="text-sm text-zinc-400 mb-6">{info.description}</p>

      {info.bullets.length > 0 && (
        <ul className="w-full max-w-xs mb-8 space-y-2 text-left">
          {info.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
              <span className="text-amber-400">✓</span> {b}
            </li>
          ))}
        </ul>
      )}

      {info.price && (
        <button
          onClick={() => onUpgrade?.(feature)}
          className="w-full max-w-xs py-4 rounded-2xl bg-amber-400 text-black font-bold text-base active:scale-95 transition-transform"
        >
          DESBLOQUEAR — {info.price}
        </button>
      )}
    </div>
  );
}
