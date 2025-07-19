import styles from './Footer.module.css'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<p>© {new Date().getFullYear()} MoviesHub. All rights reserved.</p>
				<div className={styles.github}>
					<a href="https://github.com/oleksiy-tverdokhlib/moviehub">
						oleksiy-tverdokhlib
					</a>
					<svg className={styles.gitIcon}>
						<use href="/sprite.svg#github" />
					</svg>
				</div>
			</div>
		</footer>
	)
}

export default Footer
