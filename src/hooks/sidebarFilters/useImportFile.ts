import { useRef, useState } from 'react'
import { useImportMoviesMutation } from '../../features/movies/movies'

export const useImportFile = () => {
	const [file, setFile] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [notification, setNotification] = useState<{
		type: 'error' | 'success'
		text: string
	} | null>(null)

	const [importMovies, { data, isLoading }] = useImportMoviesMutation()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target
		setNotification(null)

		if (input.files && input.files.length > 0) {
			const selectedFile = input.files[0]

			if (!selectedFile.name.endsWith('.txt')) {
				setFile(null)
				setNotification({
					type: 'error',
					text: 'Unsupported file format. Please upload a .txt file',
				})

				input.value = ''
				return
			}

			setFile(selectedFile)
		}
	}

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (!file) return

		const reader = new FileReader()

		reader.onload = () => {
			const content = reader.result?.toString().trim()
			if (!content) {
				setNotification({
					type: 'error',
					text: 'The file is empty',
				})
				return
			}

			importMovies(file).then((e) => {
				if (e.data?.status === 1) {
					setNotification({
						type: 'success',
						text: `Movies successfully imported from '${file.name}': ${e.data?.meta?.imported}`,
					})
				} else {
					setNotification({
						type: 'error',
						text: `Server response: ${e.data?.error?.code}. Please upload a .txt file with proper data`,
					})
				}
			})

			setFile(null)
			if (fileInputRef.current) fileInputRef.current.value = ''
		}

		reader.onerror = () => {
			setNotification({
				type: 'error',
				text: 'Failed to read the file',
			})
		}

		reader.readAsText(file)
	}

	return {
		fileInputRef,
		file,
		data,
		notification,
		isLoading,
		handleFileChange,
		handleSubmit,
	}
}
