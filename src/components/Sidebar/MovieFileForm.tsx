import { useImportFile } from '../../hooks/sidebarFilters/useImportFile'
import styles from './SideBar.module.css'

const MovieFileForm = () => {
	const { fileInputRef, file, notification, handleFileChange, handleSubmit } =
		useImportFile()

	return (
		<form onSubmit={handleSubmit}>
			<span>Import movies from your file (.txt only):</span>
			<input
				type="file"
				id="file"
				name="file"
				accept=".txt"
				onChange={handleFileChange}
				ref={fileInputRef}
			/>

			{file && <input type="submit" value="Upload" />}

			{notification ? (
				<div
					className={`${styles.notification} ${
						notification.type === 'error' ? styles.error : styles.success
					}`}
				>
					{notification.text}
				</div>
			) : null}
		</form>
	)
}

export default MovieFileForm
