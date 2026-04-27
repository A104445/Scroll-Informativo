import Card from './Card';
import QuizCard from './QuizCard';
import { Virtuoso } from 'react-virtuoso';
import { useEffect, useRef } from 'react'; // <-- Não te esqueças de importar o useRef!

export default function Feed({ itensMistos, favoritos, alternarFavorito, irParaDefinicoes, onLerFacto, onResponderQuiz, indiceGuardado, setIndiceGuardado }) {
  
  // 1. O "Bloco de Notas" local: Guarda o número sem fazer o ecrã piscar/re-renderizar
  const indiceRef = useRef(indiceGuardado || 0);

  // 2. O Estafeta: Quando fechas o Feed (mudas de aba), ele entrega o número final ao App.jsx
  useEffect(() => {
    return () => {
      if (setIndiceGuardado) {
        setIndiceGuardado(indiceRef.current);
      }
    };
  }, [setIndiceGuardado]);

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
        
        // Entra diretamente no cartão que estava guardado
        initialTopMostItemIndex={indiceGuardado || 0}
        
        // 3. O Radar de Pixeis: Lê exatamente o que estás a ver!
        onScroll={(e) => {
          const alturaDoEcra = e.target.clientHeight;
          if (alturaDoEcra > 0) {
            // Se desceste 2000 pixeis e o ecrã tem 1000px, estás exatamente no cartão 2 (2000/1000)
            const cartaoAtual = Math.round(e.target.scrollTop / alturaDoEcra);
            indiceRef.current = cartaoAtual;
          }
        }}

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
                onLerFacto={onLerFacto}
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