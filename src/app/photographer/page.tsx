'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import { photoData, photographerData, snapTypeChoice } from '@/data/database';
import Instagram from '@/data/instagram.svg';
import { Photographer } from '@/types';

const RecommendedPhotographers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moodData, setMoodData] = useState<any>([]);
  const [data, setData] = useState<any>([]);

  const searchParams = useSearchParams();

  const processRecommendation = async () => {
    const types = searchParams
      .get('type')
      ?.split(',')
      .map((item: string) => +item);
    const moods = searchParams
      .get('moods')
      ?.split(',')
      .map((id: string) => photoData.find((item) => item.id === +id)?.mood)
      .sort();
    setMoodData(moods);
    if (!types || !moods) return;

    const filteredPhotographerByType = photographerData.filter((item) =>
      types.some((type: any) => item.types.includes(type)),
    );

    const photoMoodMap = new Map(
      photoData.map((photo) => [photo.id, photo.mood]),
    );

    const photographerMoodCounts = filteredPhotographerByType.map(
      (photographer) => {
        const moodCounts = new Map<number, number>();
        // 모든 사진작가들에 대해,
        for (const imageId of photographer.works) {
          //순회하는 사진작가 작품 이미지의 무드를
          const mood = photoMoodMap.get(imageId);
          if (mood !== undefined) {
            // moodId,
            moodCounts.set(mood, (moodCounts.get(mood) || 0) + 1);
          }
        }
        return { photographer, moodCounts };
      },
    );

    const moodSortedPhotographers = moods.map((mood) =>
      [...photographerMoodCounts]
        .sort(
          (a, b) =>
            (b.moodCounts.get(mood!) || 0) - (a.moodCounts.get(mood!) || 0),
        )
        .map((item) => item.photographer),
    );
    console.log('moodSortedPhotographers:', moodSortedPhotographers);

    const selectedPhotographers = new Set<Photographer>();
    const moodIndices = [0, 0, 0];

    while (selectedPhotographers.size < 3) {
      for (let i = 0; i < moods.length; i++) {
        if (moodIndices[i] < moodSortedPhotographers[i].length) {
          const photographer = moodSortedPhotographers[i][moodIndices[i]];
          selectedPhotographers.add(photographer);
          moodIndices[i]++;
          if (selectedPhotographers.size === 3) break;
        }
      }

      if (
        moodIndices.every(
          (index, i) => index === moodSortedPhotographers[i].length,
        )
      )
        break;
    }
    setData(Array.from(selectedPhotographers));
  };

  useEffect(() => {
    if (data.length === 0) {
      processRecommendation();
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <div className="relative flex flex-col mx-4 mb-24">
      <h2 className="mt-2 title-1">칙스냅에서 추천드리는 작가예요!</h2>

      <h3 className="mt-1 mb-6 text-gray-500 body-3 text-balance">
        아래 작가분들은 여러분의 선택을 기반으로 칙스냅에서 추천드리는
        작가님이에요. 자세히 보기를 통해 작가님의 정보를 확인하고 그리던 사진을
        촬영해요
      </h3>

      <div className="flex flex-col gap-[0.62rem]">
        {data.map((photographer: Photographer, index: number) => (
          <div
            key={photographer.id}
            className="flex flex-col w-full bg-gray-50 hover:bg-gray-100 p-[0.75rem] rounded-[0.5rem] cursor-pointer"
          >
            <Link
              target={'_blank'}
              href={`https://www.instagram.com/${photographer.instagram_id}`}
            >
              <div className="flex flex-col justify-center w-full">
                <div className="flex w-full items-center space-x-2 mb-2.5">
                  <Image
                    src={photographer.profile_image_url}
                    alt={photographer.name}
                    width={36}
                    height={36}
                    className="object-cover transition-transform duration-300 ease-in-out rounded-lg hover:scale-110"
                  />

                  <span className="text-gray-900 body-1">
                    {photographer.name}
                  </span>

                  <span className="flex-grow text-gray-600 caption">
                    {`@${photographer.instagram_id}`}
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
                    {photographer.price}
                  </div>

                  {photographer.types.map((typeId, index) => (
                    <div
                      key={index}
                      className="caption px-[0.5rem] py-[0.25rem] bg-white rounded-[0.25rem]"
                    >
                      {snapTypeChoice[typeId].title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-[0.5rem]">
                {photographerData
                  .find((item) => item.id === photographer.id)
                  ?.works.sort(
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
        ))}
      </div>

      <div className="btn-container">
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
