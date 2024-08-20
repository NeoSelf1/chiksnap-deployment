'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdCheck } from 'react-icons/md';
import { SnapType } from '@/types';

import image_11 from '../../data/11.png';
import image_12 from '../../data/12.png';
import image_13 from '../../data/13.png';

const snapTypes: SnapType[] = [
  {
    id: 'personal',
    title: '개인 스냅',
    description: '개인 화보, 프로필 사진 등 단독 촬영',
    image: image_11,
  },
  {
    id: 'couple',
    title: '커플 / 우정 스냅',
    description: '커플(2인) 혹은 친구들(2인 이상) 촬영',
    image: image_12,
  },
  {
    id: 'wedding',
    title: '결혼 스냅',
    description: '데이트 스냅, 본식 스냅 등 웨딩 촬영',
    image: image_13,
  },
];

const SelectType = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="flex flex-col before:justify-between p-4 space-y-12">
      <h2 className="title-1">찾고 있는 스냅 종류를 골라볼까요?</h2>
      <div className="space-y-2 w-full">
        {snapTypes.map((type) => (
          <div
            key={type.id}
            className={`flex items-center bg-gray-50 rounded-lg ${
              selectedType === type.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <Image
              src={type.image}
              alt={type.title}
              width={160}
              height={160}
              className="mr-4"
            />
            <div className="p-4 flex flex-row justify-between w-full place-items-center">
              <div className="flex-grow">
                <h2 className="font-semibold">{type.title}</h2>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              {selectedType === type.id && (
                <MdCheck size={24} className="text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Link
        href={selectedType ? `/select-price?type=${selectedType}` : '#'}
        className={
          selectedType
            ? 'btn-primary font-bold'
            : 'btn-default pointer-events-none'
        }
      >
        다음
      </Link>
    </div>
  );
};

export default SelectType;
