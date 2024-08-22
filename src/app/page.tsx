import Image from 'next/image';
import Link from 'next/link';
import BackgroundImage from '@/data/unsplash.png';

const Home = () => {
  return (
    <div className="relative flex flex-col w-full h-screen p-[1rem]">
      <div className="absolute inset-0 z-0">
        <Image
          src={BackgroundImage}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="pointer-events-none"
        />
      </div>
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>
      <div className="relative z-20 h-full flex flex-col justify-between">
        <div className="pl-[1.25rem]">
          <h1 className="body-2 mt-[6.94rem] mb-[0.64rem] text-white">
            순간을 chik다,
            <br />
            칙스냅
          </h1>
          <div className="w-[6.3125rem] h-[0.125rem] rounded-[12.5rem] bg-white/40" />
        </div>
        <div className="flex flex-col">
          <div className="pl-[1.25rem]">
            <h1 className="heading text-white mb-[1rem]">
              스냅 작가님을
              <br />
              찾고 있으신가요?
            </h1>
            <p className="body-2 text-white mb-[3.25rem]">
              나에게 맞는 스냅 작가님을 찾기
              <br />
              어려우셨다면 저희가 찾아드릴게요!
            </p>
          </div>
          <Link href="/select-type" className="btn-default body-3">
            원하는 사진작가 찾아보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
