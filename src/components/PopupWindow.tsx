import React from 'react';
import Close from '@/data/close.svg';
import Image from 'next/image';

const PopupWindow = ({ isOpen, onClose, message }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-3 mx-12 bg-white shadow-xl rounded-2xl">
        <div className="flex justify-end mb-3 cursor-pointer" onClick={onClose}>
          <Image src={Close} alt="Back" className="object-cover" />
        </div>

        <h2 className="mb-1 text-center title-1">{message.title}</h2>
        <p className="mb-6 text-center text-gray-500 whitespace-pre-line body-3">
          {message.body}
        </p>
        <button
          className="w-full py-3 transition-colors duration-200 rounded-lg body-1 btn-primary body-3"
          onClick={onClose}
        >
          홈으로 가기
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PopupWindow;
