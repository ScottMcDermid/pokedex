/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.serebii.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
