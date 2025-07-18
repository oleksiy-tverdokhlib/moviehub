import { useRef, useState } from 'react'
import { useImportMoviesMutation } from '../../services/movies'

const MovieFileForm = () => {
	const [importMovies] = useImportMoviesMutation()
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [file, setFile] = useState<File | null>(null)

	const handleOnSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (file) {
			importMovies(file)
			fileInputRef.current && (fileInputRef.current.value = '')
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0])
		}
	}
	return (
		<form onSubmit={handleOnSubmit}>
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
