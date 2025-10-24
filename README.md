# API Course - Node.js

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

Uma API RESTful moderna desenvolvida com Node.js, TypeScript e Fastify para gerenciamento de cursos. Este projeto demonstra as melhores práticas de desenvolvimento backend com foco em performance, tipagem, documentação automática e testes.

## 🚀 Funcionalidades

- ✅ **CRUD de Cursos**: Create, Read, Update e Delete de cursos
- 📝 **Documentação Automática**: Swagger/OpenAPI integrado com Scalar
- 🔒 **Validação de Dados**: Validação rigorosa com Zod
- 🗄️ **ORM Moderno**: Drizzle ORM com TypeScript
- 🐳 **Containerização**: Docker Compose para desenvolvimento
- 📊 **Logs Estruturados**: Pino logger com formatação pretty
- 🎯 **Type Safety**: 100% TypeScript
- 🧪 **Testes Automatizados**: Vitest com cobertura de código
- 🔐 **Preparado para Autenticação**: Estrutura JWT e Argon2 incluída

## 📋 Pré-requisitos

- Node.js >= 22.0.0
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Tecnologias Utilizadas

### Backend

- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript moderno
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional

### Desenvolvimento e Testes

- **[Vitest](https://vitest.dev/)** - Framework de testes rápido e moderno
- **[Supertest](https://github.com/visionmedia/supertest)** - Testes de integração HTTP
- **[Pino](https://getpino.io/)** - Logger de alta performance
- **[Swagger](https://swagger.io/)** - Documentação de API
- **[Docker](https://www.docker.com/)** - Containerização
- **[Scalar](https://scalar.com/)** - Interface moderna para documentação da API

### Segurança (Preparado)

- **[Argon2](https://github.com/ranisalt/node-argon2)** - Hash de senhas seguro
- **[JWT](https://jwt.io/)** - Tokens de autenticação

## 📁 Estrutura do Projeto

```
api-fundamentals/
├── coverage/                   # Relatórios de cobertura de testes
├── drizzle/                    # Migrações do banco de dados
│   ├── 0000_deep_sandman.sql   # Criação da tabela users
│   ├── 0001_fast_madrox.sql    # Criação da tabela courses
│   └── meta/                   # Metadados das migrações
├── src/                        # Código fonte
│   ├── database/               # Configuração do banco
│   │   ├── client.ts           # Cliente Drizzle
│   │   └── schema.ts           # Esquemas das tabelas
│   └── routes/                 # Rotas da API
│       ├── create-courses.ts   # POST /courses
│       ├── get-courses.ts      # GET /courses
│       └── get-course-by-id.ts # GET /courses/:id
├── .env                        # Variáveis de ambiente (desenvolvimento)
├── .env.test                   # Variáveis de ambiente (testes)
├── docker-compose.yml          # Configuração Docker
├── drizzle.config.ts          # Configuração Drizzle ORM
├── package.json               # Dependências e scripts
├── requisicoes.http           # Exemplos de requisições HTTP
├── server.ts                  # Entrada da aplicação
├── tsconfig.json             # Configuração TypeScript
└── vitest.config.ts          # Configuração dos testes
```

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <repository-url>
cd api-fundamentals
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/desafio"
NODE_ENV="development"
```

Para testes, o arquivo `.env.test` já está configurado.

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
npm run db:migrate
```

### 6. (Opcional) Execute o seed do banco

```bash
npm run db:seed
```

### 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## 📖 Documentação da API

Com o servidor rodando, acesse:

- **Documentação Interativa**: `http://localhost:3333/docs`

### Endpoints Disponíveis

#### 📚 Cursos

| Método | Endpoint       | Descrição              | Status |
| ------ | -------------- | ---------------------- | ------ |
| `POST` | `/courses`     | Criar um novo curso    | ✅     |
| `GET`  | `/courses`     | Listar todos os cursos | ✅     |
| `GET`  | `/courses/:id` | Buscar curso por ID    | ✅     |

### 🗺️ Diagrama das Rotas

```mermaid
graph TD
    A[Cliente] --> B{API Gateway<br/>localhost:3333}

    B --> C[POST /courses]
    B --> D[GET /courses]
    B --> E[GET /courses/:id]

    C --> F[Validação Zod<br/>title: min 5 chars]
    F --> G[Drizzle ORM]
    G --> H[(PostgreSQL<br/>courses table)]
    H --> I[Retorna courseId<br/>Status: 201]

    D --> J[Drizzle ORM]
    J --> H
    H --> K[Lista todos os cursos<br/>Status: 200]

    E --> L[Validação UUID<br/>params.id]
    L --> M[Drizzle ORM]
    M --> H
    H --> N{Curso existe?}
    N -->|Sim| O[Retorna curso<br/>Status: 200]
    N -->|Não| P[Status: 404]

    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style H fill:#e8f5e8
    style I fill:#e8f5e8
    style K fill:#e8f5e8
    style O fill:#e8f5e8
    style P fill:#ffebee
```

#### Exemplos de Uso

**Criar um curso:**

```http
POST http://localhost:3333/courses
Content-Type: application/json

{
  "title": "Curso de Node.js Fundamentals"
}
```

**Listar cursos:**

```http
GET http://localhost:3333/courses
```

**Buscar curso por ID:**

```http
GET http://localhost:3333/courses/dc3d8065-52ef-4e95-98d4-456ab1ba3b9e
```

Você também pode usar o arquivo [requisicoes.http](requisicoes.http) com a extensão REST Client do VS Code.

## 🗄️ Esquema do Banco de Dados

### Tabela: `courses`

| Campo         | Tipo | Restrições                             |
| ------------- | ---- | -------------------------------------- |
| `id`          | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| `title`       | TEXT | NOT NULL, UNIQUE                       |
| `description` | TEXT | NULLABLE                               |

### Tabela: `users` (preparada para futuras funcionalidades)

| Campo   | Tipo | Restrições                             |
| ------- | ---- | -------------------------------------- |
| `id`    | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| `name`  | TEXT | NOT NULL                               |
| `email` | TEXT | NOT NULL, UNIQUE                       |

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor em modo desenvolvimento

# Banco de dados
npm run db:generate  # Gera migrações do Drizzle
npm run db:migrate   # Executa as migrações
npm run db:studio    # Abre o Drizzle Studio
npm run db:seed      # Popula o banco com dados de exemplo

# Testes
npm test             # Executa os testes
npm run pretest      # Prepara o ambiente de teste (executa migrações)
```

## 🧪 Testes

O projeto utiliza **Vitest** para testes automatizados:

- **Testes de integração** com Supertest
- **Cobertura de código** automática
- **Ambiente isolado** com banco de dados separado
- **Relatórios HTML** na pasta `coverage/`

Para executar os testes:

```bash
npm test
```

Os relatórios de cobertura ficam disponíveis em `coverage/index.html`.

## 🔒 Validação de Dados

O projeto utiliza **Zod** para validação robusta:

- **Títulos de curso**: Mínimo 5 caracteres
- **IDs**: Formato UUID válido
- **Respostas tipadas**: Schemas de resposta bem definidos

## 🐳 Docker

O projeto inclui configuração Docker Compose para desenvolvimento:

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: desafio
    ports:
      - "5432:5432"
```

## 🚀 Deploy

### Preparação para Produção

1. Configure as variáveis de ambiente de produção
2. Execute as migrações: `npm run db:migrate`
3. Build da aplicação (se necessário)
4. Configure proxy reverso (Nginx/Apache)

### Variáveis de Ambiente de Produção

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3333
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [package.json](package.json) para mais detalhes.

## 👨‍💻 Autor

**Wendel Campos Aguiar**

---

<div align="center">

**[⬆ Voltar ao topo](#api-course)**

Made with ❤️ and lots of ☕

</div>
