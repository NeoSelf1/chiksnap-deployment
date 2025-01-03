'use client';

import Image from 'next/image';
import Link from 'next/link';
import BackgroundImage from '@/data/unsplash.png';
import {
  finalPhotographerIdsState,
  photographersSortByMoodState,
  previouslySelectedState,
} from '@/context/recoil-context';
import { useRecoilState } from 'recoil';

const Home = () => {
  const [photographersSortedByMood, setPhotographersSortedByMood] =
    useRecoilState(photographersSortByMoodState);
  const [previouslySelected, setPreviouslySelected] = useRecoilState(
    previouslySelectedState,
  );
  const [finalPhotographerIds, setFinalPhotographerIds] = useRecoilState(
    finalPhotographerIdsState,
  );

  const onclick = () => {
    // recoil 전역변수값 초기화
    setPhotographersSortedByMood([]);
    setPreviouslySelected([]);
    setFinalPhotographerIds([]);
  };

  return (
    <div className="relative flex flex-col w-full h-screen p-[1rem]">
      <div className="absolute inset-0 z-0">
        <Image
          src={BackgroundImage}
          alt="background"
          fill
          quality={100}
          className="object-cover pointer-events-none"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/70 to-transparent" />
      <div className="relative z-20 flex flex-col justify-between h-full">
        <div className="pl-[1.25rem]">
          <h1 className="body-2 mt-[6.94rem] mb-[0.64rem] text-white">
            순간을 Chik다,
            <br />
            칙스냅
          </h1>

          <div className="w-[6.3125rem] h-[0.125rem] rounded-[12.5rem] bg-white/40" />
        </div>

        <div className="flex flex-col">
          <div className="pl-[1.25rem]">
            <h1 className="heading text-white mb-[1rem]">
              스냅 작가님을
              <br />
              찾고 있으신가요?
            </h1>

            <p className="body-2 text-white mb-[3.25rem]">
              내가 원하는 스타일에 맞는
              <br />
              작가를 칙스냅에서 찾아보세요
            </p>
          </div>

          <Link
            onClick={onclick}
            href="/select-type"
            className="btn-default body-3"
          >
            다음으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
