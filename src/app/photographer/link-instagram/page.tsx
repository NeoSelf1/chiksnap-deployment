'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/data/logo.svg';

export default function InstagramRedirectPage() {
  const router = useRouter();
  let instagramId: string | null = null;

  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    instagramId = searchParams.get('id');
  }

  useEffect(() => {
    console.log(instagramId);
    if (instagramId) {
      window.location.href = `https://www.instagram.com/${instagramId}`;
    } else {
      router.push('/photographer'); // instagramId이 없으면 다시 입력 페이지로 이동
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={Logo}
          alt="linking to instagram"
          width={100}
          height={100}
          className="mb-4"
        />
      </div>
    </div>
  );
}
