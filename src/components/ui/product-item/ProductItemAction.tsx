import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IOrderItem } from '@/shared/types/order'
import { IProduct } from '@/shared/types/products'
import { actions } from '@/store/order/order.slice'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../Button/Button'
import styles from './ProductItem.module.scss'

const ProductItemAction: FC<{ product: IProduct }> = ({ product }) => {
	const order = useTypedSelector(state => state.order)
	const dispatch = useDispatch()

	const isSomeOrder = order.orders.find(
		(item: IOrderItem) => item.id === product.id
	)

	const handleToCart = (item: IProduct) => {
		dispatch(
			actions.addToProduct({
				id: item.id,
				title: item.title,
				quantity: 1,
				price: item.price,
			})
		)
	}

	const handleToChangeQuantity = (id: number, type: 'plus' | 'minus') => {
		dispatch(actions.changeQuantityToProduct({ id, type }))
	}
	return (
		<>
			{' '}
			{!!!isSomeOrder ? (
				<button
					onClick={() => handleToCart(product)}
					className={styles.product__button}
				>
					Купить
				</button>
			) : (
				<div className={styles.product__buttons}>
					<Button
						onClick={() => handleToChangeQuantity(product.id, 'minus')}
						className={styles.product__button}
					>
						-
					</Button>
					<span className={styles.product__quantity}>
						{isSomeOrder?.quantity}
					</span>
					<Button
						onClick={() => handleToChangeQuantity(product.id, 'plus')}
						className={styles.product__button}
					>
						+
					</Button>
				</div>
			)}
		</>
	)
}
export default ProductItemAction
