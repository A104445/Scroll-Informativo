import React, { useState } from 'react';
import ArvoreVisual from './ArvoreVisual';
import { useTranslation } from 'react-i18next';

export default function Evolucao({ progresso, nivel, temaMatrix, setTemaMatrix }) {
  const { t } = useTranslation();
  const [arvoreFocada, setArvoreFocada] = useState(null);

  const xpParaProximoNivel = 100 - (progresso.xp_total % 100);
  const percentagemNivel = (progresso.xp_total % 100);
  const listaArvores = Object.entries(progresso.categorias || {}).sort((a, b) => b[1] - a[1]);
  const fecharZoom = () => setArvoreFocada(null);

  const renderizarMissao = (m) => (
    <div key={m.id} className={`cartao-missao ${m.completa ? 'completa' : ''}`} style={{ marginBottom: '10px' }}>
      <div className="missao-info">
        <h4 style={{ margin: '0 0 5px' }}>{t('missao_' + m.id, m.texto)}</h4>
        <div className="mini-barra"><div style={{width: `${(m.progresso/m.objetivo)*100}%`}}></div></div>
      </div>
      <div className="missao-recompensa">+{m.recompensa} XP</div>
    </div>
  );

  return (
    <div className="definicoes-container" style={{ position: 'relative' }}>
      <div className="cabecalho-evolucao" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', margin: 0 }}>🌲 {t('teu_jardim', 'O Teu Jardim')}</h2>
        <div className="badge-nivel" style={{ background: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
          {t('nivel', 'Nível')} {nivel}
        </div>
      </div>

      <div className="barra-progresso-container" style={{ marginBottom: '30px' }}>
        <div className="info-xp-topo">
          <span className="label-xp">{t('xp_total', 'XP Total:')} <strong>{progresso.xp_total}</strong></span>
          <span className="label-xp">{percentagemNivel}/100 XP</span>
        </div>
        <div className="barra-progresso-fundo">
          <div className="barra-progresso-enchimento" style={{ width: `${percentagemNivel}%` }}></div>
        </div>
        <p className="texto-xp-falta" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          {t('faltam_xp', { xp: xpParaProximoNivel, defaultValue: `Faltam ${xpParaProximoNivel} XP para o nível global subir!` })}
        </p>
      </div>

      <h3 style={{ marginBottom: '15px', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>{t('especies', 'Espécies Plantadas')}</h3>

      {listaArvores.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-card)', borderRadius: '16px' }}>
          <p style={{ fontSize: '40px', margin: '0 0 10px 0' }}>🍃</p>
          <p style={{ color: 'var(--text-secondary)' }}>{t('jardim_vazio', 'O teu jardim está vazio. Lê o teu primeiro facto no Feed para plantares uma semente!')}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '15px' }}>
          {listaArvores.map(([tema, xp]) => {
            const nivelTema = Math.floor(xp / 100) + 1;
            return (
              <div 
                key={tema} 
                onClick={() => setArvoreFocada({ tema, xp, nivelTema })}
                style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: '16px', 
                  padding: '15px 10px', 
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ height: '110px', width: '110px' }}>
                  <ArvoreVisual tema={tema} nivel={nivelTema} decoracoes={progresso.decoracoes} mostrarEtiqueta={false} />
                </div>
                <strong style={{ fontSize: '13px', textTransform: 'capitalize', marginTop: '12px', textAlign: 'center' }}>
                  {t('tema_' + tema.replace(/\s+/g, '_'), tema.replace('_', ' '))}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Lvl {nivelTema}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {arvoreFocada && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }} onClick={fecharZoom}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--bg-app)', width: '100%', maxWidth: '380px',
            borderRadius: '24px', padding: '30px', position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <button onClick={fecharZoom} style={{
              position: 'absolute', top: '15px', right: '15px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '50%', width: '35px', height: '35px',
              fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: 'var(--text-secondary)'
            }}>✕</button>
            <h2 style={{ textTransform: 'capitalize', margin: '0 0 5px 0', fontSize: '24px' }}>
              {t('tema_' + arvoreFocada.tema.replace(/\s+/g, '_'), arvoreFocada.tema.replace('_', ' '))}
            </h2>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
              {t('nivel', 'Nível')} {arvoreFocada.nivelTema} • {arvoreFocada.xp} XP
            </div>
            <div style={{ width: '100%', height: '320px' }}>
              <ArvoreVisual tema={arvoreFocada.tema} nivel={arvoreFocada.nivelTema} decoracoes={progresso.decoracoes} mostrarEtiqueta={false} />
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '50px' }}>
        <h3 className="titulo-seccao" style={{ color: '#3b82f6' }}>🎯 {t('missoes_diarias', 'Missões Diárias')}</h3>
        <div className="lista-missoes" style={{ marginBottom: '25px' }}>
          {progresso.missoes?.diarias?.lista.map(renderizarMissao)}
        </div>
        <h3 className="titulo-seccao" style={{ color: '#a855f7' }}>📅 {t('missoes_semanais', 'Missões Semanais')}</h3>
        <div className="lista-missoes" style={{ paddingBottom: '30px' }}>
          {progresso.missoes?.semanais?.lista.map(renderizarMissao)}
        </div>
      </div>
    </div>
  );
}