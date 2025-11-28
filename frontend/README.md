# 🎨 Frontend - Sistema de Gerenciamento de Usuários

Interface moderna e responsiva para gerenciar usuários com operações CRUD completas.

## 📋 Tecnologias

- **Next.js 16** - Framework React com SSR
- **React 19** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização moderna
- **Fetch API** - Comunicação com backend

## ✨ Funcionalidades

- ✅ Adicionar novos usuários
- ✅ Listar todos os usuários
- ✅ Editar informações de usuários
- ✅ Deletar usuários
- ✅ Validação de formulários
- ✅ Mensagens de feedback
- ✅ Design responsivo (mobile-first)
- ✅ Interface intuitiva e moderna

## 🚀 Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env.local` com a URL da API:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
(ou use a URL da sua API em produção)

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse: http://localhost:3001

## 🌐 Deploy

Este projeto está configurado para deploy na **Vercel**.

Veja o guia completo em: [DEPLOY-FRONTEND.md](./DEPLOY-FRONTEND.md)

## 🔗 Backend

Este frontend consome uma API REST. O código do backend está disponível na pasta `CRUD`.

## 📝 Licença

ISC
