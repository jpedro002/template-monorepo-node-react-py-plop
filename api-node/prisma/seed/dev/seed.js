import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function seed() {
	const email = 'admin@admin.com'
	const name = 'John Doe'
	const password = '123456'

	try {
		const hashedPassword = await bcrypt.hash(password, 10)

		const u = await db.user.findUnique({ where: { email } })
		if (u) {
			console.log('Usuário já existe:', u)
			return
		}

		const user = await db.user.create({
			data: { email, name, password: hashedPassword, role: 'ADMIN' },
		})

		console.log('Usuário criado com sucesso:', user)
	} catch (error) {
		console.error('Erro ao criar o usuário:', error)
	}
}

seed()
	.catch((e) => {
		console.error('Erro durante o seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
