import { NodePlopAPI } from 'plop'
import { validatePrismaModel } from './validatePrismaModel.js'

export const crudGenerator = (plop: NodePlopAPI) => {
	plop.setGenerator('crud', {
		description:
			'Gera um novo arquivo de repositório baseado em um modelo do Prisma',
		prompts: [
			{
				type: 'input',
				name: 'model',
				message: 'Nome do modelo do Prisma (ex: User, Product, etc.):',
				validate: (inp) => validatePrismaModel(inp),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/repositories/{{kebabCase model}}-repository.ts',
				templateFile: 'plop/templates/repository/repositoryV2.hbs',
			},

			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/create-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/create-use-case.hbs',
			},
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/update-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/update-use-case.hbs',
			},
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/list-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/list-use-case.hbs',
			},
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/fetch-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/fetch-use-case.hbs',
			},
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/get-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/get-use-case.hbs',
			},
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/delete-{{kebabCase model}}-use-case.ts',
				templateFile: 'plop/templates/use-cases/delete-use-case.hbs',
			},

			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/create-{{kebabCase model}}-controller.ts',
				templateFile: 'plop/templates/controllers/create-controller.hbs',
			},
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/update-{{kebabCase model}}-controller.ts',
				templateFile: 'plop/templates/controllers/update-controller.hbs',
			},
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/list-{{kebabCase model}}s-controller.ts',
				templateFile: 'plop/templates/controllers/list-controller.hbs',
			},
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/fetch-{{kebabCase model}}s-controller.ts',
				templateFile: 'plop/templates/controllers/fetch-controller.hbs',
			},
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/get-{{kebabCase model}}-controller.ts',
				templateFile: 'plop/templates/controllers/get-controller.hbs',
			},
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/delete-{{kebabCase model}}-controller.ts',
				templateFile: 'plop/templates/controllers/delete-controller.hbs',
			},

			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/@routes.ts',
				templateFile: 'plop/templates/controllers/routes.hbs',
			},
		],
	})
}
