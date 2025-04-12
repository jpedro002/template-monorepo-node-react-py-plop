import { PrismaClient } from '@prisma/client'
export default function (plop) {
	plop.setGenerator('crud', {
		description:
			'Gera um novo arquivo de repositório baseado em um modelo do Prisma',
		prompts: [
			{
				type: 'input',
				name: 'model',
				message: 'Nome do modelo do Prisma (ex: User, Product, etc.):',
				validate: async (input) => {
					try {
						const prisma = new PrismaClient()

						// Obtenha todos os modelos disponíveis
						const allModels = Object.keys(prisma).filter(
							(key) => !key.startsWith('_') && typeof prisma[key] === 'object',
						)

						// Verificar se o modelo existe (de forma case insensitive)
						const normalizedInput = input.toLowerCase()
						const modelExists = allModels.some(
							(model) => model.toLowerCase() === normalizedInput,
						)

						if (!modelExists) {
							// Filtrar modelos que começam com a mesma letra
							const firstLetter = input.charAt(0).toLowerCase()
							const suggestedModels = allModels
								.filter(
									(model) => model.toLowerCase().charAt(0) === firstLetter,
								)
								.sort()

							let errorMessage = `O modelo "${input}" não existe no Prisma schema!`

							if (suggestedModels.length > 0) {
								errorMessage += `\nModelos disponíveis que começam com "${firstLetter.toUpperCase()}" ou "${firstLetter}": ${suggestedModels.join(', ')}`
							} else {
								errorMessage += `\nNenhum modelo encontrado iniciando com "${firstLetter.toUpperCase()}" ou "${firstLetter}".`
							}

							return errorMessage
						}

						const correctModelName = allModels.find(
							(model) => model.toLowerCase() === normalizedInput,
						)

						if (!correctModelName) {
							return `Modelo "${input}" não encontrado.`
						}

						return true
					} catch (error) {
						return `Erro ao validar o modelo: ${error.message}`
					}
				},
			},
		],
		actions: [
			// Gerar o repositório
			{
				type: 'add',
				path: 'src/repositories/{{kebabCase model}}-repository.ts',
				templateFile: 'plop/templates/repository/repositoryV2.hbs',
			},
			// Gerar casos de uso
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
			// Gerar controllers
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
			// Gerar arquivo de rotas
			{
				type: 'add',
				path: 'src/http/controllers/{{kebabCase model}}s/@routes.ts',
				templateFile: 'plop/templates/controllers/routes.hbs',
			},
		],
	})
}
