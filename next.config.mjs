/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: 'http://o-complex.com:1337/:path*',
			},
		]
	},
}

export default nextConfig
