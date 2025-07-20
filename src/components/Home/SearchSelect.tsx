import type { SearchParams } from '../../types/moviesTypes'
import {
	ORDER_MODES,
	SEARCH_MODES,
	SORT_MODES,
	type OrderMode,
	type SearchMode,
} from '../../utils/constants'
import {} from './../../utils/constants'
import styles from './Home.module.css'

interface Props {
	value: SearchMode
	onChange: (value: SearchMode | OrderMode) => void
	mode: 'search' | 'order' | 'sort'
	type: string
	setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const SearchSelect = ({
	value,
	onChange,
	mode,
	type,

	setSearchParams,
}: Props) => {
	let items: readonly string[]

	switch (mode) {
		case 'search':
			items = SEARCH_MODES
			break
		case 'order':
			items = ORDER_MODES
			break
		case 'sort':
			items = SORT_MODES
			break
		default:
			items = []
	}

	const handleOnChange = (option: string) => {
		onChange(option)
		if (mode !== 'search') {
			setSearchParams((prev) => ({
				...prev,
				[mode]: option,
			}))
		}
	}

	return (
		<div role="radiogroup" aria-label={type} className={styles.searchModes}>
			<span>{type}</span>
			{items.map((option) => (
				<label key={option} style={{ display: 'block', cursor: 'pointer' }}>
					<input
						type="radio"
						name={mode}
						value={option}
						checked={value === option}
						onChange={() => handleOnChange(option)}
					/>
					{mode === 'order' ? (
						<span>{option.toLowerCase()}ending</span>
					) : (
						<span>by {option === 'search' ? 'both' : option}</span>
					)}
				</label>
			))}
		</div>
	)
}

export default SearchSelect
