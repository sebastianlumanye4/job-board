import { createContext, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const ModalContext = createContext(null)

function useModalContext() {
	const ctx = useContext(ModalContext)
	if (!ctx) {
		throw new Error('Modal.* components must be used within a Modal component')
	}
	return ctx
}

function Modal({ isOpen, onClose, children }) {
	useEffect(() => {
		if (!isOpen) return

		function handleKeyDown(e) {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleKeyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return createPortal(
		<ModalContext.Provider value={{ onClose }}>
			<div className={styles.overlay} onClick={onClose}>
				<div className={styles.dialog} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
					{children}
				</div>
			</div>
		</ModalContext.Provider>,
		document.body
	)
}

function Header({ children }) {
	const { onClose } = useModalContext()
	return (
		<div className={styles.header}>
			<div className={styles.headerContent}>{children}</div>
			<button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
				×
			</button>
		</div>
	)
}

function Body({ children }) {
	return <div className={styles.body}>{children}</div>
}

function Footer({ children }) {
	return <div className={styles.footer}>{children}</div>
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal