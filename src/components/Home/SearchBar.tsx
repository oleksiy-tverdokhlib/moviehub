import {
	useEffect,
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
} from 'react'
import { useSearchDebounce } from '../../hooks/useSearchDebounce'
import type { SearchParams } from '../../types/moviesTypes'
import { DELAY, type SearchMode } from '../../utils/constants'
import TextInput from '../../common/TextInput/TextInput'

interface SearchParamsProps {
	mode: SearchMode
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
	searchInput: string
	setSearchInput: Dispatch<SetStateAction<string>>
}

const SearchBar = ({
	mode,
	setSearchParams,
	searchInput,
	setSearchInput,
}: SearchParamsProps) => {
	const debouncedValue = useSearchDebounce(searchInput, DELAY)

	const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
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
				placeholder="Search for a movie"
				value={searchInput}
				onChange={handleOnChangeSearch}
			/>
		</div>
	)
}

export default SearchBar
