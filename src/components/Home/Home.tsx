import { useFilter } from '../../hooks/useFilter'
import styles from './Home.module.css'
import MoviesList from './MoviesList'
import Sidebar from './SideBar'

const Home = () => {
	const { setSearchParams, queryArgs } = useFilter()

	return (
		<main className={styles.home}>
			<Sidebar setSearchParams={setSearchParams} />
			<MoviesList queryArgs={queryArgs} />
		</main>
	)
}

export default Home
