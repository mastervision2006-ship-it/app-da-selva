export const PLANO_21_DIAS = Array.from({ length: 21 }, (_, i) => {
  const dia = i + 1;
  const semana = Math.ceil(dia / 7);

  const cardapios = [
    {
      cafe: { titulo: 'Ovos mexidos com bacon', descricao: '3 ovos + 3 fatias de bacon + manteiga', calorias: 420, proteinas: 28 },
      almoco: { titulo: 'Picanha grelhada', descricao: '250g de picanha + sal grosso + manteiga', calorias: 580, proteinas: 45 },
      jantar: { titulo: 'Frango na manteiga', descricao: '200g de peito de frango + 20g manteiga + alho', calorias: 380, proteinas: 42 },
      lanche: { titulo: 'Queijo e ovos cozidos', descricao: '100g queijo prato + 2 ovos cozidos', calorias: 280, proteinas: 22 },
    },
    {
      cafe: { titulo: 'Omelete de queijo', descricao: '3 ovos + 50g queijo cheddar + manteiga', calorias: 450, proteinas: 30 },
      almoco: { titulo: 'Costela assada', descricao: '300g costela bovina + sal + alecrim', calorias: 620, proteinas: 48 },
      jantar: { titulo: 'Salmão grelhado', descricao: '200g salmão + manteiga + limão', calorias: 400, proteinas: 38 },
      lanche: { titulo: 'Creme de queijo', descricao: '100g cream cheese + sal', calorias: 200, proteinas: 5 },
    },
    {
      cafe: { titulo: 'Bacon crocante com ovos', descricao: '4 fatias bacon + 2 ovos fritos + manteiga', calorias: 480, proteinas: 32 },
      almoco: { titulo: 'Alcatra no alho', descricao: '250g alcatra + alho + manteiga de garrafa', calorias: 560, proteinas: 44 },
      jantar: { titulo: 'Tilápia na frigideira', descricao: '250g tilápia + manteiga + sal + pimenta', calorias: 320, proteinas: 40 },
      lanche: { titulo: 'Ovos cozidos com sal', descricao: '3 ovos cozidos + sal grosso', calorias: 210, proteinas: 18 },
    },
    {
      cafe: { titulo: 'Scrambled eggs premium', descricao: '3 ovos + creme de leite + manteiga + sal', calorias: 430, proteinas: 26 },
      almoco: { titulo: 'Contrafilé grelhado', descricao: '250g contrafilé + manteiga + chimichurri carnívoro', calorias: 590, proteinas: 46 },
      jantar: { titulo: 'Frango com pele assado', descricao: '300g coxa/sobrecoxa + sal + manteiga', calorias: 440, proteinas: 38 },
      lanche: { titulo: 'Torresmo + queijo', descricao: '50g torresmo + 80g muçarela', calorias: 350, proteinas: 20 },
    },
    {
      cafe: { titulo: 'Omelete de carne seca', descricao: '3 ovos + 60g carne seca desfiada + manteiga', calorias: 460, proteinas: 34 },
      almoco: { titulo: 'Picanha com tutano', descricao: '200g picanha + tutano grelhado + sal', calorias: 640, proteinas: 42 },
      jantar: { titulo: 'Atum com manteiga', descricao: '200g atum em lata escorrido + 15g manteiga', calorias: 280, proteinas: 36 },
      lanche: { titulo: 'Queijo coalho grelhado', descricao: '150g queijo coalho grelhado na frigideira', calorias: 310, proteinas: 24 },
    },
    {
      cafe: { titulo: 'Ovos pochê', descricao: '3 ovos pochê + sal + pimenta do reino', calorias: 220, proteinas: 18 },
      almoco: { titulo: 'Fraldinha ao ponto', descricao: '250g fraldinha + manteiga de garrafa + sal grosso', calorias: 570, proteinas: 44 },
      jantar: { titulo: 'Sardinha grelhada', descricao: '250g sardinha + azeite + sal + limão', calorias: 350, proteinas: 36 },
      lanche: { titulo: 'Ovo frito na manteiga', descricao: '2 ovos fritos + 10g manteiga', calorias: 200, proteinas: 14 },
    },
    {
      cafe: { titulo: 'Bife com ovos', descricao: '150g bife + 2 ovos + manteiga', calorias: 490, proteinas: 40 },
      almoco: { titulo: 'Costelinha suína', descricao: '300g costelinha + sal + alho', calorias: 600, proteinas: 42 },
      jantar: { titulo: 'Camarão na manteiga', descricao: '200g camarão + 20g manteiga + alho + sal', calorias: 300, proteinas: 34 },
      lanche: { titulo: 'Linguiça toscana', descricao: '2 unidades linguiça toscana grelhada', calorias: 320, proteinas: 18 },
    },
  ];

  const cardapio = cardapios[(dia - 1) % cardapios.length];

  return {
    dia,
    semana,
    titulo: `Dia ${dia}`,
    subtitulo: semana === 1 ? 'Adaptação' : semana === 2 ? 'Aceleração' : 'Consolidação',
    ...cardapio,
  };
});

export const REFEICOES_LABEL = {
  cafe: { label: 'Café da manhã', emoji: '🍳', hora: '07:00' },
  almoco: { label: 'Almoço', emoji: '🥩', hora: '12:00' },
  lanche: { label: 'Lanche', emoji: '🧀', hora: '15:30' },
  jantar: { label: 'Jantar', emoji: '🍽️', hora: '19:00' },
};
