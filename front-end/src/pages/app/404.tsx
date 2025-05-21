import { useAuth } from '@/hooks/useAuth/useAuth'
import { defaultRouteToRole } from '@/services/session/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
	const { session } = useAuth()
	const dashboardRoute = defaultRouteToRole[session?.role || 'NOT_LOGGED']
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 10)
	}, [])

	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
			<div
				className={`flex max-w-md flex-col items-center text-center transform transition-all duration-500 ease-out ${
					isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
				}`}
			>
				<h1 className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-9xl font-extrabold text-transparent">
					404
				</h1>

				<h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
					Página não encontrada
				</h2>

				<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
					Desculpe, não conseguimos encontrar a página que você está procurando.
				</p>

				<Link
					to={dashboardRoute}
					className="mt-8 flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mr-2 h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
							clipRule="evenodd"
						/>
					</svg>
					Voltar para o Dashboard
				</Link>
			</div>
		</div>
	)
}

export default NotFound
