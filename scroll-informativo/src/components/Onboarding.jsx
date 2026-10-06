import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Onboarding({ onComecar }) {
  const { t } = useTranslation();

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'var(--bg-app)', zIndex: 10000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '30px', textAlign: 'center'
    }}>
      <div style={{
        background: 'var(--bg-card)', padding: '40px 20px', borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '380px'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '20px', lineHeight: '1' }}>📚</div>
        
        <h1 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--text-primary)', lineHeight: '1.2' }}>
          {t('onboarding_titulo', 'Welcome to InfoScroll! 🌱')}
        </h1>
        
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
          {t('onboarding_texto', 'Swipe vertically to discover fascinating facts. Test your knowledge with quizzes, earn XP, and grow your digital garden!')}
        </p>
        
        <button 
          onClick={onComecar}
          className="btn-primario"
          style={{ width: '100%', marginTop: '0', fontSize: '18px', padding: '16px', borderRadius: '16px' }}
        >
          {t('onboarding_botao', 'Start Exploring')}
        </button>
      </div>
    </div>
  );
}