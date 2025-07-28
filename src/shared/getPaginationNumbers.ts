export const getPageNumbers = (
	totalPages: number,
	currentPage: number
): (number | string)[] => {
	const delta = 2
	const range: (number | string)[] = []

	for (
		let i = Math.max(0, currentPage - delta);
		i <= Math.min(totalPages - 1, currentPage + delta);
		i++
	) {
		range.push(i)
	}

	if (typeof range[0] === 'number' && range[0] > 0) {
		if (range[0] > 1) range.unshift('...')
		range.unshift(0)
	}

	const last = range[range.length - 1]
	if (typeof last === 'number' && last < totalPages - 1) {
		if (last < totalPages - 2) range.push('...')
		range.push(totalPages - 1)
	}

	return range
}
