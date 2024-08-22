'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import ArrowBack from '@/data/arrowLeft.svg';
import { useRouter } from 'next/navigation';

const RequestCustom = () => {
  const router = useRouter();
  const backFunction = () => {
    router.back();
  };

  const [text, setText] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const isOverLimit = text.length > 600;
  const isTextEntered = text.length > 0;
  const isPhoneNumberEntered = phoneNumber.trim().length > 0;

  return (
    <div className="relative flex flex-col mx-[1rem] mt-[3.5rem]">
      <div className="cursor-pointer" onClick={backFunction}>
        <div className="flex w-[1.5rem] h-[1.5rem] my-[0.75rem]">
          <Image src={ArrowBack} alt="Back" objectFit="cover" />
        </div>
      </div>
      <h2 className="title-1 mt-[0.62rem] mb-[0.25rem]">
        맞춤형 작가 요청하기
      </h2>
      <h3 className="body-3 text-gray-500 mb-[1.75rem]">
        칙스냅에서 회원님에게 최적화된 작가분들을 찾아 추천해드릴게요. 약 1~3일
        정도 소요될 수 있어요.
      </h3>
      <div className="flex flex-col gap-[0.5rem]">
        <div className="flex justify-between">
          <h2 className="body-1">전화번호</h2>
          <h2 className="body-3 text-gray-500">*필수</h2>
        </div>
        <div className="mb-[1.75rem]">
          <input
            type="text"
            placeholder="XXX - XXXX - XXXX"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full h-[3.125rem] px-[0.875rem] bg-gray-50 rounded-lg body-1 placeholder-gray-300
            hover:bg-gray-100 focus:bg-gray-100 focus:border-gray-200 focus:ring-0 focus:outline-none
            border border-transparent transition-colors duration-200
            not-placeholder-shown:bg-gray-50"
          />
        </div>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <h2 className="body-1">희망하는 작가님 스타일 (분위기, 종류 등)</h2>
        <div className="mb-[1.75rem]">
          <textarea
            placeholder="예) 따뜻한 분위기의 숲속에서 찍는 스타일, "
            className={`flex w-full min-h-[13rem] p-[0.875rem] rounded-lg body-3 placeholder-gray-300 resize-none 
            ${
              isOverLimit
                ? 'border-red-100 focus:outline-red-100'
                : 'border-gray-200'
            }
            ${isTextEntered ? 'bg-gray-100' : 'bg-gray-50'}
            transition-colors duration-200
            hover:bg-gray-100 focus:outline-none focus:outline-1 focus:outline-gray-200`}
            style={{ outlineOffset: '0px' }}
            value={text}
            onChange={handleTextChange}
          />
          <div className="flex justify-end">
            <p
              className={`caption text-gray-600 mt-[0.38rem] ${
                isOverLimit ? 'text-red-100' : 'text-gray-600'
              }`}
            >
              최대 600자
            </p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-4 cursor-pointer">
        <div className="flex w-full max-w-md mx-4">
          <button
            className={`body-3 w-full text-center py-3 rounded-lg transition-colors duration-200 ${
              isPhoneNumberEntered
                ? 'btn-primary body-3 w-full lg:mx-4 md:mx-4 sm:mx-4'
                : 'btn-default body-3 pointer-events-none w-full lg:mx-4 md:mx-4 sm:mx-4'
            }`}
          >
            요청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCustom;
