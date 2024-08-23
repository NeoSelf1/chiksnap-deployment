'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../data/logo.svg';
import ArrowBack from '@/data/arrowLeft.svg';
import GrayLogo from '../data/grayLogo.svg';

const ClipContainer = ({ children }: any) => {
  const path = usePathname();
  const router = useRouter();

  const headerHeight =
    path === '/'
      ? 'h-[0rem]'
      : path === '/request-notification'
      ? 'h-[3.5rem]'
      : 'h-[7rem]';

  return (
    <div className="max-w-md mx-auto flex flex-col min-h-screen bg-white">
      <header
        className={`fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-50`}
      >
        <div
          className={`${
            path === '/'
              ? 'bg-black/40 backdrop-blur-sm text-white'
              : 'bg-gray-50'
          } px-[1rem] h-[3.5rem] flex justify-center relative`}
        >
          <div className="flex justify-center my-[1rem]">
            <Link href="/">
              <Image
                src={path === '/' ? Logo : GrayLogo}
                alt="chiksnap"
                width={28}
                height={28}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>

          {path !== '/request-notification' && (
            <div className="flex items-center">
              <Link
                href="/request-notification"
                className={`${
                  path === '/' ? 'border-gray-700' : 'border-gray-100 bg-white'
                } h-[2rem] p-[8px] rounded-[0.25rem] border absolute right-[1rem]`}
              >
                <p className="caption">사전알림신청</p>
              </Link>
            </div>
          )}
        </div>

        {path !== '/' && path !== '/request-notification' && (
          <div className={`bg-white px-[1rem] h-[3.5rem] flex items-center`}>
            <div className="cursor-pointer" onClick={() => router.back()}>
              <div className="flex w-[1.5rem] h-[1.5rem]">
                <Image
                  src={ArrowBack}
                  alt="Back"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        )}
      </header>
      <div className={headerHeight} />
      {children}
    </div>
  );
};

export default ClipContainer;
