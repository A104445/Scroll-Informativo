import React from 'react';

export default function ArvoreVisual({ tema = "Desconhecido", nivel = 1, decoracoes = [], mostrarEtiqueta = true }) {
  const coresTemas = {
    programacao: '#3b82f6', tecnologia: '#0ea5e9', ciencia: '#22c55e', 
    historia: '#eab308', arquitetura: '#94a3b8', fotografia: '#06b6d4', 
    sobrevivencia: '#ef4444', curiosidades: '#f472b6',
    produtividade: '#a855f7', espaco: '#6366f1', biologia: '#84cc16', 
    arte: '#ec4899', musica: '#8b5cf6', literatura: '#f43f5e', 
    filosofia: '#a8a29e', geografia: '#14b8a6',
    natureza: '#16a34a', animais: '#f97316', cultura: '#d946ef', 
    psicologia: '#c026d3', desporto: '#f59e0b', gastronomia: '#fb923c', 
    cinema: '#475569', saude: '#10b981',
    politica: '#1e293b', economia: '#059669', moda: '#db2777', 
    viagens: '#0891b2', automoveis: '#4b5563', jogos: '#7c3aed', religiao: '#b45309',
    musculacao: '#64748b', perda_de_peso: '#0d9488', motivacao: '#be123c',        
    default: '#10b981'
  };

  const formatar = (t) => t?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_');
  const corCopa = coresTemas[formatar(tema)] || coresTemas.default;
  
  // MATEMÁTICA BASE
  const nivelVisual = Math.min(Math.max(nivel, 1), 20); 
  const alturaTronco = 30 + (nivelVisual * 6); 
  const grossuraBase = 8 + (nivelVisual * 1.2);
  const grossuraTopo = 4 + (nivelVisual * 0.6);
  const raioCopa = 15 + (nivelVisual * 3.5);

  const baseTroncoY = 230;
  const topoTroncoY = baseTroncoY - alturaTronco;

  // COORDENADAS RAMOS
  const ramoDirY = baseTroncoY - alturaTronco * 0.6;
  const ramoDirCorda1X = 100 + raioCopa * 0.6;
  const ramoDirCorda2X = 100 + raioCopa * 0.8;
  const ramoEsqY = baseTroncoY - alturaTronco * 0.7;
  const ramoEsqX = 100 - raioCopa * 0.7;

  const escalaDeco = 0.6 + (nivelVisual / 20) * 0.6;

  return (
    <div className="arvore-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 250" className="arvore-svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 5px 8px rgba(0,0,0,0.15))', overflow: 'visible' }}>
        
        <defs>
          <filter id="sombra-suave"><feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/></filter>
          <linearGradient id="gradTronco" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#381a0b"/><stop offset="40%" stopColor="#5c2b12"/><stop offset="80%" stopColor="#78350f"/><stop offset="100%" stopColor="#381a0b"/>
          </linearGradient>
          <radialGradient id="gradVolume" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/><stop offset="70%" stopColor="#000000" stopOpacity="0.1"/><stop offset="100%" stopColor="#000000" stopOpacity="0.5"/>
          </radialGradient>
          <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1"/><stop offset="100%" stopColor="#fef08a" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Chão */}
        <ellipse cx="100" cy="232" rx="70" ry="8" fill="#e2e8f0" opacity="0.6" />
        <line x1="20" y1="230" x2="180" y2="230" stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />

        {/* ITEM NOVO: FLORES (Nível 2+) */}
        {decoracoes.includes('flores') && nivel >= 2 && (
          <g filter="url(#sombra-suave)">
            <g transform={`translate(115, 230) scale(${escalaDeco})`}>
              <line x1="0" y1="0" x2="0" y2="-10" stroke="#22c55e" strokeWidth="2"/>
              <circle cx="0" cy="-12" r="3" fill="#fbcfe8"/>
              <circle cx="-3" cy="-9" r="3" fill="#fbcfe8"/>
              <circle cx="3" cy="-9" r="3" fill="#fbcfe8"/>
              <circle cx="0" cy="-10" r="1.5" fill="#fcd34d"/>
            </g>
            <g transform={`translate(125, 232) scale(${escalaDeco * 0.8})`}>
              <line x1="0" y1="0" x2="-2" y2="-8" stroke="#22c55e" strokeWidth="2"/>
              <circle cx="-2" cy="-9" r="2.5" fill="#c084fc"/>
              <circle cx="-4" cy="-6" r="2.5" fill="#c084fc"/>
              <circle cx="0" cy="-6" r="2.5" fill="#c084fc"/>
              <circle cx="-2" cy="-7" r="1" fill="#fcd34d"/>
            </g>
          </g>
        )}

        {/* Cogumelos (Nível 3+) */}
        {decoracoes.includes('cogumelos') && nivel >= 3 && (
          <g transform={`translate(80, ${baseTroncoY}) scale(${escalaDeco})`} filter="url(#sombra-suave)">
            <path d="M 5 0 L 5 -12 L 9 -12 L 9 0 Z" fill="#f8fafc" />
            <path d="M 0 -10 Q 7 -20 14 -10 Z" fill="#ef4444" />
            <path d="M 25 0 L 25 -16 L 29 -16 L 29 0 Z" fill="#f8fafc" />
            <path d="M 17 -16 Q 27 -30 37 -16 Z" fill="#ef4444" />
          </g>
        )}

        {/* Tronco & Ramos */}
        <path d={`M ${100 - grossuraBase/2} ${baseTroncoY} L ${100 - grossuraTopo/2} ${topoTroncoY + 10} L ${100 + grossuraTopo/2} ${topoTroncoY + 10} L ${100 + grossuraBase/2} ${baseTroncoY} Z`} fill="url(#gradTronco)" />
        <g stroke="url(#gradTronco)" strokeLinecap="round" fill="none">
          <path d={`M 100 ${baseTroncoY - alturaTronco*0.5} Q 80 ${baseTroncoY - alturaTronco*0.6} ${ramoEsqX} ${ramoEsqY}`} strokeWidth={grossuraTopo * 0.9} />
          <path d={`M 100 ${baseTroncoY - alturaTronco*0.4} Q 130 ${baseTroncoY - alturaTronco*0.55} ${ramoDirCorda2X + 5} ${ramoDirY}`} strokeWidth={grossuraTopo * 0.8} />
        </g>

        {/* Baloiço (Nível 10+) */}
        {decoracoes.includes('baloico') && nivel >= 10 && (
          <g filter="url(#sombra-suave)">
            <line x1={ramoDirCorda1X} y1={ramoDirY + 2} x2={ramoDirCorda1X} y2={baseTroncoY - 15} stroke="#334155" strokeWidth="1" />
            <line x1={ramoDirCorda2X} y1={ramoDirY + 5} x2={ramoDirCorda2X} y2={baseTroncoY - 15} stroke="#334155" strokeWidth="1" />
            <line x1={ramoDirCorda1X - 5} y1={baseTroncoY - 15} x2={ramoDirCorda2X + 5} y2={baseTroncoY - 15} stroke="#5c2b12" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* Ninho (Nível 7+) e ITEM NOVO: PASSARINHO (Nível 9+) */}
        {decoracoes.includes('ninho') && nivel >= 7 && (
          <g transform={`translate(${ramoEsqX}, ${ramoEsqY}) scale(${escalaDeco})`} filter="url(#sombra-suave)">
            {/* O Passarinho (só aparece se comprado e se tiver o ninho) */}
            {decoracoes.includes('passarinho') && nivel >= 9 && (
              <g transform="translate(0, -6)">
                <ellipse cx="0" cy="0" rx="4" ry="3" fill="#60a5fa" /> {/* Corpo Azul */}
                <circle cx="-3" cy="-2" r="2.5" fill="#60a5fa" /> {/* Cabeça */}
                <path d="M -5 -2 L -8 -1 L -5 0 Z" fill="#fbbf24" /> {/* Bico Amarelo */}
                <circle cx="-4" cy="-2.5" r="0.5" fill="#000" /> {/* Olho */}
              </g>
            )}
            {/* O Ninho por cima de metade do passarinho */}
            <ellipse cx="-4" cy="-4" rx="3" ry="4" fill="#e0f2fe" />
            <ellipse cx="4" cy="-3" rx="3" ry="4" fill="#e0f2fe" />
            <path d="M -12 0 C -12 12, 12 12, 12 0 Z" fill="#451a03" />
          </g>
        )}

        {/* Copa (Bolhas Clássicas) */}
        <g filter="url(#sombra-suave)">
          <g fill={corCopa}>
            <circle cx="100" cy={topoTroncoY} r={raioCopa} />
            <circle cx={100 - raioCopa*0.5} cy={topoTroncoY + 15} r={raioCopa * 0.75} />
            <circle cx={100 + raioCopa*0.5} cy={topoTroncoY + 25} r={raioCopa * 0.65} />
            <circle cx="100" cy={topoTroncoY - raioCopa * 0.6} r={raioCopa * 0.85} />
          </g>
          <g fill="url(#gradVolume)">
            <circle cx="100" cy={topoTroncoY} r={raioCopa} />
            <circle cx={100 - raioCopa*0.5} cy={topoTroncoY + 15} r={raioCopa * 0.75} />
            <circle cx={100 + raioCopa*0.5} cy={topoTroncoY + 25} r={raioCopa * 0.65} />
            <circle cx="100" cy={topoTroncoY - raioCopa * 0.6} r={raioCopa * 0.85} />
          </g>
        </g>

        {/* ITEM NOVO: BORBOLETAS (Nível 6+) */}
        {decoracoes.includes('borboletas') && nivel >= 6 && (
          <g fill="#fde047" filter="url(#sombra-suave)">
            {/* Borboleta 1 */}
            <g transform={`translate(${100 - raioCopa*0.8}, ${topoTroncoY - raioCopa*0.3}) rotate(-15) scale(${escalaDeco})`}>
              <path d="M 0 0 Q -5 -8 -8 0 Q -5 8 0 0 Z" />
              <path d="M 0 0 Q 5 -8 8 0 Q 5 8 0 0 Z" />
            </g>
            {/* Borboleta 2 */}
            <g transform={`translate(${100 + raioCopa*0.6}, ${topoTroncoY - raioCopa*0.7}) rotate(25) scale(${escalaDeco * 0.8})`} fill="#fb923c">
              <path d="M 0 0 Q -5 -8 -8 0 Q -5 8 0 0 Z" />
              <path d="M 0 0 Q 5 -8 8 0 Q 5 8 0 0 Z" />
            </g>
          </g>
        )}

        {/* Frutos (Nível 5+) */}
        {decoracoes.includes('frutos') && nivel >= 5 && (
          <g fill="#ef4444" filter="url(#sombra-suave)">
            <circle cx="100" cy={topoTroncoY + 5} r="3" />
            <circle cx={100 - raioCopa*0.4} cy={topoTroncoY - 5} r="2.5" />
            <circle cx={100 + raioCopa*0.3} cy={topoTroncoY + 15} r="3.5" />
          </g>
        )}

        {/* Luzes (Nível 12+) */}
        {decoracoes.includes('luzes') && nivel >= 12 && (
          <g>
            <circle cx={100 - raioCopa*0.3} cy={topoTroncoY + raioCopa*0.4} r={3 + nivelVisual*0.2} fill="url(#gradGlow)" />
            <circle cx={100 - raioCopa*0.3} cy={topoTroncoY + raioCopa*0.4} r="1" fill="#ffffff" />
            <circle cx={100 + raioCopa*0.4} cy={topoTroncoY - raioCopa*0.5} r={2.5 + nivelVisual*0.2} fill="url(#gradGlow)" />
            <circle cx={100 + raioCopa*0.4} cy={topoTroncoY - raioCopa*0.5} r="1" fill="#ffffff" />
          </g>
        )}
      </svg>
      {mostrarEtiqueta && (
        <div className="etiqueta-mente" style={{ marginTop: '10px', textAlign: 'center', background: 'var(--bg-card)', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <strong style={{ color: corCopa, textTransform: 'capitalize' }}>{tema.replace('_', ' ')}</strong>
        </div>
      )}
    </div>
  );
}