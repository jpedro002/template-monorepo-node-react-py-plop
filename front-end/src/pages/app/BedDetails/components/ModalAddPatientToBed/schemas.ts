import { z } from 'zod'

export const addPatientSchema = z.object({
	nome: z.string().min(1, 'Nome é obrigatório'),
	dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
	codigoProntuario: z
		.string()
		.min(1, 'Código do prontuário é obrigatório')
		.max(10, 'Código do prontuário deve ter no máximo 10 caracteres'),
})
