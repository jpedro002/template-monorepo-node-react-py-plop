export function NotFoundSkeleton() {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 animate-pulse">
			<div className="flex flex-col items-center text-center space-y-4">
				<div className="h-24 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-80 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded mt-6" />
			</div>
		</div>
	)
}
