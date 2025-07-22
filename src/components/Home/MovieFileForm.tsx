import { useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { useImportMoviesMutation } from '../../features/movies/movies'

const MovieFileForm = () => {
	const [importMovies] = useImportMoviesMutation()
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [file, setFile] = useState<File | null>(null)

	const handleOnSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		if (file) {
			importMovies(file)
			fileInputRef.current && (fileInputRef.current.value = '')
		}
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0])
		}
	}
	return (
		<form onSubmit={handleOnSubmit}>
			<span>Import movies from your file:</span>
			<input
				type="file"
				id="file"
				name="file"
				onChange={handleFileChange}
				ref={fileInputRef}
			/>
			{file && <input type="submit" />}
		</form>
	)
}

export default MovieFileForm
