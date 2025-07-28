import { useState } from 'react'
import type { SearchParams } from '../../interfaces/movies'
import { MOVIES_PER_PAGES } from '../../shared/constants'

const initialArg: SearchParams = {
	actor: '',
	title: '',
	search: '',
	sort: 'title',
	order: 'ASC',
	limit: MOVIES_PER_PAGES,
	offset: 0,
}

export const useFilter = () => {
	const [searchData, setSearchParams] = useState(initialArg)

	const createSearchString = (params: SearchParams) => {
		let searchStr = ''
		for (const key in params) {
			const value = params[key as keyof SearchParams]
			if (value === '') continue
			searchStr += `${key}=${encodeURIComponent(value)}&`
		}
		return searchStr.slice(0, -1)
	}

	const searchString = createSearchString(searchData)
	const queryArgs = { searchString }

	return {
		searchData,
		setSearchParams,
		queryArgs,
	}
}

export type UseFilterReturn = ReturnType<typeof useFilter>
