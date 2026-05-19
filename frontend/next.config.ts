import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// formato en que vercel y nextjs manejan los diagonales de las url
	trailingSlash: true,

	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https', // solo urls seguras
				hostname: '**', // El doble asterisco permite CUALQUIER dominio
			}
		],
	},
};

export default nextConfig;
