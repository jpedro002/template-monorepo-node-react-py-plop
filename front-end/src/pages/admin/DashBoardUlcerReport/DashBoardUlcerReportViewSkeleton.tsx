import { Skeleton } from '@/components/ui/skeleton'

export const DashBoardUlcerReportViewSkeleton = () => {
	return (
		<main className="flex-1 p-4 md:p-6">
			<div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div>
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-4 w-[300px] mt-1" />
				</div>
				<Skeleton className="h-10 w-[200px]" />
			</div>

			<div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-2 w-full sm:w-auto">
					<Skeleton className="h-10 w-10" />
					<Skeleton className="h-10 w-[180px]" />
					<Skeleton className="h-10 w-10" />
				</div>
				<Skeleton className="h-10 w-[250px]" />
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array(9)
					.fill(0)
					.map((_, index) => (
						<div
							key={index}
							className="rounded-lg border bg-card text-card-foreground shadow-sm"
						>
							<div className="p-6 pb-2">
								<div className="flex items-center justify-between">
									<Skeleton className="h-4 w-[140px]" />
									<Skeleton className="h-4 w-4 rounded-full" />
								</div>
								<Skeleton className="h-3 w-[100px] mt-1" />
							</div>
							<div className="p-6 pt-2">
								<Skeleton className="h-8 w-[60px]" />
								<Skeleton className="h-3 w-[120px] mt-4" />
							</div>
						</div>
					))}
			</div>

			<div className="mt-8">
				<Skeleton className="h-6 w-[200px] mb-4" />
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr>
								<th className="border p-2 text-left">
									<Skeleton className="h-4 w-[150px]" />
								</th>
								<th className="border p-2 text-center">
									<Skeleton className="h-4 w-[80px] mx-auto" />
								</th>
								<th className="border p-2 text-center">
									<Skeleton className="h-4 w-[80px] mx-auto" />
								</th>
								<th className="border p-2 text-center">
									<Skeleton className="h-4 w-[80px] mx-auto" />
								</th>
							</tr>
						</thead>
						<tbody>
							{Array(9)
								.fill(0)
								.map((_, index) => (
									<tr key={index}>
										<td className="border p-2">
											<Skeleton className="h-4 w-[150px]" />
										</td>
										<td className="border p-2 text-center">
											<Skeleton className="h-4 w-[40px] mx-auto" />
										</td>
										<td className="border p-2 text-center">
											<Skeleton className="h-4 w-[40px] mx-auto" />
										</td>
										<td className="border p-2 text-center">
											<Skeleton className="h-4 w-[60px] mx-auto" />
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="hidden">
				<Skeleton className="h-[400px] w-full rounded-lg" />
			</div>
		</main>
	)
}
