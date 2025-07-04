import { Button } from '@/components/ui/button/button'
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'
import { PaginationViewProps } from './types'

export function PaginationView(props: PaginationViewProps) {
	const { page, rowCount, pageCount, pageSize, goToPage } = props

	const startItem = rowCount === 0 ? 0 : (page - 1) * pageSize + 1
	const endItem = Math.min(page * pageSize, rowCount)

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
			<div className="text-sm text-muted-foreground">
				Mostrando <span className="font-medium">{startItem}</span> a{' '}
				<span className="font-medium">{endItem}</span> de{' '}
				<span className="font-medium">{rowCount}</span> registros
			</div>
			{pageCount > 1 && (
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => goToPage(1)}
						disabled={page === 1}
						aria-label="Primeira página"
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => goToPage(page - 1)}
						disabled={page === 1}
						aria-label="Página anterior"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<div className="flex items-center">
						{Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
							let pageNum: number
							if (pageCount <= 5) {
								pageNum = i + 1
							} else if (page <= 3) {
								pageNum = i + 1
							} else if (page >= pageCount - 2) {
								pageNum = pageCount - 4 + i
							} else {
								pageNum = page - 2 + i
							}
							return (
								<Button
									key={pageNum}
									variant={page === pageNum ? 'default' : 'outline'}
									size="icon"
									onClick={() => goToPage(pageNum)}
									aria-label={`Página ${pageNum}`}
									aria-current={page === pageNum ? 'page' : undefined}
								>
									{pageNum}
								</Button>
							)
						})}
					</div>

					<Button
						variant="outline"
						size="icon"
						onClick={() => goToPage(page + 1)}
						disabled={page === pageCount}
						aria-label="Próxima página"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => goToPage(pageCount)}
						disabled={page === pageCount}
						aria-label="Última página"
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	)
}
