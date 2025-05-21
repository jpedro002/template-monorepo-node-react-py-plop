import { atom } from 'jotai'

export const titleAtom = atom<string>('Title')

export const setAppTitle = (title: string) => (set: any) => {
	set(titleAtom, title)
}
