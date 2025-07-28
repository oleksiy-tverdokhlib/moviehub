import { useImportFile } from '../../hooks/sidebarFilters/useImportFile'
import Loader from '../common/Loader/Loader'
import styles from './SideBar.module.css'

const MovieFileForm = () => {
	const {
		file,
		isLoading,
		fileInputRef,
		notification,
		handleFileChange,
		handleSubmit,
	} = useImportFile()

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
			{isLoading && <Loader />}

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
