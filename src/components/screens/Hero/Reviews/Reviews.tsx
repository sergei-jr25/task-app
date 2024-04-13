import Loader from '@/components/ui/loader/Loader'
import { iReviews } from '@/shared/types/products'
import { FC } from 'react'
import sanitizeHtml from 'sanitize-html'
import styles from './Reviews.module.scss'

const Reviews: FC<{ reviews: iReviews[] }> = ({ reviews }) => {
	return (
		<div className={styles.reviews}>
			<div className={styles.reviews__items}>
				{reviews
					? reviews?.map(review => (
							<div key={review.id} className={styles.reviews__item}>
								<div
									className={styles.reviews__text}
									dangerouslySetInnerHTML={{
										__html: sanitizeHtml(review.text),
									}}
								></div>
							</div>
					  ))
					: Array.from({ length: 2 }).map((_, idx) => (
							<Loader key={idx} height='300px' />
					  ))}
			</div>
		</div>
	)
}
export default Reviews
