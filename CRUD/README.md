# 🚀 API CRUD - Node.js + Express + Prisma + MongoDB

API RESTful completa com operações CRUD para gerenciamento de usuários.

## 📋 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM moderno
- **MongoDB** - Banco de dados NoSQL

## 🔧 Endpoints da API

### Listar todos os usuários
```http
GET /usuarios
```

### Criar novo usuário
```http
POST /usuarios
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "age": 25
}
```

### Atualizar usuário
```http
PUT /usuarios/:id
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "age": 26
}
```

### Deletar usuário
```http
DELETE /usuarios/:id
```

## 🚀 Deploy

Esta API está hospedada gratuitamente e pronta para uso!

## 💻 Executar Localmente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure a variável de ambiente `DATABASE_URL` no arquivo `.env`
4. Execute:
```bash
npm start
```

## 📝 Licença

ISC

