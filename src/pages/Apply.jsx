import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import styles from './Apply.module.css'

const initialValues = {
	fullName: '',
	email: '',
	phone: '',
	position: '',
	coverLetter: '',
	startDate: '',
}

const validators = {
	fullName: (value) => {
		if (!value.trim()) return 'Full name is required'
		if (value.trim().length < 2) return 'Full name must be at least 2 characters'
		return ''
	},
	email: (value) => {
		if (!value.trim()) return 'Email is required'
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'
		return ''
	},
	phone: (value) => {
		if (!value.trim()) return 'Phone number is required'
		if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'Enter a 10-digit phone number'
		return ''
	},
	position: (value) => {
		if (!value.trim()) return 'Position is required'
		if (value.trim().length < 3) return 'Position must be at least 3 characters'
		return ''
	},
	coverLetter: (value) => {
		if (!value.trim()) return 'Cover letter is required'
		if (value.trim().length < 50) return 'Cover letter must be at least 50 characters'
		return ''
	},
	startDate: (value) => {
		if (!value) return 'Start date is required'
		return ''
	},
}

export default function Apply() {
	const [submittedName, setSubmittedName] = useState(null)

	const { values, errors, touched, isValid, submitting, handleChange, handleBlur, handleSubmit, reset } = useForm({
		initialValues,
		validators,
		onSubmit: async (formValues) => {
			await new Promise((resolve) => setTimeout(resolve, 300))
			setSubmittedName(formValues.fullName)
		},
	})

	function handleReset() {
		setSubmittedName(null)
		reset()
	}

	if (submittedName) {
		return (
			<section className={styles.successPage}>
				<h1>Application Submitted</h1>
				<p className={styles.successMessage}>Thanks, {submittedName}! Your application has been received.</p>
				<button type="button" className={styles.resetButton} onClick={handleReset}>
					Apply for another
				</button>
			</section>
		)
	}

	return (
		<section className={styles.page}>
			<h1 className={styles.title}>Apply</h1>
			<form onSubmit={handleSubmit} noValidate className={styles.form}>
				<div className={styles.field}>
					<label htmlFor="fullName" className={styles.label}>Full name</label>
					<input
						id="fullName"
						name="fullName"
						type="text"
						className={styles.input}
						value={values.fullName}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.fullName && errors.fullName && <p role="alert" className={styles.errorText}>{errors.fullName}</p>}
				</div>

				<div className={styles.field}>
					<label htmlFor="email" className={styles.label}>Email</label>
					<input
						id="email"
						name="email"
						type="email"
						className={styles.input}
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.email && errors.email && <p role="alert" className={styles.errorText}>{errors.email}</p>}
				</div>

				<div className={styles.field}>
					<label htmlFor="phone" className={styles.label}>Phone</label>
					<input
						id="phone"
						name="phone"
						type="tel"
						className={styles.input}
						value={values.phone}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.phone && errors.phone && <p role="alert" className={styles.errorText}>{errors.phone}</p>}
				</div>

				<div className={styles.field}>
					<label htmlFor="position" className={styles.label}>Position applying for</label>
					<input
						id="position"
						name="position"
						type="text"
						className={styles.input}
						value={values.position}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.position && errors.position && <p role="alert" className={styles.errorText}>{errors.position}</p>}
				</div>

				<div className={styles.field}>
					<label htmlFor="coverLetter" className={styles.label}>Cover letter</label>
					<textarea
						id="coverLetter"
						name="coverLetter"
						rows={6}
						className={styles.textarea}
						value={values.coverLetter}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.coverLetter && errors.coverLetter && <p role="alert" className={styles.errorText}>{errors.coverLetter}</p>}
				</div>

				<div className={styles.field}>
					<label htmlFor="startDate" className={styles.label}>Available to start</label>
					<input
						id="startDate"
						name="startDate"
						type="date"
						className={styles.input}
						value={values.startDate}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.startDate && errors.startDate && <p role="alert" className={styles.errorText}>{errors.startDate}</p>}
				</div>

				<button type="submit" className={styles.submitButton} disabled={!isValid || submitting}>
					{submitting ? 'Submitting…' : 'Submit application'}
				</button>
			</form>
		</section>
	)
}