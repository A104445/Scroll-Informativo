// Função para saber a semana atual (Ex: "2024-W42")
export const getSemanaAtual = () => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${weekNo}`;
  };
  
  // --- O POTE DE MISSÕES DIÁRIAS (Agora com 28 Missões Variadas) ---
const poolDiarias = [
    // As originais
    { id: 'd1', tipo: 'ler', texto: 'Lê 5 factos novos', objetivo: 5, progresso: 0, recompensa: 20, completa: false },
    { id: 'd2', tipo: 'quiz', texto: 'Acerta 2 perguntas no Quiz', objetivo: 2, progresso: 0, recompensa: 30, completa: false },
    { id: 'd3', tipo: 'favorito', texto: 'Guarda 1 facto nos favoritos', objetivo: 1, progresso: 0, recompensa: 10, completa: false },
    { id: 'd4', tipo: 'ler', texto: 'Lê 10 factos no feed', objetivo: 10, progresso: 0, recompensa: 40, completa: false },
    { id: 'd5', tipo: 'quiz', texto: 'Acerta 1 pergunta no Quiz', objetivo: 1, progresso: 0, recompensa: 15, completa: false },
    { id: 'd6', tipo: 'favorito', texto: 'Guarda 3 factos nos favoritos', objetivo: 3, progresso: 0, recompensa: 25, completa: false },
    { id: 'd7', tipo: 'ler', texto: 'Lê 3 factos novos', objetivo: 3, progresso: 0, recompensa: 10, completa: false },
    { id: 'd8', tipo: 'quiz', texto: 'Acerta 3 perguntas no Quiz', objetivo: 3, progresso: 0, recompensa: 50, completa: false },
    
    // As 20 Novas Diárias!
    { id: 'd9', tipo: 'ler', texto: 'Aperitivo: Lê 2 factos rápidos', objetivo: 2, progresso: 0, recompensa: 10, completa: false },
    { id: 'd10', tipo: 'ler', texto: 'Sessão de Leitura: Lê 8 factos', objetivo: 8, progresso: 0, recompensa: 35, completa: false },
    { id: 'd11', tipo: 'ler', texto: 'Explorador Diário: Lê 12 factos', objetivo: 12, progresso: 0, recompensa: 50, completa: false },
    { id: 'd12', tipo: 'ler', texto: 'Devorador: Lê 15 factos', objetivo: 15, progresso: 0, recompensa: 65, completa: false },
    { id: 'd13', tipo: 'ler', texto: 'Vício Rápido: Lê 20 factos', objetivo: 20, progresso: 0, recompensa: 90, completa: false },
    { id: 'd14', tipo: 'ler', texto: 'Maratona Diária: Lê 25 factos', objetivo: 25, progresso: 0, recompensa: 120, completa: false },
    { id: 'd15', tipo: 'ler', texto: 'Um facto por dia: Lê 1 facto', objetivo: 1, progresso: 0, recompensa: 5, completa: false },
    
    { id: 'd16', tipo: 'quiz', texto: 'Desafio Rápido: Acerta 4 perguntas', objetivo: 4, progresso: 0, recompensa: 60, completa: false },
    { id: 'd17', tipo: 'quiz', texto: 'Génio Matinal: Acerta 5 perguntas', objetivo: 5, progresso: 0, recompensa: 75, completa: false },
    { id: 'd18', tipo: 'quiz', texto: 'Sem Espinhas: Acerta 6 perguntas', objetivo: 6, progresso: 0, recompensa: 90, completa: false },
    { id: 'd19', tipo: 'quiz', texto: 'Cérebro Quente: Acerta 7 perguntas', objetivo: 7, progresso: 0, recompensa: 110, completa: false },
    { id: 'd20', tipo: 'quiz', texto: 'Mestre do Quiz Diário: Acerta 8 perguntas', objetivo: 8, progresso: 0, recompensa: 130, completa: false },
    { id: 'd21', tipo: 'quiz', texto: 'Sábio Imbatível: Acerta 10 perguntas', objetivo: 10, progresso: 0, recompensa: 160, completa: false },
    
    { id: 'd22', tipo: 'favorito', texto: 'Apreciador: Guarda 2 factos', objetivo: 2, progresso: 0, recompensa: 20, completa: false },
    { id: 'd23', tipo: 'favorito', texto: 'Bons Gostos: Guarda 4 factos', objetivo: 4, progresso: 0, recompensa: 40, completa: false },
    { id: 'd24', tipo: 'favorito', texto: 'Curador de Conteúdo: Guarda 5 factos', objetivo: 5, progresso: 0, recompensa: 50, completa: false },
    { id: 'd25', tipo: 'favorito', texto: 'Colecionador Diário: Guarda 6 factos', objetivo: 6, progresso: 0, recompensa: 65, completa: false },
    { id: 'd26', tipo: 'favorito', texto: 'Arquivo Vivo: Guarda 7 factos', objetivo: 7, progresso: 0, recompensa: 80, completa: false },
    { id: 'd27', tipo: 'ler', texto: 'Leitura Constante: Lê 18 factos', objetivo: 18, progresso: 0, recompensa: 80, completa: false },
    { id: 'd28', tipo: 'quiz', texto: 'Aquecimento: Acerta 1 pergunta de Quiz', objetivo: 1, progresso: 0, recompensa: 15, completa: false }
  ];
  
  // --- O POTE DE MISSÕES SEMANAIS (Agora com 26 Missões Épicas) ---
  const poolSemanais = [
    // As originais
    { id: 's1', tipo: 'ler', texto: 'Lê 50 factos esta semana', objetivo: 50, progresso: 0, recompensa: 200, completa: false },
    { id: 's2', tipo: 'quiz', texto: 'Acerta 15 perguntas no Quiz', objetivo: 15, progresso: 0, recompensa: 300, completa: false },
    { id: 's3', tipo: 'favorito', texto: 'Guarda 10 factos nos favoritos', objetivo: 10, progresso: 0, recompensa: 150, completa: false },
    { id: 's4', tipo: 'ler', texto: 'Lê 100 factos esta semana', objetivo: 100, progresso: 0, recompensa: 500, completa: false },
    { id: 's5', tipo: 'quiz', texto: 'Acerta 5 perguntas no Quiz', objetivo: 5, progresso: 0, recompensa: 100, completa: false },
    { id: 's6', tipo: 'favorito', texto: 'Guarda 5 factos nos favoritos', objetivo: 5, progresso: 0, recompensa: 80, completa: false },
    
    // As 20 Novas Semanais!
    { id: 's7', tipo: 'ler', texto: 'Estudante Semanal: Lê 30 factos', objetivo: 30, progresso: 0, recompensa: 150, completa: false },
    { id: 's8', tipo: 'ler', texto: 'Rotina de Leitura: Lê 60 factos', objetivo: 60, progresso: 0, recompensa: 250, completa: false },
    { id: 's9', tipo: 'ler', texto: 'Leitor Voraz: Lê 75 factos', objetivo: 75, progresso: 0, recompensa: 350, completa: false },
    { id: 's10', tipo: 'ler', texto: 'Rato de Biblioteca: Lê 120 factos', objetivo: 120, progresso: 0, recompensa: 550, completa: false },
    { id: 's11', tipo: 'ler', texto: 'Erudito: Lê 150 factos esta semana', objetivo: 150, progresso: 0, recompensa: 700, completa: false },
    { id: 's12', tipo: 'ler', texto: 'Maratona Insana: Lê 200 factos', objetivo: 200, progresso: 0, recompensa: 1000, completa: false },
    
    { id: 's13', tipo: 'quiz', texto: 'Desafio Semanal: Acerta 10 perguntas', objetivo: 10, progresso: 0, recompensa: 200, completa: false },
    { id: 's14', tipo: 'quiz', texto: 'Especialista: Acerta 20 perguntas', objetivo: 20, progresso: 0, recompensa: 450, completa: false },
    { id: 's15', tipo: 'quiz', texto: 'Atirador de Elite: Acerta 25 perguntas', objetivo: 25, progresso: 0, recompensa: 550, completa: false },
    { id: 's16', tipo: 'quiz', texto: 'Professor: Acerta 30 perguntas no Quiz', objetivo: 30, progresso: 0, recompensa: 700, completa: false },
    { id: 's17', tipo: 'quiz', texto: 'Lenda do Quiz: Acerta 40 perguntas', objetivo: 40, progresso: 0, recompensa: 900, completa: false },
    { id: 's18', tipo: 'quiz', texto: 'Mente Brilhante: Acerta 50 perguntas!', objetivo: 50, progresso: 0, recompensa: 1200, completa: false },
    
    { id: 's19', tipo: 'favorito', texto: 'Arquivista: Guarda 8 factos favoritos', objetivo: 8, progresso: 0, recompensa: 120, completa: false },
    { id: 's20', tipo: 'favorito', texto: 'Pesquisador: Guarda 12 factos', objetivo: 12, progresso: 0, recompensa: 180, completa: false },
    { id: 's21', tipo: 'favorito', texto: 'Ouro Puro: Guarda 15 factos', objetivo: 15, progresso: 0, recompensa: 250, completa: false },
    { id: 's22', tipo: 'favorito', texto: 'Curador-Chefe: Guarda 20 factos', objetivo: 20, progresso: 0, recompensa: 350, completa: false },
    { id: 's23', tipo: 'favorito', texto: 'Colecionador Compulsivo: Guarda 25 factos', objetivo: 25, progresso: 0, recompensa: 450, completa: false },
    { id: 's24', tipo: 'favorito', texto: 'O Grande Museu: Guarda 30 factos', objetivo: 30, progresso: 0, recompensa: 600, completa: false },
    
    { id: 's25', tipo: 'ler', texto: 'Semana Suave: Lê 40 factos', objetivo: 40, progresso: 0, recompensa: 180, completa: false },
    { id: 's26', tipo: 'quiz', texto: 'Bons Reflexos: Acerta 12 perguntas', objetivo: 12, progresso: 0, recompensa: 250, completa: false }
  ];
  
  // Função mágica que escolhe N missões à sorte do pote
  const sortearMissoes = (pool, quantidade) => {
    // Baralha o array
    const baralhado = [...pool].sort(() => 0.5 - Math.random());
    // Corta o número desejado de missões e faz uma cópia limpa (clone)
    return JSON.parse(JSON.stringify(baralhado.slice(0, quantidade)));
  };
  
  // Em vez de exportar variáveis fixas, agora exportamos funções geradoras!
  export const gerarMissoesDiarias = () => sortearMissoes(poolDiarias, 3); // Dá 3 por dia
  export const gerarMissoesSemanais = () => sortearMissoes(poolSemanais, 2); // Dá 2 por semana