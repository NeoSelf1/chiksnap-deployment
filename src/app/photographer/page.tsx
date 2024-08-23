'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import { photoData, photographerData, snapTypeChoice } from '@/data/database';
import { Photographer } from '@/types';

const RecommendedPhotographers = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    if (!types || !moods) return;

    const filteredPhotographerByType = photographerData.filter((item) =>
      types.some((type: any) => item.types.includes(type)),
    );

    const photoMoodMap = new Map(
      photoData.map((photo) => [photo.id, photo.mood]),
    );

    const photographerMoodCounts = filteredPhotographerByType.map(
      (photographer) => {
        // 모든 사진작가들에 대해,
        const moodCounts = new Map<number, number>();
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

    const selectedPhotographers = new Set<Photographer>();
    const moodIndices = new Array(moods.length).fill(0);

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
    console.log(Array.from(selectedPhotographers));
    setData(Array.from(selectedPhotographers));
  };

  useEffect(() => {
    console.log('hello', data);
    if (data.length === 0) {
      processRecommendation();
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <div className="relative flex flex-col mx-4 mb-24">
      <h2 className="title-1 mt-2">칙스냅에서 추천드리는 작가예요!</h2>

      <h3 className="body-3 text-gray-500 mt-1 mb-6 text-balance">
        아래 작가분들은 여러분의 선택을 기반으로 칙스냅에서 추천드리는
        작가님이에요. 자세히 보기를 통해 작가님의 정보를 확인하고 그리던 사진을
        촬영해요
      </h3>

      <div className="flex flex-col gap-[0.62rem]">
        {data.map((photographer: Photographer) => (
          <div
            key={photographer.id}
            className="flex flex-col w-full bg-gray-50 hover:bg-gray-100 p-[0.75rem] rounded-[0.5rem] cursor-pointer"
          >
            <Link
              target={'_blank'}
              href={`https://www.instagram.com/${photographer.instagram_id}`}
            >
              <div className="flex flex-col w-full justify-center">
                <div className="flex w-full mb-[0.63rem]">
                  <div className="flex relative w-[2.25rem] h-[2.25rem] mr-[0.62rem] rounded-[0.25rem]">
                    <Image
                      src={photographer.profile_image_url}
                      alt={photographer.name}
                      width={54}
                      height={54}
                      objectFit="cover"
                      className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>

                  <div className="flex items-center gap-[0.5rem]">
                    <span className="body-1 text-gray-900">
                      {photographer.name}
                    </span>

                    <span className="caption text-gray-600">
                      {`@${photographer.instagram_id}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-[0.25rem] mb-[0.62rem]">
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
                  ?.works.slice(0, 3)
                  .map((imageId, index) => (
                    <div key={index} className="relative w-1/3 h-[8.5rem]">
                      <Image
                        src={
                          photoData.find((item) => item.id === imageId)?.url!
                        }
                        alt="example image"
                        layout="fill"
                        className="rounded-[0.25rem] object-cover"
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
