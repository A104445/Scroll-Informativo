import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function QuizCard({ perguntaObj, onResponder, categoria }) {
  const [respondido, setRespondido] = useState(false);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState(null);
  const { t } = useTranslation();

  const chaveCategoria = categoria ? 'tema_' + categoria.replace(/\s+/g, '_') : '';
  const categoriaTraduzida = t(chaveCategoria, categoria);

  const lidarComResposta = (index) => {
    if (respondido) return; 
    setRespondido(true);
    setOpcaoEscolhida(index);
    
    const acertou = index === perguntaObj.resposta_correta;
    
    setTimeout(() => {
      onResponder(acertou);
    }, 1200);
  };

  return (
    <div className="cartao quiz-card" style={{ backgroundColor: '#1e293b', color: 'white' }}>
      <div className="cartao-header">
        <span className="categoria-tag" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
            🧠 {t('quiz', 'Quiz')}: {categoriaTraduzida}
        </span>
      </div>
      
      <h2 style={{ fontSize: '24px', color: '#f8fafc' }}>{perguntaObj.pergunta}</h2>
      
      <div className="opcoes-quiz">
        {perguntaObj.opcoes.map((opcao, index) => {
          let classeBotao = 'btn-opcao';
          if (respondido) {
            if (index === perguntaObj.resposta_correta) {
              classeBotao += ' correta';
            } else if (index === opcaoEscolhida) {
              classeBotao += ' errada';
            }
          }
          return (
            <button 
              key={index} 
              className={classeBotao}
              onClick={() => lidarComResposta(index)}
              disabled={respondido}
            >
              {opcao}
            </button>
          );
        })}
      </div>
    </div>
  );
}