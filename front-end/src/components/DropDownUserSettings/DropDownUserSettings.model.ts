import { useAuth } from '@/hooks/useAuth/useAuth'

export const useDropDownUserSettings = () => {
	const { singout, session } = useAuth()

	return {
		user: session,
		onLogout: singout,
	}
}
