import { CrudData, PlopAction } from './types'

export const mvvmActions = (_data: CrudData): PlopAction[] => {
	return [
		// ViewModel (componente principal)
		{
			type: 'add',
			path: 'src/pages/{{pascalCase entityName}}/{{pascalCase entityName}}.tsx',
			templateFile: 'plop/templates/crud/mvvm/viewmodel.hbs',
		},
		// View
		{
			type: 'add',
			path: 'src/pages/{{pascalCase entityName}}/{{pascalCase entityName}}.view.tsx',
			templateFile: 'plop/templates/crud/mvvm/view.hbs',
		},
		// Model
		{
			type: 'add',
			path: 'src/pages/{{pascalCase entityName}}/{{pascalCase entityName}}.model.ts',
			templateFile: 'plop/templates/crud/mvvm/model.hbs',
		},
		// Types
		{
			type: 'add',
			path: 'src/pages/{{pascalCase entityName}}/types.ts',
			templateFile: 'plop/templates/crud/mvvm/types.hbs',
		},
		// Index
		{
			type: 'add',
			path: 'src/pages/{{pascalCase entityName}}/index.ts',
			templateFile: 'plop/templates/crud/mvvm/index.hbs',
		}
	]
}
