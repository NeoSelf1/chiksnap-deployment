'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitForm } from '../api/apis';
import PopupWindow from '@/components/PopupWindow';
import { handlePhoneNumberChange } from '@/lib/utils';
import { LoadingIndicator } from '@/lib/svgs';

const RequestCustom = () => {
  const router = useRouter();

  const [text, setText] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isOverLimit = text.length > 600;
  const isTextEntered = text.length > 0;
  const isPhoneNumberEntered = phoneNumber.trim().length > 12;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!isPhoneNumberEntered) return;
    setLoading(true);

    try {
      await submitForm({ phone_number: phoneNumber, prefer_style: text });
    } catch (error) {
      console.error('실패: ', error);
      alert('요청 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <div className="relative flex flex-col mx-4 mb-24">
      <h2 className="title-1 mt-2">맞춤형 작가 요청해보세요.</h2>

      <h3 className="body-3 text-gray-500 mt-1 mb-6 whitespace-pre-line">
        {`칙스냅에서 회원님에게 최적화된 작가분들을 찾아 추천해드릴게요.
        약 1~3일 정도 소요될 수 있어요!`}
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
            onChange={(e) => handlePhoneNumberChange(e, setPhoneNumber)}
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
            placeholder="예) 따뜻한 색감, 필름카메라 느낌"
            className={`flex w-full min-h-[13rem] p-[0.875rem] rounded-lg body-3 placeholder-gray-300 resize-none  bg-gray-50
            ${
              isOverLimit
                ? 'border-red-100 focus:outline-red-100'
                : 'border-gray-200'
            }
            ${isTextEntered ? 'bg-gray-100' : 'bg-gray-50'}
            transition-colors duration-200
            focus:bg-gray-100
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

      <div className="btn-container">
        <button
          onClick={handleSubmit}
          disabled={!isPhoneNumberEntered || !isTextEntered || loading}
          className={
            isPhoneNumberEntered && isTextEntered
              ? 'btn-primary body-3 flex justify-center items-center'
              : 'btn-default pointer-events-none body-3'
          }
        >
          {loading ? <LoadingIndicator /> : '요청하기'}
        </button>
      </div>

      <PopupWindow
        isOpen={isModalOpen}
        onClose={onClose}
        message={{
          title: '작가 요청이 완료되었어요!',
          body: `회원님만을 위한 맞춤형 작가를 찾아 연락드릴게요.
조금만 기다려주세요.`,
        }}
      />
    </div>
  );
};

export default RequestCustom;
