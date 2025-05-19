# API Node.js com Fastify, Prisma e Geração de Código

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

## Visão Geral

Este projeto é uma API RESTful construída em Node.js com TypeScript, utilizando Fastify como framework web, Prisma como ORM e PostgreSQL como banco de dados. A API implementa um sistema de autenticação e autorização baseado em roles (ADMIN, NURSE) e utiliza uma abordagem moderna de desenvolvimento com foco em:

- Arquitetura limpa com separação de responsabilidades
- Tipagem forte com TypeScript
- Validação de dados com Zod
- Geração automática de código com Plop
- Documentação automática com Swagger via Fastify

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução
- **TypeScript**: Linguagem de programação
- **Fastify**: Framework web de alta performance
- **PostgreSQL**: Banco de dados relacional
- **Prisma ORM**: Mapeamento objeto-relacional
- **Zod**: Validação de esquemas
- **JWT**: Autenticação
- **Plop**: Geração de código
- **Biome**: Linting e formatação
- **Docker**: Containerização

## Características Principais

### 1. API RESTful com Fastify

O projeto utiliza o framework Fastify para criar uma API RESTful de alto desempenho, com recursos como:

- Middlewares de autenticação e autorização
- Validação de esquemas
- Documentação automática via Swagger
- Manipulação de erros centralizada

### 2. Prisma ORM e PostgreSQL

O acesso a dados é feito através do Prisma ORM, que oferece:

- Modelagem de dados com Prisma Schema
- Migrações automáticas
- Tipagem forte integrada com TypeScript
- Queries tipo-seguras

### 3. Validação com Zod

O projeto utiliza a biblioteca Zod para validação de dados, com integração especial com Prisma:

- Conversão automática de modelos Prisma para esquemas Zod (`zod-prisma-types`)
- Validação de entrada de usuários
- Tipagem forte baseada em validação

### 4. Arquitetura Limpa

O código segue princípios de arquitetura limpa com:

- **Repositories**: Encapsulam a lógica de acesso a dados
- **Use Cases**: Implementam a lógica de negócios
- **Controllers**: Gerenciam requisições e respostas HTTP
- **Routes**: Definem os endpoints da API

## Geração Automática de Código com Plop

Um dos destaques do projeto é o uso do Plop para geração automática de código, eliminando tarefas repetitivas e mantendo a consistência.

### Geradores Disponíveis

#### 1. Gerador de CRUD

Gera toda a estrutura necessária para operações CRUD de uma entidade:

```bash
pnpm generate:plop crud
```

Este comando cria:
- Repository para a entidade
- Use Cases (create, update, list, fetch, get, delete)
- Controllers para cada operação
- Arquivo de rotas configurado

#### 2. Gerador de Rota

Cria uma nova rota para uma entidade existente:

```bash
pnpm generate:plop route
```

Este comando guia você através de questões interativas para determinar:
- Modelo do Prisma a ser usado
- Método HTTP (GET, POST, PUT, DELETE, PATCH)
- Nome da rota
- Caminho da URL
- Necessidade de parâmetros
- Necessidade de corpo na requisição

E então gera:
- Use Case específico para a rota
- Controller correspondente
- Atualiza o arquivo de rotas da entidade

### Como Funciona

O sistema de geração de código é construído usando:

1. **Templates Handlebars** (`*.hbs`) que definem a estrutura dos arquivos gerados
2. **Geradores Plop** que coordenam o processo de criação de arquivos
3. **Helpers personalizados** como `eq` para lógica condicional nos templates

## Estrutura do Projeto

```
/app
├── prisma/              # Esquemas e migrações Prisma
├── src/
│   ├── http/            # Controllers e definições de rotas
│   │   ├── controllers/ # Controladores organizados por entidade
│   │   └── middleware/  # Middlewares (autenticação, autorização)
│   ├── libs/            # Utilitários e bibliotecas
│   ├── repositories/    # Camada de acesso a dados
│   ├── schemas/         # Esquemas Zod para validação
│   ├── use-cases/       # Lógica de negócios
│   └── server.ts        # Ponto de entrada da aplicação
├── plop/
│   ├── generators/      # Definições dos geradores
│   └── templates/       # Templates Handlebars para geração de código
└── plopfile.ts          # Configuração principal do Plop
```

## Execução do Projeto

### Ambiente de Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar migrações do banco de dados
pnpm prisma:migrate dev

# Iniciar servidor em modo desenvolvimento
pnpm dev

# Gerar código usando Plop
pnpm generate:plop crud
# ou
pnpm generate:plop route
```

### Ambiente Docker

O projeto inclui configuração Docker para facilitar o desenvolvimento e implantação:

```bash
# Construir e iniciar o container
docker-compose up -d

# Acessar o container
docker-compose exec api bash
```

## Benefícios da Geração de Código

A abordagem de geração de código traz diversos benefícios:

1. **Consistência**: Todos os componentes seguem o mesmo padrão
2. **Produtividade**: Reduz drasticamente o tempo de criação de novos recursos
3. **Manutenibilidade**: Facilita alterações em massa através dos templates
4. **Onboarding**: Novos desenvolvedores podem criar recursos completos rapidamente
5. **Qualidade**: Reduz erros manuais e garante aderência às boas práticas

## Conclusão

Este projeto representa uma abordagem moderna para desenvolvimento de APIs Node.js, combinando ferramentas de alta performance com práticas avançadas de desenvolvimento como geração de código. A arquitetura limpa e a tipagem forte proporcionam uma base sólida para o desenvolvimento de aplicações escaláveis e manuteníveis.

Código semelhante encontrado com 3 tipos de licença