import { atom } from 'jotai'
//import { atomWithStorage } from 'jotai/utils'


export const modalUpdatePatientAtom = atom<boolean>(false)

export const currentPatientIDAtom = atom<number | null>(null)

export const viewModePatientAtom = atom<'table' | 'card'>('table')


