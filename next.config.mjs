/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'chik.s3.ap-northeast-2.amazonaws.com',
      'scontent-gmp1-1.cdninstagram.com',
    ], // 허용할 외부 이미지 도메인 추가
  },
};

export default nextConfig;
