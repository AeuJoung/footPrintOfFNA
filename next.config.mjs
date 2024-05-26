/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
  
      return config;
    },
    images : {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/u/**',
        },
        {
          protocol: 'https',
          hostname: 'cloudflare-ipfs.com',
          port: '',
          pathname: '/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/**',
        },
      ],
    }
  };

export default nextConfig;
