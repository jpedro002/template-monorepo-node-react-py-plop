import { Button } from '@/components/ui/button/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { Controller } from 'react-hook-form'
import { IFilteBedsViewProps } from './types'

export const FilterBedsView = (props: IFilteBedsViewProps) => {
	const {
		register,
		handleSubmit,
		handleFilter,
		handleClearFilters,
		control,
		isAnySelectOpen,
		setIsCheckStatusOpen,
		setIsOccupancyStatusOpen,
	} = props

	return (
		<Card className="mb-6">
			<CardContent className="pt-6">
				<form onSubmit={handleSubmit(handleFilter)}>
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
						<div className="space-y-2">
							<Label htmlFor="bed-name">Nome do Leito</Label>
							<Input
								id="bed-name"
								placeholder="Ex: 01, 02..."
								{...register('bedName')}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="patient-record">Prontuário</Label>
							<Input
								id="patient-record"
								placeholder="Ex: P12345"
								{...register('patientRecord')}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="check-status">Status de Checagem</Label>
							<Controller
								name="checkStatus"
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										onOpenChange={setIsCheckStatusOpen}
										value={field.value}
									>
										<SelectTrigger id="check-status">
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos</SelectItem>
											<SelectItem value="checked">Checado</SelectItem>
											<SelectItem value="pending">Pendente</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="occupancy-status">Status de Ocupação</Label>
							<Controller
								name="occupancyStatus"
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										onOpenChange={setIsOccupancyStatusOpen}
										value={field.value}
									>
										<SelectTrigger id="occupancy-status">
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos</SelectItem>
											<SelectItem value="occupied">Ocupado</SelectItem>
											<SelectItem value="available">Disponível</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>

					<div className="mt-4 flex justify-end">
						<Button type="submit" disabled={isAnySelectOpen}>
							Filtrar
						</Button>
						<Button
							type="button"
							onClick={handleClearFilters}
							className="ml-2"
							disabled={isAnySelectOpen}
						>
							Limpar Filtros
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
