import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth/useAuth'
import { defaultRouteToRole } from '@/services/session/types'

export const AuthLayout = () => {
	const navigate = useNavigate()
	const { session, token } = useAuth()

	useEffect(() => {
		if (session && token) {
			navigate(defaultRouteToRole[session.role])
		}
	}, [navigate, session, token])

	return (
		<div className="flex min-h-screen justify-center items-center antialiased">
			<Outlet />
		</div>
	)
}
