import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
