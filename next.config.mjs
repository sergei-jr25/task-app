/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['encrypted-tbn2.gstatic.com', 'encrypted-tbn0.gstatic.com'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://o-complex.com:1337/:path*',
			},
		]
	},
}

export default nextConfig
