import { useEffect, useState } from 'react'
import type { SearchParams } from '../../types/moviesTypes'
import { DELAY, type SearchMode } from '../../utils/constants'
import { useSearchDebounce } from '../hooks/useSearchDebounce'
import TextInput from '../TextInput/TextInput'

export interface SearchParamsProps {
	mode: SearchMode
	setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const SearchBar = ({ mode, setSearchParams }: SearchParamsProps) => {
	const [searchInput, setSearchInput] = useState('')
	const debouncedValue = useSearchDebounce(searchInput, DELAY)

	const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
	}

	useEffect(() => {
		if (searchInput.length === 1) return
		setSearchParams((prev) => ({
			...prev,
			[mode]: debouncedValue,
		}))
	}, [debouncedValue])

	return (
		<div>
			<TextInput
				type="text"
				placeholder={'Search for a movie'}
				value={searchInput}
				onChange={handleOnChangeSearch}
			/>
		</div>
	)
}

export default SearchBar
