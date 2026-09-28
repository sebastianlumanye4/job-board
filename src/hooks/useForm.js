import { useCallback, useMemo, useState } from 'react'

export function useForm({ initialValues, validators, onSubmit }) {
	const [values, setValues] = useState(initialValues)
	const [touched, setTouched] = useState({})
	const [submitting, setSubmitting] = useState(false)

	const errors = useMemo(() => {
		const next = {}
		for (const field of Object.keys(validators)) {
			const message = validators[field](values[field], values)
			if (message) next[field] = message
		}
		return next
	}, [values, validators])

	const isValid = Object.keys(errors).length === 0

	function handleChange(e) {
		const { name, value } = e.target
		setValues((prev) => ({ ...prev, [name]: value }))
	}

	function handleBlur(e) {
		const { name } = e.target
		setTouched((prev) => ({ ...prev, [name]: true }))
	}

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			setTouched(Object.keys(validators).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
			if (!isValid) return
			setSubmitting(true)
			try {
				await onSubmit(values)
			} finally {
				setSubmitting(false)
			}
		},
		[isValid, onSubmit, validators, values]
	)

	function reset() {
		setValues(initialValues)
		setTouched({})
	}

	return { values, errors, touched, isValid, submitting, handleChange, handleBlur, handleSubmit, reset }
}