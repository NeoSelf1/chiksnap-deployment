import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Header from '@/components/Header';

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
      <body className={`${pretendard.className} bg-gray-50`}>
        <Header />
        <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
          <main className="flex-grow overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
