'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '../data/logo.svg';
import GrayLogo from '../data/grayLogo.svg';

const Header = () => {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(pathname === '/');
  const [isNotificationPage, setIsNotificationPage] = useState(
    pathname === '/request-notification',
  );

  useEffect(() => {
    setIsHomePage(pathname === '/');
    setIsNotificationPage(pathname === '/request-notification');
  }, [pathname]);

  return (
    <header
      className={`${
        isHomePage ? 'bg-black/40 backdrop-blur-sm text-white' : ' bg-gray-50'
      } fixed top-0 left-0 right-0 max-w-md mx-auto w-full px-[1rem] h-[3.5rem] flex justify-center z-50`}
    >
      <div className="flex justify-center my-[1rem]">
        <Link href="/">
          <Image
            src={isHomePage ? Logo : GrayLogo}
            alt="chiksnap"
            width={28}
            height={28}
            objectFit="contain"
          />
        </Link>
      </div>
      {!isNotificationPage && (
        <div className="flex items-center">
          <Link
            href="/request-notification"
            className={`${
              isHomePage ? 'border-gray-700' : 'border-gray-100 bg-white'
            } h-[2rem] p-[8px] rounded-[0.25rem] border absolute right-[1rem]`}
          >
            <p className="caption">사전알림신청</p>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
