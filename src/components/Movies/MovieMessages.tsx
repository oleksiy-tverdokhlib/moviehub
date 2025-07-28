import styles from './Movie.module.css'

interface Props {
	errorCode?: number
	isAdded: boolean
	addedTitle?: string
	isEditedSuccess: boolean
	isFormUnchanged: boolean
	wasFormChanged: boolean
}

const MovieMessages = ({
	errorCode,
	isAdded,
	addedTitle,
	isEditedSuccess,
	isFormUnchanged,
	wasFormChanged,
}: Props) => {
	return (
		<>
			{errorCode && wasFormChanged && (
				<div className={styles.errorMessage}>
					The movie with this title already exists.
				</div>
			)}

			{isAdded && (
				<div className={styles.success}>
					Movie <strong>{addedTitle}</strong> was successfully added.
				</div>
			)}

			{isEditedSuccess && isFormUnchanged && (
				<div className={styles.success}>
					This movie was successfully edited.
				</div>
			)}
		</>
	)
}

export default MovieMessages
