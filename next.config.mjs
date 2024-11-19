/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://api.chiksnap.site/:path*',
      },
    ];
  },
  images: {
    domains: [
      'chik.s3.ap-northeast-2.amazonaws.com',
      'scontent-gmp1-1.cdninstagram.com',
    ], // 허용할 외부 이미지 도메인 추가
  },
};

export default nextConfig;
