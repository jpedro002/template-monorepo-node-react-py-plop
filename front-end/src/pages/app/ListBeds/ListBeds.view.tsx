import { BedCard } from './components/BedCard/BedCard'
import { BedCardSkeleton } from './components/BedCard/BedCardSkeleton'
import DialogCreateBed from './components/DialogCreateBed/DialogCreateBed'
import { FilterBeds } from './components/FilterBeds/FilterBeds'
import { IListBedsViewProps } from './types'

export const ListBedsView = (props: IListBedsViewProps) => {
	const { beds, isLoading } = props

	return (
		<main className="container px-4 py-6">
			<FilterBeds />

			<DialogCreateBed />

			{isLoading ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<BedCardSkeleton key={index} />
					))}
				</div>
			) : beds.length === 0 ? (
				<div className="flex justify-center items-center h-64">
					<p className="text-lg text-muted-foreground">
						Nenhum leito encontrado.
					</p>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{beds.map((bed) => (
						<BedCard
							key={bed.id}
							checkedToday={bed.checkedToday}
							available={!bed.available}
							id={bed.id}
							medicalRecordId={bed.medicalRecordId}
							patientName={bed.patientName}
							name={bed.name}
							patientProfileId={bed.patientProfileId}
						/>
					))}
				</div>
			)}
		</main>
	)
}
