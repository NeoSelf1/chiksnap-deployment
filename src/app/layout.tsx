import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import ClipContainer from '@/components/ClipContainer';

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
      <body className={`${pretendard.className} bg-gray-100 overflow-x-hidden`}>
        <ClipContainer>
          <main className="flex-grow overflow-y-auto">{children}</main>
        </ClipContainer>
      </body>
    </html>
  );
}
