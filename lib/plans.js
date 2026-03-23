export const PLANS = {
  basic: {
    name: 'Protocolo Básico',
    price: 27,
    features: [
      'plano-alimentar',
      'receitas',
      'desafio-21-dias',
      'chat-bot',
    ],
  },
  premium: {
    name: 'Protocolo Premium',
    price: 67,
    features: [
      'plano-alimentar',
      'receitas',
      'desafio-21-dias',
      'chat-bot',
      'treinos-caseiros',
      'jejum-intermitente',
      'suporte-prioritario',
    ],
  },
  vip: {
    name: 'Protocolo VIP',
    price: 97,
    features: [
      'plano-alimentar',
      'receitas',
      'desafio-21-dias',
      'chat-bot',
      'treinos-caseiros',
      'jejum-intermitente',
      'suporte-prioritario',
      'cardapio-personalizado',
      'acompanhamento-semanal',
    ],
  },
};

export const UPGRADES = {
  'treinos-caseiros': {
    title: 'Treinos Caseiros',
    description: '30 treinos sem academia, progressão semana a semana',
    price: 27,
    plan: 'premium',
    emoji: '🏋️',
    bullets: [
      '30 treinos sem precisar de academia',
      'Progressão semana a semana',
      'Adaptado para iniciantes',
    ],
  },
  'jejum-intermitente': {
    title: 'Protocolo de Jejum',
    description: 'Guia completo de jejum intermitente para potencializar os resultados',
    price: 17,
    plan: 'premium',
    emoji: '⏱️',
    bullets: [
      'Protocolos 16:8, 18:6 e 24h',
      'Como combinar com a Dieta da Selva',
      'O que quebra o jejum (lista completa)',
    ],
  },
  'cardapio-personalizado': {
    title: 'Cardápio Personalizado',
    description: 'Cardápio montado para seu peso, objetivo e preferências',
    price: 47,
    plan: 'vip',
    emoji: '🥩',
    bullets: [
      'Cardápio 100% personalizado',
      'Calculado para sua meta de peso',
      'Atualizado a cada 30 dias',
    ],
  },
};
