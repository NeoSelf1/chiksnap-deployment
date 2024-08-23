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
        마음에 드는 스냅 3장을 골라주세요.
      </h2>
      <h3 className="body-3 text-gray-500 mb-[1.75rem]">
        선택하신 스냅의 분위기와 유사한 스타일의
        <br />
        작가님을 추천해드릴게요.
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

        </div>
      </div>

      <div className="btn-container">
        <Link
          href={{
            pathname: '/photographer',
            query: { type, moods: selectedMoods.join(',') },
          }}
          aria-disabled={selectedMoods.length !== 3}
          className={
            selectedMoods.length === 3
              ? 'btn-primary body-3 w-full'
              : 'btn-default body-3 pointer-events-none w-full'
          }
        >
          다음으로
        </Link>
      </div>
    </div>
  );
};

export default SelectMood;
