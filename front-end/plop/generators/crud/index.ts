import { NodePlopAPI } from 'plop'
import { serviceActions } from '../service'
import { atomsActions } from './atomsActions'
import { cardComponentActions } from './cardComponentActions'
import { createDialogActions } from './createDialogActions'
import { filterComponentActions } from './filterComponentActions'
import { mvvmActions } from './mvvmActions'
import { crudPrompts } from './prompts'
import { tableComponentActions } from './tableComponentActions'
import { updateDialogActions } from './updateDialogActions'

export const crudActions = (data: any) => {
	const actions: any[] = []

	data.name = data.entityName // Para compatibilidade com service generator

	// Service Layer
	actions.push(...serviceActions(data))

	// Estado Global (Atoms)
	actions.push(...atomsActions(data))

	// MVVM Structure
	actions.push(...mvvmActions(data))

	// Card Component
	actions.push(...cardComponentActions(data))

	// Table Component
	actions.push(...tableComponentActions(data))

	// Create Dialog
	actions.push(...createDialogActions(data))

	// Update Dialog
	actions.push(...updateDialogActions(data))

	// Filter Component
	actions.push(...filterComponentActions(data))

	return actions
}

export default function crud(plop: NodePlopAPI) {
	plop.setGenerator('crud', {
		description: 'Gerar CRUD completo com Service, MVVM e componentes',
		prompts: crudPrompts,
		actions: crudActions,
	})
}
