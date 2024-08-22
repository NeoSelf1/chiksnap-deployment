import React from 'react';
import Image from 'next/image';
import LoadingGif from '@/data/loading.gif';
const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src={LoadingGif}
        alt="Loading..."
        width={83}
        height={28}
        className="mb-[2.25rem]"
      />
      <h2 className="title-1 mb-[0.12rem]">작가님을 탐색 중이에요!</h2>
      <p className="body-2 text-gray-600">잠시만 기다려주세요!</p>
    </div>
  );
};

export default Loading;
