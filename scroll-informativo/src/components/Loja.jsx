import React from 'react';
import { lojaItens } from '../data/lojaItens';

export default function Loja({ progresso, setProgresso }) {
  
  const comprarItem = (id, preco) => {
    // Verifica se tem sementes suficientes e se o item ainda não foi comprado
    if (progresso.sementes >= preco && !progresso.decoracoes.includes(id)) {
      setProgresso(prev => ({
        ...prev,
        sementes: prev.sementes - preco,
        decoracoes: [...(prev.decoracoes || []), id]
      }));
    }
  };

  return (
    <div className="definicoes-container">
      {/* Cabeçalho da Loja */}
      <div className="cabecalho-loja" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
          🏪 Loja da Árvore
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: '0 0 16px 0' }}>
          Usa as tuas sementes para personalizar o teu ecossistema.
        </p>
        
        {/* Contador de Sementes em destaque */}
        <div style={{ 
          background: '#f59e0b', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '14px', 
          fontWeight: 'bold', 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
        }}>
          <span>🌱</span> {progresso.sementes || 0} Sementes
        </div>
      </div>

      {/* Lista de Itens para Venda */}
      <div className="lista-loja" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {lojaItens.map(item => {
          const comprado = (progresso.decoracoes || []).includes(item.id);
          const podeComprar = (progresso.sementes || 0) >= item.preco;

          return (
            <div key={item.id} className="item-venda" style={{ 
              background: 'var(--bg-card)', 
              padding: '16px', 
              borderRadius: '18px', 
              border: comprado ? '2px solid #10b981' : '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease'
            }}>
              {/* Ícone do Item */}
              <div style={{ 
                fontSize: '32px', 
                background: 'var(--bg-app)', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: '14px' 
              }}>
                {item.icone}
              </div>

              {/* Informação do Item */}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>
                  {item.nome}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>

              {/* Botão de Compra ou Estado de Equipado */}
              <div style={{ marginLeft: '8px' }}>
                {comprado ? (
                  <span style={{ 
                    color: '#10b981', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ✓ Obtido
                  </span>
                ) : (
                  <button 
                    onClick={() => comprarItem(item.id, item.preco)}
                    disabled={!podeComprar}
                    style={{
                      background: podeComprar ? 'var(--primary)' : '#e2e8f0',
                      color: podeComprar ? 'white' : '#94a3b8',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      cursor: podeComprar ? 'pointer' : 'not-allowed',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.preco} 🌱
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}