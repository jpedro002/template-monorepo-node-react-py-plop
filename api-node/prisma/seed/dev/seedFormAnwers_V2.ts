import { faker } from '@faker-js/faker'
import { PrismaClient, QuestionType, Role } from '@prisma/client'

const prisma = new PrismaClient()

// Função para gerar datas dentro de um mês específico
function getRandomDateInMonth(year: number, month: number): Date {
	const startOfMonth = new Date(year, month, 1)
	const endOfMonth = new Date(year, month + 1, 0) // Último dia do mês

	return faker.date.between({
		from: startOfMonth,
		to: endOfMonth,
	})
}

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

// Função principal para seed mensal
async function seedMonthlyData() {
	// Primeiro gerar os enfermeiros
	console.log('Gerando enfermeiros...')
	const nurseIds = await seedNurses(15) // Criar 15 enfermeiros

	if (nurseIds.length === 0) {
		console.error('Falha ao criar enfermeiros. Abortando processo.')
		return
	}

	// Obter IDs dos pacientes existentes
	const patientProfiles = await prisma.patientProfile.findMany({
		select: { id: true },
	})
	const patientProfileIds = patientProfiles.map((p) => p.id)

	if (patientProfileIds.length === 0) {
		console.error(
			'Nenhum perfil de paciente encontrado. Execute o seed de pacientes primeiro.',
		)
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

	// Definir intervalo: agosto 2024 até data atual
	const startDate = new Date(2024, 7, 1) // Agosto é mês 7 (0-indexed)
	const currentDate = new Date()

	// Loop através de cada mês no intervalo
	let currentMonth = new Date(startDate)

	while (currentMonth <= currentDate) {
		const year = currentMonth.getFullYear()
		const month = currentMonth.getMonth()

		console.log(`Gerando dados para ${month + 1}/${year}`)

		// Selecionar entre 30 e 45 pacientes para este mês
		const patientsForMonth = faker.number.int({ min: 28, max: 50 })
		const selectedPatientIds = faker.helpers.arrayElements(
			patientProfileIds,
			Math.min(patientsForMonth, patientProfileIds.length),
		)

		for (const patientId of selectedPatientIds) {
			// Para cada paciente, gerar entre 7 e 14 respostas no mesmo mês
			const formAnswersCount = faker.number.int({ min: 7, max: 14 })

			for (let j = 0; j < formAnswersCount; j++) {
				try {
					// Data aleatória dentro do mês atual
					const answerDate = getRandomDateInMonth(year, month)

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

		// Avançar para o próximo mês
		currentMonth.setMonth(currentMonth.getMonth() + 1)
	}
}

// Executar o seed
seedMonthlyData()
	.catch((e) => {
		console.error('Erro durante o seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
