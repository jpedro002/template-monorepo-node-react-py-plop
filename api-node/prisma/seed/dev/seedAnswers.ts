import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function seedFormAnswers() {
	const userIds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	const patientProfileIds = [
		7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	]

	try {
		for (let i = 0; i < 150; i++) {
			const formAnswer = await db.formAnswer.create({
				data: {
					textAnswer: null,
					numericAnswer: faker.number.int({ min: 1, max: 10 }),
					type: 'RANGE',
					createdAt: faker.date.between({
						from: new Date('2024-11-01T00:00:00.000Z'),
						to: new Date(),
					}),
					questionId: 1,
					patientProfileId: faker.helpers.arrayElement(patientProfileIds),
					userId: faker.helpers.arrayElement(userIds),
				},
			})
			console.log('FormAnswer criado com sucesso:', formAnswer)
		}
	} catch (error) {
		console.error('Erro ao criar FormAnswer:', error)
	}
}

seedFormAnswers()
	.catch((e) => {
		console.error('Erro durante o seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
