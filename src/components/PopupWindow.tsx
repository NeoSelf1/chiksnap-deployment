import React from 'react';
import Close from '@/data/close.svg';
import Image from 'next/image';

const PopupWindow = ({ isOpen, onClose, message }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-3 rounded-2xl shadow-xl max-w-sm w-full mx-12">
        <div className="flex justify-end cursor-pointer mb-3" onClick={onClose}>
          <Image src={Close} alt="Back" objectFit="cover" />
        </div>

        <h2 className="title-1 text-center mb-1">{message.title}</h2>
        <p className="body-3 text-gray-500 text-center mb-6 whitespace-pre-line">
          {message.body}
        </p>
        <button
          className="body-1 w-full py-3 rounded-lg transition-colors duration-200 btn-primary body-3"
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
