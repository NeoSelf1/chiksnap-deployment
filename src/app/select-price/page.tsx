'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RangeSlider from '../../components/RangeSlider';

const SelectPrice = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 5]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="title-1 mb-6">희망하는 가격대를 선택해주세요</h2>
      <RangeSlider
        min={1}
        max={50}
        step={1}
        value={priceRange}
        onChange={(values) => setPriceRange(values as [number, number])}
      />

      <p className="body-2 mt-4 mb-8">
        {priceRange[0].toLocaleString()}만원 - {priceRange[1].toLocaleString()}
        만원
      </p>

      <Link
        href={`/select-mood?type=${type}&price=${priceRange[0]}-${priceRange[1]}`}
        className="btn-primary font-bold"
      >
        다음
      </Link>
    </div>
  );
};

export default SelectPrice;
