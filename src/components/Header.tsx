import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold">칙스냅</h1>
      </Link>
    </header>
  );
};

export default Header;
