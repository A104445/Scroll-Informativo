import Card from './Card';
import QuizCard from './QuizCard'; // Importante!
import { Virtuoso } from 'react-virtuoso';

export default function Feed({ itensMistos, favoritos, alternarFavorito, irParaDefinicoes, onLerFacto, onResponderQuiz }) {
  
  if (itensMistos.length === 0) {
    return (
      <div className="feed" style={{ justifyContent: 'center' }}>
        <div className="mensagem-vazio">
          <h2>Nada por aqui...</h2>
          <p>Não há cartões que correspondam aos teus filtros.</p>
          <button className="btn-primario" onClick={irParaDefinicoes}>Mudar Temas</button>
        </div>
      </div>
    );
  }

  return (
    <main className="feed">
      <Virtuoso
        className="lista-reels"
        style={{ height: '100%', width: '100%' }}
        data={itensMistos}
        itemContent={(index, item) => (
          <div style={{ height: '100dvh', width: '100%', display: 'flex' }}>
            {item.tipo === 'facto' ? (
              <Card 
                id={item.data.id}
                categoria={item.data.categoria} 
                titulo={item.data.titulo} 
                conteudo={item.data.conteudo} 
                isFavorito={favoritos.includes(item.data.id)}
                onToggleFavorito={alternarFavorito}
                onLerFacto={onLerFacto} // Passamos a função do XP Passivo
              />
            ) : (
              <QuizCard 
                perguntaObj={item.data}
                onResponder={(acertou) => onResponderQuiz(item.data.id, item.categoriaOriginal, acertou)}
              />
            )}
          </div>
        )}
      />
    </main>
  );
}