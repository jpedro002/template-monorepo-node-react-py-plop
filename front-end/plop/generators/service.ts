import { NodePlopAPI } from 'plop'

export default function serviceGenerator(plop: NodePlopAPI) {
	plop.setGenerator('service', {
		description: 'Gera um service para consumo de API',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Nome do service (ex: user, product):',
			},
		],
		actions: [
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
		],
	})
}
