import { useState, useEffect, useMemo, useRef } from 'react';
import factosBase from './data/factos.json';
import perguntasBase from './data/perguntas.json';
import { gerarMissoesDiarias, gerarMissoesSemanais, getSemanaAtual } from './data/missoesTemplate';import Feed from './components/Feed';
import Settings from './components/Settings';
import Evolucao from './components/Evolucao';
import Conquistas from './components/Conquistas';
import Loja from './components/Loja';
import './App.css';

// Baralha a base uma única vez para manter a estabilidade do scroll durante a sessão
const baralharArray = (array) => {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const todosOsFactos = baralharArray(factosBase);
const categoriasDisponiveis = [...new Set(factosBase.map(c => c.categoria))].sort();

function App() {
  const [tabAtiva, setTabAtiva] = useState('feed'); 
  const [temaMatrix, setTemaMatrix] = useState(false);
  
  // ESTADO DE PROGRESSO (Sincronizado com LocalStorage e Auto-Reparador)
  const [progresso, setProgresso] = useState(() => {
    const guardado = localStorage.getItem('infoscroll-progresso');
    const defaultProgresso = { 
      xp_total: 0, 
      categorias: {}, 
      lidos: [], 
      quizes: [],
      streak: { dias: 0, ultimaData: null },
      comboQuiz: 0, 
      badges: [],
      historicoLidos: {}, 
      sementes: 0, 
      decoracoes: [], 
      missoes: { 
        diarias: { data: null, lista: [] }, 
        semanais: { semana: null, lista: [] } 
      },
      estatisticas: { lidosDeNoite: 0, lidosCedo: 0, quizesSeguidos: 0, favoritosGuardados: 0 }
    };

    if (guardado) {
      let parseado = JSON.parse(guardado);
      
      // AUTO-REPARADOR: Se o save for antigo e não tiver a gaveta "diarias", forçamos o novo formato
      if (!parseado.missoes || !parseado.missoes.diarias) {
        parseado.missoes = defaultProgresso.missoes;
      }
      
      // Garante que o histórico de estatísticas existe sempre
      if (!parseado.estatisticas) {
        parseado.estatisticas = defaultProgresso.estatisticas;
      }

      return { ...defaultProgresso, ...parseado };
    }
    
    return defaultProgresso;
  });

  const [categoriasAtivas, setCategoriasAtivas] = useState(() => {
    const g = localStorage.getItem('categorias-infoscroll'); 
    return g ? JSON.parse(g) : []; 
  });
  
  const [favoritos, setFavoritos] = useState(() => {
    const g = localStorage.getItem('favoritos-infoscroll'); 
    return g ? JSON.parse(g) : [];
  });

  // Persistência de Dados
  useEffect(() => { localStorage.setItem('infoscroll-progresso', JSON.stringify(progresso)); }, [progresso]);
  useEffect(() => { localStorage.setItem('categorias-infoscroll', JSON.stringify(categoriasAtivas)); }, [categoriasAtivas]);
  useEffect(() => { localStorage.setItem('favoritos-infoscroll', JSON.stringify(favoritos)); }, [favoritos]);

  // Notificações PWA
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Lógica de Resets (Diário e Semanal) e Streaks
  useEffect(() => {
    const hoje = new Date().toDateString();
    const semanaCorrente = getSemanaAtual();

    setProgresso(prev => {
      let novo = { ...prev };
      
      // Se for um dia novo, GERA missões diárias novas!
      if (novo.missoes.diarias.data !== hoje) {
        novo.missoes.diarias = { data: hoje, lista: gerarMissoesDiarias() };
      }
      
      // Se for uma semana nova, GERA missões semanais novas!
      if (novo.missoes.semanais.semana !== semanaCorrente) {
        novo.missoes.semanais = { semana: semanaCorrente, lista: gerarMissoesSemanais() };
      }

      if (novo.streak.ultimaData !== hoje) {
        const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
        novo.streak.dias = (novo.streak.ultimaData === ontem.toDateString()) ? novo.streak.dias + 1 : 1;
        novo.streak.ultimaData = hoje;
      }
      return novo;
    });
  }, []);  

  const atualizarMissao = (tipo, quantidade = 1) => {
    setProgresso(prev => {
      let xpExtra = 0;
      const processarLista = (lista) => lista.map(m => {
        if (m.tipo === tipo && !m.completa) {
          const nProg = m.progresso + quantidade;
          if (nProg >= m.objetivo) {
            xpExtra += m.recompensa;
            return { ...m, progresso: m.objetivo, completa: true };
          }
          return { ...m, progresso: nProg };
        }
        return m;
      });

      const novasDiarias = processarLista(prev.missoes.diarias.lista);
      const novasSemanais = processarLista(prev.missoes.semanais.lista);
      
      return { 
        ...prev, 
        xp_total: prev.xp_total + xpExtra,
        sementes: (prev.sementes || 0) + Math.floor(xpExtra / 5),
        missoes: { 
          diarias: { ...prev.missoes.diarias, lista: novasDiarias },
          semanais: { ...prev.missoes.semanais, lista: novasSemanais }
        } 
      };
    });
  };

  const handleLerFacto = (id, categoria) => {
    setProgresso(prev => {
      const hist = prev.historicoLidos || {};
      const vezesLido = hist[id] || 0;
      const isPrimeiraVez = vezesLido === 0;

      const baseXP = isPrimeiraVez ? 5 : 1; 
      const xpGanho = prev.streak.dias >= 7 ? baseXP * 2 : baseXP;
      const hora = new Date().getHours();
      
      // A MAGIA ESTÁ AQUI: Garante sempre pelo menos 1 semente por leitura!
      const sementesGanhas = Math.max(1, Math.floor(xpGanho / 5));
      
      return {
        ...prev,
        xp_total: prev.xp_total + xpGanho,
        sementes: (prev.sementes || 0) + sementesGanhas,
        categorias: { ...prev.categorias, [categoria]: (prev.categorias[categoria] || 0) + xpGanho },
        lidos: isPrimeiraVez ? [...prev.lidos, id] : prev.lidos,
        historicoLidos: { ...hist, [id]: vezesLido + 1 },
        estatisticas: { 
          ...prev.estatisticas, 
          lidosDeNoite: prev.estatisticas.lidosDeNoite + (hora >= 23 || hora < 4 ? 1 : 0),
          lidosCedo: prev.estatisticas.lidosCedo + (hora >= 6 && hora < 9 ? 1 : 0)
        }
      };
    });
    atualizarMissao('ler');
  };

  const handleResponderQuiz = (quizId, categoria, acertou) => {
    setProgresso(prev => {
      if (prev.quizes.includes(quizId)) return prev;
      let novo = { ...prev, quizes: [...prev.quizes, quizId] };
      if (acertou) {
        const novoCombo = prev.comboQuiz + 1;
        const xpGanho = 50 * novoCombo;
        novo.comboQuiz = novoCombo;
        novo.estatisticas.quizesSeguidos += 1;
        novo.xp_total += xpGanho;
        novo.sementes = (novo.sementes || 0) + Math.floor(xpGanho / 5);
        novo.categorias[categoria] = (novo.categorias[categoria] || 0) + xpGanho;
      } else {
        novo.comboQuiz = 0; novo.estatisticas.quizesSeguidos = 0;
      }
      return novo;
    });
    if (acertou) atualizarMissao('quiz');
  };

  const alternarFavorito = (id) => {
    const adicionando = !favoritos.includes(id);
    setFavoritos(prev => adicionando ? [...prev, id] : prev.filter(favId => favId !== id));
    if (adicionando) {
      atualizarMissao('favorito');
      setProgresso(prev => ({ 
        ...prev, 
        estatisticas: { ...prev.estatisticas, favoritosGuardados: prev.estatisticas.favoritosGuardados + 1 } 
      }));
    }
  };

  // Lógica de filtragem do Feed
  const feedMisto = useMemo(() => {
    let filtrados = todosOsFactos.filter(f => {
      if (tabAtiva === 'favoritos') return favoritos.includes(f.id);
      return categoriasAtivas.length === 0 || categoriasAtivas.includes(f.categoria);
    });

    const lista = []; 
    let contador = 0;
    filtrados.forEach((facto) => {
      lista.push({ tipo: 'facto', data: facto }); 
      contador++;
      if (tabAtiva === 'feed' && contador % 5 === 0) {
        const p = perguntasBase.find(p => p.facto_id === facto.id);
        if (p) lista.push({ tipo: 'quiz', data: p, categoriaOriginal: facto.categoria });
      }
    });
    return lista;
  }, [tabAtiva, categoriasAtivas, favoritos]); 

  const nivel = Math.floor(progresso.xp_total / 100) + 1;

  const [indiceFeedGuardado, setIndiceFeedGuardado] = useState(0);

  return (
    <div className={`app-container ${temaMatrix ? 'tema-matrix' : ''}`}>
      {(tabAtiva === 'feed' || tabAtiva === 'favoritos') && (
        <div className="hud-gamificacao">
          <div className="hud-item sementes" style={{borderColor: '#f59e0b', color: '#b45309'}}>🌱 {progresso.sementes || 0}</div>
          <div className="hud-item streak">🔥 {progresso.streak.dias}</div>
          {progresso.comboQuiz > 1 && <div className="hud-item combo">⚡ x{progresso.comboQuiz}</div>}
        </div>
      )}

      <div className="conteudo-principal">
        {(tabAtiva === 'feed' || tabAtiva === 'favoritos') && (
          <Feed 
            itensMistos={feedMisto} 
            favoritos={favoritos} 
            alternarFavorito={alternarFavorito} 
            onLerFacto={handleLerFacto} 
            onResponderQuiz={handleResponderQuiz} 
            indiceGuardado={indiceFeedGuardado}
            setIndiceGuardado={setIndiceFeedGuardado}
          />
        )}
        
        {tabAtiva === 'favoritos' && feedMisto.length === 0 && (
          <div className="mensagem-vazio">
            <h2>Sem Guardados ❤️</h2>
            <p>Clica no coração de um facto e ele aparecerá aqui.</p>
          </div>
        )}

        {tabAtiva === 'conquistas' && <Conquistas progresso={progresso} nivel={nivel} />}
        {tabAtiva === 'evolucao' && <Evolucao progresso={progresso} nivel={nivel} temaMatrix={temaMatrix} setTemaMatrix={setTemaMatrix} />}
        {tabAtiva === 'loja' && <Loja progresso={progresso} setProgresso={setProgresso} />}
        {tabAtiva === 'categorias' && <Settings categorias={categoriasDisponiveis} categoriasAtivas={categoriasAtivas} setCategoriasAtivas={setCategoriasAtivas} />}
      </div>

      <nav className="bottom-nav">
        <button className={`nav-item ${tabAtiva === 'feed' ? 'ativo' : ''}`} onClick={() => setTabAtiva('feed')}><span className="nav-icone">🏠</span></button>
        <button className={`nav-item ${tabAtiva === 'conquistas' ? 'ativo' : ''}`} onClick={() => setTabAtiva('conquistas')}><span className="nav-icone">🏆</span></button>
        <button className={`nav-item ${tabAtiva === 'evolucao' ? 'ativo' : ''}`} onClick={() => setTabAtiva('evolucao')}><span className="nav-icone">🌱</span></button>
        <button className={`nav-item ${tabAtiva === 'loja' ? 'ativo' : ''}`} onClick={() => setTabAtiva('loja')}><span className="nav-icone">🏪</span></button>
        <button className={`nav-item ${tabAtiva === 'favoritos' ? 'ativo' : ''}`} onClick={() => setTabAtiva('favoritos')}><span className="nav-icone">❤️</span></button>
        <button className={`nav-item ${tabAtiva === 'categorias' ? 'ativo' : ''}`} onClick={() => setTabAtiva('categorias')}><span className="nav-icone">📔</span></button>
      </nav>
    </div>
  );
}

export default App;