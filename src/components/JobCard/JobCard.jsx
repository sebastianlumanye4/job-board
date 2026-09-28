import { useState } from 'react'
import Modal from '../Modal/Modal'
import styles from './JobCard.module.css'

export default function JobCard({ job, saved, onSave }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { title, company, category, jobType, location, url, description, salary, tags } = job

	function handleSaveFromModal() {
		onSave()
		setIsModalOpen(false)
	}

	return (
		<>
			<article className={styles.card}>
				<div className={styles.header}>
					<h3 className={styles.title}>{title}</h3>
					<span className={styles.category}>{category}</span>
				</div>
				<p className={styles.company}>{company}</p>
				<div className={styles.meta}>
					{jobType && <span className={styles.badge}>{jobType.replace('_', ' ')}</span>}
					{location && <span className={styles.badge}>{location}</span>}
				</div>
				<div className={styles.footer}>
					<button type="button" className={styles.detailsButton} onClick={() => setIsModalOpen(true)}>
						View details
					</button>
					{saved ? (
						<span className={styles.savedBadge}>Saved</span>
					) : (
						<button type="button" className={styles.saveButton} onClick={onSave}>
							Save Job
						</button>
					)}
				</div>
			</article>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Modal.Header>
					<h2 className={styles.modalTitle}>{title}</h2>
					<p className={styles.modalCompany}>{company}</p>
				</Modal.Header>

				<Modal.Body>
					<div className={styles.modalMeta}>
						{jobType && <span className={styles.badge}>{jobType.replace('_', ' ')}</span>}
						{location && <span className={styles.badge}>{location}</span>}
						{salary && <span className={styles.badge}>{salary}</span>}
					</div>

					{tags?.length > 0 && (
						<div className={styles.tagList}>
							{tags.map((tag) => (
								<span key={tag} className={styles.tag}>
									{tag}
								</span>
							))}
						</div>
					)}

					<div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />

					<a href={url} target="_blank" rel="noreferrer" className={styles.link}>
						View original posting
					</a>
				</Modal.Body>

				<Modal.Footer>
					<button type="button" className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
						Close
					</button>
					{saved ? (
						<span className={styles.savedBadge}>Saved</span>
					) : (
						<button type="button" className={styles.saveButton} onClick={handleSaveFromModal}>
							Save Job
						</button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	)
}