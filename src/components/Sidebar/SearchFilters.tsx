import { useRadioFilter } from '../../hooks/sidebarFilters/useRadioFilter'
import type { RadioFilterProps } from '../../interfaces/movies'
import styles from './SideBar.module.css'

const SearchFilters = ({
	mode,
	type,
	value,
	searchInput,
	onChange,
	setSearchInput,
	setSearchParams,
}: RadioFilterProps) => {
	const { items, handleOnChange } = useRadioFilter({
		mode,
		type,
		value,
		searchInput,
		onChange,
		setSearchInput,
		setSearchParams,
	})

	return (
		<div role="radiogroup" aria-label={type} className={styles.searchModes}>
			<span>{type}:</span>

			{items.map((option) => (
				<label key={option} className={styles.label}>
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

export default SearchFilters
