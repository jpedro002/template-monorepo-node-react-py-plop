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

// Função para criar paciente e suas respostas
async function createPatientWithResponses(
	year: number,
	month: number,
	nurseIds: number[],
	questionIds: number[],
): Promise<number | null> {
	try {
		// Criar novo paciente
		const patient = await prisma.patientProfile.create({
			data: {
				name: faker.person.fullName(),
				medical_record_code: faker.string.alphanumeric(10),
				createdAt: getRandomDateInMonth(year, month),
				dateOfBirth: faker.date.birthdate(),
			},
		})

		console.log(`Paciente criado: ${patient.name} (ID: ${patient.id})`)

		// Gerar entre 7 e 14 respostas para este paciente
		const formAnswersCount = faker.number.int({ min: 7, max: 14 })

		for (let j = 0; j < formAnswersCount; j++) {
			// Data aleatória dentro do mês atual
			const answerDate = getRandomDateInMonth(year, month)

			const _formAnswer = await prisma.formAnswer.create({
				data: {
					textAnswer: null,
					numericAnswer: faker.number.int({ min: 1, max: 10 }),
					type: QuestionType.RANGE,
					createdAt: answerDate,
					questionId: faker.helpers.arrayElement(questionIds),
					patientProfileId: patient.id,
					userId: faker.helpers.arrayElement(nurseIds),
				},
			})

			console.log(
				`FormAnswer criado para paciente ${patient.id} em ${answerDate.toLocaleDateString()}`,
			)
		}

		return patient.id
	} catch (error) {
		console.error('Erro ao criar paciente e respostas:', error)
		return null
	}
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

	const questionIds = [1]

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

		// Criar entre 30 e 45 pacientes para este mês
		const patientsCount = faker.number.int({ min: 30, max: 45 })

		console.log(
			`Criando ${patientsCount} novos pacientes para ${month + 1}/${year}...`,
		)

		const createdPatients: number[] = []

		for (let i = 0; i < patientsCount; i++) {
			const patientId = await createPatientWithResponses(
				year,
				month,
				nurseIds,
				questionIds,
			)

			if (patientId) {
				createdPatients.push(patientId)
			}
		}

		console.log(
			`Criados ${createdPatients.length} pacientes para ${month + 1}/${year}`,
		)

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
