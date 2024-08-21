'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdCheck } from 'react-icons/md';
import { snapTypes } from '@/data/database';

const SelectType = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="flex flex-col before:justify-between p-4 space-y-12">
      <h2 className="title-1">찾고 있는 스냅 종류를 골라볼까요?</h2>
      <div className="space-y-2 w-full">
        {snapTypes.map((type) => (
          <div
            key={type.id}
            className={`flex items-center bg-gray-50 rounded-lg ${
              selectedType === type.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <Image
              src={type.image}
              alt={type.title}
              width={160}
              height={160}
              className="mr-4"
            />
            <div className="p-4 flex flex-row justify-between w-full place-items-center">
              <div className="flex-grow">
                <h2 className="font-semibold">{type.title}</h2>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              {selectedType === type.id && (
                <MdCheck size={24} className="text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Link
        href={selectedType ? `/select-price?type=${selectedType}` : '#'}
        className={
          selectedType
            ? 'btn-primary font-bold'
            : 'btn-default pointer-events-none'
        }
      >
        다음
      </Link>
    </div>
  );
};

export default SelectType;
