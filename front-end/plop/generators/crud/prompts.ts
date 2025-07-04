export const crudPrompts = [
	{
		type: 'input',
		name: 'entityName',
		message: 'Nome da entidade (ex: user, product, exemplo):',
		validate: (input: string) => input.length > 0 || 'Nome da entidade é obrigatório',
		default: 'exemplo'
	},
	{
		type: 'input',
		name: 'displayName',
		message: 'Nome para exibição (ex: "Usuário", "Produto", "Exemplo"):',
		validate: (input: string) => input.length > 0 || 'Nome para exibição é obrigatório',
		default: 'Exemplo'
	},
]
