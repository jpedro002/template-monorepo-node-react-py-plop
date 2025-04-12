import { api } from '@/libs/axios'
import { IUlcerReportService, UlcerReport } from './ulcer-report-contract'

export class UlcerReportService implements IUlcerReportService {
	async getUlcerReport(): Promise<UlcerReport> {
		try {
			const response = await api.get<UlcerReport>('/ulcer-report')
			return response.data
		} catch (error) {
			console.error('Erro ao buscar o relatório de úlceras:', error)
			throw new Error('Não foi possível obter o relatório de úlceras.')
		}
	}
}
