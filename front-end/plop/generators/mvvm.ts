import * as path from 'path'
import {
	ActionConfig,
	ActionType,
	AddActionConfig,
	AppendActionConfig,
	NodePlopAPI,
} from 'plop'

// interface PlopData {
// 	componentType: 'component' | 'pageComponent' | 'page'
// 	path?: string
// 	pagePath?: string
// 	componentName?: string
// 	routePath?: string
// 	name: string
// 	folder: string
// 	baseDir: string
// 	isPage?: boolean
// 	files: string[]
// 	useReactQuery?: boolean
// 	queryType?: 'query' | 'mutation'
// 	serviceName?: string
// 	serviceInterface?: string
// 	queryFunction?: string
// 	queryKey?: string
// 	returnType?: string
// }

export default function mvvmGenerator(plop: NodePlopAPI): void {
	plop.setGenerator('mvvm', {
		description: 'Gerar estrutura MVVM com imports automáticos',
		prompts: [
			{
				type: 'list',
				name: 'componentType',
				message: 'Qual tipo de componente você deseja criar?',
				choices: [
					{
						name: 'Componente para pasta components (raiz)',
						value: 'component',
					},
					{
						name: 'Componente de página (src/pages/...)',
						value: 'pageComponent',
					},
					{ name: 'Página completa com rota (src/pages/...)', value: 'page' },
				],
			},
			{
				type: 'input',
				name: 'path',
				message: 'Informe o path do componente (ex: ui/button):',
				when: (answers) => answers.componentType !== 'pageComponent',
			},
			{
				type: 'input',
				name: 'pagePath',
				message:
					'Informe o path da página onde o componente será adicionado (ex: home, post/detail):',
				when: (answers) => answers.componentType === 'pageComponent',
			},
			{
				type: 'input',
				name: 'componentName',
				message: 'Informe o nome do componente:',
				when: (answers) => answers.componentType === 'pageComponent',
			},
			{
				type: 'input',
				name: 'routePath',
				message: 'Informe o caminho da rota (ex: about, products/:id):',
				when: (answers) => answers.componentType === 'page',
			},
			{
				type: 'checkbox',
				name: 'files',
				message: 'Selecione os arquivos para gerar:',
				choices: (answers) => {
					const baseChoices = [
						{
							name: 'ViewModel (Component)',
							value: 'viewmodel',
							checked: true,
						},
						{ name: 'View', value: 'view', checked: true },
						{ name: 'Model', value: 'model', checked: true },
						{ name: 'Schema', value: 'schema', checked: false },
						{ name: 'Types', value: 'types', checked: true },
					]

					if (answers.componentType === 'page') {
						baseChoices.push({
							name: 'Rota (apenas para páginas)',
							value: 'route',
							checked: true,
						})
					}

					return baseChoices
				},
			},

			{
				type: 'confirm',
				name: 'useReactQuery',
				message: 'Deseja usar React Query no model?',
				when: (answers) => {
					const files = answers.files as string[]
					return files.includes('model')
				},
				default: false,
			},
			{
				type: 'list',
				name: 'queryType',
				message: 'Qual tipo de operação do React Query?',
				choices: [
					{ name: 'Query (buscar dados)', value: 'query' },
					{ name: 'Mutation (enviar/alterar dados)', value: 'mutation' },
				],
				when: (answers) => Boolean(answers.useReactQuery),
			},
			{
				type: 'input',
				name: 'serviceName',
				message:
					'Nome do serviço a ser usado (ex: userService, blogPostsService):',
				when: (answers) => Boolean(answers.useReactQuery),
				validate: (value: string) =>
					value ? true : 'Por favor, insira um nome para o serviço',
			},
			{
				type: 'input',
				name: 'serviceInterface',
				message: 'Interface do serviço (ex: IUserService, IBlogPostsService):',
				when: (answers) => Boolean(answers.useReactQuery),
				validate: (value: string) =>
					value ? true : 'Por favor, insira a interface do serviço',
			},
			{
				type: 'input',
				name: 'queryFunction',
				message:
					'Nome da função do serviço a ser chamada (ex: fetchUsers, createUser):',
				when: (answers) => Boolean(answers.useReactQuery),
				validate: (value: string) =>
					value ? true : 'Por favor, insira a função do serviço',
			},
			{
				type: 'input',
				name: 'queryKey',
				message: 'Chave para a query/mutation (ex: users, posts):',
				when: (answers) => Boolean(answers.useReactQuery),
				validate: (value: string) =>
					value ? true : 'Por favor, insira uma chave para a query',
			},
			{
				type: 'input',
				name: 'returnType',
				message: 'Tipo de retorno da query/mutation (ex: IUser[], IProduct):',
				when: (answers) => Boolean(answers.useReactQuery),
				validate: (value: string) =>
					value ? true : 'Por favor, insira o tipo de retorno',
			},
		],
		actions: (data: any) => {
			const actions: (AddActionConfig | AppendActionConfig)[] = []

			if (data.componentType === 'pageComponent') {
				const cleanPagePath = data.pagePath?.replace(/\s+/g, '-') || ''
				const cleanComponentName =
					data.componentName?.replace(/\s+/g, '-') || ''

				data.folder = `${cleanPagePath}/components/${cleanComponentName}`
				data.name = cleanComponentName
				data.baseDir = 'src/pages/'
			} else {
				if (!data.path) return []

				const cleanPath = data.path.replace(/\s+/g, '-')
				const name = path.basename(cleanPath)
				data.name = name
				data.folder = cleanPath
				data.routePath = data.routePath || '*'

				data.baseDir =
					data.componentType === 'component' ? 'src/components/' : 'src/pages/'

				if (data.componentType === 'page') {
					data.isPage = true
				}
			}

			if (data.files.includes('viewmodel')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/{{pascalCase name}}.tsx',
					templateFile: 'plop/templates/mvvm/viewmodel.hbs',
				})
			}

			if (data.files.includes('view')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/{{pascalCase name}}.view.tsx',
					templateFile: 'plop/templates/mvvm/view.hbs',
				})
			}

			if (data.files.includes('model')) {
				if (data.useReactQuery) {
					if (data.queryType === 'query') {
						actions.push({
							type: 'add',
							path: '{{baseDir}}{{folder}}/{{pascalCase name}}.model.ts',
							templateFile: 'plop/templates/mvvm/model-query.hbs',
						})
					} else {
						actions.push({
							type: 'add',
							path: '{{baseDir}}{{folder}}/{{pascalCase name}}.model.ts',
							templateFile: 'plop/templates/mvvm/model-mutation.hbs',
						})
					}
				} else {
					actions.push({
						type: 'add',
						path: '{{baseDir}}{{folder}}/{{pascalCase name}}.model.ts',
						templateFile: 'plop/templates/mvvm/model.hbs',
					})
				}
			}

			if (data.files.includes('schema')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/schema.ts',
					templateFile: 'plop/templates/mvvm/schema.hbs',
				})
			}

			if (data.files.includes('types')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/types.ts',
					templateFile: 'plop/templates/mvvm/types.hbs',
				})
			}

			if (data.isPage && data.files.includes('route')) {
				actions.push({
					type: 'append',
					path: 'src/router.tsx',
					pattern: /children:\s*\[/,
					template: `children: [
					{
							element: <{{pascalCase name}} />,
							path: '{{routePath}}',
					},`,
					unique: true,
					separator: '',
				})

				actions.push({
					type: 'append',
					path: 'src/router.tsx',
					pattern: /import\s+.*\s+from\s+['"]react-router-dom['"]/,
					template: `import { {{pascalCase name}} } from '{{#if isPage}}@pages{{else}}@components{{/if}}/{{folder}}/{{pascalCase name}}'`,
					unique: true,
					separator: '\n',
				})
			}

			actions.push({
				type: 'add',
				path: '{{baseDir}}{{folder}}/index.ts',
				template: `export { {{pascalCase name}} } from './{{pascalCase name}}'\n`,
			})

			return actions
		},
	})
}
