import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
	return (
		<section className={styles.hero}>
			<h1 className={styles.title}>Job Board</h1>
			<p className={styles.tagline}>Browse remote jobs, save your favourites, and apply in a few clicks.</p>
			<nav className={styles.links}>
				<Link to="/jobs" className={styles.link}>
					Browse Jobs
				</Link>
				<Link to="/saved" className={styles.link}>
					View Saved Jobs
				</Link>
			</nav>
		</section>
	)
}