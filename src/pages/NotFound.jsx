import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
	return (
		<section className={styles.page}>
			<h1 className={styles.title}>404 — Page not found</h1>
			<p className={styles.message}>The page you're looking for doesn't exist.</p>
			<Link to="/" className={styles.link}>
				Go back home
			</Link>
		</section>
	)
}