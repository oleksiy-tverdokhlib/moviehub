import { useState, type Dispatch, type SetStateAction } from 'react'
import type { SearchParams } from '../../interfaces/movies'
import type { OrderMode, SearchMode } from '../../shared/constants'
import MovieFileForm from './MovieFileForm'
import SearchBar from './SearchBar'
import SearchFilters from './SearchFilters'
import styles from './SideBar.module.css'

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
				searchInput={searchInput}
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
