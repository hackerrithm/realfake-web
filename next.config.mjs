/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API: 'http://embarrassed-hole-production.up.railway.app'
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
    },
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
        "Access-Control-Max-Age": "3600",
        "Access-Control-Allow-Credentials": "true"
    }
};

export default nextConfig;
