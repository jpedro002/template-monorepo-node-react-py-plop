# Gerador CRUD - Estrutura Modular

Esta estrutura modular divide o gerador CRUD em arquivos menores para melhor organização e manutenibilidade.

## Estrutura de Arquivos

```
plop/generators/crud/
├── index.ts                      # Arquivo principal - combina todos os módulos
├── prompts.ts                    # Prompts para entrada do usuário
├── atomsActions.ts              # Actions para estado global (Jotai atoms)
├── mvvmActions.ts               # Actions para estrutura MVVM principal
├── cardComponentActions.ts      # Actions para componente de card
├── tableComponentActions.ts     # Actions para componente de tabela
├── createDialogActions.ts       # Actions para dialog de criação
├── updateDialogActions.ts       # Actions para dialog de edição
├── filterComponentActions.ts    # Actions para componente de filtro
└── paginationComponentActions.ts # Actions para componente de paginação
```

## Padrão de Nomenclatura

- **Pastas**: kebab-case (ex: `create-dialog`, `table-component`)
- **Arquivos**: camelCase (ex: `createDialogActions.ts`, `updateDialogActions.ts`)

## Organização dos Módulos

### 1. `prompts.ts`
Contém todos os prompts de entrada do usuário:
- `entityName`: Nome da entidade
- `displayName`: Nome para exibição

### 2. `atomsActions.ts`
Gera o arquivo de estado global usando Jotai atoms.

### 3. `mvvmActions.ts`
Gera a estrutura principal MVVM:
- ViewModel (componente principal)
- View
- Model
- Types
- Index

### 4. `cardComponentActions.ts`
Gera componente de card para exibição de itens.

### 5. `tableComponentActions.ts`
Gera componente de tabela para listagem de dados.

### 6. `createDialogActions.ts`
Gera dialog para criação de novos registros:
- ViewModel
- Model
- View
- Schema
- Types
- Index

### 7. `updateDialogActions.ts`
Gera dialog para edição de registros existentes.

### 8. `filterComponentActions.ts`
Gera componente de filtro para busca e filtragem.

### 9. `paginationComponentActions.ts`
Gera componente de paginação.

## Como Usar

```bash
npm run plop crud
```

O gerador solicitará:
1. Nome da entidade (ex: user, product)
2. Nome para exibição (ex: "Usuário", "Produto")

## Vantagens da Estrutura Modular

1. **Manutenibilidade**: Cada funcionalidade em arquivo separado
2. **Legibilidade**: Fácil de entender e modificar
3. **Reutilização**: Módulos podem ser reutilizados em outros geradores
4. **Organização**: Estrutura clara e bem definida
5. **Escalabilidade**: Fácil de adicionar novos módulos
