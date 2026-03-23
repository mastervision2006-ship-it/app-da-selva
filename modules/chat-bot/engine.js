import { DIETA_KNOWLEDGE } from './knowledge/dieta';
import { MOTIVACAO_KNOWLEDGE } from './knowledge/motivacao';

const ALL_KNOWLEDGE = [...DIETA_KNOWLEDGE, ...MOTIVACAO_KNOWLEDGE];

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

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

export function processarMensagem(mensagem) {
  const normalizada = normalizar(mensagem);

  for (const item of ALL_KNOWLEDGE) {
    for (const gatilho of item.gatilhos) {
      const gatilhoNorm = normalizar(gatilho);
      if (normalizada.includes(gatilhoNorm)) {
        return item.resposta;
      }
    }
  }

  // Fallback aleatório
  return RESPOSTAS_PADRAO[Math.floor(Math.random() * RESPOSTAS_PADRAO.length)];
}

export function getDelay() {
  // Simula tempo de "digitação" da IA
  return 800 + Math.random() * 1200;
}
