export default function Evolucao({ progresso }) {
    // Calcular o nível com base no XP total (cada 100 XP = 1 Nível)
    const nivel = Math.floor(progresso.xp_total / 100) + 1;
    const xpParaProximoNivel = 100 - (progresso.xp_total % 100);
    const percentagemNivel = (progresso.xp_total % 100);
  
    // Ordenar as categorias por quem tem mais XP
    const categoriasOrdenadas = Object.entries(progresso.categorias)
      .sort((a, b) => b[1] - a[1]);
  
    return (
      <div className="definicoes-container" style={{ paddingTop: '40px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>A Tua Mente</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
          A tua árvore de conhecimento cresce a cada facto lido.
        </p>
  
        {/* Cartão de Nível Principal */}
        <div className="cartao-nivel">
          <div className="icone-arvore">
            {nivel < 3 ? '🌱' : nivel < 10 ? '🌿' : '🌳'}
          </div>
          <div className="info-nivel">
            <h3>Nível {nivel}</h3>
            <p>{progresso.xp_total} XP Total</p>
          </div>
        </div>
  
        {/* Barra de Progresso */}
        <div className="barra-progresso-container">
          <div className="barra-progresso-fundo">
            <div 
              className="barra-progresso-enchimento" 
              style={{ width: `${percentagemNivel}%` }}
            ></div>
          </div>
          <p className="texto-xp-falta">Faltam {xpParaProximoNivel} XP para evoluir</p>
        </div>
  
        {/* Estatísticas por Tema */}
        <div className="estatisticas-temas">
          <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Conhecimento por Tema</h3>
          
          {categoriasOrdenadas.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>Ainda não leste factos suficientes.</p>
          )}
  
          {categoriasOrdenadas.map(([categoria, xp]) => (
            <div key={categoria} className="item-estatistica">
              <span className="nome-categoria">{categoria}</span>
              <span className="xp-categoria">{xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    );
  }