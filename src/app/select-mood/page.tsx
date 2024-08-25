'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MoodImageGroup from '@/components/MoodImageGroup';
import { arrangedPhotos } from '@/data/database';

const SelectMood = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);

  const toggleMood = (id: number) => {
    console.log(id);
    setSelectedMoods((prev) =>
      prev.includes(id)
        ? prev.filter((moodId) => moodId !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev,
    );
  };

  return (
    <div className="flex flex-col">
      <div className="fixed w-[28rem] bg-white px-4 pb-2 z-20 pt-2">
        <div className="flex flex-row items-center justify-between">
          <h2 className="title-1">마음에 드는 스냅 3장을 골라주세요.</h2>
          <span className="body-1">
            2<span className="text-gray-400">/2</span>
          </span>
        </div>

        <h3 className="mt-1 text-gray-500 whitespace-pre-line body-3">
          {`선택하신 스냅의 분위기와 유사한 스타일의 
작가님을 추천해드릴게요.`}
        </h3>
      </div>

      {/* 스크롤 가능한 이미지 섹션 */}
      <div className="flex-grow px-4 mb-20 mt-28">
        <div className="flex flex-row pb-4 space-x-1">
          <MoodImageGroup
            images={arrangedPhotos[0]}
            selectedMoods={selectedMoods}
            toggleMood={toggleMood}
          />
          <MoodImageGroup
            images={arrangedPhotos[1]}
            selectedMoods={selectedMoods}
            toggleMood={toggleMood}
          />
          <MoodImageGroup
            images={arrangedPhotos[2]}
            selectedMoods={selectedMoods}
            toggleMood={toggleMood}
          />
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
