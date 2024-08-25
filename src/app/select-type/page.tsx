'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { snapTypeChoice } from '@/data/database';
import IsNotChecked from '@/data/grayCheck.svg';
import IsChecked from '@/data/whiteCheck.svg';

const SelectType = () => {
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);

  const handleSelectType = (typeId: number) => {
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
      <div className="flex flex-row items-center justify-between mt-2">
        <h2 className="title-1">스냅 종류를 선택해주세요.</h2>
        <span className="body-1">
          1<span className="text-gray-400">/2</span>
        </span>
      </div>

      <h3 className="mt-1 mb-6 text-gray-500 whitespace-pre-line body-3">
        {`찍고 싶은 스냅사진의 종류를 골라주세요.
        종류는 중복으로 선택할 수 있어요.`}
      </h3>

      <div className="w-full space-y-3">
        {snapTypeChoice.map((type, index) => (
          <div
            key={index}
            className={`flex items-center bg-gray-50 rounded-lg cursor-pointer ${
              selectedTypes.includes(index) ? 'ring-1 ring-black' : ''
            }`}
            onClick={() => handleSelectType(index)}
          >
            <Image
              src={type.image}
              alt={type.title}
              width={143}
              height={143}
              className="mr-1"
            />

            <div className="p-[1rem] flex flex-row justify-between w-full place-items-center">
              <div className="flex-grow -space-y-0.5">
                <h2 className="body-1">{type.title}</h2>
                <p className="text-gray-500 body-3">{type.text}</p>
              </div>

              <Image
                src={selectedTypes.includes(index) ? IsChecked : IsNotChecked}
                alt={selectedTypes.includes(index) ? 'checked' : 'notChecked'}
                width={24}
                height={24}
                className={
                  selectedTypes.includes(index)
                    ? 'bg-black rounded-full'
                    : 'bg-gray-100 rounded-full'
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="btn-container">
        <Link
          prefetch
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
