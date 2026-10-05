import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BotaoAjuda() {
  const { t } = useTranslation();
  const [mostrarAjuda, setMostrarAjuda] = useState(false);

  return (
    <>
      {/* Botão de Ajuda (?) no canto superior */}
      <button 
        onClick={() => setMostrarAjuda(true)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
        title="Help"
      >
        ?
      </button>

      {/* Modal explicativa */}
      {mostrarAjuda && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setMostrarAjuda(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--bg-app)', width: '100%', maxWidth: '340px',
            borderRadius: '20px', padding: '24px', position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)', color: 'var(--text-primary)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>
              💡 {t('ajuda_titulo', 'What is InfoScroll?')}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              {t('ajuda_texto', 'InfoScroll is your micro-learning ecosystem. Swipe through fascinating facts, test your memory with quizzes, earn XP, and customize your garden!')}
            </p>
            <button 
              onClick={() => setMostrarAjuda(false)}
              style={{
                background: 'var(--primary)', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold',
                cursor: 'pointer', width: '100%'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}