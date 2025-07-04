import { CrudData, PlopAction } from './types'

export const atomsActions = (_data: CrudData): PlopAction[] => {
	return [
		{
			type: 'add',
			path: 'src/store/atoms/{{camelCase entityName}}.ts',
			templateFile: 'plop/templates/crud/jotai-atom/atoms.hbs',
		}
	]
}
