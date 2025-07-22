import { useEffect } from 'react'
import type { RadioFilterProps } from '../types/moviesTypes'
import { ORDER_MODES, SEARCH_MODES, SORT_MODES } from '../utils/constants'

export const useRadioFilter = ({
	mode,
	value,
	onChange,
	setSearchInput,
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
		}
	}

	useEffect(() => {
		if (mode === 'search') {
			const valuesToClear = items.filter((e) => e !== value)
			setSearchParams((prev) => ({
				...prev,
				[valuesToClear[0]]: '',
				[valuesToClear[1]]: '',
			}))
			if (setSearchInput) {
				setSearchInput('')
			}
		}
	}, [value])

	return { items, handleOnChange }
}
