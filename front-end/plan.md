# Planejamento: Gerador CRUD Automático com Plop

## Objetivo
Criar um gerador Plop que automatize a criação completa de CRUDs, integrando os geradores existentes de **Service** e **MVVM** em um fluxo único e otimizado, baseado na estrutura atual do projeto `SurgicalPatients`.

## Análise da Estrutura Atual

### Arquivos Base de Referência:
- **Service**: `/surgical-patients/` (6 arquivos)
- **MVVM**: `/SurgicalPatients/` (estrutura de página)
- **Atoms**: `/surgicalPatients.ts` (estado global)

### Padrões Identificados:
1. **Nomenclatura**: kebab-case para services, PascalCase para componentes MVVM
2. **Estrutura Service**: Interface, implementação, tipos, query-keys, hook customizado
3. **Estrutura MVVM**: Model, View, ViewModel (component), tipos, sub-componentes
4. **Estado Global**: Atoms Jotai para modais e estado da aplicação

## Funcionalidades do Gerador CRUD

### 1. Prompts Interativos
```typescript
const crudPrompts = [
  {
    type: 'input',
    name: 'entityName',
    message: 'Nome da entidade (ex: user, product, surgicalPatient):',
    validate: (input) => input.length > 0
  },
  {
    type: 'input', 
    name: 'displayName',
    message: 'Nome para exibição (ex: "Usuário", "Produto", "Paciente Cirúrgico"):',
    validate: (input) => input.length > 0
  },
  {
    type: 'checkbox',
    name: 'operations',
    message: 'Operações CRUD a incluir:',
    choices: [
      { name: 'Create (Criar)', value: 'create', checked: true },
      { name: 'Read (Listar/Buscar)', value: 'read', checked: true },
      { name: 'Update (Editar)', value: 'update', checked: true },
      { name: 'Delete (Excluir)', value: 'delete', checked: true }
    ]
  },
  {
    type: 'checkbox',
    name: 'components',
    message: 'Componentes a gerar:',
    choices: [
      { name: 'Service Layer', value: 'service', checked: true },
      { name: 'MVVM Structure', value: 'mvvm', checked: true },
      { name: 'Atoms (Estado Global)', value: 'atoms', checked: true },
      { name: 'Dialog Create', value: 'dialogCreate', checked: true },
      { name: 'Dialog Update', value: 'dialogUpdate', checked: true },
      { name: 'Table Component', value: 'table', checked: true },
      { name: 'Card Component', value: 'card', checked: true },
      { name: 'Filter Component', value: 'filter', checked: true }
    ]
  },
  {
    type: 'input',
    name: 'baseFields',
    message: 'Campos base da entidade (separados por vírgula):',
    default: 'id,name,createdAt,updatedAt'
  },
  {
    type: 'input',
    name: 'searchFields',
    message: 'Campos para busca (separados por vírgula):',
    default: 'name'
  },
  {
    type: 'confirm',
    name: 'includePagination',
    message: 'Incluir paginação?',
    default: true
  },
  {
    type: 'list',
    name: 'defaultView',
    message: 'Visualização padrão:',
    choices: ['card', 'table'],
    default: 'card'
  }
]
```

### 2. Estrutura de Arquivos Gerados

#### 2.1 Service Layer (`src/services/{entity}/`)
- ✅ `index.ts` - Export principal
- ✅ `types.ts` - Interfaces e tipos
- ✅ `I{Entity}Service.ts` - Interface do serviço  
- ✅ `{entity}.service.ts` - Implementação do serviço
- ✅ `{entity}.query-keys.ts` - Query keys para React Query
- ✅ `use{Entity}.ts` - Hook customizado

#### 2.2 MVVM Structure (`src/pages/{Entity}/` ou `src/components/{Entity}/`)
- ✅ `{Entity}.tsx` - ViewModel (componente principal)
- ✅ `{Entity}.view.tsx` - View (apresentação)
- ✅ `{Entity}.model.ts` - Model (lógica de negócio)
- ✅ `types.ts` - Tipos específicos do componente
- ✅ `index.ts` - Export principal

#### 2.3 Sub-componentes (`components/`)
- 🆕 `card-{entity}/` - Componente de card
- 🆕 `table-{entity}/` - Componente de tabela
- 🆕 `create-{entity}-dialog/` - Dialog de criação
- 🆕 `update-{entity}-dialog/` - Dialog de edição
- 🆕 `filter/` - Componente de filtros
- 🆕 `Pagination/` - Componente de paginação (se aplicável)

