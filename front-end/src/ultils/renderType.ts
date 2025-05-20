import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ReactNode } from 'react'

type RenderType = 'boolean' | 'datetime' | 'date' | 'time' | 'number' | string

export const renderType = (
	data: any,
	type?: RenderType,
): string | number | null => {
	if ((data === null || data === undefined) && type !== 'boolean') {
		return null
	}

	try {
		switch (type) {
			case 'boolean':
				return Boolean(data) === true ? 'sim' : 'não'

			case 'datetime': {
				if (!data) return null
				const value = String(data).replace('Z', '')
				return format(new Date(value), 'dd/MM/yyyy HH:mm', { locale: ptBR })
			}

			case 'date': {
				if (!data) return null
				const value = String(data).substring(0, 10)
				return format(new Date(value.concat(' 00:00:00')), 'dd/MM/yyyy', {
					locale: ptBR,
				})
			}

			case 'time': {
				if (!data) return null
				const value = String(data).replace('Z', '')
				return format(new Date(value), 'HH:mm', { locale: ptBR })
			}

			case 'number': {
				if (data === null || data === undefined) return null
				return Number(data).toLocaleString('pt-BR', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})
			}

			default:
				return data
		}
	} catch (error) {
		console.error(`Erro ao formatar valor: ${data} como tipo: ${type}`, error)
		return data
	}
}

export const convertMetadado = (valor: any, tipo?: string): ReactNode => {
	if (valor === null || valor === undefined) return '-'

	const tipoNormalizado = tipo?.toLowerCase()

	switch (tipoNormalizado) {
		case 'date':
		case 'data':
			return renderType(valor, 'date')

		case 'datetime':
		case 'datahora':
			return renderType(valor, 'datetime')

		case 'time':
		case 'hora':
			return renderType(valor, 'time')

		case 'boolean':
		case 'booleano':
			return renderType(valor, 'boolean')

		case 'number':
		case 'numero':
		case 'número':
			return renderType(valor, 'number')

		case 'currency':
		case 'moeda':
			return new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(Number(valor))

		case 'percent':
		case 'percentual':
			return `${Number(valor).toLocaleString('pt-BR', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}%`

		case 'array':
		case 'lista':
			if (Array.isArray(valor)) {
				return valor.join(', ')
			}
			return String(valor)

		case 'object':
		case 'objeto':
			if (typeof valor === 'object' && valor !== null) {
				try {
					return JSON.stringify(valor)
				} catch {
					return '[Objeto complexo]'
				}
			}
			return String(valor)

		default:
			return String(valor)
	}
}
