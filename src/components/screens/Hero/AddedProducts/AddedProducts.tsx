import Button from '@/components/ui/Button/Button'
import Field from '@/components/ui/Field/Field'
import Modal from '@/components/ui/modal/Modal'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { actions } from '@/store/order/order.slice'
import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styles from './AddedProducts.module.scss'

const AddedProducts: FC = () => {
	const order = useTypedSelector(state => state.order)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' })

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(actions.addToPhonde(e.target.value))
	}

	const onSubmit = async () => {
		const phoneNumber = order.phone
		const cleanedPhoneNumber = phoneNumber?.replace(/\D/g, '')
		const dataOrders = {
			phone: cleanedPhoneNumber,
			cart: order.orders,
		}
		try {
			const response = await fetch('http://o-complex.com:1337/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataOrders),
			})

			if (response.ok) {
				openModal()
			} else {
				console.error('Failed to send data:', response.statusText)
			}
		} catch (error) {
			console.error('Error sending data:', error)
		} finally {
		}
	}

	return (
		<div className={styles.added}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.added__title}>Добавленные товары</div>
				<div className={styles.added__items}>
					{order.orders.map(item => (
						<div className={styles.added__item} key={item.id}>
							<div className={styles.added__name}>{item.title}</div>
							<div className={styles.added__quantity}> x{item.quantity}</div>
							<div className={styles.added__price}>{item.price} ₽</div>
						</div>
					))}
				</div>
				<div className={styles.added__actions}>
					<Field
						{...register('phone', {
							required: 'Field is require',

							pattern: {
								value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
								message: 'Phone number is incorrect',
							},
						})}
						placeholder='+7 (___) ___ __-__'
						type='text'
						onChange={onChange}
						value={order.phone || ''}
						error={errors.phone}
					/>

					<Button>Заказать</Button>
				</div>
			</form>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div>Data sent successfully</div>
			</Modal>
		</div>
	)
}
export default AddedProducts