#### 2.4 Estado Global
- 🆕 `src/store/atoms/{entity}.ts` - Atoms Jotai para estado global

### 3. Templates Handlebars Necessários

#### 3.1 Novos Templates Service (aprimorados)
- `service/index.hbs` ✅
- `service/types.hbs` ✅  
- `service/interface.hbs` ✅
- `service/service.hbs` ✅
- `service/query-keys.hbs` ✅
- `service/use-service.hbs` ✅

#### 3.2 Novos Templates MVVM (aprimorados)
- `mvvm/viewmodel.hbs` ✅
- `mvvm/view.hbs` ✅
- `mvvm/model.hbs` ✅
- `mvvm/types.hbs` ✅

#### 3.3 Novos Templates CRUD
- `crud/atoms.hbs` 🆕
- `crud/card-component/` 🆕
  - `crud/card-component/component.hbs`
  - `crud/card-component/index.hbs`
  - `crud/card-component/types.hbs`
- `crud/table-component/` 🆕
  - `crud/table-component/component.hbs`
  - `crud/table-component/index.hbs`
  - `crud/table-component/types.hbs`
- `crud/create-dialog/` 🆕
  - `crud/create-dialog/viewmodel.hbs`
  - `crud/create-dialog/model.hbs`
  - `crud/create-dialog/view.hbs`
  - `crud/create-dialog/index.hbs`
  - `crud/create-dialog/schema.hbs`
  - `crud/create-dialog/types.hbs`
- `crud/update-dialog/` 🆕
  - `crud/update-dialog/viewmodel.hbs`
  - `crud/update-dialog/model.hbs`
  - `crud/update-dialog/view.hbs`
  - `crud/update-dialog/index.hbs`
  - `crud/update-dialog/schema.hbs`
  - `crud/update-dialog/types.hbs`
- `crud/filter-component/` 🆕
  - `crud/filter-component/viewmodel.hbs`
  - `crud/filter-component/model.hbs`
  - `crud/filter-component/view.hbs`
  - `crud/filter-component/index.hbs`
  - `crud/filter-component/schema.hbs`
  - `crud/filter-component/types.hbs`
- `crud/pagination-component/` 🆕
  - `crud/pagination-component/viewmodel.hbs`
  - `crud/pagination-component/model.hbs`
  - `crud/pagination-component/view.hbs`
  - `crud/pagination-component/index.hbs`
  - `crud/pagination-component/types.hbs`

### 4. Integração com Geradores Existentes

#### 4.1 Reutilização de Código
```typescript
// Em crud/index.ts
import { serviceActions, servicePrompts } from '../service'
import { mvvmActions, mvvmPrompts } from '../mvvm'

// Combinar actions existentes com novas específicas do CRUD
const crudActions = [
  ...serviceActions(data),
  ...mvvmActions(data), 
  ...atomsActions(data),
  ...componentActions(data)
]
```

#### 4.2 Extensão de Funcionalidades
- Adicionar prompts específicos do CRUD
- Gerar componentes especializados
- Configurar estado global automaticamente
- Criar estrutura de sub-componentes

### 5. Funcionalidades Avançadas

#### 5.1 Configuração Automática de Rotas
```typescript
// Auto-adicionar ao router.tsx
{
  path: '/{{kebabCase entityName}}',
  element: <{{pascalCase entityName}} />
}
```

#### 5.2 Integração com React Query
- Query keys padronizadas
- Hooks otimizados para CRUD
- Cache management
- Error handling

#### 5.3 Estado Compartilhado (Jotai)
```typescript
// Atoms gerados automaticamente
export const modal{Entity}CreateAtom = atom<boolean>(false)
export const modal{Entity}UpdateAtom = atom<boolean>(false)  
export const current{Entity}IDAtom = atom<number>(0)
export const viewMode{Entity}Atom = atomWithStorage('viewMode{Entity}', '{{defaultView}}')
```

### 6. Implementação por Fases

#### Fase 1: Fundação (Semana 1)
- [ ] Atualizar `plopfile.ts` para incluir gerador CRUD
- [ ] Criar estrutura básica em `plop/generators/crud/`
- [ ] Implementar prompts principais
- [ ] Integrar com geradores existentes

#### Fase 2: Templates Core (Semana 2)  
- [ ] Criar templates para atoms
- [ ] Desenvolver templates de componentes base
- [ ] Implementar lógica de geração de arquivos
- [ ] Testes básicos de geração

