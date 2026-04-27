export const conquistasLista = [
    // --- AS TUAS ORIGINAIS ---
    { id: 'coruja', nome: 'Coruja Noturna', icone: '🦉', desc: 'Lê 20 factos entre as 23h e as 4h.', req: (p) => p.estatisticas?.lidosDeNoite >= 20 },
    { id: 'atirador', nome: 'Atirador Furtivo', icone: '🎯', desc: 'Acerta 5 quizes sem errar nenhum.', req: (p) => p.estatisticas?.quizesSeguidos >= 5 },
    { id: 'rato', nome: 'Rato de Biblioteca', icone: '📚', desc: 'Guarda 10 factos nos favoritos.', req: (p) => p.estatisticas?.favoritosGuardados >= 10 },
    { id: 'mestre', nome: 'Mestre Global', icone: '🌍', desc: 'Chega ao Nível 10.', req: (p, n) => n >= 10 },
    { id: 'relampago', nome: 'Cérebro Relâmpago', icone: '⚡', desc: 'Alcança um combo de x3 no Quiz.', req: (p) => p.comboQuiz >= 3 },
    { id: 'chama', nome: 'Em Chamas', icone: '🔥', desc: 'Mantém uma sequência de 7 dias.', req: (p) => p.streak?.dias >= 7 },
    { id: 'explorador', nome: 'Explorador Total', icone: '🗺️', desc: 'Lê factos de 5 categorias diferentes.', req: (p) => Object.keys(p.categorias || {}).length >= 5 },
    { id: 'viciado', nome: 'Viciado em Factos', icone: '🧬', desc: 'Lê um total de 100 factos.', req: (p) => p.lidos?.length >= 100 },
    { id: 'madrugador', nome: 'Madrugador', icone: '🌅', desc: 'Lê 10 factos antes das 9h da manhã.', req: (p) => p.estatisticas?.lidosCedo >= 10 },
    { id: 'arquiteto', nome: 'Arquiteto', icone: '🏛️', desc: 'Ganha 500 XP em Arquitetura.', req: (p) => (p.categorias?.arquitetura || 0) >= 500 },
    { id: 'cientista', nome: 'Cientista Louco', icone: '🧪', desc: 'Ganha 500 XP em Ciência.', req: (p) => (p.categorias?.ciencia || 0) >= 500 },
    { id: 'fofoqueiro', nome: 'Sabichão', icone: '🗣️', desc: 'Ganha 1000 XP em Curiosidades.', req: (p) => (p.categorias?.curiosidades || 0) >= 1000 },
  
    // --- NOVAS: PROGRESSÃO DE LEITURA ---
    { id: 'curioso', nome: 'Apenas Curioso', icone: '👀', desc: 'Lê os teus primeiros 10 factos.', req: (p) => p.lidos?.length >= 10 },
    { id: 'devorador', nome: 'Devorador de Livros', icone: '📖', desc: 'Lê um total de 500 factos.', req: (p) => p.lidos?.length >= 500 },
    { id: 'lenda_leitura', nome: 'Lenda Viva', icone: '👑', desc: 'Lê uns impressionantes 1000 factos.', req: (p) => p.lidos?.length >= 1000 },
    { id: 'colecionador', nome: 'Colecionador Privado', icone: '💎', desc: 'Guarda 50 factos nos teus favoritos.', req: (p) => p.estatisticas?.favoritosGuardados >= 50 },
  
    // --- NOVAS: NÍVEL E STREAK (DIAS SEGUIDOS) ---
    { id: 'sabio', nome: 'O Sábio', icone: '🧙‍♂️', desc: 'Alcança o Nível 25.', req: (p, n) => n >= 25 },
    { id: 'divindade', nome: 'Divindade', icone: '✨', desc: 'Alcança o Nível 50.', req: (p, n) => n >= 50 },
    { id: 'maratonista', nome: 'Maratonista', icone: '🏃', desc: 'Mantém uma sequência de 30 dias de leitura.', req: (p) => p.streak?.dias >= 30 },
    { id: 'mestre_zen', nome: 'Mestre Zen', icone: '🧘', desc: 'Mantém uma sequência insana de 100 dias.', req: (p) => p.streak?.dias >= 100 },
  
    // --- NOVAS: QUIZZES ---
    { id: 'cerebro_faisca', nome: 'Faísca', icone: '💥', desc: 'Alcança um combo de x5 no Quiz.', req: (p) => p.comboQuiz >= 5 },
    { id: 'deus_trovao', nome: 'Deus do Trovão', icone: '🌩️', desc: 'Alcança um combo de x10 no Quiz.', req: (p) => p.comboQuiz >= 10 },
    { id: 'centuriao', nome: 'Centurião', icone: '💯', desc: 'Acerta 100 perguntas no Quiz no total.', req: (p) => p.estatisticas?.quizesCertos >= 100 },
  
    // --- NOVAS: A LOJA E JARDIM ---
    { id: 'decorador', nome: 'Decorador', icone: '🎀', desc: 'Compra 3 decorações para o teu jardim.', req: (p) => p.decoracoes?.length >= 3 },
    { id: 'jardim_eden', nome: 'Jardim do Éden', icone: '⛲', desc: 'Compra todas as decorações da loja.', req: (p) => p.decoracoes?.length >= 8 },
    { id: 'botanico_rico', nome: 'Investidor', icone: '💰', desc: 'Acumula um total de 5000 XP na conta.', req: (p) => p.xp_total >= 5000 },
  
    // --- NOVAS: ESPECIALISTAS DE TEMAS (Árvores Nível 5 = 500 XP) ---
    { id: 'historiador', nome: 'Historiador', icone: '⏳', desc: 'Ganha 500 XP em História.', req: (p) => (p.categorias?.historia || 0) >= 500 },
    { id: 'astronauta', nome: 'Astronauta', icone: '🚀', desc: 'Ganha 500 XP sobre o Espaço.', req: (p) => (p.categorias?.espaco || 0) >= 500 },
    { id: 'zoologo', nome: 'Zoólogo', icone: '🦁', desc: 'Ganha 500 XP sobre Animais.', req: (p) => (p.categorias?.animais || 0) >= 500 },
    { id: 'psicologo', nome: 'Psicólogo', icone: '🧠', desc: 'Ganha 500 XP em Psicologia.', req: (p) => (p.categorias?.psicologia || 0) >= 500 },
    { id: 'hacker', nome: 'Hacker', icone: '💻', desc: 'Ganha 500 XP em Programação.', req: (p) => (p.categorias?.programacao || 0) >= 500 },
    { id: 'atleta', nome: 'Atleta', icone: '🏅', desc: 'Ganha 500 XP em Desporto.', req: (p) => (p.categorias?.desporto || 0) >= 500 },
    { id: 'cinefilo', nome: 'Cinéfilo', icone: '🎬', desc: 'Ganha 500 XP em Cinema.', req: (p) => (p.categorias?.cinema || 0) >= 500 },
    { id: 'filosofo', nome: 'Filósofo', icone: '🤔', desc: 'Ganha 500 XP em Filosofia.', req: (p) => (p.categorias?.filosofia || 0) >= 500 },
    { id: 'musico', nome: 'Maestro', icone: '🎵', desc: 'Ganha 500 XP em Música.', req: (p) => (p.categorias?.musica || 0) >= 500 },
    // { id: 'viajante', nome: 'Viajante', icone: '✈️', desc: 'Ganha 500 XP em Viagens.', req: (p) => (p.categorias?.viagens || 0) >= 500 },
    { id: 'biologo', nome: 'Biólogo', icone: '🌿', desc: 'Ganha 500 XP em Natureza.', req: (p) => (p.categorias?.natureza || 0) >= 500 },
    { id: 'chefe', nome: 'Chefe de Cozinha', icone: '👨‍🍳', desc: 'Ganha 500 XP em Gastronomia.', req: (p) => (p.categorias?.gastronomia || 0) >= 500 },
    
    // --- NOVAS: DIVERSIDADE ---
    { id: 'renascentista', nome: 'Renascentista', icone: '🎨', desc: 'Lê factos de 15 categorias diferentes.', req: (p) => Object.keys(p.categorias || {}).length >= 15 },
    { id: 'vampiro', nome: 'Vampiro', icone: '🦇', desc: 'Lê uns assustadores 100 factos de noite.', req: (p) => p.estatisticas?.lidosDeNoite >= 100 }
  ];