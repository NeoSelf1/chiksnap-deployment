import axios from 'axios';

interface RecommendPhotographerRequestData {
  phone_number: string;
  prefer_style: string;
  snap_types: number[];
}

interface RegisterAlarmRequestData {
  phone_number: string;
  service_name: string;
}

export const recommendPhotographer = async (
  data: RecommendPhotographerRequestData,
): Promise<void> => {
  try {
    const response = await axios.post('/recommend', data);

    if (response.status !== 200) {
      throw new Error('전송 실패');
    }
  } catch (error) {
    throw new Error('실패: ' + error);
  }
};

export const registerAlarm = async (
  data: RegisterAlarmRequestData,
): Promise<void> => {
  try {
    const response = await axios.post('/registration', data);

    if (response.status !== 200) {
      throw new Error('전송 실패');
    }
  } catch (error) {
    throw new Error('실패: ' + error);
  }
};
