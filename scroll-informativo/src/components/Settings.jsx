import { useTranslation } from 'react-i18next';

export default function Settings({ 
  categorias = [], 
  categoriasAtivas = [], 
  setCategoriasAtivas,
  temaMatrix = false,
  setTemaMatrix
}) {
  const { t, i18n } = useTranslation();

  const alternarCategoria = (categoria) => {
    if (categoriasAtivas.includes(categoria)) {
      setCategoriasAtivas(categoriasAtivas.filter(c => c !== categoria));
    } else {
      setCategoriasAtivas([...categoriasAtivas, categoria]);
    }
  };

  const mudarIdioma = (lingua) => {
    i18n.changeLanguage(lingua);
  };

  const idiomaAtual = i18n.language || 'pt';

  return (
    <div className="definicoes-container">
      <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>⚙️ {t('definicoes', 'Definições')}</h2>
      <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
        {t('sub_definicoes', 'Personaliza a tua experiência no InfoScroll.')}
      </p>

      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Idioma / Language
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn-filtro ${idiomaAtual.startsWith('pt') ? 'ativo' : ''}`}
            onClick={() => mudarIdioma('pt')}
          >
            🇵🇹 Português
          </button>
          <button 
            className={`btn-filtro ${idiomaAtual.startsWith('en') ? 'ativo' : ''}`}
            onClick={() => mudarIdioma('en')}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          {t('aparencia', 'Aparência')}
        </h3>
        <button 
          className={`btn-filtro ${temaMatrix ? 'ativo' : ''}`}
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            if (setTemaMatrix) setTemaMatrix(!temaMatrix);
          }}
        >
          {temaMatrix ? '🟢 Modo Matrix' : '⚪ Modo Claro'}
        </button>
      </div> */}

      <hr style={{ borderColor: 'var(--border)', opacity: 0.5, marginBottom: '30px' }} />

      <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        {t('temas', 'Temas do InfoScroll')}
      </h3>
      
      <div className="filtros">
        <button 
          className={`btn-filtro ${categoriasAtivas.length === 0 ? 'ativo' : ''}`}
          onClick={() => {
            if (setCategoriasAtivas) setCategoriasAtivas([]);
          }}
        >
          {t('mistura_total', 'Mistura Total')}
        </button>
        
        {categorias.map(categoria => {
          if (typeof categoria !== 'string') return null;
          
          return (
            <button 
              key={categoria}
              className={`btn-filtro ${categoriasAtivas.includes(categoria) ? 'ativo' : ''}`}
              onClick={() => alternarCategoria(categoria)}
            >
              {t('tema_' + categoria.replace(/\s+/g, '_'), categoria.replace('_', ' '))}
            </button>
          );
        })}
      </div>
    </div>
  );
}