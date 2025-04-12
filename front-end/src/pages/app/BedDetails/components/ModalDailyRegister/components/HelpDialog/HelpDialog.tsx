import { useHelpDialogModel } from './HelpDialog.model'
import { HelpDialogView } from './HelpDialog.view'

export const HelpDialog = () => {
	const viewModel = useHelpDialogModel()
	return <HelpDialogView {...viewModel} />
}
