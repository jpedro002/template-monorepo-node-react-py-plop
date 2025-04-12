import * as fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllFormAnswers() {
	const answers = await prisma.formAnswer.findMany({
		where: {
			questionId: {
				equals: 1,
			},
		},
	})

	// Salva os dados em um arquivo JSON
	fs.writeFileSync('formAnswers01-04.json', JSON.stringify(answers, null, 2))

	console.log('Os dados foram salvos no arquivo formAnswers.json')
}

// Executa o seeding
getAllFormAnswers()
	.catch((error) => {
		console.error('Erro durante o seeding:', error)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
