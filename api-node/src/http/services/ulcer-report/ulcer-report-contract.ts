export interface UlcerReport {
	[key: string]: {
		nPacAdmComLP: number // Número de pacientes admitidos com lesão por pressão
		nPacAvaliados: number // Número de pacientes avaliados
		nPacEvolMelhora: number // Número de pacientes com evolução de melhora
		nPacSemRiscoComLP: number // Número de pacientes sem risco com lesão por pressão
		pacComLP: number // Número de pacientes com lesão por pressão
		percentDesfechosFavoraveis: number | null // Percentual de desfechos favoráveis (pode ser NaN ou null)
		percentPacAdmComLP: number // Percentual de pacientes admitidos com lesão por pressão
		percentPacComLP: number // Percentual de pacientes com lesão por pressão
		quantRegistros: number // Quantidade de registros
	}
}

export interface IUlcerReportService {
	getUlcerReport(): Promise<UlcerReport>
}
