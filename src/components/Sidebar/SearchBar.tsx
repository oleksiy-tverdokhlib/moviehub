import { useSearch } from '../../hooks/sidebarFilters/useSearch'
import type { SearchParamsProps } from '../../interfaces/movies'
import TextInput from '../common/TextInput/TextInput'

const SearchBar = ({
	mode,
	searchInput,
	setSearchInput,
	setSearchParams,
}: SearchParamsProps) => {
	const { handleOnChangeSearch, error } = useSearch({
		mode,
		searchInput,
		setSearchInput,
		setSearchParams,
	})

	return (
		<div>
			<TextInput
				label="search"
				type="text"
				value={searchInput}
				onChange={handleOnChangeSearch}
				error={error}
			/>
		</div>
	)
}

export default SearchBar
