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
    <div className="relative flex flex-col mx-4 mb-24">
      <div className="flex flex-row justify-between items-center mt-2">
        <h2 className="title-1">스냅 종류를 선택해주세요.</h2>
        <span className="body-1">
          1<span className="text-gray-400">/2</span>
        </span>
      </div>

      <h3 className="body-3 text-gray-500 mt-1 mb-6 whitespace-pre-line">
        {`찍고 싶은 스냅사진의 종류를 골라주세요.
        종류는 중복으로 선택할 수 있어요.`}
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

      <div className="btn-container">
        <Link
          href={
            selectedTypes.length > 0
              ? `/select-mood?type=${selectedTypes.join(',')}`
              : '#'
          }
          className={
            selectedTypes.length > 0
              ? 'btn-primary body-3'
              : 'btn-default body-3 pointer-events-none'
          }
        >
          다음으로
        </Link>
      </div>
    </div>
  );
};

export default SelectType;
