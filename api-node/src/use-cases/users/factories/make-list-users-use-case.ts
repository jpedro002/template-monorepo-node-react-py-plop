import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '../list-users-use-case'

export function makeListUsersUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const listUsersUseCase = new ListUsersUseCase(usersRepository)

	return listUsersUseCase
}
