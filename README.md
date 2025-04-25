# 🍔 MS Delivery API

API RESTful completa para um sistema de delivery, construída com **Node.js**, **Express**, **Prisma** e **MongoDB**, com suporte a **autenticação JWT**, **chat em tempo real via Socket.IO**, e **documentação Swagger**.

---

## 🚀 Funcionalidades

- Cadastro e login de usuários e restaurantes
- Painel de administração para restaurantes
- Criação e gerenciamento de produtos (pratos)
- Gerenciamento de pedidos (criar, aceitar, recusar, concluir)
- Avaliações de usuários para restaurantes
- Chat em tempo real entre cliente e restaurante
- Documentação via Swagger

---

## 🛠️ Tecnologias

- Node.js + Express
- Prisma + MongoDB
- Socket.IO (chat em tempo real)
- Swagger (documentação da API)
- Bcrypt + JWT (autenticação)
- Render (deploy)

---

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/ms-delivery-api.git
cd ms-delivery-api

```
2. Instale as dependências
 ```
npm install

```

3. Configure as váriaveis de ambiente
```
Crie um arquivo .env com

DATABASE_URL=your_mongo_connection_string
JWT_SECRET_KEY=your_secret_key
CLIENT_URL=https://seu-front.vercel.app

```
4. Rode o projeto
```
npx prisma db push # para aplicar o schema no MongoDB
npm run dev

```

🔐 Autenticação
Após o login, o servidor retorna um cookie HTTP-only (token) válido por 7 dias.

Para requisições protegidas, envie o token no header Authorization: Bearer TOKEN.

📚 Documentação da API
Acesse em: /api-docs

Baseada em Swagger UI
