'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { moodImages_mu } from '@/data/database';

const SelectMood = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const price = searchParams.get('price');
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);

  const toggleMood = (id: number) => {
    setSelectedMoods((prev) =>
      prev.includes(id)
        ? prev.filter((moodId) => moodId !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev,
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="title-1">마음에 드는 무드 사진을 선택해주세요</h2>
      <p className="body-3 mb-8">(1~3개 선택 가능)</p>

      <div className="grid grid-cols-2 gap-2 mb-8">
        {moodImages_mu.map((image) => (
          <div
            key={image.id}
            className={`relative cursor-pointer rounded-md ${
              selectedMoods.includes(image.id) ? 'ring-2 ring-gray-800' : ''
            }`}
            onClick={() => toggleMood(image.id)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={220}
              height={220}
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <Link
        href={{
          pathname: '/photographer',
          query: { type, price, moods: selectedMoods.join(',') },
        }}
        aria-disabled={selectedMoods.length == 0}
        className={
          selectedMoods.length > 0
            ? 'btn-primary font-bold'
            : 'btn-default pointer-events-none'
        }
      >
        다음
      </Link>
    </div>
  );
};

export default SelectMood;
