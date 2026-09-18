import React from 'react';
import { conquistasLista } from '../data/conquistasLista.js';
import { useTranslation } from 'react-i18next';

export default function Conquistas({ progresso, nivel }) {
  const { t } = useTranslation();

  return (
    <div className="definicoes-container">
      <h2 style={{ marginBottom: '20px' }}>🏆 {t('galeria', 'Galeria de Troféus')}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '14px' }}>
        {t('desbloqueia_medalhas', 'Desbloqueia medalhas raras explorando o InfoScroll.')}
      </p>
      <div className="grid-conquistas-grande">
        {conquistasLista.map(c => {
          const desbloqueada = c.req(progresso, nivel);
          return (
            <div key={c.id} className={`card-trofeu ${desbloqueada ? 'ganho' : 'bloqueado'}`}>
              <div className="trofeu-emblema">{c.icone}</div>
              <div className="trofeu-info">
                <h4>{t('conq_' + c.id + '_nome', c.nome)}</h4>
                <p>{t('conq_' + c.id + '_desc', c.desc)}</p>
              </div>
              {desbloqueada && <div className="selo-check">✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}