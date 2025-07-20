import { useState } from 'react'
import type { SearchParams } from '../types/moviesTypes'

export const useFilter = () => {
	const [searchData, setSearchParams] = useState<SearchParams>({
		actor: '',
		title: '',
		search: '',
		sort: 'year',
		order: 'ASC',
		limit: 10,
		offset: 0,
	})
	console.log(searchData)

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
