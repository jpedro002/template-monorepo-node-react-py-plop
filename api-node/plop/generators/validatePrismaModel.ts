import { PrismaClient } from '@prisma/client'

export const validatePrismaModel = async (input) => {
	try {
		const prisma = new PrismaClient()

		const allModels = Object.keys(prisma).filter(
			(key) => !key.startsWith('_') && typeof prisma[key] === 'object',
		)

		const normalizedInput = input.toLowerCase()
		const modelExists = allModels.some(
			(model) => model.toLowerCase() === normalizedInput,
		)

		if (!modelExists) {
			const firstLetter = input.charAt(0).toLowerCase()
			const suggestedModels = allModels
				.filter((model) => model.toLowerCase().charAt(0) === firstLetter)
				.sort()

			let errorMessage = `O modelo "${input}" não existe no Prisma schema!`

			if (suggestedModels.length > 0) {
				errorMessage += `\nModelos disponíveis que começam com "${firstLetter.toUpperCase()}" ou "${firstLetter}": ${suggestedModels.join(', ')}`
			} else {
				errorMessage += `\nNenhum modelo encontrado iniciando com "${firstLetter.toUpperCase()}" ou "${firstLetter}".`
			}

			return errorMessage
		}

		const correctModelName = allModels.find(
			(model) => model.toLowerCase() === normalizedInput,
		)

		if (!correctModelName) {
			return `Modelo "${input}" não encontrado.`
		}

		return true
	} catch (error) {
		return `Erro ao validar o modelo: ${error instanceof Error ? error.message : String(error)}`
	}
}
