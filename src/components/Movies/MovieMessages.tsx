import styles from './Movie.module.css'

interface Props {
	goHome: boolean
	errorCode?: number
	isAdded: boolean
	addedTitle?: string
	isEditedSuccess: boolean
	isFormUnchanged: boolean
	wasFormChanged: boolean
}

const MovieMessages = ({
	goHome,
	errorCode,
	isAdded,
	addedTitle,
	isEditedSuccess,
	isFormUnchanged,
	wasFormChanged,
}: Props) => {
	return (
		<>
			{goHome ? (
				<div className={styles.errorMessage}>
					Are you sure? Changes will be lost...
				</div>
			) : (
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
			)}
		</>
	)
}

export default MovieMessages
