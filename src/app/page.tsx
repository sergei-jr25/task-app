import HeroPage from '@/components/screens/Hero/Hero'

async function fetchData(url: string) {
	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

export default async function Home() {
	const [products, reviews] = await Promise.all([
		fetchData('http://o-complex.com:1337/products?page=0&page_size=6'),
		fetchData('http://o-complex.com:1337/reviews'),
	])

	return (
		<main>
			<HeroPage products={products.products || []} reviews={reviews || []} />
		</main>
	)
}
