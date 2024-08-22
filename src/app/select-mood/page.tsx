'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { moodImages_mu } from '@/data/database';
import ArrowBack from '@/data/arrowLeft.svg';
import IsChecked from '@/data/whiteCheck.svg';

const SelectMood = () => {
  const router = useRouter();
  const backFunction = () => {
    router.back();
  };

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
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
    <div className="relative flex flex-col mx-[1rem] mt-[3.5rem] lg:h-screen md:h-screen sm:h-screen">
      <div className="cursor-pointer" onClick={backFunction}>
        <div className="flex w-[1.5rem] h-[1.5rem] my-[0.75rem]">
          <Image src={ArrowBack} alt="Back" objectFit="cover" />
        </div>
      </div>
      <div className="flex h-[1.375rem] justify-end">
        <span className="caption">
          2<span className="text-gray-400"> / 2</span>
        </span>
      </div>
      <h2 className="title-1 mt-[0.62rem] mb-[0.25rem]">
        아래 사진 중, 찍고 싶은 분위기의
        <br />
        스냅 사진을 골라볼까요?
      </h2>
      <h3 className="body-3 text-gray-500 mb-[1.75rem]">
        3장의 사진을 선택해주세요 (수정예정)
      </h3>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {moodImages_mu.map((image) => (
          <div
            key={image.id}
            className={`relative cursor-pointer rounded-md overflow-hidden`}
            onClick={() => toggleMood(image.id)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="responsive"
              width={220}
              height={220}
              objectFit="cover"
              className="w-full"
            />
            {selectedMoods.includes(image.id) && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Image src={IsChecked} alt={'checked'} width={20} height={20} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        <Link
          href={{
            pathname: '/photographer',
            query: { type, moods: selectedMoods.join(',') },
          }}
          aria-disabled={selectedMoods.length !== 3}
          className={
            selectedMoods.length === 3
              ? 'btn-primary body-3 mb-[1rem]'
              : 'btn-default body-3 pointer-events-none mb-[1rem]'
          }
        >
          다음
        </Link>
      </div>
    </div>
  );
};

export default SelectMood;
