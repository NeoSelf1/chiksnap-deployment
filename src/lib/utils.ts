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
