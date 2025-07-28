import { useEffect, useState, type ChangeEvent } from 'react'
import type { SearchParamsProps } from '../../interfaces/movies'
import { DELAY } from '../../shared/constants'
import { useDebounce } from './useDebounce'

export const useSearch = ({
	mode,
	searchInput,
	setSearchInput,
	setSearchParams,
}: SearchParamsProps) => {
	const [error, setError] = useState<undefined | string>(undefined)
	const debouncedValue = useDebounce(searchInput, DELAY)

	const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
	}

	useEffect(() => {
		if (searchInput.length === 1) {
			setError('too short')
			return
		}
		setError(undefined)
		setSearchParams((prev) => ({
			...prev,
			[mode]: debouncedValue,
		}))
	}, [debouncedValue])

	return {
		searchInput,
		handleOnChangeSearch,
		error,
	}
}
