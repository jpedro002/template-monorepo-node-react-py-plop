import { answersService } from '@/services/answers'
import { useModalDailyRegisterModel } from './ModalDailyRegister.model'
import { ModalDailyRegisterView } from './ModalDailyRegister.view'

export const ModalDailyRegister = () => {
	const props = useModalDailyRegisterModel({
		answersService: answersService,
	})

	return <ModalDailyRegisterView {...props} />
}
