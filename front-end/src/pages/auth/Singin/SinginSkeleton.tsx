export function SinginSkeleton() {
	return (
		<div className="mx-auto max-w-sm w-full animate-pulse">
			<div className="rounded bg-gray-200 dark:bg-gray-700 h-8 w-1/2 mb-2" />
			<div className="rounded bg-gray-200 dark:bg-gray-700 h-4 w-3/4 mb-6" />
			<div className="mb-4">
				<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
				<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
			</div>
			<div className="mb-6">
				<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
				<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
			</div>
			<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
		</div>
	)
}
