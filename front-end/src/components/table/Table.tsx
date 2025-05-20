import { Button } from '@/components/ui/button/button'
import {
	Table as ShadcnTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { convertMetadado, renderType } from '@/ultils/renderType'
import { ChevronDown, ChevronUp, Menu, Plus } from 'lucide-react'
import { Fragment, ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ITableHeader {
	label: string
	field: string
	type?: string
	complex?: string
	align?: 'left' | 'right' | 'center'
	mask?: ((row: any) => ReactNode) | string
}

interface CallbackButton {
	cb: (row: any) => void
	icon?: string
	title?: string
	show?: boolean | ((row: any) => boolean)
	permission?: string
}

interface TableProps {
	title?: string
	header: ITableHeader[]
	data: Record<string, any>[]
	pagination?: any
	verifyPermission?: (permission: string) => boolean
	cb?: CallbackButton[] | ((row: any) => void)
	novo?: string
	details?: boolean
	metadados?: string | null
}

// Componente para renderizar os botões de ação
const TableActions = ({
	row,
	metadados,
	details,
	expandedRows,
	toggleExpandRow,
	pathname,
	cb,
	verifyPermission,
}: {
	row: Record<string, any>
	metadados: string | null
	details: boolean
	expandedRows: Record<string, boolean>
	toggleExpandRow: (id: string) => void
	pathname: string
	cb?: CallbackButton[] | ((row: any) => void)
	verifyPermission?: (permission: string) => boolean
}) => {
	const hasMetadata = metadados && row[metadados]

	return (
		<div className="flex gap-1">
			{hasMetadata && (
				<Button
					variant="ghost"
					size="icon"
					onClick={() => toggleExpandRow(row.id)}
					className="h-8 w-8"
				>
					{expandedRows[row.id] ? (
						<ChevronUp size={16} />
					) : (
						<ChevronDown size={16} />
					)}
				</Button>
			)}

			{details && (
				<Button variant="ghost" size="icon" asChild className="h-8 w-8">
					<Link to={`${pathname}/${row.id}`} title="Detalhes">
						<Menu size={16} />
					</Link>
				</Button>
			)}

			{renderCallbackButtons(row, cb, verifyPermission)}
		</div>
	)
}

// Função para renderizar botões de callback
const renderCallbackButtons = (
	row: Record<string, any>,
	cb?: CallbackButton[] | ((row: any) => void),
	verifyPermission?: (permission: string) => boolean,
) => {
	if (!cb) return null

	if (Array.isArray(cb)) {
		return cb.map((button, ix) => {
			const showParam =
				button.show === undefined ||
				(typeof button.show === 'boolean' ? button.show : button.show(row))

			const show = verifyPermission
				? verifyPermission(`BTN${String(button.permission).toUpperCase()}`) &&
					showParam
				: showParam

			if (!show) return null

			return (
				<Button
					key={`btn-${ix}`}
					variant="ghost"
					size="icon"
					onClick={() => button.cb(row)}
					title={button.title || ''}
					className="h-8 w-8"
				>
					{button.icon ? (
						<i className={`fa ${button.icon}`} />
					) : (
						<Menu size={16} />
					)}
				</Button>
			)
		})
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => cb(row)}
			className="h-8 w-8"
		>
			<Menu size={16} />
		</Button>
	)
}

// Componente para renderizar células de dados
const TableDataCell = ({
	row,
	header,
	renderType,
}: {
	row: Record<string, any>
	header: ITableHeader
	renderType: (value: any, type?: string) => ReactNode
}) => {
	const { align, field, complex, type, mask } = header

	const className = align
		? `text-${align}`
		: type === 'number'
			? 'text-right'
			: ''

	const getValue = () => {
		if (row[field] !== undefined) {
			return renderType(
				complex ? (row[field] ? row[field][complex] : null) : row[field],
				type,
			)
		}

		if (mask) {
			return typeof mask === 'function' ? mask(row) : mask
		}

		return null
	}

	return <TableCell className={className}>{getValue()}</TableCell>
}

// Componente para metadados
const MetadataRow = ({
	row,
	metadados,
	header,
	expandedRows,
	convertMetadado,
}: {
	row: Record<string, any>
	metadados: string
	header: ITableHeader[]
	expandedRows: Record<string, boolean>
	convertMetadado: (valor: any, tipo: string) => ReactNode
}) => {
	if (!metadados || !row[metadados] || !expandedRows[row.id]) return null

	return (
		<TableRow className="bg-muted/50">
			<TableCell colSpan={header.length + 1} className="p-4">
				<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
					{row[metadados].map((meta: any, index: number) => {
						const metaInfo = (Object.values(meta).find(
							(f: any) => typeof f === 'object',
						) as { nome: string; tipo: string }) || { nome: '', tipo: '' }

						return (
							<div key={`meta-${index}`} className="space-y-1">
								<p className="font-medium text-sm">{metaInfo.nome}</p>
								<p className="text-sm text-muted-foreground">
									{convertMetadado(meta.valor, metaInfo.tipo)}
								</p>
							</div>
						)
					})}
				</div>
			</TableCell>
		</TableRow>
	)
}

// Componente principal
export const Table = ({
	data = [],
	header = [],
	cb,
	novo,
	details = true,
	metadados = null,
	verifyPermission,
}: TableProps) => {
	const { pathname } = useLocation()

	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

	const toggleExpandRow = (id: string) => {
		setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	const hasNoData = !Array.isArray(data) || data.length === 0

	return (
		<div className="overflow-x-auto rounded-md border">
			<ShadcnTable>
				<TableHeader>
					{novo && (
						<TableRow>
							<TableHead colSpan={100}>
								<Link
									to={`?addResource=true`}
									className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
								>
									<Plus size={16} />
									<span>Novo</span>
								</Link>
							</TableHead>
						</TableRow>
					)}

					<TableRow>
						{(details || cb) && <TableHead className="w-[100px]"></TableHead>}
						{header.map((el, ix) => (
							<TableHead
								key={ix}
								className={
									el?.align
										? `text-${el.align}`
										: el?.type === 'number'
											? 'text-right'
											: 'text-left'
								}
							>
								{el?.label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{hasNoData ? (
						<TableRow>
							<TableCell
								colSpan={header.length + (details || cb ? 1 : 0)}
								className="text-center py-4"
							>
								Nenhum dado encontrado
							</TableCell>
						</TableRow>
					) : (
						data.map((row, rowIndex) => (
							<Fragment key={`row-${rowIndex}`}>
								<TableRow className="group">
									{(details || cb) && (
										<TableCell className="p-2">
											<TableActions
												row={row}
												metadados={metadados}
												details={details}
												expandedRows={expandedRows}
												toggleExpandRow={toggleExpandRow}
												pathname={pathname}
												cb={cb}
												verifyPermission={verifyPermission}
											/>
										</TableCell>
									)}

									{header.map((column, colIndex) => (
										<TableDataCell
											key={`cell-${colIndex}`}
											row={row}
											header={column}
											renderType={renderType}
										/>
									))}
								</TableRow>

								{metadados && (
									<MetadataRow
										row={row}
										metadados={metadados}
										header={header}
										expandedRows={expandedRows}
										convertMetadado={convertMetadado}
									/>
								)}
							</Fragment>
						))
					)}
				</TableBody>
			</ShadcnTable>
		</div>
	)
}

export default Table
