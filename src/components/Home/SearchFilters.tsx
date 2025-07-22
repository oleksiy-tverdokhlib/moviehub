import { useRadioFilter } from '../../hooks/useRadioFilter'
import type { RadioFilterProps } from '../../types/moviesTypes'
import styles from './Home.module.css'

const SearchFilters = ({
	value,
	onChange,
	mode,
	type,
	setSearchParams,
	setSearchInput,
}: RadioFilterProps) => {
	const { items, handleOnChange } = useRadioFilter({
		value,
		onChange,
		mode,
		type,
		setSearchParams,
		setSearchInput,
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
