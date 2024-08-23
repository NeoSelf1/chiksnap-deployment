'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Close from '@/data/close.svg';
import Instagram from '@/data/instagram.svg';
import { useRouter } from 'next/navigation';
import { handlePhoneNumberChange } from '@/lib/utils';
import { submitForm } from '../api/apis';

const RequestNotification = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isPhoneNumberEntered = phoneNumber.trim().length > 12;

  const handleSubmit = async () => {
    if (!isPhoneNumberEntered) return;
    setLoading(true);

    try {
      await submitForm({ phone_number: phoneNumber, prefer_style: '알림요청' });
    } catch (error) {
      console.error('실패: ', error);
      alert('요청 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const isPhoneNumberEntered = phoneNumber.trim().length > 0;

  return (
    <div className="relative flex flex-col mx-4 mb-24">
      <div className="py-3 flex justify-end" onClick={() => router.back()}>
        <Image
          src={Close}
          alt="Back"
          className="flex w-[1.5rem] h-[1.5rem]"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <h2 className="title-1 mt-2">칙스냅이 오픈되면, 알려드릴게요!</h2>
      <h3 className="body-3 text-gray-500 mt-1 mb-6 whitespace-pre-line">
        {`안녕하세요, 순간을 Chik다. chiksnap입니다.
Chiksnap은 스냅사진작가를 추천해주는 플랫폼으로 10월 출시 예정에 
있습니다.
오픈 연락을 희망하신다면 아래 연락처를 남겨주세요 !`}
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
      <div className="btn-container space-x-2">
        <Link
          target="_blank"
          href={`https://www.instagram.com/chik_snap/`}
          className="btn-default flex justify-center space-x-1"
        >
          <Image src={Instagram} width={24} alt="Instagram" objectFit="cover" />
          <h1 className="body-3">칙스냅에 문의하기</h1>
        </Link>

        <button
          className={
            isPhoneNumberEntered
              ? 'btn-primary body-3 text-white flex justify-center items-center'
              : 'btn-default body-3 cursor-not-allowed'
          }
          disabled={!isPhoneNumberEntered}
          onClick={handleSubmit}
        >
          {loading ? <LoadingIndicator /> : '신청하기'}
        </button>
      </div>
    </div>
  );
};

export default RequestNotification;
