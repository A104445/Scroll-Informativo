import { useEffect, useState } from 'react';

export default function Card({ id, categoria, titulo, conteudo, isFavorito, onToggleFavorito, onLerFacto }) {
  const [foiLido, setFoiLido] = useState(false);

  useEffect(() => {
    // Se já foi lido, não faz nada
    if (foiLido) return;

    // Se o cartão "nascer" e ficar no ecrã por 3 segundos, conta como lido!
    const timer = setTimeout(() => {
      setFoiLido(true);
      if (onLerFacto) {
        onLerFacto(id, categoria); // Avisa o App.jsx para dar os +5 XP
      }
    }, 3000);

    // Se o utilizador fizer scroll para longe antes dos 3 segundos, cancelamos o timer
    return () => clearTimeout(timer);
  }, [id, categoria, foiLido, onLerFacto]);

  return (
    <div className="cartao">
      <div className="cartao-header">
        <span className="categoria-tag">{categoria}</span>
        <button 
          className={`btn-favorito ${isFavorito ? 'ativo' : ''}`} 
          onClick={() => onToggleFavorito(id)}
        >
          {isFavorito ? '❤️' : '🤍'}
        </button>
      </div>
      <h2>{titulo}</h2>
      <p>{conteudo}</p>
      
      {/* Pequeno indicador visual opcional para o utilizador saber que ganhou XP */}
      {foiLido && <div className="xp-indicador">+5 XP</div>}
    </div>
  );
}