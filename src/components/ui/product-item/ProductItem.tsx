import { IProduct } from '@/shared/types/products'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './ProductItem.module.scss'

const DynamicAddedProducts = dynamic(() => import('./ProductItemAction'), {
	ssr: false,
})

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div className={styles.product}>
			<div className={styles.product__image}>
				<img src={product.image_url} alt={product.title} />
			</div>
			<div className={styles.product__title}>{product.title}</div>

			<div className={styles.product__description}>{product.description}</div>
			<div className={styles.product__price}>цена: {product.price}₽</div>

			<DynamicAddedProducts product={product} />
		</div>
	)
}
export default ProductItem
