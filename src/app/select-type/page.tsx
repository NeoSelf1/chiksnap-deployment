'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { snapTypes } from '@/data/database';
import ArrowBack from '@/data/arrowLeft.svg';
import IsNotChecked from '@/data/grayCheck.svg';
import IsChecked from '@/data/whiteCheck.svg';
import { useRouter } from 'next/navigation';

const SelectType = () => {
  const router = useRouter();
  const backFunction = () => {
    router.back();
  };

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSelectType = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      // 이미 선택된 경우, 선택 해제
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    } else {
      // 선택되지 않은 경우, 선택 추가
      setSelectedTypes([...selectedTypes, typeId]);
    }
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
          1<span className="text-gray-400"> / 2</span>
        </span>
      </div>
      <h2 className="title-1 mt-[0.62rem] mb-[0.25rem]">
        원하는 스냅 종류를 선택해볼까요?
      </h2>
      <h3 className="body-3 text-gray-500 mb-[1.75rem]">
        복수 선택이 가능해요
      </h3>
      <div className="space-y-[1rem] w-full">
        {snapTypes.map((type) => (
          <div
            key={type.id}
            className={`flex items-center bg-gray-50 rounded-lg cursor-pointer ${
              selectedTypes.includes(type.id) ? 'ring-1 ring-black' : ''
            }`}
            onClick={() => handleSelectType(type.id)}
          >
            <Image
              src={type.image}
              alt={type.title}
              width={200}
              height={200}
              className="mr-[0.25rem]"
            />
            <div className="p-[1rem] flex flex-row justify-between w-full place-items-center">
              <div className="flex-grow space-y-[0.5rem]">
                <h2 className="font-semibold">{type.title}</h2>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              {selectedTypes.includes(type.id) ? (
                <div className="w-[1.5rem] h-[1.5rem] bg-black rounded-[0.75rem] p-[0.12rem]">
                  <Image
                    src={IsChecked}
                    alt={'checked'}
                    width={24}
                    height={24}
                  />
                </div>
              ) : (
                <div className="w-[1.5rem] h-[1.5rem] bg-gray-100 rounded-[0.75rem] p-[0.12rem]">
                  <Image
                    src={IsNotChecked}
                    alt={'not checked'}
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <Link
          href={
            selectedTypes.length > 0
              ? `/select-mood?type=${selectedTypes.join(',')}`
              : '#'
          }
          className={
            selectedTypes.length > 0
              ? 'btn-primary body-3 fixed bottom-[1rem] w-[calc(100%-2rem)] lg:w-full lg:absolute lg:bottom-[1rem] md:w-full md:absolute md:bottom-[1rem] sm:w-full sm:absolute sm:bottom-[1rem]'
              : 'btn-default body-3 pointer-events-none fixed bottom-[1rem] w-[calc(100%-2rem)] lg:w-full lg:absolute lg:bottom-[1rem] md:w-full md:absolute md:bottom-[1rem] sm:w-full sm:absolute sm:bottom-[1rem]'
          }
        >
          다음
        </Link>
      </div>
    </div>
  );
};

export default SelectType;
