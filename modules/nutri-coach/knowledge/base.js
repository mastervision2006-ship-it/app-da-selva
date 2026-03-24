export const BASE = {
  fisiologia: {
    gatilhos: ['metabolismo', 'metabolism', 'depois dos 30', 'após os 30', 'envelhecimento', 'músculo', 'sarcopenia', 'queima', 'hormônio', 'estrogênio', 'progesterona', 'cortisol', 'insulina', 'testosterona', 'osso', 'osteoporose', 'barriga', 'abdômen'],
    resposta: ({ peso }) => `🧬 **Entendendo seu corpo após os 30**

O metabolismo cai **2-3% por década** principalmente por perda muscular (0,5-1% ao ano sem treino de força). Isso representa ~150-200 kcal a menos que precisamos queimar por dia em relação aos 20 anos.

**O que muda hormonalmente:**
• Estrogênio começa a flutuar a partir dos 35-40 anos
• Progesterona cai antes — causando dominância estrogênica relativa
• Cortisol tende a elevar cronicamente com estresse acumulado
• Insulina perde sensibilidade → carboidratos refinados impactam mais
• Gordura migra do quadril para o abdômen após os 35

**A boa notícia:** cada kg de músculo adicionado queima **50-70 kcal extras por dia em repouso**. O treino de força não é opcional — é a principal estratégia contra esses efeitos.

⚠️ Circunferência abdominal acima de 80cm = risco aumentado cardiovascular e metabólico.`,
  },

  ciclo: {
    gatilhos: ['ciclo', 'menstruação', 'menstrual', 'tpm', 'ovulação', 'fase', 'folicular', 'lútea', 'período', 'cólica', 'pms', 'retenção hídrica', 'inchar durante'],
    resposta: () => `🌙 **Treino e nutrição pelo ciclo menstrual**

**Fase Folicular (dias 1-14) — Janela de ouro**
✅ Treinos intensos, HIIT, força — recuperação mais rápida
🍚 Corpo tolera mais carboidratos. Aumentar ferro (perdas menstruais)

**Ovulação (dia ~14) — Pico de força**
✅ Treinos de força máxima — testosterona ligeiramente elevada
⚠️ Ligamentos mais frouxos → maior risco de entorse

**Fase Lútea (dias 15-28) — Desaceleração natural**
✅ Treinos moderados, yoga, pilates, caminhada
🌿 Priorizar magnésio, vitamina B6, ômega-3 para TPM
💧 Peso pode aumentar 1-3kg por retenção hídrica — **não é gordura**

**Para a TPM:**
• Magnésio: chocolate 70%+, sementes de abóbora, espinafre
• Vitamina B6: frango, atum, batata
• Cálcio: iogurte, sardinha, leite
• Evitar: sódio em excesso, cafeína, álcool`,
  },

  proteina: {
    gatilhos: ['proteína', 'proteinas', 'quanto preciso de proteína', 'preciso de proteína', 'frango', 'carne', 'ovo', 'atum', 'salmão', 'sardinha', 'whey', 'proteína faz mal'],
    resposta: ({ peso }) => {
      const p = peso ?? 65;
      const min = (p * 1.6).toFixed(0);
      const max = (p * 2.0).toFixed(0);
      return `🥩 **Proteína — o macronutriente mais importante após os 30**

Para o seu peso de ~${p}kg, a recomendação para emagrecimento com preservação muscular é:

**${min}g a ${max}g de proteína por dia** (1,6-2,0g/kg)

Distribuição ideal: **3-4 refeições com 25-30g cada**

**Fontes práticas:**
| Alimento | Proteína | Calorias |
|---|---|---|
| Frango peito (100g) | 31g | 165 kcal |
| Carne bovina (100g) | 26g | 219 kcal |
| Ovo inteiro | 7g/unid | 78 kcal |
| Atum em água (100g) | 25g | 116 kcal |
| Salmão (100g) | 25g | 208 kcal |
| Sardinha (100g) | 21g | 208 kcal |
| Iogurte grego (100g) | 10g | 59 kcal |

✅ Em pessoas saudáveis sem doença renal, até 2g/kg é seguro e bem tolerado.`;
    },
  },

  carboidratos: {
    gatilhos: ['carboidrato', 'carbo', 'arroz', 'pão', 'massa', 'batata', 'açúcar', 'índice glicêmico', 'ig', 'glicemia', 'aveia', 'farinha', 'macarrão', 'posso comer arroz', 'posso comer pão'],
    resposta: () => `🌾 **Carboidratos após os 30 — o que priorizar**

Após os 30, a sensibilidade à insulina diminui. Isso não significa eliminar carbo, mas **escolher melhor**.

**✅ Priorize (baixo IG):**
• Aveia (IG 55) — betaglucana, reduz colesterol
• Arroz integral (IG 50-55) — mais fibras
• Batata-doce (IG 44-50) — vitamina A, potássio
• Feijão/lentilha (IG 25-40) — proteína + carbo
• Frutas com casca (IG 30-40) — fibras, vitaminas

**⚠️ Limite (alto IG):**
• Pão branco (IG 73)
• Arroz branco (IG 72)
• Açúcar refinado (IG 65-100)
• Batata inglesa cozida (IG 78)

**Estratégia inteligente:**
• Concentre carboidratos **pré e pós-treino**
• Dias de treino: 150-200g | Dias de descanso: 80-120g
• No déficit: 30-40% das calorias totais`,
  },

  gorduras: {
    gatilhos: ['gordura', 'azeite', 'manteiga', 'abacate', 'ômega', 'omega', 'gordura faz mal', 'gordura saturada', 'lipídio', 'óleo', 'margarina'],
    resposta: () => `🥑 **Gorduras — essenciais para seus hormônios**

Estrogênio, progesterona e testosterona são sintetizados a partir do colesterol. **Dietas lowfat perturbam o ciclo menstrual.**

**✅ Gorduras boas — priorize:**
• Azeite de oliva extravirgem
• Abacate
• Ovos inteiros
• Peixes gordos (salmão, sardinha, atum)
• Castanhas e nozes
• Manteiga (com moderação)

**🚫 Evite:**
• Óleos vegetais refinados (soja, milho, girassol, canola) — ômega-6 inflamatório
• Margarinas — gordura trans
• Frituras em óleos reutilizados — altamente oxidados

**Quantidade ideal:** 25-35% das calorias totais. Mínimo 1g/kg de peso para saúde hormonal.`,
  },

  calorias: {
    gatilhos: ['calorias', 'caloria', 'quantas calorias', 'gasto', 'tdee', 'tmb', 'metabolismo basal', 'déficit', 'deficit', 'quanto devo comer', 'quanto comer'],
    resposta: ({ peso, altura, objetivo }) => {
      const p = peso ?? 65;
      const h = altura ?? 165;
      const idade = 35; // estimativa
      const tmb = Math.round(447.6 + (9.25 * p) + (3.10 * h) - (4.33 * idade));
      const tdee = Math.round(tmb * 1.55);
      const deficit = Math.round(tdee - 400);
      return `⚖️ **Estimativa calórica personalizada**

Para ~${p}kg e ${h}cm:

**TMB (repouso):** ~${tmb} kcal/dia
**TDEE (moderadamente ativa):** ~${tdee} kcal/dia
**Meta para emagrecer:** ~${deficit} kcal/dia

Isso representa um déficit de ~400 kcal — **ideal para perder 0,3-0,4kg de gordura por semana** sem perder músculo.

**⚠️ Déficit acima de 500 kcal/dia:**
• Causa perda muscular
• Queda hormonal
• Efeito sanfona ao retomar

**Distribuição sugerida:**
• Proteína: ${Math.round(p * 1.7)}g (~${Math.round(p * 1.7 * 4)} kcal)
• Gorduras: 25-30% das calorias
• Carboidratos: o restante (priorize pré/pós-treino)

⚠️ *Esses valores são estimativas. Ajuste conforme sua resposta real nas primeiras 2-3 semanas.*`,
    },
  },

  ferro: {
    gatilhos: ['ferro', 'anemia', 'hemoglobina', 'ferritina', 'cansaço', 'cansada', 'sem energia', 'cabelo caindo', 'queda de cabelo', 'pálida', 'palidez'],
    resposta: () => `🩸 **Ferro — o micronutriente que mais afeta a energia feminina**

Mulheres em idade fértil precisam de **18mg/dia** (o dobro dos homens).

**Sinais de deficiência:**
• Cansaço extremo mesmo dormindo bem
• Palidez nas mucosas (olho, gengiva)
• Coração acelerado em repouso
• Queda de cabelo excessiva
• Unhas quebradiças

**Melhores fontes (ferro heme — melhor absorção):**
• Carne vermelha, fígado, frango, peixe

**Para potencializar a absorção:**
✅ Vitamina C na mesma refeição (limão na carne, frutas junto)

**Inibidores — evite junto com fontes de ferro:**
❌ Cálcio (leite, queijo)
❌ Café e chá
❌ Antiácidos

⚠️ *Suspeita de anemia? Faça hemograma + ferritina. Suplementação só com exame — excesso de ferro é prejudicial.*`,
  },

  vitaminaD: {
    gatilhos: ['vitamina d', 'vitamina d3', 'solar', 'sol', 'osso', 'imunidade', 'humor', 'depressão', 'cálcio absorção'],
    resposta: () => `☀️ **Vitamina D — a deficiência silenciosa**

Mesmo no Brasil, a deficiência de vitamina D é epidêmica — o protetor solar bloqueia praticamente toda a síntese.

**Funções críticas:**
• Absorção de cálcio e saúde óssea
• Imunidade e prevenção de infecções
• Regulação do humor (ligada à depressão)
• Saúde hormonal e ciclo menstrual

**Como obter:**
• Exposição solar 15-20 min sem protetor, entre 10h-14h
• Necessidade: 600-2000 UI/dia (até 4000 UI para deficientes)

**Suplementação recomendada:**
• D3 2000-4000 UI/dia — tomar com gordura (melhor absorção)

📋 *Dosar o exame 25(OH)D é o único jeito de saber seu nível real. Pergunte ao seu médico.*`,
  },

  magnesio: {
    gatilhos: ['magnésio', 'magnesio', 'câimbra', 'cãibra', 'cólica', 'insônia', 'dormir mal', 'ansiedade', 'tpm severa', 'glicinato'],
    resposta: () => `🌿 **Magnésio — o mineral que 80% das pessoas não têm o suficiente**

Envolvido em 300+ reações enzimáticas. Um dos suplementos com mais benefícios comprovados.

**Sinais de deficiência:**
• Câimbras frequentes
• Insônia e sono superficial
• TPM intensa (cólicas, irritabilidade)
• Ansiedade e tensão muscular
• Constipação

**Necessidade:** 310-320mg/dia

**Melhores fontes alimentares:**
• Sementes de abóbora 🥇
• Amêndoas, castanhas
• Espinafre, couve
• Feijão preto
• Aveia
• Banana
• Chocolate 70%+

**Suplementação:**
• **Glicinato de magnésio** = melhor absorção e sem efeito laxativo
• Dose: 300-400mg/dia, **1h antes de dormir** para maximizar benefício no sono`,
  },

  sono: {
    gatilhos: ['sono', 'dormir', 'insônia', 'acordar cedo', 'cansada ao acordar', 'qualidade do sono', 'noite mal dormida', 'melatonina'],
    resposta: () => `😴 **Sono — o aliado secreto do emagrecimento**

Uma noite mal dormida aumenta a grelina (fome) em **28%** e reduz a leptina (saciedade) em **18%**. Você literalmente come mais no dia seguinte.

**Meta:** 7-9 horas por noite com horário fixo

**Impactos da privação:**
• Craving por doces e carboidratos
• Cortisol elevado → acúmulo de gordura abdominal
• Resistência à insulina aumentada

**Higiene do sono — o que funciona:**
✅ Acordar no mesmo horário todos os dias (incluindo fim de semana)
✅ Quarto 18-22°C, escuridão total
✅ Sem telas 1-2h antes
✅ Sem cafeína após 14h
✅ Sem álcool

**Alimentos que melhoram o sono:**
• Kiwi (2 unidades 1h antes) — estudos mostram +13min de sono
• Cerejas, banana, aveia, camomila

**Suplemento mais eficaz:**
🌿 Magnésio glicinato 300-400mg, 1h antes de dormir`,
  },

  exercicios: {
    gatilhos: ['exercício', 'treino', 'academia', 'malhar', 'em casa', 'sem equipamento', 'glúteo', 'barriga', 'cardio', 'hiit', 'musculação', 'pilates', 'como treinar', 'frequência de treino'],
    resposta: () => `🏋️ **Exercícios — o que realmente funciona após os 30**

**Prioridade #1: Treino de força**
• Combate a sarcopenia (perda muscular)
• Aumenta metabolismo de repouso
• Melhora densidade óssea
• Mais eficiente para emagrecer que cardio

**HIIT — melhor que cardio contínuo para queima de gordura:**
• Protocolo Tabata: 20s esforço máximo / 10s descanso / 8 rounds
• Frequência: 2-3x/semana (nunca em dias consecutivos)
• ⚠️ Mais HIIT não é melhor — eleva cortisol em excesso

**Frequência recomendada:**
• Iniciante: 3x/semana (corpo inteiro)
• Intermediária: 4x/semana (divisão A/B)

**Exercícios sem equipamento:**
• Glúteos: agachamento, ponte, avanço, donkey kick
• Core: prancha, dead bug, mountain climber
• Superior: flexão, mergulho, remada com mochila

**Por que NÃO exagerar no cardio:**
❌ Eleva cortisol cronicamente
❌ Causa perda muscular
❌ Corpo se adapta — precisa fazer cada vez mais
❌ Não aumenta metabolismo de repouso`,
  },

  suplementos: {
    gatilhos: ['suplemento', 'vitamina', 'colágeno', 'ômega 3', 'omega 3', 'whey', 'creatina', 'b12', 'devo tomar', 'preciso tomar'],
    resposta: () => `💊 **Suplementos com evidência real para mulheres 30+**

| Suplemento | Dose | Para quê |
|---|---|---|
| Vitamina D3 | 2000-4000 UI/dia | Imunidade, hormônios, ossos |
| Magnésio Glicinato | 300-400mg/dia | Sono, TPM, câimbras |
| Ômega-3 | 1-2g EPA+DHA/dia | Anti-inflamatório, hormonal |
| Vitamina B12 | Conforme exame | Energia, neurológico |
| Colágeno hidrolisado | 10g/dia + Vit C | Pele, articulações, cabelo |
| Ferro | Só com exame | Anemia ferropriva |

**Ordem de prioridade:**
1. Vitamina D3 (maioria é deficiente)
2. Magnésio glicinato (80% da população deficiente)
3. Ômega-3 (se não come peixe 3x/semana)
4. Colágeno (a partir dos 35)

⚠️ *Ferro: NUNCA suplementar sem exame confirmando deficiência. Excesso é prejudicial.*

**Colágeno alimentar > suplemento:**
O melhor precursor é caldo de ossos caseiro + vitamina C.`,
  },

  hidratacao: {
    gatilhos: ['água', 'hidratação', 'beber água', 'quanto beber', 'sede', 'desidratada', 'urina', 'retenção de líquido'],
    resposta: ({ peso }) => {
      const p = peso ?? 65;
      const litros = ((p * 35) / 1000).toFixed(1);
      return `💧 **Hidratação — base de tudo**

Para ~${p}kg: **${litros} litros/dia** (35ml por kg)
Com treino: adicione 500-750ml por hora de atividade

**Distribuição ideal:**
• Ao acordar: 400ml em jejum
• Antes das refeições: 200-300ml
• Durante treino: 150-250ml a cada 15-20 min

**Sinais de desidratação:**
• Urina amarela escura (ideal: amarelo claro/transparente)
• Dor de cabeça matinal
• Constipação
• Fome excessiva — frequentemente é sede disfarçada

**✅ Boas opções:**
Água, chás sem açúcar, água com limão e gengibre, água de coco

**🚫 Evite:**
Refrigerantes, sucos industriais, energéticos, álcool`;
    },
  },

  antiinflamatorio: {
    gatilhos: ['inflamação', 'inflamado', 'anti-inflamatório', 'inchaço', 'desinchar', 'cúrcuma', 'gengibre', 'intestino', 'imunidade', 'estou inflamada'],
    resposta: () => `🌿 **Protocolo Anti-Inflamatório**

Inflamação crônica de baixo grau é a raiz da maioria das doenças metabólicas e dificulta o emagrecimento diretamente.

**✅ Priorize diariamente:**
• Cúrcuma + pimenta preta (potencializa absorção em 2000%)
• Gengibre (chá, suco, tempero)
• Frutas vermelhas (morango, mirtilo, amora)
• Folhas verde-escuras (couve, espinafre, rúcula)
• Peixes gordos 3x/semana (salmão, sardinha)
• Azeite extravirgem no lugar de óleos refinados
• Alho e brócolis
• Cacau 70%+
• Chá verde (2 xícaras/dia)

**🚫 Elimine:**
• Açúcar refinado (principal causa de inflamação)
• Óleos vegetais refinados (soja, canola, girassol)
• Gordura trans e ultra-processados
• Álcool em excesso
• Carnes processadas (salsicha, nuggets, presunto)`,
  },

  resultado: {
    gatilhos: ['quando vou ver resultado', 'quanto tempo', 'demora', 'resultado', 'quanto tempo leva', 'em quanto tempo', 'primeira semana', 'semana 2', 'sem resultado'],
    resposta: () => `⏳ **Linha do tempo realista de resultados**

**2 semanas:**
• Melhora em energia e clareza mental
• Redução do inchaço e retenção hídrica
• Sono melhorando
• Roupas começando a ficar mais folgadas

**4 semanas:**
• Primeiras mudanças visíveis no espelho
• Balança começa a mostrar resultados consistentes
• Fome mais controlada

**8 semanas:**
• Mudanças notáveis para outras pessoas
• Definição muscular se treinou força

**12 semanas:**
• Transformação significativa e mensurável

**6 meses:**
• Resultados sustentáveis e permanentes

---

**Por que não estou emagrecendo?** As causas mais comuns:
1. Subestimando o que come (as pessoas erram em 30-40%)
2. Hipotireoidismo (fazer TSH)
3. Cortisol cronicamente elevado
4. Privação de sono
5. Medicamentos (anticoncepcionais, antidepressivos)
6. Retenção hídrica mascarando perda de gordura
7. Adaptação metabólica — tente um diet break de 2 semanas`,
  },

  cortisol: {
    gatilhos: ['estresse', 'ansiedade', 'cortisol', 'compulsão', 'compulsão alimentar', 'vontade de comer', 'emocional', 'fome emocional', 'fome de madrugada', 'não consigo parar de comer'],
    resposta: () => `🧠 **Cortisol, Estresse e Compulsão Alimentar**

O cortisol alto é um dos maiores sabotadores do emagrecimento feminino.

**O que o cortisol alto provoca:**
• Acúmulo de gordura abdominal diretamente
• Catabolismo muscular
• Perturbação do ciclo menstrual
• Insônia → mais fome no dia seguinte
• Compulsão alimentar por doces e carboidratos

**Fome física vs Fome emocional:**
| | Física | Emocional |
|---|---|---|
| Início | Gradual | Súbita |
| O que quer | Qualquer alimento | Craving específico (doce, carboidrato) |
| Após comer | Para com saciedade | Não para, acompanha culpa |

**Como reduzir cortisol:**
✅ Treino de força (NÃO cardio excessivo — piora)
✅ Meditação/respiração 10 min diários
✅ Contato com natureza 20 min
✅ Sono 7-9h consistente
✅ Conexões sociais (oxitocina antagoniza cortisol)
✅ Magnésio glicinato à noite`,
  },

  saudacao: {
    gatilhos: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'ei', 'hey', 'tudo bem'],
    resposta: ({ nome }) => `Olá${nome ? `, ${nome}` : ''}! 🥗

Sou o **Nutri Coach da Selva**, especializado em nutrição e exercícios para mulheres 30+.

Posso te ajudar com:
• 🧮 Calcular suas calorias e proteínas personalizadas
• 🥩 Montar estratégia alimentar para seus objetivos
• 🏋️ Orientar treinos e frequência ideal
• 💊 Esclarecer dúvidas sobre suplementos
• 🌙 Melhorar sono, TPM e níveis de energia
• ⏳ Entender por que o resultado travou

O que quer saber hoje?`,
  },

  padrao: {
    resposta: ({ nome }) => `Entendi sua pergunta${nome ? `, ${nome}` : ''}! 🥗

Não tenho uma resposta específica para isso no momento, mas posso te ajudar com:

• **Calorias e metabolismo** — "quantas calorias devo comer?"
• **Proteínas** — "quanto de proteína preciso?"
• **Ciclo menstrual e treino** — "como treinar durante a TPM?"
• **Suplementos** — "quais suplementos devo tomar?"
• **Por que não emagreço** — "por que travei o resultado?"
• **Sono e estresse** — "como melhorar meu sono?"
• **Anti-inflamatório** — "como desinchar?"

Reformule sua pergunta ou escolha um dos temas acima! 💪`,
  },
};

export function processarNutriCoach(mensagem, perfil = {}) {
  const texto = mensagem.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const nome = perfil?.nome?.split(' ')[0] ?? null;
  const peso = perfil?.peso_atual ?? perfil?.peso_inicial ?? null;
  const altura = perfil?.altura ?? null;
  const objetivo = perfil?.objetivo ?? null;
  const ctx = { nome, peso, altura, objetivo };

  for (const [, modulo] of Object.entries(BASE)) {
    if (!modulo.gatilhos) continue;
    const match = modulo.gatilhos.some(g =>
      texto.includes(g.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
    if (match) return modulo.resposta(ctx);
  }

  return BASE.padrao.resposta(ctx);
}
