import styles from './Movie.module.css'

interface DeleteItemProps {
	title: string
	onConfirm: () => void
	onCancel: () => void
}

const DeleteModal = ({ title, onConfirm, onCancel }: DeleteItemProps) => {
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<p>Do you really want to delete '{title}'?</p>
				<div className={styles.actions}>
					<button onClick={onConfirm}>Yes, delete</button>
					<button onClick={onCancel}>Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
