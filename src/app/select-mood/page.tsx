'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { MoodImage } from '../../types';
import image_1 from '../../data/1.png';
import image_2 from '../../data/2.png';
import image_3 from '../../data/3.png';
import image_4 from '../../data/4.png';

const moodImages: MoodImage[] = [
  { id: 1, src: image_1, alt: 'Mood 1' },
  { id: 2, src: image_2, alt: 'Mood 2' },
  { id: 3, src: image_3, alt: 'Mood 3' },
  { id: 4, src: image_4, alt: 'Mood 4' },
  { id: 5, src: image_1, alt: 'Mood 5' },
  { id: 6, src: image_2, alt: 'Mood 6' },
];

const SelectMood = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const price = searchParams.get('price');
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);

  console.log(selectedMoods);
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
        {moodImages.map((image) => (
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
