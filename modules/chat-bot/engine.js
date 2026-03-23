import { DIETA_KNOWLEDGE } from './knowledge/dieta';
import { MOTIVACAO_KNOWLEDGE } from './knowledge/motivacao';

// Hoist RegExp — não recriar a cada chamada (js-hoist-regexp)
const RE_ACCENTS = /[\u0300-\u036f]/g;
const RE_NON_ALNUM = /[^a-z0-9\s]/g;

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(RE_ACCENTS, '')
    .replace(RE_NON_ALNUM, ' ');
}

// Pre-indexar gatilhos em Map para lookup O(1) (js-index-maps)
// Estrutura: Map<gatilhoNormalizado, resposta>
const GATILHO_INDEX = new Map();

for (const item of [...DIETA_KNOWLEDGE, ...MOTIVACAO_KNOWLEDGE]) {
  for (const gatilho of item.gatilhos) {
    GATILHO_INDEX.set(normalizar(gatilho), item.resposta);
  }
}

const RESPOSTAS_PADRAO = [
  `Boa pergunta! Deixa eu pensar... 🌿

Com base no Protocolo Dieta da Selva, o princípio é sempre o mesmo: **alimentos de origem animal, gordura boa e zero carboidrato**.

Se tiver uma dúvida mais específica, pode me perguntar sobre:
• O que comer e evitar
• Fome e adaptação
• Resultados esperados
• Receitas e preparos
• Motivação`,

  `Hmm, preciso de mais detalhes para te ajudar melhor 🤔

Posso te orientar sobre:
• **Alimentação** — o que é permitido e proibido
• **Resultados** — quanto tempo para ver mudanças
• **Adaptação** — como lidar com os primeiros dias
• **Saúde** — gordura, colesterol, hidratação

Me conta mais sobre o que está sentindo ou perguntando!`,

  `Entendi! Vou te ajudar com isso 💪

A Dieta da Selva é baseada em **alimentação ancestral** — o que nossos ancestrais caçadores comiam antes da agricultura. Rica em proteínas, gorduras boas e zero açúcar processado.

Tem alguma dúvida específica sobre o protocolo? Pode perguntar à vontade!`,
];

export function processarMensagem(mensagem) {
  const normalizada = normalizar(mensagem);

  for (const [gatilho, resposta] of GATILHO_INDEX) {
    if (normalizada.includes(gatilho)) {
      return resposta;
    }
  }

  return RESPOSTAS_PADRAO[Math.floor(Math.random() * RESPOSTAS_PADRAO.length)];
}

export function getDelay() {
  return 800 + Math.random() * 1200;
}
