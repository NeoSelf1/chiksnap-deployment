'use client';

import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Close from '@/data/close.svg';
import Instagram from '@/data/instagram.svg';

const RequestNotification = () => {
  return (
    <div className="relative flex flex-col mx-[1rem] pt-[3.5rem] h-screen">
      <Link href={'/'} className="flex justify-end cursor-pointer">
        <div className="flex w-[1.5rem] h-[1.5rem] my-[0.75rem]">
          <Image src={Close} alt="Back" objectFit="cover" />
        </div>
      </Link>
      <h2 className="title-1 mt-[0.62rem] mb-[0.25rem]">
        칙스냅이 오픈되면, 알려드릴게요!
      </h2>
      <h3 className="body-3 text-gray-500 mb-[1.75rem]">
        안녕하세요, 순간을 Chik다 chiksnap입니다.
        <br />
        Chiksnap은 스냅사진작가를 추천해주는 플랫폼으로 10월 출시 예정에
        있습니다.
        <br />
        오픈 연락을 희망하신다면 아래 연락처를 남겨주세요!
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
            className="w-full h-[3.125rem] px-[0.875rem] bg-gray-50 rounded-lg body-1 placeholder-gray-300
            hover:bg-gray-100 focus:bg-gray-100 focus:border-gray-200 focus:ring-0 focus:outline-none
            border border-transparent transition-colors duration-200
            not-placeholder-shown:bg-gray-50"
          />
        </div>
      </div>
      <div className="flex space-x-2 absolute bottom-[1rem] w-full">
        <a href={`https://www.instagram.com/chik_snap/`} className="w-1/2">
          <button className="btn-default flex justify-center items-center w-full body-3 rounded-lg gap-[0.25rem]">
            <div className="flex w-[1.5rem] h-[1.5rem]">
              <Image src={Instagram} alt="Back" objectFit="cover" />
            </div>
            칙스냅에 문의하기
          </button>
        </a>
        <Link href="/" className="flex-grow">
          <button className="btn-primary w-full body-3">신청하기</button>
        </Link>
      </div>
    </div>
  );
};

export default RequestNotification;
