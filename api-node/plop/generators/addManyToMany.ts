import { NodePlopAPI } from 'plop'

export const addManyToManyGenerator = (plop: NodePlopAPI) => {
	plop.setGenerator('add-many-to-many', {
		description:
			'Adiciona métodos many-to-many a um repository existente',
		prompts: [
			{
				type: 'input',
				name: 'model',
				message: 'Nome do modelo de junção (ex: ExamAnswer, UserRole, etc.):',
			},
			{
				type: 'input',
				name: 'parentModel',
				message: 'Nome do modelo pai (ex: Patient, User, etc.):',
			},
			{
				type: 'input',
				name: 'relationModel',
				message: 'Nome do modelo relacionado (ex: Exam, Role, etc.):',
			},
		],
		actions: [
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
		],
	})
}
