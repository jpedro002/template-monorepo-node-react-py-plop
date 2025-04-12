import { Outlet, createBrowserRouter } from 'react-router-dom'

import { BedDetails, ListBeds, LogOut, NotFound } from '@/pages/app'
import { AdminLayout, AppLayout, AuthLayout, SessionProvider } from './layouts'
import { ListUsers } from './pages/admin/'
import { DashBoardUlcerReport } from './pages/admin/DashBoardUlcerReport/DashBoardUlcerReport'
import { PrivateRoute, SingIn } from './pages/auth'

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
								element: <ListUsers />,
							},
							{
								path: 'ulcer-report',
								element: <DashBoardUlcerReport />,
							},
						],
					},
				],
			},
			{
				path: '',
				element: (
					<PrivateRoute allowedRoles={[Roles.NURSE, Roles.ADMIN]}>
						<AppLayout />
					</PrivateRoute>
				),
				children: [
					{
						path: '/',
						element: <ListBeds />,
					},

					{
						path: '/beds/:id',
						element: <BedDetails />,
					},
				],
			},

			{
				path: 'auth',
				element: <AuthLayout />,
				children: [
					{
						path: '',
						element: <SingIn />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
])
