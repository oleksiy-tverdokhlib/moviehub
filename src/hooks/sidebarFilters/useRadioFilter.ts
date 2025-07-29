import type { RadioFilterProps } from '../../interfaces/movies'
import { ORDER_MODES, SEARCH_MODES, SORT_MODES } from '../../shared/constants'

export const useRadioFilter = ({
	mode,
	searchInput,
	onChange,
	setSearchParams,
}: RadioFilterProps) => {
	let items: readonly string[]

	switch (mode) {
		case 'search': {
			items = SEARCH_MODES
			break
		}
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
		} else if (mode === 'search') {
			const valuesToClear = items.filter((e) => e !== option)
			setSearchParams((prev) => ({
				...prev,
				[valuesToClear[0]]: '',
				[valuesToClear[1]]: '',
				[option]: searchInput,
			}))
		}
	}

	return { items, handleOnChange }
}
