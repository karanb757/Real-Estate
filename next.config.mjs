/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'eldtlfazltepgsunjgxj.supabase.co',
          pathname: '/storage/v1/object/public/listingImages/**',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  