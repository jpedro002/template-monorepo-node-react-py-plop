import { Skeleton } from '@/components/ui/skeleton'

export const BedDetailsViewSkeleton = () => {
	return (
		<main className="container mx-auto px-4 py-6 space-y-6 min-h-full">
			<Skeleton className="h-32 w-full" />
			<Skeleton className="h-64 w-full" />
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
			</div>
			<Skeleton className="h-96 w-full" />
		</main>
	)
}
