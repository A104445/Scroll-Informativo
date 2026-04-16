import { useState } from 'react';

export default function QuizCard({ perguntaObj, onResponder }) {
  const [respondido, setRespondido] = useState(false);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState(null);

  const lidarComResposta = (index) => {
    if (respondido) return; // Impede que o utilizador responda duas vezes
    
    setRespondido(true);
    setOpcaoEscolhida(index);
    
    const acertou = index === perguntaObj.resposta_correta;
    
    // Avisamos a app se ele acertou ou falhou, após 1 segundo (para ele ver a cor primeiro)
    setTimeout(() => {
      onResponder(acertou);
    }, 1200);
  };

  return (
    <div className="cartao quiz-card" style={{ backgroundColor: '#1e293b', color: 'white' }}>
      <div className="cartao-header">
        <span className="categoria-tag" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
          🧠 Desafio de Memória
        </span>
      </div>
      
      <h2 style={{ fontSize: '24px', color: '#f8fafc' }}>{perguntaObj.pergunta}</h2>
      
      <div className="opcoes-quiz">
        {perguntaObj.opcoes.map((opcao, index) => {
          // Lógica para pintar o botão de verde (certo) ou vermelho (errado) após responder
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