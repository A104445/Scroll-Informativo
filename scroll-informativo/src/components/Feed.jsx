import Card from './Card';
import QuizCard from './QuizCard';
import { Virtuoso } from 'react-virtuoso';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Feed({ itensMistos, favoritos, alternarFavorito, irParaDefinicoes, onLerFacto, onResponderQuiz, indiceGuardado, setIndiceGuardado }) {
  const { t } = useTranslation();
  const indiceRef = useRef(indiceGuardado || 0);

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
          <h2>{t('nada_aqui', 'Nada por aqui...')}</h2>
          <p>{t('sem_filtros', 'Não há cartões que correspondam aos teus filtros.')}</p>
          <button className="btn-primario" onClick={irParaDefinicoes}>{t('mudar_temas', 'Mudar Temas')}</button>
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
        initialTopMostItemIndex={indiceGuardado || 0}
        onScroll={(e) => {
          const alturaDoEcra = e.target.clientHeight;
          if (alturaDoEcra > 0) {
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
                categoria={item.categoriaOriginal}
                onResponder={(acertou) => onResponderQuiz(item.data.id, item.categoriaOriginal, acertou)}
              />
            )}
          </div>
        )}
      />
    </main>
  );
}