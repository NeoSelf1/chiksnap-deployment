'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import { photoData, photographerData, snapTypeChoice } from '@/data/database';
import Instagram from '@/data/instagram.svg';
import { Icon } from '@iconify/react';
import { useRecoilState } from 'recoil';
import {
  finalPhotographerIdsState,
  photographersSortByMoodState,
  previouslySelectedState,
} from '@/context/recoil-context';
import { sortPhotographers, sortPhotographersByMood } from '@/lib/functions';

const RecommendedPhotographers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moodData, setMoodData] = useState<any>([]);
  const [isBtnVisible, setIsBtnVisible] = useState<boolean>(true);

  const [previouslySelected, setPreviouslySelected] = useRecoilState(
    previouslySelectedState,
  );
  const [photographersSortedByMood, setPhotographersSortedByMood] =
    useRecoilState(photographersSortByMoodState);

  const [finalPhotographerIds, setFinalPhotographerIds] = useRecoilState(
    finalPhotographerIdsState,
  );

  const searchParams = useSearchParams();

  const setData = (_moods: any, sortedPhotographers: any) => {
    const res = sortPhotographers({
      previouslySelected,
      sortedPhotographers,
      _moods,
    });

    if (res.modifiedSortedPhotographers.flat().length < 6) {
      setIsBtnVisible(false);
    }

    setFinalPhotographerIds(res.selectedPhotographerIds);
    setPhotographersSortedByMood(res.modifiedSortedPhotographers);
  };

  useEffect(() => {
    //prettier-ignore
    const types = searchParams .get('type')?.split(',').map((item: string) => +item);
    //prettier-ignore
    const moods = searchParams.get('moods')?.split(',').map((id: string) => photoData.find((item) => item.id === +id)?.mood).sort();
    setMoodData(moods);
    if (photographersSortedByMood.flat().length < 6) {
      setIsBtnVisible(false);
    }

    if (
      finalPhotographerIds.length === 0 ||
      photographersSortedByMood.length === 0
    ) {
      if (!types || !moods) return;
      const sorted_tmp = sortPhotographersByMood({ types, moods });
      setPhotographersSortedByMood(sorted_tmp);

      const timer = setTimeout(() => {
        setData(moods, sorted_tmp);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <div className="relative flex flex-col mx-4 mb-24">
      <div className="flex items-center mt-2">
        <h2 className="flex-grow title-1">칙스냅에서 추천드리는 작가예요!</h2>
        {isBtnVisible && (
          <div
            onClick={() => setData(moodData, photographersSortedByMood)}
            className="p-2 bg-gray-50 rounded-lg"
          >
            <Icon icon="ri-reset-left-line" className="text-gray-700" />
          </div>
        )}
      </div>

      <h3 className="mt-2 mb-6 text-gray-500 body-3 tracking-wide">
        아래 작가분들은 여러분의 선택을 기반으로 칙스냅에서 추천드리는
        작가님이에요. 작가분들의 더 많은 작업물을 보고싶다면 인스타그램 아이콘을
        클릭해보세요.
      </h3>

      <div className="flex flex-col gap-[0.62rem]">
        {finalPhotographerIds.map((id: number, index: number) =>
          photographerData.find((p) => p.id === id) ? (
            <div
              key={id}
              className="flex flex-col w-full bg-gray-50 hover:bg-gray-100 p-[0.75rem] rounded-[0.5rem] cursor-pointer"
            >
              <Link
                target={'_blank'}
                href={`/photographer/link-instagram?id=${
                  photographerData.find((p) => p.id === id)?.instagram_id
                }`}
              >
                <div className="flex flex-col justify-center w-full">
                  <div className="flex w-full items-center space-x-2 mb-2.5">
                    <span className="text-gray-900 body-1">
                      {photographerData.find((p) => p.id === id)!.name}
                    </span>

                    <span className="flex-grow text-gray-600 caption">
                      {`@${
                        photographerData.find((p) => p.id === id)?.instagram_id
                      }`}
                    </span>

                    <Image
                      src={Instagram}
                      width={24}
                      height={24}
                      alt="Instagram"
                      style={{ filter: 'invert(60%)' }}
                      className="object-cover"
                    />
                  </div>

                  <div className="items-center gap-[0.25rem] mb-[0.62rem] flex">
                    <div className="caption px-[0.5rem] py-[0.25rem] bg-gray-200 rounded-[0.25rem]">
                      {photographerData.find((p) => p.id === id)?.price}
                    </div>

                    {photographerData
                      .find((p) => p.id === id)
                      ?.types.map((typeId, index) => (
                        <div
                          key={index}
                          className="caption px-[0.5rem] py-[0.25rem] bg-white rounded-[0.25rem]"
                        >
                          {snapTypeChoice[typeId].old}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex gap-[0.5rem]">
                  {photographerData
                    .find((p) => p.id === id)
                    ?.works?.slice() // Create a shallow copy of the array
                    .sort(
                      (a, b) =>
                        Math.abs(
                          photoData.find((item) => item.id === a)!.mood -
                            moodData[index],
                        ) -
                        Math.abs(
                          photoData.find((item) => item.id === b)!.mood -
                            moodData[index],
                        ),
                    )
                    .slice(0, 3)
                    .map((imageId, index) => (
                      <div key={index} className="relative w-1/3 h-[8.5rem]">
                        <Image
                          src={
                            photoData.find((item) => item.id === imageId)?.url!
                          }
                          alt="example image"
                          fill
                          quality={100}
                          className="rounded-[0.25rem] object-cover w-auto h-auto"
                        />
                      </div>
                    ))}
                </div>
              </Link>
            </div>
          ) : null,
        )}
      </div>

      <div className="btn-container flex-col">
        <span className="flex-grow text-gray-700 caption mb-2 text-center">
          원하는 작가가 없다면 칙스냅에게 직접 요청해보세요
        </span>

        <Link
          href={'/request-custom'}
          className={'btn-default body-3 w-full lg:mx-4 md:mx-4 sm:mx-4'}
        >
          마음에 드는 작가가 없으시다면?
        </Link>
      </div>
    </div>
  );
};

export default RecommendedPhotographers;
