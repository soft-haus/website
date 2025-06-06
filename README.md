# Site da Softhaus

Este é o repositório do site oficial da Softhaus, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Configuração do Ambiente

Para que o formulário de contato funcione, é necessário configurar as variáveis de ambiente.

1. Crie um arquivo chamado `.env.local` na raiz do projeto. Você pode copiar o arquivo `.env.example` como base:

```bash
cp .env.example .env
```

2. Obtenha sua chave de API do **Resend**:
  - Acesse [resend.com](https://resend.com) e crie uma conta gratuita.
  - Adicione e verifique seu domínio para enviar e-mails a partir dele. Para desenvolvimento, você pode pular esta etapa e usar o domínio `onboarding@resend.dev` como remetente.
  - Vá para a seção "API Keys" no painel do Resend e crie uma nova chave.

3. Adicione a chave de API ao seu arquivo `.env.local`:

```env
RESEND_API_KEY=sua_chave_de_api_aqui
```

## Rodando o Projeto

Primeiro, instale as dependências do projeto:

```bash
npm install
```

Em seguida, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:3000 no seu navegador para ver o resultado.