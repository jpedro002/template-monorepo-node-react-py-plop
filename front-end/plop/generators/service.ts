import { NodePlopAPI } from 'plop'

export const servicePrompts = [
	{
		type: 'input',
		name: 'name',
		message: 'Nome do service (ex: user, product):',
	},

]

export const serviceActions = (data: any) => {
	const actions = [
		{
			type: 'add',
			path: 'src/services/{{kebabCase name}}/index.ts',
			templateFile: 'plop/templates/service/index.hbs',
		},
		{
			type: 'add',
			path: 'src/services/{{kebabCase name}}/types.ts',
			templateFile: 'plop/templates/service/types.hbs',
		},
		{
			type: 'add',
			path: 'src/services/{{kebabCase name}}/I{{pascalCase name}}Service.ts',
			templateFile: 'plop/templates/service/interface.hbs',
		},
		{
			type: 'add',
			path: 'src/services/{{kebabCase name}}/{{camelCase name}}.service.ts',
			templateFile: 'plop/templates/service/service.hbs',
		},
		{
			type: 'add',
			path: 'src/services/{{kebabCase name}}/{{camelCase name}}.query-keys.ts',
			templateFile: 'plop/templates/service/query-keys.hbs',
		},
		{
			type: 'add',
			path: 'src/services/{{kebabCase name}}/use{{pascalCase name}}.ts',
			templateFile: 'plop/templates/service/use-service.hbs',
		},
	]

	return actions
}

export default function serviceGenerator(plop: NodePlopAPI) {
	plop.setGenerator('service', {
		description: 'Gera um service para consumo de API',
		prompts: servicePrompts,
		actions: serviceActions,
	})
}
