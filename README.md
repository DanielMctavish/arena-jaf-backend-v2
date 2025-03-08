# Arena Management API 🎮

Uma API robusta para gerenciamento de arenas de jogos, desenvolvida em TypeScript e Node.js.

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
</p>

## 🚀 Funcionalidades Principais

### Gestão de Máquinas
- Controle de status (RUNNING/STOPED)
- Sistema de timer para sessões
- Integração com WebSocket para atualizações em tempo real
- Gerenciamento de múltiplas máquinas simultaneamente

### Gestão de Clientes
- Cadastro e autenticação de clientes
- Sistema de créditos e horas
- Perfil com avatar (integração Firebase Storage)
- Histórico de sessões

### Gestão Administrativa
- Controle de múltiplas unidades (arenas)
- Sistema de transações financeiras
- Relatórios de sessões
- Gerenciamento de produtos

### Produtos e Eventos
- Cadastro e gestão de produtos
- Sistema de eventos especiais
- Controle de estoque
- Histórico de vendas

## 🛠 Tecnologias Utilizadas

- TypeScript
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Firebase Storage
- WebSocket
- JWT Authentication
- Dayjs
- Multer

## 📦 Estrutura do Projeto

src/
├── app/
│ ├── entities/ # Interfaces e tipos
│ ├── repositories/ # Camada de dados
│ └── usecases/ # Lógica de negócio
├── http/
│ ├── routes/ # Rotas da API
│ └── middlewares/ # Middlewares
├── security/ # Autenticação e validações
└── utils/ # Utilitários


## 🔐 Recursos de Segurança

- Autenticação JWT
- Validação de rotas
- Tratamento de erros
- Controle de acesso por perfil

## 💾 Banco de Dados

Utiliza PostgreSQL com Prisma ORM para:
- Gestão de usuários
- Controle de sessões
- Histórico de transações
- Inventário de produtos
- Registro de eventos

## 🌐 Integração WebSocket

Sistema em tempo real para:
- Status das máquinas
- Controle de tempo das sessões
- Notificações administrativas
- Atualizações de status

## 📝 Requisitos

- Node.js 
- PostgreSQL
- Firebase Project (para storage)
- Variáveis de ambiente configuradas

## 🚀 Como Iniciar

1. Clone o repositório
2. Instale as dependências
3. Configure as variáveis de ambiente
4. Inicie o servidor



## 📄 Licença

Este projeto está sob a licença MIT

---

⌨️ Desenvolvido com ❤️ por [DanielMctavish](https://github.com/DanielMctavish)