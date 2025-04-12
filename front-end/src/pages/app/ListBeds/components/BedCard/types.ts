export type IBedCardProps = {
	id: number
	name: string | null
	patientProfileId: number | null
	available: boolean
	checkedToday: boolean
	medicalRecordId?: string | null
	patientName?: string | null
}
