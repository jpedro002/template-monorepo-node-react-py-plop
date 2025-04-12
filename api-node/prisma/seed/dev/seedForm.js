import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function seedForm() {
	try {
		// Criar formulário com questão

		const existingForm = await db.dynamicForm.findFirst({
			where: {
				title: 'Formulário de Registro de Úlceras por Pressão',
			},
		})

		if (existingForm) {
			console.log('Formulário já existe: :)', existingForm)
			return
		}

		const form = await db.dynamicForm.create({
			data: {
				title: 'Formulário de Registro de Úlceras por Pressão',
				questions: {
					create: {
						questionTitle: 'Registro de Úlceras por Pressão',
						type: 'RANGE',
						colorsIsInverted: false,
						minValue: 1,
						maxValue: 10,
						isRequired: true,
					},
				},
			},
		})
		console.log('Formulário criado com sucesso:', form)
	} catch (error) {
		console.error('Erro ao criar o formulário:', error)
	}
}

seedForm()
	.catch((e) => {
		console.error('Erro durante o seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
