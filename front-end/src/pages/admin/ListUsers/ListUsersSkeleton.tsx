import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'

export function ListUsersSkeleton() {
	return (
		<>
			<Helmet title="Usuários" />

			<div className="space-y-6 mx-auto w-screen sm:w-full md:px-4 py-4 lg:px-8 md:max-w-5xl">
				<div className="px-4 md:px-0 space-y-6">
					<div className="flex justify-start">
						<Skeleton className="h-10 w-48" />
					</div>

					<div className="flex items-center gap-2">
						<Skeleton className="h-10 w-64" />
						<Skeleton className="h-10 w-32" />
					</div>
				</div>

				<div className="md:rounded-md md:border overflow-hidden">
					<Table className="min-w-[600px] mx-4 md:mx-0">
						<TableHeader>
							<TableRow className="md:bg-muted/50">
								<TableHead className="font-medium">
									<Skeleton className="h-5 w-16" />
								</TableHead>
								<TableHead className="font-medium">
									<Skeleton className="h-5 w-16" />
								</TableHead>
								<TableHead className="font-medium">
									<Skeleton className="h-5 w-16" />
								</TableHead>
								<TableHead className="font-medium text-right">
									<Skeleton className="h-5 w-16 ml-auto" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 15 }).map((_, idx) => (
								<TableRow key={idx}>
									<TableCell>
										<Skeleton className="h-5 w-[120px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-[200px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-[80px] rounded-full" />
									</TableCell>
									<TableCell className="text-right">
										<Skeleton className="h-8 w-8 rounded-full ml-auto" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
