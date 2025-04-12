import * as fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function importFormAnswers() {
	try {
		// Lê o arquivo JSON
		const data = fs.readFileSync('./formAnswers01-04.json', 'utf-8')
		const formAnswers = JSON.parse(data)

		// Insere os dados no banco de dados
		for (const answer of formAnswers) {
			await prisma.formAnswer.create({
				data: {
					textAnswer: answer.textAnswer,
					numericAnswer: answer.numericAnswer,
					type: answer.type,
					createdAt: new Date(answer.createdAt),
					questionId: answer.questionId,
					patientProfileId: answer.patientProfileId,
					userId: answer.userId,
				},
			})
		}

		console.log('Os dados foram importados com sucesso!')
	} catch (error) {
		console.error('Erro ao importar os dados:', error)
	} finally {
		await prisma.$disconnect()
	}
}

importFormAnswers()
