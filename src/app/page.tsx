import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="heading mb-4">순간을 chik다. ChikSnap</h1>
      <p className="body-2 mb-24 text-gray-400">
        나에게 맞는 사진작가를 추천받아요
      </p>
      <Link href="/select-type" className="btn-primary font-bold">
        원하는 사진작가 찾아보기
      </Link>
    </div>
  );
};

export default Home;
