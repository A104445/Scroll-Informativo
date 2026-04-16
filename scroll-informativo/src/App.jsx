import { useState, useEffect } from 'react';
import factosBase from './data/factos.json';       // LÊ O NOVO FICHEIRO DE FACTOS
import perguntasBase from './data/perguntas.json'; // LÊ O FICHEIRO DE PERGUNTAS
import Feed from './components/Feed';
import Settings from './components/Settings';
import Evolucao from './components/Evolucao';      // NOVO SEPARADOR
import './App.css';

const baralharArray = (array) => {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

// Baralha ao iniciar
const todosOsFactos = baralharArray(factosBase);
const categoriasDisponiveis = [...new Set(todosOsFactos.map(c => c.categoria))].sort();

function App() {
  const [tabAtiva, setTabAtiva] = useState('feed'); 
  
  // ESTADO: Progresso e XP
  const [progresso, setProgresso] = useState(() => {
    const guardado = localStorage.getItem('infoscroll-progresso');
    return guardado ? JSON.parse(guardado) : { xp_total: 0, categorias: {}, lidos: [], quizes: [] };
  });

  const [categoriasAtivas, setCategoriasAtivas] = useState(() => {
    const guardadas = localStorage.getItem('categorias-infoscroll');
    return guardadas ? JSON.parse(guardadas) : []; 
  });
  
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos-infoscroll');
    return guardados ? JSON.parse(guardados) : [];
  });

  // Guardar memórias sempre que mudam
  useEffect(() => { localStorage.setItem('infoscroll-progresso', JSON.stringify(progresso)); }, [progresso]);
  useEffect(() => { localStorage.setItem('categorias-infoscroll', JSON.stringify(categoriasAtivas)); }, [categoriasAtivas]);
  useEffect(() => { localStorage.setItem('favoritos-infoscroll', JSON.stringify(favoritos)); }, [favoritos]);

  const alternarFavorito = (id) => {
    setFavoritos(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };

  // SISTEMA DE XP: Leitura Passiva (+5 XP)
  const handleLerFacto = (id, categoria) => {
    setProgresso(prev => {
      if (prev.lidos.includes(id)) return prev; // Se já leu, não ganha XP repetido
      return {
        ...prev,
        xp_total: prev.xp_total + 5,
        categorias: { ...prev.categorias, [categoria]: (prev.categorias[categoria] || 0) + 5 },
        lidos: [...prev.lidos, id]
      };
    });
  };

  // SISTEMA DE XP: Quiz Ativo (+50 XP)
  const handleResponderQuiz = (quizId, categoria, acertou) => {
    if (!acertou) return; // Só ganha XP se acertar
    setProgresso(prev => {
      if (prev.quizes.includes(quizId)) return prev;
      return {
        ...prev,
        xp_total: prev.xp_total + 50,
        categorias: { ...prev.categorias, [categoria]: (prev.categorias[categoria] || 0) + 50 },
        quizes: [...prev.quizes, quizId]
      };
    });
  };

  // FILTRAGEM E INJEÇÃO DO QUIZ
  const factosFiltrados = todosOsFactos.filter(f => {
    if (tabAtiva === 'favoritos') return favoritos.includes(f.id);
    return categoriasAtivas.length === 0 || categoriasAtivas.includes(f.categoria);
  });

  // Criar o Feed Misto (Facto, Facto, Facto, Quiz...)
  const feedMisto = [];
  let contadorDeFatos = 0;

  factosFiltrados.forEach((facto) => {
    feedMisto.push({ tipo: 'facto', data: facto });
    contadorDeFatos++;

    // A cada 5 factos normais no Feed principal, injetamos 1 Quiz
    if (tabAtiva === 'feed' && contadorDeFatos % 5 === 0) {
      const perguntaCorrespondente = perguntasBase.find(p => p.facto_id === facto.id);
      if (perguntaCorrespondente) {
        feedMisto.push({ tipo: 'quiz', data: perguntaCorrespondente, categoriaOriginal: facto.categoria });
      }
    }
  });

  return (
    <div className="app-container">
      <div className="conteudo-principal">
        {tabAtiva === 'categorias' && <Settings categorias={categoriasDisponiveis} categoriasAtivas={categoriasAtivas} setCategoriasAtivas={setCategoriasAtivas} />}
        {tabAtiva === 'evolucao' && <Evolucao progresso={progresso} />}
        {(tabAtiva === 'feed' || tabAtiva === 'favoritos') && (
          <Feed 
            itensMistos={feedMisto} 
            favoritos={favoritos}
            alternarFavorito={alternarFavorito}
            irParaDefinicoes={() => setTabAtiva('categorias')} 
            onLerFacto={handleLerFacto}
            onResponderQuiz={handleResponderQuiz}
          />
        )}
      </div>

      <nav className="bottom-nav">
        <button className={`nav-item ${tabAtiva === 'feed' ? 'ativo' : ''}`} onClick={() => setTabAtiva('feed')}>
          <span className="nav-icone">🏠</span><span className="nav-texto">Feed</span>
        </button>
        <button className={`nav-item ${tabAtiva === 'favoritos' ? 'ativo' : ''}`} onClick={() => setTabAtiva('favoritos')}>
          <span className="nav-icone">❤️</span><span className="nav-texto">Guardados</span>
        </button>
        <button className={`nav-item ${tabAtiva === 'categorias' ? 'ativo' : ''}`} onClick={() => setTabAtiva('categorias')}>
          <span className="nav-icone">📑</span><span className="nav-texto">Temas</span>
        </button>
        <button className={`nav-item ${tabAtiva === 'evolucao' ? 'ativo' : ''}`} onClick={() => setTabAtiva('evolucao')}>
          <span className="nav-icone">🌱</span><span className="nav-texto">Evolução</span>
        </button>
      </nav>
    </div>
  );
}

export default App;