import axios from 'axios';

interface SubmitFormData {
  phone_number: string;
  prefer_style: string;
}

export const submitForm = async (data: SubmitFormData): Promise<void> => {
  try {
    console.log(data);
    const response = await axios.post(
      'https://api.chiksnap.site/recommend',
      data,
    );

    if (response.status !== 200) {
      throw new Error('전송 실패');
    }
  } catch (error) {
    throw new Error('실패: ' + error);
  }
};
