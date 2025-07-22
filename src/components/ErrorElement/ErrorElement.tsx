import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface ErrorProps {
	error: FetchBaseQueryError | SerializedError
}

const ErrorElement = ({ error }: ErrorProps) => {
	if (!error) return <div>Unknown error occurred.</div>

	let errorMessage = 'An unexpected error occurred.'

	if ('status' in error) {
		const err = error as FetchBaseQueryError
		const status = err.status
		const data = 'data' in err ? (err.data as any) : null

		errorMessage = `Error ${status}: ${data?.message || 'Something went wrong'}`
	} else if ('message' in error) {
		errorMessage = error.message || errorMessage
	}

	return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default ErrorElement
