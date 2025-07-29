import { useMovieForm } from '../../hooks/useMovieForm'
import type { MovieModeProps } from '../../interfaces/movies'
import { isEmptyData } from '../../shared/validation'
import ActorList from '../common/ActorList/ActorList'
import Icon from '../common/Icon/Icon'
import Loader from '../common/Loader/Loader'
import TextInput from '../common/TextInput/TextInput'
import styles from './Movie.module.css'
import MovieMessages from './MovieMessages'

const MovieDataForm = ({ mode }: MovieModeProps) => {
	const {
		goHome,
		isAdded,
		formData,
		errorCode,
		wasEdited,
		isEditing,
		isCreating,
		isLoading,
		formErrors,
		isFormLocked,
		existingMovie,
		wasFormChanged,
		addedMovieData,
		isEditedSuccess,
		handleEdit,
		handleChange,
		handleSubmit,
		handleGoHome,
		handleAddActor,
		handleActorChange,
		handleDeleteActor,
	} = useMovieForm({ mode })

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className={styles.container}>
			<form className={styles.movieForm} onSubmit={handleSubmit}>
				<div className={styles.return} onClick={handleGoHome}>
					<Icon id="arrow-left" />
					<span>Return</span>
				</div>

				<MovieMessages
					goHome={goHome}
					wasFormChanged={wasFormChanged}
					errorCode={errorCode}
					isAdded={isAdded}
					addedTitle={addedMovieData?.data?.title}
					isEditedSuccess={isEditedSuccess}
					isFormUnchanged={isEmptyData(formData, existingMovie) && wasEdited}
				/>

				{!isAdded && (
					<h3>{mode === 'edit' ? 'Edit Movie' : 'Add New Movie'}</h3>
				)}

				<TextInput
					label="Title"
					value={formData.title}
					onChange={handleChange}
					error={formErrors.title}
					disabled={isFormLocked}
				/>
				<TextInput
					label="Year"
					value={formData.year}
					onChange={handleChange}
					error={formErrors.year}
					disabled={isFormLocked}
				/>
				<TextInput
					label="Format"
					value={formData.format}
					onChange={handleChange}
					error={formErrors.format}
					disabled={isFormLocked}
				/>
				<ActorList
					actors={formData.actors}
					onChange={handleActorChange}
					onAdd={handleAddActor}
					onDelete={handleDeleteActor}
					errors={formErrors.actors}
					disabled={isFormLocked}
				/>

				{!(isAdded || wasEdited) && (
					<button
						type="submit"
						disabled={
							isAdded ||
							isEmptyData(formData, existingMovie) ||
							wasFormChanged ||
							isEditing ||
							isCreating
						}
					>
						{mode === 'edit' ? 'Save' : 'Add Movie'}
					</button>
				)}
				{wasEdited && (
					<button onClick={handleEdit} disabled={isEditing || isCreating}>
						Edit
					</button>
				)}
			</form>
		</div>
	)
}

export default MovieDataForm
