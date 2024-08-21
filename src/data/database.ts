import { MoodImage, Photographer, SnapType } from '@/types';

import image_11 from '@/data/11.png';
import image_12 from '@/data/12.png';
import image_13 from '@/data/13.png';
import image_1 from '@/data/1.png';
import image_2 from '@/data/2.png';
import image_3 from '@/data/3.png';
import image_4 from '@/data/4.png';

export const snapTypes: SnapType[] = [
  {
    id: 'personal',
    title: '개인 스냅',
    description: '개인 화보, 프로필 사진 등 단독 촬영',
    image: image_11,
  },
  {
    id: 'couple',
    title: '커플 / 우정 스냅',
    description: '커플(2인) 혹은 친구들(2인 이상) 촬영',
    image: image_12,
  },
  {
    id: 'wedding',
    title: '결혼 스냅',
    description: '데이트 스냅, 본식 스냅 등 웨딩 촬영',
    image: image_13,
  },
];

export const photographers_mu: Photographer[] = [
  {
    id: 1,
    name: '@kim_photo',
    instagramId: '@CHIK_1',
    services: ['개인 스냅', '커플 스냅', '웨딩 스냅'],
    profileImg: image_1,
    workImages: [image_1, image_2, image_3, image_4],
  },
  {
    id: 2,
    name: '이스냅',
    instagramId: '@CHIK_2',
    services: ['일반스냅', '결혼사진'],
    profileImg: image_2,
    workImages: null,
  },
  {
    id: 3,
    name: '박사진',
    instagramId: '@CHIK_3',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_3,
    workImages: null,
  },
  {
    id: 4,
    name: '정스튜디오',
    instagramId: '@CHIK_4',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_4,
    workImages: null,
  },
];

export const moodImages_mu: MoodImage[] = [
  { id: 1, src: image_1, alt: 'Mood 1' },
  { id: 2, src: image_2, alt: 'Mood 2' },
  { id: 3, src: image_3, alt: 'Mood 3' },
  { id: 4, src: image_4, alt: 'Mood 4' },
  { id: 5, src: image_1, alt: 'Mood 5' },
  { id: 6, src: image_2, alt: 'Mood 6' },
];
