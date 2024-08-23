import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handlePhoneNumberChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>,
) => {
  const inputNumber = e.target.value.replace(/\D/g, '');

  let formattedNumber = '';
  if (inputNumber.length <= 3) {
    formattedNumber = inputNumber;
  } else if (inputNumber.length <= 7) {
    formattedNumber = `${inputNumber.slice(0, 3)}-${inputNumber.slice(3)}`;
  } else {
    formattedNumber = `${inputNumber.slice(0, 3)}-${inputNumber.slice(
      3,
      7,
    )}-${inputNumber.slice(7, 11)}`;
  }

  if (inputNumber.length <= 11) {
    setValue(formattedNumber);
  }
};

// Base64 encoded SVG to use as placeholder
export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// SVG shimmer effect
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
