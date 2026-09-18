import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Card({ id, categoria, titulo, conteudo, isFavorito, onToggleFavorito, onLerFacto }) {
  const [foiLido, setFoiLido] = useState(false);
  const { t } = useTranslation();

  const chaveCategoria = categoria ? 'tema_' + categoria.replace(/\s+/g, '_') : '';
  const categoriaTraduzida = t(chaveCategoria, categoria);

  useEffect(() => {
    if (foiLido) return;
    const timer = setTimeout(() => {
      setFoiLido(true);
      if (onLerFacto) {
        onLerFacto(id, categoria);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, categoria, foiLido, onLerFacto]);

  return (
    <div className="cartao">
      <div className="cartao-header">
        <span className="categoria-tag">{categoriaTraduzida}</span>
        <button 
           className={`btn-favorito ${isFavorito ? 'ativo' : ''}`} 
           onClick={() => onToggleFavorito(id)}
        >
          {isFavorito ? '❤️' : '🤍'}
        </button>
      </div>
      <h2>{titulo}</h2>
      <p>{conteudo}</p>
      
      {foiLido && <div className="xp-indicador">+5 XP</div>}
    </div>
  );
}