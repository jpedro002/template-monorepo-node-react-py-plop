import React, { Suspense, lazy } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'

import { SpinnerLoading } from './components/SpinnerLoading'
// Layouts e Providers (podem ser mantidos como importação direta se usados em todas as rotas)
import { AdminLayout, AuthLayout, SessionProvider } from './layouts'
import { ListUsersSkeleton } from './pages/admin/ListUsers/ListUsersSkeleton'
import { NotFoundSkeleton } from './pages/app/NotFoundSkeleton'
import { PrivateRoute } from './pages/auth'
import { SinginSkeleton } from './pages/auth/Singin/SinginSkeleton'

// Lazy loading das páginas
const LogOut = lazy(() => import('@/pages/app/LogOut'))
const NotFound = lazy(() => import('@/pages/app/404'))
const ListUsers = lazy(() => import('./pages/admin/ListUsers/ListUsers'))
const SingIn = lazy(() => import('./pages/auth/Singin/Singin'))

// const ListUsers = lazy(
// 	() =>
// 		new Promise((resolve) => {
// 			setTimeout(() => {
// 				resolve(import('@/pages/admin/ListUsers/ListUsers'))
// 			}, 200000)
// 		}) as Promise<{ default: React.ComponentType<any> }>,
// )

const Roles = {
	ADMIN: 'ADMIN',
	NURSE: 'NURSE',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SessionProvider />,
		children: [
			{
				element: <AdminLayout />,
				children: [
					{
						path: 'logout',
						element: <LogOut />,
					},
					{
						path: 'admin',
						element: (
							<PrivateRoute allowedRoles={[Roles.ADMIN]}>
								<Outlet />
							</PrivateRoute>
						),
						children: [
							{
								path: '',
								element: (
									<Suspense fallback={<ListUsersSkeleton />}>
										<ListUsers />
									</Suspense>
								),
							},
						],
					},
				],
			},
			{
				element: (
					<PrivateRoute allowedRoles={[]}>
						<Outlet />
					</PrivateRoute>
				),
				path: '',
			},
			{
				path: 'auth',
				element: <AuthLayout />,
				children: [
					{
						path: '',
						element: (
							<Suspense fallback={<SinginSkeleton />}>
								<SingIn />
							</Suspense>
						),
					},
				],
			},
			{
				path: '*',
				element: (
					<Suspense fallback={<NotFoundSkeleton />}>
						<NotFound />
					</Suspense>
				),
			},
		],
	},
])
