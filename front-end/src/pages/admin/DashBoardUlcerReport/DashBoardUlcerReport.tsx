import { answersService } from '@/services/answers'
import { useDashBoardUlcerReportModel } from './DashBoardUlcerReport.model'
import { DashBoardUlcerReportView } from './DashBoardUlcerReport.view'
import { DashBoardUlcerReportViewSkeleton } from './DashBoardUlcerReportViewSkeleton'

export const DashBoardUlcerReport = () => {
	const props = useDashBoardUlcerReportModel({
		answerService: answersService,
	})

	if (props.loading) {
		return <DashBoardUlcerReportViewSkeleton />
	}

	return (
		<>
			<DashBoardUlcerReportView {...props} />
		</>
	)
}
