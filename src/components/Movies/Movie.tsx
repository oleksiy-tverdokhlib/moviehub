import { useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../../services/movies'
import MovieEditForm from './MovieEditForm'

const Movies = () => {
	const { id } = useParams<{ id: string }>()
	if (!id) return null

	const { data, isLoading, isSuccess } = useGetMovieByIdQuery({ id })

	if (isLoading) return <div>Loading...</div>
	if (!isSuccess || !data) return <div>Movie not found</div>

	const { title, format, year, actors } = data?.data
	const actorsNames = actors.map((actor) => actor.name)

	return (
		<>
			<MovieEditForm
				title={title}
				format={format}
				year={year}
				actors={actorsNames}
				id={id}
			/>
		</>
	)
}

export default Movies
