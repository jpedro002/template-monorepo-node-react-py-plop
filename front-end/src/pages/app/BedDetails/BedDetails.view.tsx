import { Button } from '@/components/ui/button/button'
import { BedIcon, ClipboardListIcon, UserPlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BedDetailsViewSkeleton } from './BedDetailsViewSkeleton'
import { ActionButton } from './components/ActionButton/ActionButton'
import { EmptyBedMessage } from './components/EmptyBedMessage/EmptyBedMessage'
import { EvolutionCodesChart } from './components/EvolutionCodesChart/EvolutionCodesChart'
import { ModalAddPatientToBed } from './components/ModalAddPatientToBed/ModalAddPatientToBed'
import { ModalDailyRegister } from './components/ModalDailyRegister/ModalDailyRegister'
import { ModalRemovePatientFromBed } from './components/ModalRemovePatientFromBed/ModalRemovePatientFromBed'
import { NursingRecordsTable } from './components/NursingRecordsTable/NursingRecordsTable'
import { PatientProfileCard } from './components/PatientProfileCard/PatientProfileCard'
import { BedDetailsViewProps } from './types'

export const BedDetailsView = (props: BedDetailsViewProps) => {
	const {
		setLiberarLeitoOpen,
		setAdicionarPacienteOpen,
		setRegistroDiaOpen,
		bedDetails,
		formateBirthDate,
		hasPatient,
		isLoading,
		checkedToday,
	} = props

	if (isLoading && hasPatient) return <BedDetailsViewSkeleton />

	return (
		<>
			<main className="container mx-auto px-4 py-6 space-y-6 min-h-full">
				<Button asChild>
					<Link to="/">Voltar para Listagem</Link>
				</Button>
				{bedDetails?.patient ? (
					<>
						<PatientProfileCard
							birthDate={formateBirthDate(
								bedDetails?.patient?.dateOfBirth || '',
							)}
							name={bedDetails?.patient?.name || 'Paciente'}
							recordCode={bedDetails?.patient?.medical_record_code || '000000'}
						/>

						<EvolutionCodesChart />
					</>
				) : (
					<EmptyBedMessage />
				)}

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<ActionButton
						icon={<BedIcon className="h-6 w-6" />}
						title="Liberar Leito"
						onClick={() => setLiberarLeitoOpen(true)}
						disabled={!bedDetails?.patient}
					/>

					<ActionButton
						icon={<UserPlusIcon className="h-6 w-6" />}
						title="Adicionar Paciente"
						onClick={() => setAdicionarPacienteOpen(true)}
						disabled={!!bedDetails?.patient?.id}
					/>

					<ActionButton
						icon={<ClipboardListIcon className="h-6 w-6" />}
						title="Registro do Dia"
						onClick={() => {
							setRegistroDiaOpen(true)
						}}
						disabled={!bedDetails?.patient || checkedToday}
					/>
				</div>
			</main>
			{bedDetails?.patient && (
				<div className="w-screen md:container md:px-4 md:pb-6">
					<NursingRecordsTable />
				</div>
			)}

			<ModalRemovePatientFromBed />

			<ModalAddPatientToBed />

			<ModalDailyRegister />
		</>
	)
}
