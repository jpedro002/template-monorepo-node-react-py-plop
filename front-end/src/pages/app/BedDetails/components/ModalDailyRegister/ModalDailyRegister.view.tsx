import { ModalDailyRegisterViewProps } from './types'

import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { FormProvider } from 'react-hook-form'
// import { HelpDialog } from './components/HelpDialog/HelpDialog'
import { QuestionField } from './components/QuestionField'

export const ModalDailyRegisterView = (props: ModalDailyRegisterViewProps) => {
	const {
		questions,
		formMethods,
		handleSubmit,
		setHelpDialogOpen,
		onOpenChange,
		open,
		setCurrentQuestionId,
	} = props

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-[600px] h-screen pt-14 overflow-y-scroll md:overflow-y-auto rounded-none ">
					<DialogHeader>
						<DialogTitle>Registro do Dia</DialogTitle>
						<DialogDescription>
							Registre as informações do paciente para o dia de hoje.
						</DialogDescription>
					</DialogHeader>
					<FormProvider {...formMethods}>
						<form onSubmit={handleSubmit} className="space-y-4">
							{questions.map((question) => (
								<QuestionField
									key={question.id}
									question={question}
									onOpenHelp={() => {
										setHelpDialogOpen(true)
										setCurrentQuestionId(question.id)
									}}
								/>
							))}
							<DialogFooter>
								<Button type="submit">Salvar Registro</Button>
							</DialogFooter>
						</form>
					</FormProvider>
				</DialogContent>
			</Dialog>

			{/* // TODO: HelpDialog

			<HelpDialog /> */}
		</>
	)
}
