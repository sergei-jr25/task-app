import { forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'
import styles from './Field.module.scss'
import { IFiled } from './field-interface'

const Field = forwardRef<HTMLInputElement, IFiled>(
	({ error, placeholder, ...rest }, ref) => {
		return (
			<div>
				<ReactInputMask
					inputRef={ref}
					className={styles.inputPhone}
					mask='+7 (999) 999-99-99'
					placeholder={placeholder}
					{...rest}
				/>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)
Field.displayName = 'Field'
export default Field
