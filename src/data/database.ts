import { MoodImage, Photographer, SnapType } from '@/types';

import image_11 from '@/data/personalSnap.png';
import image_12 from '@/data/coupleSnap.png';
import image_13 from '@/data/weddingSnap.png';
import image_1 from '@/data/1.png';
import image_2 from '@/data/2.png';
import image_3 from '@/data/3.png';
import image_4 from '@/data/4.png';

export const snapTypes: SnapType[] = [
  {
    id: 'personal',
    title: '개인 스냅',
    description: '화보, 프로필 사진 촬영',
    image: image_11,
  },
  {
    id: 'couple',
    title: '커플 / 우정 스냅',
    description: '2인 이상 촬영',
    image: image_12,
  },
  {
    id: 'wedding',
    title: '결혼 스냅',
    description: '웨딩, 본식 등 촬영',
    image: image_13,
  },
];

export const photographers_mu: Photographer[] = [
  {
    id: 1,
    name: 'kim_photo',
    instagramId: 'chik_snap',
    services: ['개인 스냅', '커플 스냅'],
    profileImg: image_1,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 2,
    name: '이스냅',
    instagramId: 'chik_snap',
    services: ['일반스냅', '결혼사진'],
    profileImg: image_2,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 3,
    name: '박사진',
    instagramId: 'chik_snap',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_3,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 4,
    name: '정스튜디오1',
    instagramId: 'chik_snap',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_4,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 5,
    name: '정스튜디오2',
    instagramId: 'chik_snap',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_4,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 6,
    name: '정스튜디오3',
    instagramId: 'chik_snap',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_4,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 7,
    name: '정스튜디오4',
    instagramId: 'chik_snap',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_4,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
  {
    id: 8,
    name: '정스튜디오5',
    instagramId: 'chik_snap',
    services: ['졸업사진', '결혼사진'],
    profileImg: image_4,
    workImages: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/600',
    ],
    price: '10만원 - 25만원',
  },
];

export const moodImages_mu: MoodImage[] = [
  { id: 1, src: image_1, alt: 'Mood 1' },
  { id: 2, src: image_2, alt: 'Mood 2' },
  { id: 3, src: image_3, alt: 'Mood 3' },
  { id: 4, src: image_4, alt: 'Mood 4' },
  { id: 5, src: image_1, alt: 'Mood 5' },
  { id: 6, src: image_2, alt: 'Mood 6' },
  { id: 7, src: image_1, alt: 'Mood 1' },
  { id: 8, src: image_2, alt: 'Mood 2' },
  { id: 9, src: image_3, alt: 'Mood 3' },
  { id: 10, src: image_4, alt: 'Mood 4' },
  { id: 11, src: image_1, alt: 'Mood 5' },
  { id: 12, src: image_2, alt: 'Mood 6' },
];
