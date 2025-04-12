import { faker } from '@faker-js/faker'
import { PrismaClient, QuestionType, Role } from '@prisma/client'

const prisma = new PrismaClient()

// Número de leitos que serão criados
// const TOTAL_NURSES = 15
const NURSES_NAMES = [
	'akscene',
	'amanda',
	'aurenice',
	'elizabete',
	'erica',
	'isabel',
	'jhonny',
	'joyce',
	'kaedila',
	'katharina',
	'kessia',
	'marcela',
	'natalia',
	'priscila',
	'raquel',
	'rosangela',
	'thais',
	'virginia',
]

// Função para gerar enfermeiros
async function seedNurses({
	count,
	nurseNames = [],
}: {
	nurseNames?: string[]
	count?: number
}): Promise<number[]> {
	const nurseIds: number[] = []

	const a = count ? count : nurseNames?.length

	for (let i = 0; i < a; i++) {
		try {
			const nurse = await prisma.user.create({
				data: {
					email: faker.internet.email({
						firstName: nurseNames[i],
						provider: 'enf.com',
					}),
					password: faker.internet.password(),
					role: Role.NURSE,
					name: nurseNames[i] || faker.person.fullName(),
					createdAt: faker.date.past(),
				},
			})

			nurseIds.push(nurse.id)
			console.log(
				`Enfermeiro criado com sucesso: ${nurse.name} (ID: ${nurse.id})`,
			)
		} catch (error) {
			console.error('Erro ao criar enfermeiro:', error)
		}
	}

	console.log(nurseIds)

	return nurseIds
}

// Função para criar um paciente

// Executar o seed
seedNurses({
	nurseNames: NURSES_NAMES,
})
	.catch((e) => {
		console.error('Erro durante o seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
