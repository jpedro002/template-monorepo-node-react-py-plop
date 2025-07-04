import { NodePlopAPI } from 'plop'
import { validatePrismaModel } from './validatePrismaModel.js'

export const manyToManyGenerator = (plop: NodePlopAPI) => {
	plop.setGenerator('many-to-many', {
		description:
			'Gera um CRUD completo para relacionamentos many-to-many baseado em um modelo do Prisma',
		prompts: [
			{
				type: 'input',
				name: 'model',
				message: 'Nome do modelo de junção (ex: ExamAnswer, UserRole, etc.):',
				validate: (inp) => validatePrismaModel(inp),
			},
			{
				type: 'input',
				name: 'parentModel',
				message: 'Nome do modelo pai (ex: Patient, User, etc.):',
				validate: (inp) => inp.length > 0 || 'Nome do modelo pai é obrigatório',
			},
			{
				type: 'input',
				name: 'relationModel',
				message: 'Nome do modelo relacionado (ex: Exam, Role, etc.):',
				validate: (inp) => inp.length > 0 || 'Nome do modelo relacionado é obrigatório',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/repositories/{{kebabCase model}}-repository.ts',
				templateFile: 'plop/templates/repository/repositoryV2.hbs',
				data: {
					isManyToMany: true
				}
			},

			// Create many use cases
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/create-{{kebabCase model}}-many-use-case.ts',
				templateFile: 'plop/templates/use-cases/create-many-use-case.hbs',
			},
			{
				type: 'add',
				path: 'src/use-cases/{{kebabCase model}}/delete-{{kebabCase model}}-many-use-case.ts',
				templateFile: 'plop/templates/use-cases/delete-many-use-case.hbs',
			},

			// Standard use cases
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

			// Create many controllers
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/create-{{kebabCase model}}-many-controller.ts',
				templateFile: 'plop/templates/controllers/create-many-controller.hbs',
			},
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/delete-{{kebabCase model}}-many-controller.ts',
				templateFile: 'plop/templates/controllers/delete-many-controller.hbs',
			},

			// Standard controllers
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
				templateFile: 'plop/templates/controllers/routes-many-to-many.hbs',
			},
		],
	})
}
