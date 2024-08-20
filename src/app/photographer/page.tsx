// app/recommended-photographers/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import image_1 from '../../data/1.png';
import image_2 from '../../data/2.png';
import image_3 from '../../data/3.png';
import image_4 from '../../data/4.png';
import { useSearchParams } from 'next/navigation';

interface Photographer {
  id: number;
  name: string;
  instagramId: string;
  snapType: string;
  profileImage: any;
}

const dummyPhotographers: Photographer[] = [
  {
    id: 1,
    name: '김포토',
    instagramId: '@CHIK_1',
    snapType: '스냅픽',
    profileImage: image_1,
  },
  {
    id: 2,
    name: '이스냅',
    instagramId: '@CHIK_1',
    snapType: '스냅픽',
    profileImage: image_2,
  },
  {
    id: 3,
    name: '박사진',
    instagramId: '@CHIK_1',
    snapType: '스냅픽',
    profileImage: image_3,
  },
  {
    id: 4,
    name: '정스튜디오',
    instagramId: '@CHIK_1',
    snapType: '스냅픽',
    profileImage: image_4,
  },
];

const RecommendedPhotographers = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const price = searchParams.get('price');
  const moods = searchParams.get('moods');

  //type, price, moods 정보로 작가 추리는 로직 여기서 구현하고 바로 띄우면 될듯.

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-xl font-bold mb-4">
        칙스냅에서 추천드리는 작가에요!
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {dummyPhotographers.map((photographer) => (
          <Link
            key={photographer.id}
            href={`/photographer/${photographer.id}`}
            className="flex flex-col"
          >
            <div className="relative aspect-square w-full mb-2 overflow-hidden rounded-lg">
              <Image
                src={photographer.profileImage}
                alt={photographer.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <p className="body-3">{photographer.name}</p>
            <p className="caption text-gray-500">{photographer.instagramId}</p>
          </Link>
        ))}
      </div>
      <div className="flex space-x-2">
        <Link href="/ask" className="w-24">
          <button className="btn-default w-full text-[#1F2127] py-3 rounded-lg mt-6">
            문의
          </button>
        </Link>
        <Link href="/more-photographers" className="flex-grow">
          <button className="btn-primary w-full bg-gray-800 text-white py-3 rounded-lg mt-6">
            마음에 드는 작가가 없으시다면?
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedPhotographers;