#### Fase 3: Componentes Avançados (Semana 3)
- [ ] Templates para dialogs de CRUD
- [ ] Componentes de tabela e card
- [ ] Sistema de filtros
- [ ] Paginação

#### Fase 4: Integração e Refinamento (Semana 4)
- [ ] Integração com router
- [ ] Otimizações de performance
- [ ] Documentação
- [ ] Testes completos

### 7. Benefícios Esperados

#### 7.1 Produtividade
- ⚡ Redução de 80% no tempo de criação de CRUDs
- 🔄 Consistência arquitetural
- 📝 Padronização de código
- 🚀 Foco em lógica de negócio

#### 7.2 Qualidade
- ✅ Estrutura testada e validada
- 🏗️ Arquitetura MVVM consistente
- 🔒 Type safety garantido
- 📊 Performance otimizada

#### 7.3 Manutenibilidade
- 📋 Padrões documentados
- 🔧 Fácil customização
- 📦 Reutilização de componentes
- 🎯 Separação de responsabilidades

### 8. Exemplo de Uso

```bash
# Comando para gerar CRUD completo
pnpm plop crud

# Prompts:
# Nome da entidade: product
# Nome para exibição: Produto  
# Operações CRUD: ✅ Create, Read, Update, Delete
# Componentes: ✅ Service, MVVM, Atoms, Dialogs, Table, Card, Filter
# Campos base: id,name,description,price,createdAt,updatedAt
# Campos para busca: name,description
# Incluir paginação: Yes
# Visualização padrão: card
```

### 9. Estrutura Final Gerada

