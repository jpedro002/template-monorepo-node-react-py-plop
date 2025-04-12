import { Card, CardContent } from '@/components/ui/card'

export const BedCardSkeleton = () => {
	return (
		<Card className="overflow-hidden h-[200px] animate-pulse">
			<CardContent className="p-0 h-full flex flex-col">
				<div className="flex items-center justify-between border-b p-4">
					<div className="h-4 bg-gray-300 rounded w-1/2"></div>
					<div className="h-4 bg-gray-300 rounded w-1/4"></div>
				</div>
				<div className="p-4 flex-1 flex flex-col">
					<div className="flex-1 h-full space-y-2">
						<div className="h-4 bg-gray-300 rounded w-3/4"></div>
						<div className="h-4 bg-gray-300 rounded w-1/2"></div>
					</div>
					<div className="mt-auto flex items-center justify-between border-t pt-4">
						<div className="h-4 bg-gray-300 rounded w-1/3"></div>
						<div className="h-8 w-8 bg-gray-300 rounded-full"></div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
