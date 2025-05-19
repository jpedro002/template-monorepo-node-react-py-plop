import type { NodePlopAPI } from 'plop'
import { validatePrismaModel } from './validatePrismaModel.js'

interface RouteAnswers {
	model: string
	method: 'get' | 'post' | 'put' | 'delete' | 'patch'
	routeName: string
	routePath: string
	needsParams: boolean
	needsBody: boolean
}

interface PlopAction {
	type: string
	path?: string
	templateFile?: string
	template?: string
	pattern?: string | RegExp
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: Record<string, any>
}

export const routeGenerator = (plop: NodePlopAPI): void => {
	plop.setGenerator('route', {
		description:
			'Gera uma nova rota completa (controller, use case e adiciona ao arquivo de rotas)',
		prompts: [
			{
				type: 'input',
				name: 'model',
				message: 'Nome do modelo do Prisma (ex: User, Product, etc.):',
				validate: (inp) => validatePrismaModel(inp),
			},
			{
				type: 'list',
				name: 'method',
				message: 'Qual o método HTTP desta rota?',
				choices: ['get', 'post', 'put', 'delete', 'patch'],
			},
			{
				type: 'input',
				name: 'routeName',
				message: 'Nome da rota (ex: search, enable, approve):',
				validate: (input: string) => {
					if (!input) {
						return 'O nome da rota é obrigatório'
					}
					return true
				},
			},
			{
				type: 'input',
				name: 'routePath',
				message: 'Caminho da rota (ex: /search, /:id/approve):',
				default: (answers: Partial<RouteAnswers>) => {
					if (answers.method === 'get') {
						return `/${answers.routeName}`
					}
					return '/:id'
				},
			},
			{
				type: 'confirm',
				name: 'needsParams',
				message: 'Esta rota precisa de parâmetros?',
				default: (answers: Partial<RouteAnswers>) =>
					answers.routePath ? answers.routePath.includes(':') : false,
			},
			{
				type: 'confirm',
				name: 'needsBody',
				message: 'Esta rota precisa receber dados no corpo da requisição?',
				default: (answers: Partial<RouteAnswers>) =>
					answers.method
						? ['post', 'put', 'patch'].includes(answers.method)
						: false,
			},
		],
		actions: (answers): PlopAction[] => {
			const actions: PlopAction[] = []

			actions.push({
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/{{kebabCase routeName}}-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/custom-use-case.hbs',
				data: {
					method: answers?.method,
					needsParams: answers?.needsParams,
					needsBody: answers?.needsBody,
				},
			})

			actions.push({
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/{{kebabCase routeName}}-{{kebabCase model}}-controller.ts',
				templateFile: 'plop/templates/controllers/custom-controller.hbs',
				data: {
					method: answers?.method,
					needsParams: answers?.needsParams,
					needsBody: answers?.needsBody,
				},
			})

			actions.push({
				type: 'append',
				path: 'src/http/controllers/{{kebabCase model}}s/@routes.ts',
				pattern: 'import {',
				template: `import { {{pascalCase routeName}}{{pascalCase model}}Controller } from './{{kebabCase routeName}}-{{kebabCase model}}-controller'`,
			})

			actions.push({
				type: 'append',
				path: 'src/http/controllers/{{kebabCase model}}s/@routes.ts',
				pattern:
					/export async function.*\{[\s\S]*?(\n\s*\/\/ End of routes|\}\s*$)/,
				templateFile: 'plop/templates/controllers/route-definition.hbs',
			})

			return actions
		},
	})
}
