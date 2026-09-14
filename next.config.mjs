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
    ],
  },
};

export default nextConfig;
