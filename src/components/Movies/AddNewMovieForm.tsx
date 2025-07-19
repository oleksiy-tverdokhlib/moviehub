// import { useAddNewMovieMutation } from '../../services/movies'
// import type { MovieData } from './MovieEditForm'

// import MovieForm from './MovieForm'

// const AddNewMovieForm = () => {
// 	const [addNewMovie] = useAddNewMovieMutation()
// 	const initialData: MovieData = {
// 		title: '',
// 		year: 1900,
// 		format: '',
// 		actors: [''],
// 	}

// 	const handleSubmit = async (data: MovieData) => {
// 		await addNewMovie(data).unwrap()
// 	}

// 	return (
// 		<MovieForm
// 			initialData={initialData}
// 			onSubmit={handleSubmit}
// 			submitLabel="Add Movie"
// 		/>
// 	)
// }

// export default AddNewMovieForm
