import { useState } from 'react'
import styles from './Home.module.css'
import type { OrderMode, SearchMode } from '../../utils/constants'
import SearchBar from './SearchBar'
import SearchSelect from './SearchSelect'
import type { SearchParams } from '../../types/moviesTypes'
import MovieFileForm from './MovieFileForm'

interface Props {
	setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const Sidebar = ({ setSearchParams }: Props) => {
	const [selectedOption, setSelectedOption] = useState<SearchMode>('actor')
	const [orderMode, setOrderMode] = useState<OrderMode>('ASC')
	const [sortMode, setSortMode] = useState<OrderMode>('year')

	return (
		<aside className={styles.sidebar}>
			<SearchBar mode={selectedOption} setSearchParams={setSearchParams} />
			<SearchSelect
				value={selectedOption}
				onChange={setSelectedOption}
				mode={'search'}
				type="Choose search type"
				setSearchParams={setSearchParams}
			/>

			<SearchSelect
				value={sortMode}
				onChange={setSortMode}
				mode={'sort'}
				type="Choose sort mode"
				setSearchParams={setSearchParams}
			/>
			<SearchSelect
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
