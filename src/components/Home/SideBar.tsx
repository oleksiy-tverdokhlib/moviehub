import { useState, type Dispatch, type SetStateAction } from 'react'
import type { SearchParams } from '../../types/moviesTypes'
import type { OrderMode, SearchMode } from '../../utils/constants'
import styles from './Home.module.css'
import MovieFileForm from './MovieFileForm'
import SearchBar from './SearchBar'
import SearchFilters from './SearchFilters'

interface SidebarProps {
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
}

const Sidebar = ({ setSearchParams }: SidebarProps) => {
	const [searchInput, setSearchInput] = useState('')
	const [selectedOption, setSelectedOption] = useState<SearchMode>('actor')
	const [orderMode, setOrderMode] = useState<OrderMode>('ASC')
	const [sortMode, setSortMode] = useState<OrderMode>('title')

	return (
		<aside className={styles.sidebar}>
			<SearchBar
				mode={selectedOption}
				setSearchParams={setSearchParams}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<SearchFilters
				value={selectedOption}
				onChange={setSelectedOption}
				mode={'search'}
				type="Choose search type"
				setSearchParams={setSearchParams}
				setSearchInput={setSearchInput}
			/>
			<SearchFilters
				value={sortMode}
				onChange={setSortMode}
				mode={'sort'}
				type="Choose sort mode"
				setSearchParams={setSearchParams}
			/>
			<SearchFilters
				value={orderMode}
				onChange={setOrderMode}
				mode={'order'}
				type="Choose order"
				setSearchParams={setSearchParams}
			/>
			<MovieFileForm />
		</aside>
	)
}

export default Sidebar
