import { FC, ReactNode, useEffect } from 'react'
import './Modal'

interface IModal {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}
const Modal: FC<IModal> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('modal-open')
		} else {
			document.body.classList.remove('modal-open')
		}
	}, [isOpen])
	return (
		<div className={`modal ${isOpen ? 'open' : ''}`}>
			<div className='modal-content'>
				{children}
				<button className='close-btn' onClick={onClose}>
					×
				</button>
			</div>
		</div>
	)
}

export default Modal
