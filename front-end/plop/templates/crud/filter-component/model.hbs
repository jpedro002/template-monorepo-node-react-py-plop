import { atom, useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

const searchTermAtom = atom('')
const pageAtom = atom(1)

export function useFilterModel() {
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)
    const [inputValue, setInputValue] = useState(searchTerm)
    const [page, setPage] = useAtom(pageAtom)
    const [searchParams, setSearchParams] = useSearchParams()
    
    // Debounce do valor de input para evitar muitas requisições
    const [debouncedSearchTerm] = useDebounce(inputValue, 500)

    // Sincronizar com query params na inicialização
    useEffect(() => {
        const urlSearchTerm = searchParams.get('searchTerm') || ''
        const urlPage = Number(searchParams.get('page')) || 1
        
        if (urlSearchTerm !== inputValue) {
            setInputValue(urlSearchTerm)
        }
        if (urlSearchTerm !== searchTerm) {
            setSearchTerm(urlSearchTerm)
        }
        if (urlPage !== page) {
            setPage(urlPage)
        }
    }, []) // Só executa uma vez na inicialização

    // Atualizar searchTerm e URL quando o debounced value mudar
    useEffect(() => {
        // Só atualiza se o valor realmente mudou
        if (debouncedSearchTerm !== searchTerm) {
            setSearchTerm(debouncedSearchTerm)
            setPage(1) // Reset página para 1 ao pesquisar
            
            setSearchParams((params) => {
                if (debouncedSearchTerm.trim()) {
                    params.set('searchTerm', debouncedSearchTerm)
                } else {
                    params.delete('searchTerm')
                }
                params.set('page', '1')
                return params
            })
        }
    }, [debouncedSearchTerm]) // Só depende do valor com debounce

    const updateSearch = (value: string) => {
        setInputValue(value)
    }

    const clearFilters = () => {
        setInputValue('')
        setSearchTerm('')
        setPage(1)
        
        setSearchParams((params) => {
            params.delete('searchTerm')
            params.set('page', '1')
            return params
        })
    }

    const filters = useMemo(
        () => ({
            searchTerm,
            page,
        }),
        [searchTerm, page],
    )

    return {
        filters,
        searchTerm: inputValue, // Retorna o valor imediato do input para a UI
        setSearchTerm: updateSearch,
        page,
        setPage,
        clearFilters,
    }
}
