import Icon from '../Icon/Icon'
import styles from './Footer.module.css'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<p>© {new Date().getFullYear()} MoviesHub. All rights reserved.</p>
				<a
					href={'https://github.com/oleksiy-tverdokhlib/moviehub'}
					className={styles.github}
					target="_blank"
				>
					<span>oleksiy-tverdokhlib</span>
					<Icon id={'github'} />
				</a>
			</div>
		</footer>
	)
}

export default Footer