```
src/
├── services/product/
│   ├── index.ts
│   ├── types.ts  
│   ├── IProductService.ts
│   ├── product.service.ts
│   ├── product.query-keys.ts
│   └── useProduct.ts
├── pages/Product/
│   ├── Product.tsx
│   ├── Product.view.tsx
│   ├── Product.model.ts
│   ├── types.ts
│   ├── index.ts
│   └── components/
│       ├── card-{entity}/
│       │   ├── Card{Entity}.tsx
│       │   ├── index.ts
│       │   └── types.ts
│       ├── table-{entity}/
│       │   ├── Table{Entity}.tsx
│       │   ├── index.ts
│       │   └── types.ts
│       ├── create-{entity}-dialog/
│       │   ├── Create{Entity}Dialog.tsx
│       │   ├── Create{Entity}Dialog.model.ts
│       │   ├── Create{Entity}Dialog.view.tsx
│       │   ├── index.ts
│       │   ├── schema.ts
│       │   └── types.ts
│       ├── update-{entity}-dialog/
│       │   ├── Update{Entity}Dialog.tsx
│       │   ├── Update{Entity}Dialog.model.ts
│       │   ├── Update{Entity}Dialog.view.tsx
│       │   ├── index.ts
│       │   ├── schema.ts
│       │   └── types.ts
│       ├── filter/
│       │   ├── Filter.tsx
│       │   ├── Filter.model.ts
│       │   ├── Filter.view.tsx
│       │   ├── index.ts
│       │   ├── schema.ts
│       │   └── types.ts
│       └── Pagination/
│           ├── Pagination.tsx
│           ├── Pagination.model.ts
│           ├── Pagination.view.tsx
│           ├── index.ts
│           └── types.ts
└── store/atoms/
    └── product.ts

### Detalhamento dos Sub-componentes

#### 9.1 Card Component (`card-{entity}/`)
- **Arquivos**: 3 arquivos
- **Propósito**: Exibição em formato de cartão para visualização compacta
- **Funcionalidades**:
  - Exibir informações principais da entidade
  - Ações rápidas (editar, excluir, visualizar)
  - Responsivo para diferentes tamanhos de tela
  - Integração com estado global para modais

#### 9.2 Table Component (`table-{entity}/`)
- **Arquivos**: 3 arquivos
- **Propósito**: Exibição tabular com recursos avançados
- **Funcionalidades**:
  - Colunas configuráveis
  - Ordenação por coluna
  - Seleção múltipla
  - Ações em lote
  - Integração com paginação

#### 9.3 Create Dialog (`create-{entity}-dialog/`)
- **Arquivos**: 6 arquivos (estrutura MVVM completa)
- **Propósito**: Modal para criação de novas entidades
- **Funcionalidades**:
  - Formulário validado com schema
  - Estados de loading e erro
  - Integração com React Query mutations
  - Feedback visual de sucesso/erro

#### 9.4 Update Dialog (`update-{entity}-dialog/`)
- **Arquivos**: 6 arquivos (estrutura MVVM completa)
- **Propósito**: Modal para edição de entidades existentes
- **Funcionalidades**:
  - Pré-carregamento de dados existentes
  - Formulário validado com schema
  - Integração com React Query mutations
  - Controle de estado otimista

#### 9.5 Filter Component (`filter/`)
- **Arquivos**: 6 arquivos (estrutura MVVM completa)
- **Propósito**: Sistema de filtros avançados
- **Funcionalidades**:
  - Filtros por múltiplos campos
  - Busca por texto
  - Filtros de data/período
  - Estado persistente
  - Reset de filtros

#### 9.6 Pagination Component (`Pagination/`)
- **Arquivos**: 5 arquivos (estrutura MVVM)
- **Propósito**: Controle de navegação entre páginas
- **Funcionalidades**:
  - Navegação por páginas
  - Controle de itens por página
  - Informações de total de registros
  - Integração com React Query
  - URLs amigáveis com query params

### Exemplos de Templates dos Sub-componentes

#### 9.7 Exemplo: Card Component Template
```typescript
// card-{entity}/Card{Entity}.tsx
import { {{pascalCase entityName}} } from '@/services/{{kebabCase entityName}}/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Card{{pascalCase entityName}}Props {
  {{camelCase entityName}}: {{pascalCase entityName}}
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function Card{{pascalCase entityName}}({ {{camelCase entityName}}, onEdit, onDelete }: Card{{pascalCase entityName}}Props) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{ {{camelCase entityName}}.name}</h3>
          {{#each baseFieldsArray}}
          {{#unless (eq this "id")}}
          {{#unless (eq this "name")}}
          <p className="text-sm text-muted-foreground">{ {{../camelCase ../entityName}}.{{this}}}</p>
          {{/unless}}
          {{/unless}}
          {{/each}}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit({{camelCase entityName}}.id)}>
            Editar
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete({{camelCase entityName}}.id)}>
            Excluir
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

#### 9.8 Exemplo: Create Dialog Model
```typescript
// create-{entity}-dialog/Create{Entity}Dialog.model.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { modal{{pascalCase entityName}}CreateAtom } from '@/store/atoms/{{camelCase entityName}}'
import { {{camelCase entityName}}s } from '@/services/{{kebabCase entityName}}/query-keys'
import { Create{{pascalCase entityName}}Dto } from '@/services/{{kebabCase entityName}}/types'

export function useCreate{{pascalCase entityName}}DialogModel(
  {{camelCase entityName}}Service: I{{pascalCase entityName}}Service
) {
  const [isOpen, setIsOpen] = useAtom(modal{{pascalCase entityName}}CreateAtom)
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: Create{{pascalCase entityName}}Dto) => {{camelCase entityName}}Service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: {{camelCase entityName}}s.base })
      setIsOpen(false)
      // Toast success
    },
    onError: (error) => {
      // Toast error
      console.error('Erro ao criar {{displayName}}:', error)
    }
  })

  return {
    isOpen,
    setIsOpen,
    createMutation,
    isLoading: createMutation.isPending
  }
}
```

#### 9.9 Exemplo: Filter Component Schema
```typescript
// filter/schema.ts
import { z } from 'zod'

export const {{camelCase entityName}}FilterSchema = z.object({
  searchTerm: z.string().optional(),
  {{#each searchFieldsArray}}
  {{this}}: z.string().optional(),
  {{/each}}
  createdAtFrom: z.date().optional(),
  createdAtTo: z.date().optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(20)
})

export type {{pascalCase entityName}}FilterData = z.infer<typeof {{camelCase entityName}}FilterSchema>
```
```

### 10. Próximos Passos

1. **Setup Inicial**: Configurar estrutura base do gerador
2. **Templates**: Desenvolver templates Handlebars
3. **Integração**: Conectar com geradores existentes  
4. **Testes**: Validar geração com diferentes entidades
5. **Documentação**: Criar guia de uso
6. **Otimização**: Refinar baseado no feedback

---

**Estimativa Total**: 4 semanas de desenvolvimento
**Complexidade**: Média-Alta
**Impacto**: Alto (melhoria significativa na produtividade)