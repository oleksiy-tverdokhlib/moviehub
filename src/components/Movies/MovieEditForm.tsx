// import { useUpdateMovieMutation } from '../../services/movies'
// import MovieForm from './MovieForm'

// export interface Actor {
// 	id: number
// 	name: string
// 	createdAt: string
// 	updatedAt: string
// }

// export interface MovieData {
// 	title: string
// 	year: number
// 	format: string
// 	actors: string[]
// }

// const MovieEditForm = ({ title, format, year, actors, id }: MovieData & { id: string }) => {
// 	const [updateMovie] = useUpdateMovieMutation()

// 	const handleSubmit = async (data: MovieData) => {
// 		const isUnchanged =
// 			data.title === title &&
// 			data.year === year &&
// 			data.format === format &&
// 			JSON.stringify(data.actors) === JSON.stringify(actors)

// 		if (!isUnchanged) {
// 			await updateMovie({ id, updatedMovie: data }).unwrap()
// 		}
// 	}

// 	const initialData = { title, format, year, actors }

// 	return (
// 		<MovieForm
// 			initialData={initialData}
// 			onSubmit={handleSubmit}
// 			submitLabel="Save"
// 			title="Edit movie data"
// 		/>
// 	)
// }


// export default MovieEditForm
