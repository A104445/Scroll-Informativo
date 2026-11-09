# Scroll Informativo

Aplicação web interativa e educativa desenvolvida no formato de Progressive Web App (PWA), focada na entrega de conteúdos informativos, quizzes dinâmicos, progressão de utilizador e suporte multilíngue.

## Sobre o Projeto

O **Scroll Informativo** foi concebido para proporcionar uma experiência de *microlearning* fluida e gamificada. A aplicação permite aos utilizadores explorar factos informativos, testar conhecimentos através de perguntas interativas, desbloquear conquistas e gerir a sua evolução num ambiente otimizado tanto para dispositivos móveis como para desktop.

### Principais Funcionalidades:

* **Feed Informativo Dinâmico (`Feed.jsx`):** Apresentação contínua de cartões informativos e factos relevantes de forma interativa.
* **Módulo de Quizzes (`QuizCard.jsx` e `perguntas.json`):** Sistema de testes de conhecimentos com perguntas e respostas em múltiplos idiomas (Português e Inglês).
* **Gamificação e Conquistas (`Conquistas.jsx` e `Evolucao.jsx`):** Acompanhamento do progresso do utilizador, visualização de estatísticas de evolução e desbloqueio de prémios/conquistas.
* **Loja Virtual Integrada (`Loja.jsx` e `lojaItens.js`):** Sistema de recompensas onde os utilizadores podem gastar pontos acumulados.
* **Onboarding & Ajuda Contextual (`Onboarding.jsx` e `AjudaContextual.jsx`):** Guias de introdução para novos utilizadores e suporte interativo na interface.
* **Suporte Multilíngue (i18n):** Dicionários e dados estruturados disponíveis em diferentes idiomas (ex: `factos.json` e `factos_en.json`).

## Stack Tecnológica

* **Linguagem:** JavaScript (ES6+) / JSX
* **Framework / Biblioteca:** React.js / Vite
* **Estilização:** CSS Moderno / Módulos de Estilo de Componentes
* **Arquitetura PWA:** Suporte a *Service Workers* para funcionamento offline e instalação como aplicação nativa.

## Estrutura do Repositório

O código fonte está organizado de forma modular dentro da pasta `scroll-informativo/`:

```text
Scroll-Informativo-main/
└── scroll-informativo/
    ├── public/              # Recursos estáticos, ícones PWA e imagens (ex: Jogo, Loja, Quiz)
    ├── src/
    │   ├── assets/          # Imagens, heros e ícones SVG (React/Vite)
    │   ├── components/      # Componentes de interface (Quiz, Feed, Loja, Evolução, Onboarding)
    │   ├── data/            # Bases de dados locais em JSON e scripts utilitários em Python
    │   ├── App.css          # Estilos globais da aplicação
    │   ├── App.jsx          # Componente principal de raiz
    │   ├── i18n.js          # Configuração de internacionalização e tradução
    │   └── main.jsx         # Ponto de entrada da aplicação React
    ├── .gitignore           # Ficheiros ignorados pelo Git (incluindo .env)
    ├── package.json         # Dependências e scripts do projeto
    └── vite.config.js       # Configuração do empacotador Vite
```

## Como Executar Localmente

### 1. Pré-requisitos
Certifica-te de que tens o [Node.js](https://nodejs.org/) instalado no teu computador.

### 2. Instalação de Dependências
Navega até à pasta do projeto e instala os pacotes necessários:
```bash
cd scroll-informativo
npm install
```

### 3. Configuração de Variáveis de Ambiente
Caso o projeto utilize alguma chave de API externa (como serviços de tradução ou IA), cria um ficheiro `.env` na raiz da pasta `scroll-informativo` (este ficheiro está protegido pelo `.gitignore`):
```env
VITE_API_KEY=tua_chave_aqui
```

### 4. Iniciar o Servidor de Desenvolvimento
Para testar a aplicação localmente com recarregamento automático:
```bash
npm run dev
```
Acede a `http://localhost:5173` no teu browser.

*Projeto desenvolvido com foco na interatividade, educação e desempenho mobile-first.*
