'use client'

import Loader from '@/components/ui/loader/Loader'
import { IProduct, iReviews } from '@/shared/types/products'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import ProductItem from '../../ui/product-item/ProductItem'
import styles from './Hero.module.scss'
import Reviews from './Reviews/Reviews'

const DynamicAddedProducts = dynamic(
	() => import('./AddedProducts/AddedProducts'),
	{
		ssr: false,
	}
)

interface IHeroPage {
	products: IProduct[]
	reviews: iReviews[]
}

const HeroPage: FC<IHeroPage> = ({ products, reviews }) => {
	const [productsData, setProductsData] = useState(products)
	const [carrentPage, setCurrentPage] = useState(0)
	const [totalCount, setTotalCount] = useState(0)
	const [isFetching, setIfFetching] = useState(false)
	const [isError, setIsError] = useState(null)

	useEffect(() => {
		fetch(`http://o-complex.com:1337/products?page=${carrentPage}&page_size=6`)
			.then(res => res.json())
			.then(data => {
				setProductsData([...productsData, ...data.products])
				setCurrentPage(prev => prev + 1)
				setTotalCount(data.total)
			})
			.catch(e => {
				setIsError(e)
				console.error('Error fetching data:', e)
			})
			.finally(() => {
				setIfFetching(false)
			})
	}, [isFetching])

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [productsData])

	const scrollHandler = (e: any) => {
		if (e.target && e.target.documentElement) {
			if (
				e.target.documentElement.scrollHeight -
					(e.target.documentElement.scrollTop + window.innerHeight) <
					100 &&
				productsData.length < totalCount
			) {
				setIfFetching(true)
			}
		}
	}

	return (
		<div className={styles.hero}>
			<div className={`${styles.hero__container} container`}>
				<h1 className={styles.hero__title}>Тестовое задание</h1>
				<Reviews reviews={reviews} />
				<DynamicAddedProducts />
				{productsData ? (
					<div className={styles.hero__items}>
						{productsData?.map((product: IProduct) => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className={styles.hero__items}>
						{Array.from({ length: 6 }).map((_, idx) => (
							<Loader key={idx} height='300px' />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
export default HeroPage
