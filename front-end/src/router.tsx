import { Outlet, createBrowserRouter } from 'react-router-dom'

import { LogOut, NotFound } from '@/pages/app'
import { AdminLayout, AuthLayout, SessionProvider } from './layouts'
import { ListUsers } from './pages/admin/'
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
