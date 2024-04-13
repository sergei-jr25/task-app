import { FC } from 'react'
import styles from './Button.module.scss'
import { IButton } from './button-interface'

const Button: FC<IButton> = ({ children, className, ...rest }) => {
	return (
		<button {...rest} className={`${styles.button} ${styles.className}`}>
			{children}
		</button>
	)
}
export default Button
