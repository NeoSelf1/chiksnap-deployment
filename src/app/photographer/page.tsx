'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { photographers_mu } from '@/data/database';
import ArrowBack from '@/data/arrowLeft.svg';
import Loading from '@/components/Loading';

const RecommendedPhotographers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5초

    return () => clearTimeout(timer);
  }, []);

  const backFunction = () => {
    router.back();
  };

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const moods = searchParams.get('moods');

  //type, price, moods 정보로 작가 추리는 로직 여기서 구현하고 바로 띄우면 될듯.

  // 배열을 랜덤하게 섞고 처음 3명의 작가만 선택
  const selectedPhotographers = [...photographers_mu]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <div className="relative flex flex-col mx-[1rem] mt-[3.5rem]">
      <div className="cursor-pointer" onClick={backFunction}>
        <div className="flex w-[1.5rem] h-[1.5rem] my-[0.75rem]">
          <Image src={ArrowBack} alt="Back" objectFit="cover" />
        </div>
      </div>
      <h2 className="title-1 mt-[0.62rem] mb-[0.25rem]">
        칙스냅에서 추천드리는 작가예요!
      </h2>
      <h3 className="body-3 text-gray-500 mb-[1.75rem]">
        선택하신 분위기를 기반으로
        <br />
        칙스냅에서 추천드리는 작가님들이에요.
      </h3>
      <div className="flex flex-col gap-[0.62rem] mb-[5rem]">
        {selectedPhotographers.map((photographer) => (
          <div
            key={photographer.id}
            className="flex flex-col w-full bg-gray-50 hover:bg-gray-100 p-[0.75rem] rounded-[0.5rem] cursor-pointer"
          >
            <a href={`https://www.instagram.com/${photographer.instagramId}/`}>
              <div className="flex flex-col w-full justify-center">
                <div className="flex w-full mb-[0.63rem]">
                  <div className="flex relative w-[2.25rem] h-[2.25rem] mr-[0.62rem] rounded-[0.25rem]">
                    <Image
                      src={photographer.profileImg}
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
                      {`@${photographer.instagramId}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[0.25rem] mb-[0.62rem]">
                  <div className="caption px-[0.5rem] py-[0.25rem] bg-gray-200 rounded-[0.25rem]">
                    {photographer.price}
                  </div>
                  {photographer.services.map((value, index) => (
                    <div
                      key={index}
                      className="caption px-[0.5rem] py-[0.25rem] bg-white rounded-[0.25rem]"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-[0.5rem]">
                {photographer.workImages.map((value, index) => (
                  <div key={index} className="relative w-1/3 h-[8.5rem]">
                    <Image
                      src={value}
                      alt="example image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[0.25rem]"
                    />
                  </div>
                ))}
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-4 cursor-pointer">
        <div className="flex w-full max-w-md mx-4">
          <Link
            href={'/request-custom'}
            className={'btn-default body-3 w-full lg:mx-4 md:mx-4 sm:mx-4'}
          >
            맞춤형 작가 요청하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPhotographers;
