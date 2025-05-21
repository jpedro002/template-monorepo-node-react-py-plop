export const usersKeys = {
	users: {
		all: ['users'] as const,
		list: (filters: Record<string, string | undefined>) =>
			[...usersKeys.users.all, filters] as const,
	},
}
