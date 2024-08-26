import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import ClipContainer from '@/components/ClipContainer';
import { Analytics } from '@vercel/analytics/react';
import RecoilContextProvider from '@/context/recoil-context';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'ChikSnap',
  description: '순간을 Chik다. ChikSnap',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} bg-white overflow-x-hidden`}>
        <RecoilContextProvider>
          <ClipContainer>
            <main className="flex-grow overflow-y-auto">{children}</main>
            <Analytics />
          </ClipContainer>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
