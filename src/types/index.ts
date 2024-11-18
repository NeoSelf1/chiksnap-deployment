export interface MoodImage {
  id: number;
  src: any;
  alt: string;
}

// export interface SnapType {
//   id: 0|1|2;
//   title: string;
//   image: any;
// }

// 개인/일상, 단체/우정, 커플/결혼
export type SnapType = 0 | 1 | 2;

export type MoodType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SnapImage {
  id: number; // 순서 -> 규민이가 작성하는 JSON 배열 순서대로
  snap_type: SnapType; // 노가다
  photographer_id: number | null; // 순서
  mood: MoodType; // A1~A7 -> 1~7 채워줘야할듯.
  url: string;
}

export interface Photographer {
  id: number;
  name: string;
  instagram_id: string;
  profile_image_url: string;
  works: number[];
  types: SnapType[];
  price: string;
}
