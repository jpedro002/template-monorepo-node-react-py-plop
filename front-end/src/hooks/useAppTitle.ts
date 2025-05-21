import { titleAtom } from '@/store/atoms/titleAtom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const useAppTitle = ({ title }: { title: string }) => {
	const [_, setAppTitle] = useAtom(titleAtom)

	useEffect(() => {
		setAppTitle(title)
	}, [title])
}
