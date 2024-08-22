'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { group1, group2, group3 } from '@/data/database';
import ArrowBack from '@/data/arrowLeft.svg';
import IsChecked from '@/data/whiteCheck.svg';
import MoodImageGroup from '@/components/MoodImageGroup';

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
    <div className="relative flex flex-col mx-[1rem] mt-[3.5rem] h-screen pb-[10rem]">
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
      <div className="flex flex-row space-x-1 pb-[5rem]">
        <MoodImageGroup
          images={group1}
          selectedMoods={selectedMoods}
          toggleMood={toggleMood}
        />
        <MoodImageGroup
          images={group2}
          selectedMoods={selectedMoods}
          toggleMood={toggleMood}
        />
        <MoodImageGroup
          images={group3}
          selectedMoods={selectedMoods}
          toggleMood={toggleMood}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-4">
        <div className="flex w-full max-w-md mx-4">
          <Link
            href={{
              pathname: '/photographer',
              query: { type, moods: selectedMoods.join(',') },
            }}
            aria-disabled={selectedMoods.length !== 3}
            className={
              selectedMoods.length === 3
                ? 'btn-primary body-3 w-full lg:mx-4 md:mx-4 sm:mx-4'
                : 'btn-default body-3 pointer-events-none w-full lg:mx-4 md:mx-4 sm:mx-4'
            }
          >
            다음
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectMood;
