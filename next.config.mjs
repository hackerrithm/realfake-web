/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API: 'https://embarrassed-hole-production.up.railway.app',
        DEV_API: 'http://localhost:8080'
    },
    images: {
        remotePatterns: [
            {
                hostname: "real-fake-images.s3.amazonaws.com",
            },
            {
                hostname: "localhost:8080"
            },
            {
                hostname: "https://embarrassed-hole-production.up.railway.app"
            }
        ]
    }
};

export default nextConfig;
