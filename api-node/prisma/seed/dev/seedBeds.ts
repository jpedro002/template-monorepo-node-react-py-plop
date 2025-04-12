import { faker } from '@faker-js/faker'
import { PrismaClient, QuestionType, Role } from '@prisma/client'

const prisma = new PrismaClient()

// Número de leitos que serão criados
const TOTAL_BEDS = 5

// Função para gerar enfermeiros
async function seedNurses(count: number): Promise<number[]> {
	const nurseIds: number[] = []

	for (let i = 0; i < count; i++) {
		try {
			const nurse = await prisma.user.create({
				data: {
					email: faker.internet.email(),
					password: faker.internet.password(),
					role: Role.NURSE,
					name: faker.person.fullName(),
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

	return nurseIds
}

// Função para criar um paciente
async function createPatient(): Promise<number> {
	try {
		const patient = await prisma.patientProfile.create({
			data: {
				name: faker.person.fullName(),
				medical_record_code: faker.string.alphanumeric(10),
				createdAt: faker.date.recent({ days: 30 }),
				dateOfBirth: faker.date.birthdate(),
			},
		})

		console.log(`Paciente criado: ${patient.name} (ID: ${patient.id})`)
		return patient.id
	} catch (error) {
		console.error('Erro ao criar paciente:', error)
		throw error
	}
}

// Função para criar respostas de formulário para um paciente
async function createFormAnswers(
	patientId: number,
	nurseIds: number[],
	questionIds: number[],
	numAnswers: number,
) {
	const startDate = faker.date.recent({ days: 14 })

	for (let i = 0; i < numAnswers; i++) {
		try {
			// Data aleatória nas últimas duas semanas
			const answerDate = faker.date.between({
				from: startDate,
				to: new Date(),
			})

			const _formAnswer = await prisma.formAnswer.create({
				data: {
					textAnswer: null,
					numericAnswer: faker.number.int({ min: 1, max: 10 }),
					type: QuestionType.RANGE,
					createdAt: answerDate,
					questionId: faker.helpers.arrayElement(questionIds),
					patientProfileId: patientId,
					userId: faker.helpers.arrayElement(nurseIds),
				},
			})

			console.log(
				`FormAnswer criado para paciente ${patientId} em ${answerDate.toLocaleDateString()}`,
			)
		} catch (error) {
			console.error(`Erro ao criar FormAnswer:`, error)
		}
	}
}

// Função principal
async function seedBeds() {
	console.log(`Iniciando seed de ${TOTAL_BEDS} leitos...`)

	// Criar enfermeiros primeiro
	console.log('Gerando enfermeiros...')
	const nurseIds = await seedNurses(10)

	if (nurseIds.length === 0) {
		console.error('Falha ao criar enfermeiros. Abortando processo.')
		return
	}

	// Obter IDs das perguntas de formulário
	const questions = await prisma.formQuestion.findMany({
		select: { id: true },
	})
	const questionIds = questions.map((q) => q.id)

	if (questionIds.length === 0) {
		console.error(
			'Nenhuma questão encontrada. Execute o seed de formulários primeiro.',
		)
		return
	}

	// Criar leitos com pacientes e respostas
	for (let i = 1; i <= TOTAL_BEDS; i++) {
		try {
			// Criar um paciente
			const patientId = await createPatient()

			// Criar um leito e associar o paciente
			const bed = await prisma.bed.create({
				data: {
					name: `Leito ${i}`,
					patientProfileId: patientId,
				},
			})

			console.log(
				`Leito ${bed.name} criado e associado ao paciente ${patientId}`,
			)

			// Gerar de 3 a 9 respostas de formulário para este paciente
			const numAnswers = faker.number.int({ min: 3, max: 9 })
			await createFormAnswers(patientId, nurseIds, questionIds, numAnswers)

			console.log(
				`Criadas ${numAnswers} respostas para o paciente ${patientId}`,
			)
		} catch (error) {
			console.error(`Erro ao processar leito ${i}:`, error)
		}
	}

	console.log(`Seed de ${TOTAL_BEDS} leitos concluído com sucesso!`)
}

// Executar o seed
seedBeds()
	.catch((e) => {
		console.error('Erro durante o seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
